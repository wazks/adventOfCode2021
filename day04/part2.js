"use strict"

const fs = require("fs")
const data = fs.readFileSync("./input", "utf8").slice(0, -1)

const numbersArr = data.split("\n\n")

const numbersString = []
numbersArr.slice(1).forEach((el, i) => {
  for (let j = 0; j < 25; j++) {
    numbersString[i] = el.replace(/\n/g, " ").replace(/  +/g, " ").split(" ")
  }
  numbersString[i] = numbersString[i]
    .map(num => parseInt(num))
    .filter(num => !Number.isNaN(num))
})

let numOfBoards = numbersString.length
let playing = true
let round = 0
const winningNumbers = numbersArr[0].split(",").map(Number)
const boardsNumbers = new Array(numbersString.length)
  .fill(null)
  .map(() => new Array())
let winningBoards

const win = i => {
  numOfBoards--
  if (numOfBoards < 1) {
    playing = false
    winningBoards = i
  } else {
    boardsNumbers.splice(i, 1)
    numbersString.splice(i, 1)
  }
}

while (playing) {
  numbersString.forEach((board, i) => {
    board.forEach((num, j) => {
      if (num === winningNumbers[round]) {
        boardsNumbers[i].push(j)
      }
    })
  })

  if (round > 3) {
    boardsNumbers.forEach((el, boardNum) => {
      for (let i = 0; i < 5; i++) {
        if (
          [i, i + 5, i + 10, i + 15, i + 20].every(num => el.includes(num)) ||
          [i * 5, i * 5 + 1, i * 5 + 2, i * 5 + 3, i * 5 + 4].every(num =>
            el.includes(num)
          )
        )
          win(boardNum)
      }
    })
  }

  if (playing) round++
}
const unmarked = numbersString[winningBoards].filter(
  (el, i) => boardsNumbers[winningBoards].indexOf(i) === -1
)

console.log(unmarked.reduce((prev, cur) => prev + cur) * winningNumbers[round])

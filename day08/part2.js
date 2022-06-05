"use strict"

const fs = require("fs")
const data = fs.readFileSync("./input", "utf8").slice(0, -1)

const lines = data.split("\n")

let sum = 0

for (const line of lines) {
  const signalPatterns = line.split(" | ")[0].split(" ")
  const output = line.split(" | ")[1].split(" ")

  const numbers = new Map()

  const findUniqueNumber = numOfSegments => {
    const possibilities = signalPatterns.filter(
      el => el.length === numOfSegments
    )
    return possibilities.length === 1 ? String(possibilities) : possibilities
  }
  const findUniqueLetter = (num1, num2) =>
    Array.from(numbers.get(num1)).find(el => !numbers.get(num2).includes(el))

  const findAllCommonSegments = (num, nSegmentsNumber) =>
    findUniqueNumber(nSegmentsNumber).find(possibleNumber => {
      for (let i = 0; i < numbers.get(num).length; i++) {
        if (
          Array.from(numbers.get(num)).every(numLetter =>
            possibleNumber.includes(numLetter)
          )
        )
          return signalPatterns.splice(
            signalPatterns.indexOf(possibleNumber),
            1
          )
      }
    })

  numbers.set(1, findUniqueNumber(2))
  numbers.set(4, findUniqueNumber(4))
  numbers.set(7, findUniqueNumber(3))
  numbers.set(8, findUniqueNumber(7))
  numbers.set(9, findAllCommonSegments(4, 6))
  numbers.set(0, findAllCommonSegments(1, 6))
  numbers.set(6, findUniqueNumber(6))
  numbers.set(3, findAllCommonSegments(1, 5))
  const lowerRightSegment = findUniqueLetter(8, 9)

  numbers.set(
    2,
    findUniqueNumber(5).find(segment => segment.includes(lowerRightSegment))
  )
  numbers.set(
    5,
    findUniqueNumber(5).find(segment => !segment.includes(lowerRightSegment))
  )
  let result = ``
  for (const number of output) {
    result += Array.from(numbers.keys()).find(key =>
      numbers.get(key).length === number.length
        ? new Set(numbers.get(key)).size ===
          new Set(numbers.get(key) + number).size
        : false
    )
  }
  sum += +result
}
console.log(sum)

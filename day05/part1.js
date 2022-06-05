"use strict"

const fs = require("fs")
const data = fs.readFileSync("./input", "utf8").slice(0, -1)

const ventsArr = data.split("\n")
const ventsCoors = ventsArr.map(el => el.split(" -> "))

let vent1, vent2, vent1X, vent2X, vent1Y, vent2Y

const assignCoords = item => {
  vent1 = item[0].split(",")
  vent2 = item[1].split(",")
  vent1X = Number(vent1[0])
  vent2X = Number(vent2[0])
  vent1Y = Number(vent1[1])
  vent2Y = Number(vent2[1])
}

let actualVents = []

ventsCoors.forEach(vent => {
  assignCoords(vent)
  if (
    vent1X === vent2X ||
    vent1Y === vent2Y ||
    Math.abs(vent1X - vent2X) === Math.abs(vent1Y - vent2Y)
  )
    actualVents.push(vent)
})

const side = 1000

const grid = new Array(side * side).fill(0)

actualVents.forEach(vent => {
  assignCoords(vent)

  if (vent1X === vent2X) {
    if (vent1Y < vent2Y)
      for (let i = vent1Y; i <= vent2Y; i++) {
        grid[Number(vent1X) + Number(i) * side]++
      }
    if (vent1Y > vent2Y) {
      for (let i = vent1Y; i >= vent2Y; i--) {
        grid[Number(vent1X) + Number(i) * side]++
      }
    }
  }
  if (vent1Y === vent2Y) {
    if (vent1X < vent2X)
      for (let i = vent1X; i <= vent2X; i++) {
        grid[Number(vent1Y) * side + Number(i)]++
      }
    if (vent1X > vent2X) {
      for (let i = vent1X; i >= vent2X; i--) {
        grid[Number(vent1Y) * side + Number(i)]++
      }
    }
  }
})

console.log(grid.filter(tile => tile > 1).length)

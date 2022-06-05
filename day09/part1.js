"use strict"

const fs = require("fs")
const data = fs.readFileSync("./input", "utf8").slice(0, -1)

const yCoord = data.split("\n")[0].length

const gridSingleLine = data.replace(/(\r\n|\n|\r)/g, "")

let cells = []

const findAdjacentCells = i => {
  const adjacentCells = new Set([i + 1, i - 1, i + yCoord, i - yCoord])
  const notAdjecent = direction => adjacentCells.delete(direction)

  //top
  if (i < yCoord) notAdjecent(i - yCoord)
  //bottom
  if (i >= gridSingleLine.length - yCoord) notAdjecent(i + yCoord)
  //left wall
  if (i % yCoord === 0) notAdjecent(i - 1)
  //right wall
  if ((i + 1) % yCoord === 0) notAdjecent(i + 1)

  return adjacentCells
}

Array.from(gridSingleLine).forEach((cell, i) => {
  cell = Number(cell)

  const adjacentCells = findAdjacentCells(i)

  if (
    Array.from(adjacentCells).every(
      adjacentCell => gridSingleLine[adjacentCell] > cell
    )
  )
    cells.push(cell + 1)
})
console.log(cells.reduce((a, b) => a + b))

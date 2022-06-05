"use strict"

const fs = require("fs")
const data = fs.readFileSync("./input", "utf8").slice(0, -1)

const yCoord = data.split("\n")[0].length

const gridSingleLine = data.replace(/(\r\n|\n|\r)/g, "")

let lowestPoints = []

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
    lowestPoints.push(i)
})

const basins = new Array(lowestPoints.length).fill(null).map(() => new Array())

const findBasin = (cell, basinNum) => {
  cell = Number(cell)

  const adjacentCells = findAdjacentCells(cell)

  if (basins[basinNum].includes(cell) || gridSingleLine[cell] == 9) return
  else basins[basinNum].push(Number(cell))

  adjacentCells.forEach(cell => findBasin(cell, basinNum))
}

lowestPoints.forEach((cell, i) => {
  findBasin(cell, i)
})

const basinSizes = []
basins.forEach(basin => basinSizes.push(basin.length))

const threeBiggestBasins = basinSizes.sort((a, b) => b - a).slice(0, 3)
const result = threeBiggestBasins.reduce((a, b) => a * b)

console.log(result)

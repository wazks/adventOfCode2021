"use strict"

const fs = require("fs")
const data = fs.readFileSync("./input", "utf8").slice(0, -1)

let iterationsLeft = 100
let numOfFlashes = 0

const yCoord = data.split("\n")[0].length

const gridArray = Array.from(data.replace(/(\r\n|\n|\r)/g, ""))

const flashed = new Set([])

const findAdjacentCells = i => {
  const adjacentCells = new Set([
    i + 1,
    i + 1 + yCoord,
    i + 1 - yCoord,
    i - 1,
    i - 1 + yCoord,
    i - 1 - yCoord,
    i + yCoord,
    i - yCoord,
  ])

  const notAdjecent = direction => adjacentCells.delete(direction)

  //top
  if (i < yCoord) {
    notAdjecent(i - yCoord)
    notAdjecent(i + 1 - yCoord)
    notAdjecent(i - 1 - yCoord)
  }
  //bottom
  if (i >= gridArray.length - yCoord) {
    notAdjecent(i + yCoord)
    notAdjecent(i + 1 + yCoord)
    notAdjecent(i - 1 + yCoord)
  }
  //left wall
  if (i % yCoord === 0) {
    notAdjecent(i - 1)
    notAdjecent(i - 1 + yCoord)
    notAdjecent(i - 1 - yCoord)
  }
  //right wall
  if ((i + 1) % yCoord === 0) {
    notAdjecent(i + 1)
    notAdjecent(i + 1 + yCoord)
    notAdjecent(i + 1 - yCoord)
  }

  return adjacentCells
}

const flashing = (energy, i) => {
  gridArray[i]++
  if (gridArray[i] > 9 && !flashed.has(i)) {
    flashed.add(i)
    numOfFlashes++
    findAdjacentCells(i).forEach(i => {
      flashing(gridArray[i], i)
    })
  }
}

while (iterationsLeft--) {
  gridArray.forEach((_, i) => {
    flashing(gridArray[i], i)
  })
  flashed.forEach(i => (gridArray[i] = 0))
  flashed.clear()
}

console.log(numOfFlashes)

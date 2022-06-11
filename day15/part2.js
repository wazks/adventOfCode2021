"use strict"

const now = Date.now()

const fs = require("fs")
let oldData = fs.readFileSync("./input", "utf8").slice(0, -1).split("\n")

let data = ''
for(let i=0; i<5; i++) {
    oldData.forEach(line => {
      for(let j=0; j<5; j++) {
        Array.from(line).forEach(cell => {
          (+cell+j+i)>9 ? data+=(+cell+j+i-9) : data+=(+cell+j+i)
        })
      }
    })
}
const numOfColumns = oldData[0].length*5

const numOfCells = data.length
const visited = [] 
const toCheckArr = []

const getSameElFromToCheck = cell => 
  toCheckArr.find(el => el[0] === cell) 


const findAdjacentCells = i => {
  const adjacentCells = new Set([
    i + 1,
    i - 1,
    i + numOfColumns,
    i - numOfColumns,
  ])

  const notAdjecent = direction => adjacentCells.delete(direction)

  //top
  if (i < numOfColumns) {
    notAdjecent(i - numOfColumns)
  }
  //bottom
  if (i >= numOfCells - numOfColumns) {
    notAdjecent(i + numOfColumns)
  }
  //left wall
  if (i % numOfColumns === 0) {
    notAdjecent(i - 1)
  }
  //right wall
  if ((i + 1) % numOfColumns === 0) {
    notAdjecent(i + 1)
  }

  return adjacentCells
}

const getLowestDifficultyCell = (a) => {
  let min = a[0]
  let index = 0
  for(let i=1; i<a.length; i++){
    if (a[i][1] < min[1]) {
      min = a[i]
      index=i
    }
  }
  return [min, index]
}

const checkAdjacent = current => {
    if(current[0]===numOfCells-1) lowestDifficulty = current[1]
  if(!visited.includes(current[0])) {
    findAdjacentCells(current[0]).forEach(adjCell => {
      if(!visited.includes(adjCell)) {
        if(!getSameElFromToCheck(adjCell))
          toCheckArr.push([adjCell, +data[adjCell]+current[1]])
        else if(getSameElFromToCheck(adjCell)[1]>current[1]+Number(data[adjCell]))
          toCheckArr[toCheckArr.indexOf(getSameElFromToCheck(adjCell))][1]
            =current[1]+Number(data[adjCell])
          
      }
    })
  visited.push(current[0])
  }
}
let lowestDifficulty 
checkAdjacent([0, 0])
while(!visited.includes(numOfCells-1)) {
  let curCell = getLowestDifficultyCell(toCheckArr)
  checkAdjacent(curCell[0]) 
  toCheckArr.splice([curCell[1]], 1)
}

console.log(lowestDifficulty, ", took " + (Date.now() - now) + "ms")

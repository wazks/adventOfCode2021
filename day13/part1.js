"use strict"

const fs = require("fs")
const data = fs.readFileSync("./input", "utf8").slice(0, -1)

let dataSet = new Set(data.split("\n\n")[0].split("\n"))
let operations = data.split("\n\n")[1]

  const fold = operations.split("\n")[0].slice(11)
  const newDataSet = new Set()
  dataSet.forEach(dot => {
    if(fold[0] === "x") {
      if(+dot.split(",")[0]>+fold.slice(2)) {
        newDataSet.add(`${2*fold.slice(2)-dot.split(",")[0]},${dot.split(",")[1]}`)
      } else newDataSet.add(dot)
    } else if(fold[0] === "y") {
      if(+dot.split(",")[1]>+fold.slice(2)) {
        newDataSet.add(`${dot.split(",")[0]},${2*fold.slice(2)-dot.split(",")[1]}`)
      } else newDataSet.add(dot)
  }
  })
  dataSet=newDataSet

console.log(dataSet.size)



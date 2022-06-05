"use strict"

const fs = require("fs")
const data = fs.readFileSync("./input", "utf8").slice(0, -1)

const numbersArr = data.split(`\n`).map(Number)
const length = numbersArr.length

let numOfIncreases = 0

for (let i = 0; i < length; i++)
  if (numbersArr[i + 1] > numbersArr[i]) numOfIncreases++

console.log(numOfIncreases)

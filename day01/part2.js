"use strict"

const fs = require("fs")
const data = fs.readFileSync("./input", "utf8").slice(0, -1)

const numbersArr = data.split(`\n`).map(Number)
const length = numbersArr.length

let numOfIncreases = 0

const sumArr = (arr, a, i) =>
  arr.slice(i + a, i + 3 + a).length > 0 &&
  arr.slice(i + a, i + 3 + a).reduce((cur, prev) => cur + prev)

for (let i = 0; i < length; i++)
  if (sumArr(numbersArr, 1, i) > sumArr(numbersArr, 0, i)) numOfIncreases++

console.log(numOfIncreases)

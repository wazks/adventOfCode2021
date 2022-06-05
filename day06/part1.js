"use strict"

const fs = require("fs")
const data = fs.readFileSync("./input", "utf8").slice(0, -1)

const numbersArr = data.split(",").map(num => +num)

const fishStagesArr = new Array(9).fill(0)

numbersArr.forEach(num => fishStagesArr[num]++)

//literally the only thing that differs between the two parts is this variable
let days = 80

for (let i = 0; i < days; i++) {
  let tmp = fishStagesArr[0]
  for (let j = 0; j < 8; j++) {
    fishStagesArr[j] = fishStagesArr[j + 1]
  }
  fishStagesArr[8] = tmp
  fishStagesArr[6] += tmp
}

console.log(fishStagesArr.reduce((a, b) => a + b))

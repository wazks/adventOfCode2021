"use strict"

const fs = require("fs")
const data = fs.readFileSync("./input", "utf8").slice(0, -1)

const numbersArr = data.split(",").map(num => +num)

const max = Math.max(...numbersArr)
const min = Math.min(...numbersArr)

let fuelNeeded = 999999999999

for (let i = min; i < max; i++) {
  let totalFuel = 0
  numbersArr.forEach(number => {
    for (let j = Math.abs(number - i); j !== 0; j--) {
      totalFuel += j
    }
  })
  if (totalFuel < fuelNeeded) fuelNeeded = totalFuel
}

console.log(fuelNeeded)

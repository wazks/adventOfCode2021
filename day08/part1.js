"use strict"

const fs = require("fs")
const data = fs.readFileSync("./input", "utf8").slice(0, -1)

const lines = data.split("\n")

let sumOfUniqueNumbers = 0

for (const line of lines) {
  const output = line.split(" | ")[1].split(" ")

  for (const number of output) {
    if ([2, 3, 4, 7].includes(number.length)) sumOfUniqueNumbers++
  }
}
console.log(sumOfUniqueNumbers)

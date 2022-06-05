"use strict"

const fs = require("fs")
const data = fs.readFileSync("./input", "utf8").slice(0, -1)

const numbersArr = data.split(`\n`)

let depth = 0
let horizontal = 0

numbersArr.forEach(el => {
  const [direction, value] = [...el.split(" ")]

  if (direction === "down") depth += +value
  if (direction === "up") depth -= +value
  if (direction === "forward") horizontal += +value
})

console.log(horizontal * depth)

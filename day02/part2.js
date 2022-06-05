"use strict"

const fs = require("fs")
const data = fs.readFileSync("./input", "utf8").slice(0, -1)

const numbersArr = data.split(`\n`)

let aim = 0
let depth = 0
let horizontal = 0

numbersArr.forEach(el => {
  const [direction, value] = [...el.split(" ")]

  if (direction === "down") aim += +value
  if (direction === "up") aim -= +value
  if (direction === "forward") {
    horizontal += +value
    depth += aim * value
  }
})

console.log(horizontal * depth)

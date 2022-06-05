"use strict"

const fs = require("fs")
const data = fs.readFileSync("./input", "utf8").slice(0, -1)

const numbersArr = data.split("\n")

const zero = new Array(12).fill(0)
const one = new Array(12).fill(0)

numbersArr.forEach(el => {
  el = Array.from(el)
  el.forEach((el, i) => {
    if (el === "1") one[i]++
    if (el === "0") zero[i]++
  })
})

let gamma = ""
let epsilon = ""

for (let i = 0; i < zero.length; i++) {
  if (zero[i] > one[i]) {
    gamma += "0"
    epsilon += "1"
  } else {
    gamma += "1"
    epsilon += "0"
  }
}

const result = parseInt(gamma, 2) * parseInt(epsilon, 2)

console.log(result)

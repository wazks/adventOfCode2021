"use strict"

const fs = require("fs")
const data = fs.readFileSync("./input", "utf8").slice(0, -1)

const numbersArr = data.split("\n")

let zero = new Array(12).fill(0)
let one = new Array(12).fill(0)

let leastCommon = [...numbersArr]
let mostCommon = [...numbersArr]

const filterArr = (arr, bit, i) => {
  if (one[i] >= zero[i]) {
    arr = arr.filter(el => el[i] == bit)
  } else {
    arr = arr.filter(el => el[i] == !bit)
  }

  zero = zero.fill(0)
  one = one.fill(0)

  return arr
}

const findMostCommonBits = (arr, bitToFilter, i) => {
  if (arr.length > 1) {
    arr.forEach(el => {
      el = Array.from(el)
      el.forEach((el, i) => {
        if (el === "1") one[i]++
        if (el === "0") zero[i]++
      })
    })
    return filterArr(arr, bitToFilter, i)
  } else return arr
}

const length = zero.length
for (let i = 0; i < length - 1; i++) {
  leastCommon = findMostCommonBits(leastCommon, 1, i)

  mostCommon = findMostCommonBits(mostCommon, 0, i)
}

const result = parseInt(mostCommon, 2) * parseInt(leastCommon, 2)

console.log(result)

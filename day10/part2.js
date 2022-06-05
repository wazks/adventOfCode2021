"use strict"

const fs = require("fs")
const data = fs.readFileSync("./input", "utf8").slice(0, -1)

const rows = data.split("\n")
let scores = new Array(rows.length).fill(0)

const openingTags = ["(", "[", "{", "<"]
const closingTags = new Map([
  [")", new Map([["openingTag", "("]])],
  ["]", new Map([["openingTag", "["]])],
  ["}", new Map([["openingTag", "{"]])],
  [">", new Map([["openingTag", "<"]])],
])

const findMedian = array =>
  [...array.sort((a, b) => a - b)][Math.floor(array.length / 2)]

let openedTagsArr = []

const doesClosingTagMatch = tag => {
  const lastOpenedTag = openedTagsArr.pop()
  return lastOpenedTag === closingTags.get(tag).get("openingTag")
}

const isOpeningTag = tag => !closingTags.get(tag)

for (const [i, row] of rows.entries()) {
  openedTagsArr = []
  for (const tag of row) {
    if (isOpeningTag(tag)) openedTagsArr.push(tag)
    else if (!doesClosingTagMatch(tag)) {
      openedTagsArr = []
      break
    }
  }

  for (const tag of openedTagsArr.reverse()) {
    scores[i] = scores[i] * 5 + (openingTags.indexOf(tag) + 1)
  }
}
//to remove complete lines
scores = scores.filter(score => score > 0)
console.log(findMedian(scores))

"use strict"

const fs = require("fs")
const data = fs.readFileSync("./input", "utf8").slice(0, -1)

const rows = data.split("\n")
let points = 0

const closingTags = new Map([
  [
    ")",
    new Map([
      ["openingTag", "("],
      ["value", 3],
    ]),
  ],
  [
    "]",
    new Map([
      ["openingTag", "["],
      ["value", 57],
    ]),
  ],
  [
    "}",
    new Map([
      ["openingTag", "{"],
      ["value", 1197],
    ]),
  ],
  [
    ">",
    new Map([
      ["openingTag", "<"],
      ["value", 25137],
    ]),
  ],
])

let openedTagsArr = []

const doesClosingTagMatch = tag => {
  const lastOpenedTag = openedTagsArr.pop()
  return lastOpenedTag === closingTags.get(tag).get("openingTag")
}

const addPoints = tag => (points += closingTags.get(tag).get("value"))
const isOpeningTag = tag => !closingTags.get(tag)

for (const row of rows) {
  openedTagsArr = []
  for (const tag of row) {
    if (isOpeningTag(tag)) openedTagsArr.push(tag)
    else if (!doesClosingTagMatch(tag)) {
      addPoints(tag)
      break
    }
  }
}

console.log(points)

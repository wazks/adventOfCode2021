"use strict"

const input = `A0016C880162017C3686B18A3D4780`

function hex2bin(hex) {
  hex = hex.replace("0x", "").toLowerCase()
  var out = ""
  for (var c of hex) {
    switch (c) {
      case "0":
        out += "0000"
        break
      case "1":
        out += "0001"
        break
      case "2":
        out += "0010"
        break
      case "3":
        out += "0011"
        break
      case "4":
        out += "0100"
        break
      case "5":
        out += "0101"
        break
      case "6":
        out += "0110"
        break
      case "7":
        out += "0111"
        break
      case "8":
        out += "1000"
        break
      case "9":
        out += "1001"
        break
      case "a":
        out += "1010"
        break
      case "b":
        out += "1011"
        break
      case "c":
        out += "1100"
        break
      case "d":
        out += "1101"
        break
      case "e":
        out += "1110"
        break
      case "f":
        out += "1111"
        break
      default:
        return ""
    }
  }

  return out
}

const inputBinary = hex2bin(input)

const versions = []

let curOperation = `version`
let curBit = 0
let numOfGroups = 0
let typeOfSubPackets = undefined
let numOfSubPackets = [1]
let lenOfSubPackets = [null]
let nestingLevel = 0
let packetsLen
let packetsNum

const toDec = string => parseInt(string, 2)
const nextOperation = (bits, operation = "grouping") => {
  curBit += bits
  if (operation) curOperation = operation
}
const nextBits = numOfBits => inputBinary.slice(curBit, curBit + numOfBits)
const skipZeroes = () => 5 + ((6 + numOfGroups * 5) % 4)

const evalVersion = string => {
  nestingLevel++
  versions.push(toDec(string))
  nextOperation(3, "typeID")
}

const evalTypeID = string => {
  if (toDec(string) === 4) {
    nextOperation(3, undefined)
  } else {
    nextOperation(3, "subpacketing")
    numOfSubPackets[nestingLevel] = 0
  }
}

const calcGroup = string => {
  //stop
  if (string[0] === "0") {
    if (packetsLen) lenOfSubPackets[nestingLevel] -= skipZeroes()
    if (packetsNum) numOfSubPackets[nestingLevel]--
    nextOperation(5, "version")
    if ((packetsLen)numOfSubPackets === 0 ) nestingLevel--
    numOfGroups = 0

    //continue
  } else {
    if (packetsLen) lenOfSubPackets[nestingLevel] -= 5
    numOfGroups++
    nextOperation(5)
  }
}

const calcNumOfSubpackets = string => {
  nextOperation(1)
  if (string === "0") {
    lenOfSubPackets[nestingLevel] = toDec(nextBits(15))
    packetsLen = true
    packetsNum = false
    nextOperation(15, "version")
  } else {
    numOfSubPackets[nestingLevel] = toDec(nextBits(11)) - 1
    packetsLen = false
    packetsNum = true
    typeOfSubPackets = "grouping"
    nextOperation(11, "version")
  }
}

const step = () => {
  console.log(curBit, nestingLevel, curOperation)
  switch (curOperation) {
    case "version":
      evalVersion(nextBits(3))
      break
    case "typeID":
      evalTypeID(nextBits(3))
      break
    case "grouping":
      calcGroup(nextBits(5))
      break
    case "exitNesting":
      nestingLevel--
      nextOperation(0, "version")
      break
    case "subpacketing":
      calcNumOfSubpackets(nextBits(1))
      break
  }
  if (curBit > inputBinary.length) nestingLevel = 0
  if (nestingLevel > 0) step()
}

step()

console.log(versions)
console.log(versions.reduce((a, b) => a + b))

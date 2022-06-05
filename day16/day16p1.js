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
let nestingLevel = 0
let intputLen = inputBinary.length
let packetsLen = 0
let lenOfSubPackets = [0]
let numOfSubPackets = [0]
const toDec = string => parseInt(string, 2)
const nextOperation = (bits, operation = "grouping") => {
  curBit += bits
  if (operation) curOperation = operation
}
const nextBits = numOfBits => inputBinary.slice(curBit, curBit + numOfBits)

const evalVersion = string => {
  if (packetsLen) lenOfSubPackets[nestingLevel] -= 3
  versions.push(toDec(string))
  nextOperation(3, "typeID")
}

const evalTypeID = string => {
  if (packetsLen) lenOfSubPackets[nestingLevel] -= 3
  if (toDec(string) === 4) {
    nextOperation(3, undefined)
  } else {
    nextOperation(3, "subpacketing")
  }
}

const calcGroup = string => {
  if (packetsLen) lenOfSubPackets[nestingLevel] -= 5
  if (string[0] === "0") {
    nextOperation(5, "version")
    if (!packetsLen) numOfSubPackets[nestingLevel]--
    if (
      (packetsLen
        ? lenOfSubPackets[nestingLevel]
        : numOfSubPackets[nestingLevel]) === 0
    )
      nestingLevel--
  } else {
    nextOperation(5)
  }
}

const calcNumOfSubpackets = string => {
  nextOperation(1)
  if (string === "0") {
    lenOfSubPackets[nestingLevel + 1] = toDec(nextBits(15))
    nextOperation(15, "version")
    packetsLen = true
  } else {
    numOfSubPackets[nestingLevel + 1] = toDec(nextBits(11))
    nextOperation(11, "version")
    packetsLen = false
  }
  nestingLevel++
}

const step = () => {
  console.log(curBit, nestingLevel, curOperation, numOfSubPackets)
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
    case "subpacketing":
      calcNumOfSubpackets(nextBits(1))
      break
    case "exitNesting":
      nestingLevel--
      break
  }
  //if (intputLen - curBit < 8) curOperation = "exitNesting"
  if (curBit > inputBinary.length) nestingLevel = -1
  if (nestingLevel > -1) step()
}

step()

console.log(versions)
console.log(versions.reduce((a, b) => a + b))

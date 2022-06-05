"use strict"

const input = `820D4A801EE00720190CA005201682A00498014C04BBB01186C040A200EC66006900C44802BA280104021B30070A4016980044C800B84B5F13BFF007081800FE97FDF830401BF4A6E239A009CCE22E53DC9429C170013A8C01E87D102399803F1120B4632004261045183F303E4017DE002F3292CB04DE86E6E7E54100366A5490698023400ABCC59E262CFD31DDD1E8C0228D938872A472E471FC80082950220096E55EF0012882529182D180293139E3AC9A00A080391563B4121007223C4A8B3279B2AA80450DE4B72A9248864EAB1802940095CDE0FA4DAA5E76C4E30EBE18021401B88002170BA0A43000043E27462829318F83B00593225F10267FAEDD2E56B0323005E55EE6830C013B00464592458E52D1DF3F97720110258DAC0161007A084228B0200DC568FB14D40129F33968891005FBC00E7CAEDD25B12E692A7409003B392EA3497716ED2CFF39FC42B8E593CC015B00525754B7DFA67699296DD018802839E35956397449D66997F2013C3803760004262C4288B40008747E8E114672564E5002256F6CC3D7726006125A6593A671A48043DC00A4A6A5B9EAC1F352DCF560A9385BEED29A8311802B37BE635F54F004A5C1A5C1C40279FDD7B7BC4126ED8A4A368994B530833D7A439AA1E9009D4200C4178FF0880010E8431F62C880370F63E44B9D1E200ADAC01091029FC7CB26BD25710052384097004677679159C02D9C9465C7B92CFACD91227F7CD678D12C2A402C24BF37E9DE15A36E8026200F4668AF170401A8BD05A242009692BFC708A4BDCFCC8A4AC3931EAEBB3D314C35900477A0094F36CF354EE0CCC01B985A932D993D87E2017CE5AB6A84C96C265FA750BA4E6A52521C300467033401595D8BCC2818029C00AA4A4FBE6F8CB31CAE7D1CDDAE2E9006FD600AC9ED666A6293FAFF699FC168001FE9DC5BE3B2A6B3EED060`

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
let subPacketsValues = []
let subPacketsOperations = []
let curLiteralString = ""
let kurwa

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
  if (subPacketsOperations[nestingLevel] === "literal") kurwa = true
  else kurwa = false
  if (packetsLen) lenOfSubPackets[nestingLevel] -= 3
  switch (toDec(string)) {
    case 0:
      subPacketsOperations[nestingLevel] = "sum"
      nextOperation(3, "subpacketing")
      break
    case 1:
      subPacketsOperations[nestingLevel] = "product"
      nextOperation(3, "subpacketing")
      break
    case 2:
      subPacketsOperations[nestingLevel] = "minimum"
      nextOperation(3, "subpacketing")
      break
    case 3:
      subPacketsOperations[nestingLevel] = "maximum"
      nextOperation(3, "subpacketing")
      break
    case 4:
      subPacketsOperations[nestingLevel] = "literal"
      nextOperation(3, undefined)
      break
    case 5:
      subPacketsOperations[nestingLevel] = "greaterThan"
      nextOperation(3, "subpacketing")
      break
    case 6:
      subPacketsOperations[nestingLevel] = "lessThan"
      nextOperation(3, "subpacketing")
      break
    case 7:
      subPacketsOperations[nestingLevel] = "equalTo"
      nextOperation(3, "subpacketing")
      break
    default:
      nestingLevel = -5
      break
  }
}

//i ogólnie plan był taki, żeby zrobić to poziomowo, i jak się zrobi jeden poziom to cofnąć go i dodać do poprzedniego arraya i
const evalSubPacket = a => {
  //i was thinking that maybe cofnij kurwa w arrayu żeby nie wystąpiły kolizje
  //działało na test caseach
  console.log(
    curBit,
    nestingLevel,
    subPacketsOperations[nestingLevel],
    subPacketsValues[nestingLevel]
  )
  if (!subPacketsValues[nestingLevel - 1])
    subPacketsValues[nestingLevel - 1] = []
  switch (subPacketsOperations[nestingLevel]) {
    case "sum":
      subPacketsValues[nestingLevel - 1].push(
        subPacketsValues[nestingLevel].reduce((a, b) => a + b)
      )
      subPacketsValues[nestingLevel] = []
      break
    case "product":
      subPacketsValues[nestingLevel - 1].push(
        subPacketsValues[nestingLevel].reduce((a, b) => a * b)
      )
      subPacketsValues[nestingLevel] = []
      break
    case "minimum":
      subPacketsValues[nestingLevel - 1].push(
        Math.min(...subPacketsValues[nestingLevel])
      )
      subPacketsValues[nestingLevel] = []
      break
    case "maximum":
      subPacketsValues[nestingLevel - 1].push(
        Math.max(...subPacketsValues[nestingLevel])
      )
      subPacketsValues[nestingLevel] = []
      break
    case "greaterThan":
      subPacketsValues[nestingLevel - 1].push(
        subPacketsValues[nestingLevel][0] > subPacketsValues[nestingLevel][1]
          ? 1
          : 0
      )

      subPacketsValues[nestingLevel] = []
      break
    case "lessThan":
      subPacketsValues[nestingLevel - 1].push(
        subPacketsValues[nestingLevel][0] < subPacketsValues[nestingLevel][1]
          ? 1
          : 0
      )
      subPacketsValues[nestingLevel] = []
      break

    case "equalTo":
      subPacketsValues[nestingLevel - 1].push(
        subPacketsValues[nestingLevel][0] === subPacketsValues[nestingLevel][1]
          ? 1
          : 0
      )
      subPacketsValues[nestingLevel] = []
      break
    case "literal":
      if (curLiteralString)
        subPacketsValues[nestingLevel - 1].push(toDec(curLiteralString))
      subPacketsValues[nestingLevel] = []
      curLiteralString = ``
      break
  }
  console.log(subPacketsValues[nestingLevel - 1])
}

const calcGroup = string => {
  //dodaj do arraya wartości
  if (!subPacketsValues[nestingLevel]) subPacketsValues[nestingLevel] = []
  if (subPacketsOperations[nestingLevel] !== "literal")
    subPacketsValues[nestingLevel].push(toDec(string.slice(1)))
  else curLiteralString += string.slice(1)

  if (packetsLen) lenOfSubPackets[nestingLevel] -= 5
  if (string[0] === "0") {
    nextOperation(5, "version")
    if (!packetsLen) numOfSubPackets[nestingLevel]--
    if (subPacketsOperations[nestingLevel] === "literal") evalSubPacket()
    else if (
      (packetsLen
        ? lenOfSubPackets[nestingLevel]
        : numOfSubPackets[nestingLevel]) === 0
    ) {
      evalSubPacket()
      nestingLevel--
    }
  } else {
    nextOperation(5)
  }
}

const calcNumOfSubpackets = string => {
  if (kurwa) {
    nestingLevel--
    evalSubPacket(true)
    nestingLevel++
  }
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
      evalSubPacket()
      break
  }
  //if (intputLen - curBit < 8) curOperation = "exitNesting"
  if (curBit > inputBinary.length) curOperation = "exitNesting"
  if (nestingLevel > -1) step()
}

step()

console.log(subPacketsValues)
//it's not fucking 19

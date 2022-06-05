"use strict"

const input = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`

const lines = input.split("\n")
class Node {
  constructor(name, lowerCase) {
    this.name = name
    this.lowerCase = lowerCase
  }
  connections = []
}

const nodes = []

const getNode = name => nodes.find(el => el.name.includes(name))

const findConnections = node => getNode(node).connections

for (const line of lines) {
  const [enter, exit] = line.split("-")

  const checkIfLowerCase = string => string.toLowerCase() === string
  const createNewNode = (node, antinode) => {
    if (!nodes.some(el => el.name.includes(node)))
      nodes.push(new Node(node, checkIfLowerCase(node)))
    findConnections(node).push(antinode)
  }

  createNewNode(enter, exit)
  createNewNode(exit, enter)
}

const paths = []

//for ( const node1 of findConnections( "start" ) ) {
//for (const node of findConnections("start")) {
let curPath = []
const newPath = singleNode => {
  const connections = findConnections(singleNode).filter(el => {
    if (getNode(el).lowerCase) {
      if (!curPath.includes(el)) return el
    } else return el
  })
  if (connections) {
    curPath.push(singleNode)
    paths.push(curPath)
    connections.forEach(el => newPath(el))
  } else {
    console.error(`+++++++++++++++++++++`)
  }
}
newPath("start")
//}

console.log(paths)

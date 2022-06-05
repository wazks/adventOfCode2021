const input = `OKSBBKHFBPVNOBKHBPCO

CB -> P
VH -> S
CF -> P
OV -> B
CH -> N
PB -> F
KF -> O
BC -> K
FB -> F
SN -> F
FV -> B
PN -> K
SF -> V
FN -> F
SS -> K
VP -> F
VB -> B
OS -> N
HP -> O
NF -> S
SK -> H
OO -> S
PF -> C
CC -> P
BP -> F
OB -> C
CS -> N
BV -> F
VV -> B
HO -> F
KN -> P
VC -> K
KK -> N
BO -> V
NH -> O
HC -> S
SB -> F
NN -> V
OF -> V
FK -> S
OP -> S
NS -> C
HV -> O
PC -> C
FO -> H
OH -> F
BF -> S
SO -> O
HB -> P
NK -> H
NV -> C
NB -> B
FF -> B
BH -> C
SV -> B
BK -> K
NO -> C
VN -> P
FC -> B
PH -> V
HH -> C
VO -> O
SP -> P
VK -> N
CP -> H
SC -> C
KV -> H
CO -> C
OK -> V
ON -> C
KS -> S
NP -> O
CK -> C
BS -> F
VS -> B
KH -> O
KC -> C
KB -> N
OC -> F
PP -> S
HK -> H
BN -> S
KO -> K
NC -> B
PK -> K
CV -> H
PO -> O
BB -> C
HS -> F
SH -> K
CN -> S
HN -> S
KP -> O
FP -> H
HF -> F
PS -> B
FH -> K
PV -> O
FS -> N
VF -> V`

//at the start make an array of all pairs
//then every pair creates 2 more pairs and deletes itself

const startString = input.split("\n")[0]
const rules = new Map()
input
  .split("\n")
  .slice(1)
  .forEach(rule => rules.set(rule.split(" -> ")[0], rule.split(" -> ")[1]))

const pairs = new Map()
for (let i = 0; i < startString.length - 1; i++) {
  const curPair = startString.slice(i, i + 2)
  if (!pairs.has(curPair)) pairs.set(curPair, 1)
  else pairs.set(curPair, pairs.get(curPair) + 1)
}
const letters = new Map()
for (let i = 0; i < startString.length; i++) {
  if (!letters.has(startString[i])) letters.set(startString[i], 1)
  else letters.set(startString[i], letters.get(startString[i]) + 1)
}

for (let i = 0; i < 40; i++) {
  for (const [pair, numOfOccurences] of [...pairs]) {
    const newLetter = rules.get(pair)
    const firstLetter = pair.slice(0, 1)
    const secondLetter = pair.slice(1, 2)
    const newPair1 = firstLetter + newLetter
    const newPair2 = newLetter + secondLetter

    const addLetter = () => {
      letters.set(newLetter, letters.get(newLetter) + numOfOccurences)
    }

    const createLetters = () => {
      letters.set(newLetter, numOfOccurences)
    }
    const handleLetterCounters = () => {
      if (!letters.has(newLetter)) createLetters()
      else addLetter()
    }
    const makeNewPair = pair => {
      pairs.set(pair, numOfOccurences)
    }
    const addPair = pair => {
      pairs.set(pair, pairs.get(pair) + numOfOccurences)
    }
    const handlePairCounters = pair => {
      if (!pairs.has(pair)) {
        makeNewPair(pair)
      } else {
        addPair(pair)
      }
    }

    handlePairCounters(newPair1)
    handlePairCounters(newPair2)
    handleLetterCounters()

    pairs.set(pair, pairs.get(pair) - numOfOccurences)
  }
}

const mostCommon = Math.max(...letters.values())
const leastCommon = Math.min(...letters.values())
console.log(mostCommon - leastCommon)

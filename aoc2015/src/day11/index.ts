import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split('')

const validateUniquePairsNonOverlap = (string) => {
  const matches = string.match(/(.)\1/g)

  if (!matches || matches.length < 2) {
    return false
  }

  const pairs = new Set(matches)

  if (pairs.size < 2) {
    return false
  }

  return true
}

const validateThreeCharStraight = (string, log = false) => {
  const split = string.split("")
  let passes = false;
  let results = []
  let chars = []

  for (let i = 0; i < split.length - 1; i++) {
    const cur = split[i].charCodeAt(0)
    const next = split[i + 1].charCodeAt(0)

    let result = (next == cur + 1)

    if (log) {
      console.log({ result, cur, next })
    }

    if (result) {
      results.push(result)
      chars.push([cur, next])
    } else {
      results = []
    }

    if (results.length >= 2) {
      passes = true;
      break;
    }
  }

  if (log) {
    console.log({passes, chars})
  }

  return passes
}

const validateAll = (string) => {
  return [
    // Check for 3-straight match
    validateThreeCharStraight(string),
    // Check unique doubles
    validateUniquePairsNonOverlap(string),
  ].every((el) => el === true)
}


const nextChar = (c) => {
  return String.fromCharCode(c.charCodeAt(0) + 1)
}

const flipLetter = (char) => {
  
  if (char.charCodeAt(0) < 122) {
    char = nextChar(char)
  } else {
    char = "a"
  }

  return char
}

const flipChars = (newPass) => {

  let last = newPass[newPass.length - 1]
  let flip = flipLetter(last)
  newPass.splice(newPass.length - 1, 1, flip)
  
  
  if ((flip == "a")) {
    for (let i=newPass.length - 2; i > 0; i--) {
      let loopFlip = flipLetter(newPass[i])
      newPass.splice(i, 1, loopFlip)

      if (loopFlip !== "a") {
        break;
      }
    }
  }
   

  return newPass
}

const part1 = (rawInput: string) => {
  const input: string[] = parseInput(rawInput)
  let newPass = input

  while (!validateAll(newPass.join(''))) {

    newPass = flipChars(newPass)

    console.log({ newpass: newPass.join("")})
  }

  console.log(validateThreeCharStraight(newPass.join(""), true))
  
  return newPass.join('')
}

const part2 = (rawInput: string) => {
  const firstPass = part1(rawInput).split('')

  let newPass = [];

  while (!validateAll(newPass.join(""))) {
    newPass = flipChars(firstPass)
  }

  console.log()

  return newPass.join('')
}

run({
  part1: {
    tests: [
      {
        input: `abcdefgh`,
        expected: "abcdffaa",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})

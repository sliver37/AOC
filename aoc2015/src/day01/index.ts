import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split('');

const part1 = (rawInput: string) => {
  const input: string[] = parseInput(rawInput)

  return input.reduce((acc, curr) => {
    if (curr.includes("(")) {
      acc++
    } else if (curr.includes(")")) {
      acc--
    }
    return acc
  }, 0)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  let floor = 0
  let basementHit = null;

  for (const [index, currFloor] of input.entries()) {
    if (currFloor.includes("(")) {
      floor++
    } else if (currFloor.includes(")")) {
      floor--
    }
    if (floor < 0) {
      basementHit = (index + 1)
      break
    }
  }

  return basementHit
}

run({
  part1: {
    tests: [
      {
        input: `((())))`,
        expected: -1,
      },
      {
        input: `((()`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `((())))`,
        expected: 7,
      },
      {
        input: `)`,
        expected: 1,
      },
      {
        input: `((((())`,
        expected: null,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})

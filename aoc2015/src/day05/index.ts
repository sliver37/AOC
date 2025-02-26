import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let nice = 0

  input.split("\n").forEach((line) => {
    const testcases = [
      line.match(/[aeiou]/g)?.length >= 3,
      !/(ab|cd|pq|xy)/g.test(line),
      /(.)\1/g.test(line),
    ]

    if (testcases.every((e) => e === true)) {
      nice++
    }
  })

  return nice
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let nice = 0

  input.split("\n").forEach((line) => {
    const testcases = [
      /(..).*?\1/.test(line),
      /(.).\1/.test(line),
    ]

    if (testcases.every((e) => e === true)) {
      nice++
    }
  })

  return nice
}

run({
  part1: {
    tests: [
      {
        input: `aeiouu`,
        expected: 1,
      },
      {
        input: `aeiouxy`,
        expected: 0,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `qjhvhtzxzqqjkmpb`,
        expected: 1,
      },
      {
        input: `uurcxyxytgmygtbstg`,
        expected: 1,
      },
      {
        input: `aaadomkazucvgmaa`,
        expected: 1,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})

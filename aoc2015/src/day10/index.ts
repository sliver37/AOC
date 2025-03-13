import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput

const matchGroups = (str) => {
  return str.match(/(\d)\1?\1?/g)
}

const solve = (input, count) => {
  let groupings = matchGroups(input)
  let result = ""

  for (let i = 0; i < count; i++) {
    result = groupings.reduce((acc, cur) => acc += cur.length + cur[0], "")
    groupings = matchGroups(result)
  }

  return result
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  return solve(input, 40).length;
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  return solve(input, 50).length
}

run({
  part1: {
    tests: [
      {
        input: `1321131112`,
        expected: "11131221133112",
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

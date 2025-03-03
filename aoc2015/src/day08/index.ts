import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const strings = []

  for(const str of input.split("\n")) {
    strings.push({
      raw: String.raw`${str}`.length,
      processed: eval(str).length //lmao winrar
    })
  }

  const total = strings.reduce((acc, curr) => {
    return acc += (curr.raw - curr.processed)
  }, 0)

  return total
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const strings = []

  for (const str of input.split("\n")) {
    strings.push({
      encoded: JSON.stringify(String.raw`${str}`).length,
      unencoded: String.raw`${str}`.length,
    })
  }

  const total = strings.reduce((acc, curr) => {
    return (acc += (curr.encoded - curr.unencoded))
  }, 0)

  return total
}

run({
  part1: {
    tests: [
      {
        input: String.raw`"aaa\"aaa"`,
        expected: 3,
      },
      {
        input: String.raw`"\x27"`,
        expected: 5,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: String.raw`""`,
        expected: 4,
      },
      {
        input: String.raw`"aaa\"aaa"`,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
})

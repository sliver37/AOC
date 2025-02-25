import run from "aocrunner"
import { md5 } from "js-md5"

const parseInput = (rawInput: string) => rawInput

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  let key = input;
  let count = 0;

  while(key.substring(0, 5) !== '00000') {
    key = md5(rawInput + ++count)
  }

  return count
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  let key = input
  let count = 0

  while (key.substring(0, 6) !== "000000") {
    key = md5(rawInput + ++count)
  }

  return count
}

run({
  part1: {
    tests: [
      {
        input: `abcdef`,
        expected: 609043,
      },
      {
        input: `pqrstuv`,
        expected: 1048970
        ,
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

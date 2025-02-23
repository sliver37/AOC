import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split('\n');

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const orderArrays = input.map(str => str.split('x').map(str => +str))
  
  return orderArrays.reduce((acc, curr) => {
    const [l, w, h] = curr;
    let dimensions = (2 * l * w) + (2 * w * h) + (2 * h * l)
    const smallestSide = Math.min((l * w), (w * h), (h * l))
    return (acc += dimensions + smallestSide)
  }, 0)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const arrays = input.map((str) => str.split("x").map((str) => +str))

  return arrays.reduce((acc, curr) => {
    const [l, w, h] = curr
    let ribbonLength = Math.min(l + l + w + w, l + l + h + h, w + w + h + h )
    const bow = l * w * h
    return (acc += ribbonLength + bow)
  }, 0)
}

run({
  part1: {
    tests: [
      {
        input: `2x3x4`,
        expected: 58,
      },
      {
        input: `1x1x10`,
        expected: 43,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `2x3x4`,
        expected: 34,
      },
      {
        input: `1x1x10`,
        expected: 14,
      },
      {
        input: `4x4x20`,
        expected: 336,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})

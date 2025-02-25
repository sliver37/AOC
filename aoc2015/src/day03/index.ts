import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput

const visitHouses = (arr) => {
  const visited = []
  const coords = [0,0]
  
  visited.push(JSON.stringify(coords))

  arr.forEach(char => {
    switch(char) {
      case '^':
        coords[0]++
        break;
      case 'v':
        coords[0]--
        break
      case '>':
        coords[1]++
        break
      case '<':
        coords[1]--
        break
    }
    visited.push(JSON.stringify(coords))
  })

  return visited
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const visited = visitHouses(input.split(''))

  return [...new Set(visited)].length
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const santas = visitHouses(
    input
      .split("")
      .filter((char, index) => index % 2 === 0)
  )
  const robots = visitHouses(
    input
      .split("")
      .filter((char, index) => (index % 2 !== 0))
  )

  return [...new Set([...santas, ...robots])].length
}

run({
  part1: {
    tests: [
      {
        input: `^>v<`,
        expected: 4,
      },
      {
        input: `^v^v^v^v^v`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `^v`,
        expected: 3,
      },
      {
        input: `^>v<`,
        expected: 3,
      },
      {
        input: `^v^v^v^v^v`,
        expected: 11,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})

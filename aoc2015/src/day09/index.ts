import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split('\n')

function permutations(arr) {
  if (arr.length === 1) return [arr]
  const result = []

  for (let i = 0; i < arr.length; i++) {
    // current Item e.g "A"
    const current = arr[i]

    // Remaining e.g [B, C]
    const remaining = arr.slice(0, i).concat(arr.slice(i + 1))

    // Recursive, will return [[B, C], [C, B]]
    const perms = permutations(remaining)

    // For [[B, C], [C, B]]
    for (const perm of perms) {
      // Concat with current [[A, B, C], [A, C, B]]
      result.push([current].concat(perm))
    }
  }

  return result
}

function getDistance(distances, city1, city2) {
  return (
    // Value between 2 cities, either forwards or reverse, doesn't matter
    distances.get(`${city1}-${city2}`) || distances.get(`${city2}-${city1}`) || Infinity
  )
}

function calculateDistances(distances, routes) {
  let total = 0;

  for (let i=0; i < routes.length - 1; i++) {
    total += getDistance(distances, routes[i], routes[i + 1])
  }

  return total
}

function solve(input, type) {
  // Map of all the distances both forwards and back
  const distances = new Map()

  // Unique Array of all Cities
  const cities = new Set()

  input.forEach((line) => {
    const [, city1, city2, dist] = line.match(/([A-Za-z]+) to ([A-Za-z]+) = (\d+)/)

    distances.set(`${city1}-${city2}`, +dist)
    distances.set(`${city2}-${city1}`, +dist) // Not entirely needed...

    // Indescriminately add cities to the array, it will dedupe by default
    cities.add(city1)
    cities.add(city2)
  })

  const cityList = Array.from(cities)

  const all_possible_permutations = permutations(cityList)

  let minDistance = Infinity
  let maxDistance = -Infinity

  for (let route of all_possible_permutations) {
    const dist = calculateDistances(distances, route)
    minDistance = Math.min(minDistance, dist)
    maxDistance = Math.max(maxDistance, dist)
  }

  return type === 'min' ? minDistance : maxDistance
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return solve(input, 'min')
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return solve(input, 'max')
}

run({
  part1: {
    tests: [
      {
        input:
          "London to Dublin = 464 \n London to Belfast = 518 \n Dublin to Belfast = 141",
        expected: 605,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input:
          "London to Dublin = 464 \n London to Belfast = 518 \n Dublin to Belfast = 141",
        expected: 982,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})

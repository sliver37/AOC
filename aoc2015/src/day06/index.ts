import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput

const initGrid = (size) => {
  return Array(size)
    .fill(0)
    .map((col) => Array(size).fill(0))
}

const parseLine = (line) => {
  const matchCoords = line.match(/\d+,\d+/g)
  const coords = {
    x1: matchCoords[0].split(',')[0],
    x2: matchCoords[1].split(',')[0],
    y1: matchCoords[0].split(",")[1],
    y2: matchCoords[1].split(",")[1],
  }
  let type = "";

  if (line.includes('on')) {
    type = 'on'
  } else if (line.includes('off')) {
    type = 'off'
  } else if (line.includes('toggle')) {
    type = 'toggle'
  }

  return { type, coords }
}

const controlLights = (grid, type: string, coords: {x1: number, x2: number, y1: number, y2: number} = {x1: 0, x2: 0, y1: 0, y2: 0}, method: string) => {
  const {x1, x2, y1, y2} = coords

  let xMin = Math.min(x1, x2)
  let xMax = Math.max(x1, x2)
  let yMin = Math.min(y1, y2)
  let yMax= Math.max(y1, y2)

  if (method === 'binary') {
    for (let x = xMin; x <= xMax; x++) {
      for (let y = yMin; y <= yMax; y++) {
        switch(type) {
          case 'on':
            grid[x][y] = 1
            break
          case 'off':
            grid[x][y] = 0
            break
          case 'toggle':
            grid[x][y] = grid[x][y] === 1 ? 0 : 1
            break
        }
      }
    }
  }

  if (method === 'variable') {
    for (let x = xMin; x <= xMax; x++) {
      for (let y = yMin; y <= yMax; y++) {
        switch (type) {
          case "on":
            grid[x][y] += 1
            break
          case "off":
            grid[x][y] = grid[x][y] !== 0 ? grid[x][y] - 1 : 0
            break
          case "toggle":
            grid[x][y] = grid[x][y] += 2
            break
        }
      }
    }
  }

  return grid
}



const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  let grid = initGrid(1000);

  input.split("\n").forEach(line => {
    const {type, coords} = parseLine(line)
    controlLights(grid, type, coords, 'binary')
  })

  return grid.reduce((acc, curr) => {
    const count = curr.filter((el) => el === 1).length
    if (count) {
      acc += +count
    }

    return acc
  }, 0)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  let grid = initGrid(1000)

  input.split("\n").forEach((line) => {
    const { type, coords } = parseLine(line)
    controlLights(grid, type, coords, 'variable')
  })

  return grid.reduce((acc, curr) => {
    const count = curr.reduce((acc, curr) => acc + curr, 0)

    return acc + count
  }, 0)
}

run({
  part1: {
    tests: [
      {
        input: `turn on 499,499 through 500,500`,
        expected: 4,
      },
      {
        input: `
        turn on 499,499 through 500,500
        toggle 499,500 through 500,500
        `,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `turn on 0,0 through 0,0`,
        expected: 1,
      },
      {
        input: `toggle 0,0 through 999,999`,
        expected: 2000000,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
})

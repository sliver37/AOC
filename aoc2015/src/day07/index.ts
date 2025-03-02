import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split("\n").map((line) => line.trim())

const cache = {
  part1: null,
  part2: null
}

function unhinged(input: string) {
  const wires = {}
  const lines = input

  const ops_map = {
    AND: "&",
    OR: "|",
    LSHIFT: "<<",
    RSHIFT: ">>",
    NOT: "~",
  }

  function superItalia(line) {
    let [left, wire] = line.split(" -> ")
    if (/^\d+$/.test(left)) {
      // Direct number assignment as no spaces from the split :)
      wires[wire] = parseInt(left)
      return
    }

    // Replace the uppercase literals using the ops map
    for (let [key, val] of Object.entries(ops_map)) {
      left = left.replace(key, val)
    }

    // Handle NOT specifically (ensure 16-bit unsigned, apparently 0xFFFF does that)
    if (left.includes("~")) {
      left = `(${left} & 0xFFFF)`
    }

    // Replace wire names with their values or leave as-is if undefined
    const expression = left.replace(/\b([a-z]+)\b/g, (match) =>
      match in wires ? wires[match] : match,
    )

    try {
      const result = eval(expression) // EVAL is the thing that made this solution stupid simple
      if (typeof result === "number") {
        wires[wire] = result & 0xffff // Should work here too
      }
    } catch (e) {
      // Skip if variables aren't ready yet
    }
  }

  // Keep evaluating until all wires are resolved
  let unresolved = [...lines]
  let pass = 0;

  while (unresolved.length > 0) {
    pass++
    const stillUnresolved = []

    for (let line of unresolved) {
      if (!(line.split(" -> ")[1] in wires)) {
        superItalia!(line)
        stillUnresolved.push(line)
      } 
    }

    // console.log(`Pass ${pass}`)

    unresolved = stillUnresolved
  }

  return wires["a"] // Return value of wire 'a'
}

const part1 = (rawInput) => {
  const instructions = parseInput(rawInput)
  const result = unhinged(instructions)

  cache["part1"] = result

  return result
}

const part2 = (rawInput) => {
  const instructions = parseInput(rawInput)
  const part1_result = cache?.part1 || part1(rawInput)

  const filtered = instructions.filter((i) => !i.endsWith(" -> b"))
  filtered.splice(3, 0, `${part1_result} -> b`)
  const result = unhinged(filtered)
  return result
}

run({
  part1: {
    tests: [
      {
        input:
          "123 -> x\n456 -> y\nx AND y -> d\nx OR y -> e\nx LSHIFT 2 -> f\ny RSHIFT 2 -> g\nNOT x -> a\nNOT y -> i\n",
        expected: 65412,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [], // I don't even know how to test this one lol
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})

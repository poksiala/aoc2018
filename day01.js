const input = require('./input01')

// part 1
const ans1 = input.reduce((a, b) => a + b)

// part 2
const ans2 = (() => {
    const freqs = new Set([0])
    let i = 0
    let current = 0
    while (true) {
        current += input[i]
        if (freqs.has(current)) {
            return current
        } else {
            freqs.add(current)
        }
        i = (i + 1 < input.length) ? i + 1 : 0
    }
})()

console.log(`Day 01, part 1: ${ans1}, part 2: ${ans2}.`)

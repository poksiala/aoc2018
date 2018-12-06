const fs = require('fs')

const FILENAME = 'input03'
const RE = /#\d*\s@\s(\d*),(\d*):\s(\d*)x(\d*)/
const map = new Map()
let ans1 = 0
let ans2 = null

const range = (start, length) => new Array(length).fill(start).map((v, i) => v + i)

const createKey = (x, y) => `${x}x${y}`

const applySquare = (x, y) => {
    const key = createKey(x, y)
    const value = map[key]
    if (value === undefined) {
        map[key] = 1
    } else if (value === 1) {
        map[key] = 2
        return 1
    }
    return 0
}

const applyRange = (x1, y1, dx, dy) => {
    for (let x of range(x1, dx)) {
        for (let y of range(y1, dy)) {
            ans1 += applySquare(x, y)
        }
    }
}

const checkSquare = (x, y) => {
    const key = createKey(x, y)
    return (map[key] === 1)
}

const checkRange = (x1, y1, dx, dy) => {
    let ans = true
    for (let x of range(x1, dx)) {
        for (let y of range(y1, dy)) {
            if (!checkSquare(x, y)) return false
        }
    }
    return true
}

const parseLine = (line) => RE.exec(line).slice(1, 5).map(Number)

fs.readFile(FILENAME, 'utf8', (err, data) => {
    if (err) throw err
    const lines = data.split('\n')

    lines.forEach(line => {
        const args = parseLine(line)
        applyRange(...args)
    })

    for (let line of lines) {
        const args = parseLine(line)
        if (checkRange(...args)) {
            ans2 = line.split(' ')[0]
        }
    }

    console.log(`Part 1: ${ans1}, Part 2:${ans2}`)
})




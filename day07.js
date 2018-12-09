const fs = require('fs')
const range = require('range').range

const FILENAME = 'input07'
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const WORKERS = 5
const BASETIME = 60

const isSubset = (smaller, bigger) => [...smaller].filter(x => !bigger.has(x)).length === 0

const part1 = lines => {
    // parse requirements
    const requirements = {}
    ALPHABET.split('').forEach(c => requirements[c] = new Set())
    lines.forEach(l => {
        const [req, key] = l.split(' ').filter(w => w.length === 1)
        requirements[key].add(req)
    })

    const completed = new Set()
    let completeOrder = ""

    while (completeOrder.length < ALPHABET.length) {
        const next = ALPHABET
            .split('')
            .filter(c => !completed.has(c))
            .find(c => isSubset(requirements[c], completed))
        completed.add(next)
        completeOrder += next
    }

    return completeOrder
}

const part2 = lines => {
    // parse requirements
    const requirements = {}
    ALPHABET.split('').forEach(c => requirements[c] = new Set())
    lines.forEach(l => {
        const [req, key] = l.split(' ').filter(w => w.length === 1)
        requirements[key].add(req)
    })

    const timers = range(1, ALPHABET.length + 1).map(n => BASETIME + n)
    const completed = new Set()
    const working = new Set()
    let time = 0
    
    while (completed.size < ALPHABET.length) {
        range(0, WORKERS).forEach(_ => {
            const next = ALPHABET
                .split('')
                .filter(c => !(completed.has(c) || working.has(c)))
                .find(c => isSubset(requirements[c], completed))
            if (working.size < WORKERS && next !== undefined) working.add(next)
        })

        ALPHABET.split('').forEach((c, i) => {
            if (working.has(c)) {
                timers[i] -= 1
                if (timers[i] === 0) {
                    working.delete(c)
                    completed.add(c)
                } 
            }
        })
        time += 1
    }
    return time
}

fs.readFile(FILENAME, 'utf8', (err, data) => {
    if (err) throw err
    const lines = data.split('\n')
    console.log(`Part 1: ${part1(lines)}, Part 2: ${part2(lines)}`)
})
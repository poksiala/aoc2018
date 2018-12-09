const fs = require('fs')
const FILENAME = 'input07'
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
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


fs.readFile(FILENAME, 'utf8', (err, data) => {
    if (err) throw err
    const lines = data.split('\n')
    console.log(`Part 1: ${part1(lines)}`)
})
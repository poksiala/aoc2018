const fs = require('fs')
const FILENAME = 'input05'

const compareLetters = (a, b) => (
    (a !== b) &&
    (a.toLowerCase() === b.toLowerCase())
)

// part 1
fs.readFile(FILENAME, 'utf8', (err, data) => {
    const source = data.split('')
    const dest = []
    while (source.length > 0) {
        // loop trough source until all chars are removed or in dest
        const next = source.shift()
        if (dest.length === 0) {
            // if dest is empty
            dest.push(next)
        } else {
            // if dest is not empty
            const previous = dest.pop()
            if (!compareLetters(previous, next)) {
                // if letters are not the same, add both to dest
                dest.push(previous)
                dest.push(next)
            }
        }
    }
    console.log(`Part1: ${dest.length}`)
})

// part 2
fs.readFile(FILENAME, 'utf8', (err, data) => {
    const inner = (data, skipLetter) => {
        const source = data.split('')
        const dest = []
        while (source.length > 0) {
            // loop trough source until all chars are removed or in dest
            const next = source.shift()
            if (next.toLowerCase() === skipLetter.toLowerCase()) {
                // pass ignored letter
            } else if (dest.length === 0) {
                // if dest is empty
                dest.push(next)
            } else {
                // if dest is not empty
                const previous = dest.pop()
                if (!compareLetters(previous, next)) {
                    // if letters are not the same, add both to dest
                    dest.push(previous)
                    dest.push(next)
                }
            }
        }
        return dest.length
    }

    const ans = Math.min(..."abcdefghijklmnopqrstuvwxyz".split('').map(c => inner(data, c)))
    console.log(`part 2: ${ans}`)
})

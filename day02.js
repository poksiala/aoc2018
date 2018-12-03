const input = require('./input02')
const MIN_CHAR_CODE = 97
const MAX_CHAR_CODE = 122

// part 1
let twos = 0
let threes = 0

const getCountArray = (str) => {
    const arr = Array(MAX_CHAR_CODE - MIN_CHAR_CODE + 1).fill(0)
    for (const char of str) {
        arr[char.charCodeAt() - MIN_CHAR_CODE] += 1 
    }
    return arr
}

input.forEach((line) => {
    const arr = getCountArray(line)
    twos += (arr.indexOf(2) !== -1) ? 1 : 0
    threes += (arr.indexOf(3) !== -1) ? 1 : 0
})

const ans1 = twos * threes

// part 2
const strWithoutIndex = (str, index) => str.slice(0, index) + str.slice(index + 1) 

const groupByCharIndex = (list, index) => {
    const arr = Array(MAX_CHAR_CODE - MIN_CHAR_CODE + 1).fill(0).map((_) => [])
    list.forEach((str) => {
        arr[str.charCodeAt(index) - MIN_CHAR_CODE].push(str)
    })
    return arr.filter((l) => (l.length > 1))
}

const reqCompare = (strings, index, skipIndex) => {
    if (strings.length > 1 && index === strings[0].length) {
        // ans found
        return strWithoutIndex(strings[0], skipIndex)
    } else if (strings.length <= 1 || index === strings[0].length) {
        // dead end
        return false 
    } else {
        // recurse
        const groups = groupByCharIndex(strings, index)
        for (const group of groups) {
            const res = reqCompare(group, index + 1, skipIndex)
            if (res) {
                return res
            }
        }
        if (skipIndex === -1) {
            // only one skip is allowed
            return reqCompare(strings, index + 1, index)
        }
    }
}

const ans2 = reqCompare(input, 0, -1)

console.log(`Day 02, part 1: ${ans1}, part 2: ${ans2}.`)

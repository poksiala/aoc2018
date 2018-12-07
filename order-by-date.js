const assert = require('assert')

/* Divide and conquer */
module.exports = (lines, dateParser) => {
    const inner = (lines) => {
        const noOfLines = lines.length
        assert(noOfLines > 0)
        if (lines.length === 1) {
            return lines
        } else {
            const half = noOfLines / 2
            const first = inner(lines.slice(0, half))
            const second = inner(lines.slice(half))
            const ans = []
            while (ans.length < noOfLines) {
                if (first.length === 0) {
                    ans.push(second.shift())
                } else if (second.length === 0) {
                    ans.push(first.shift())
                } else {
                    ans.push(
                        (dateParser(first[0]) < dateParser(second[0])) 
                            ? first.shift() 
                            : second.shift()
                    )
                }
            }
            return ans

        }
    }
    return inner(lines)
}
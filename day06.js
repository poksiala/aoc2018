const fs = require('fs')
const range = require('range').range

const FILENAME = 'input06'
const SIZE = 500
const LIMIT = 10000

const taxiCabDistance = (x1, y1, x2, y2) => {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2)
}

const taxiCabDistanceSum = (x, y, cords) => {
    return cords.map(v => taxiCabDistance(x, y, ...v)).reduce((a, b) => a + b, 0)
}

const getCenter = (cords) => {
    const sums = cords.reduce((acc, v) => {
        acc[0] += v[0]
        acc[1] += v[1]
        return acc
    }, [0, 0])
    return sums.map(v => Math.floor(v/cords.length))
}

const cordsStr = (x, y) => `${x}x${y}`

const part1 = cords => {
    const map = new Map(range(0, cords.length).map(i => [i, 0]))
    const bordering = new Set()

    range(0, SIZE).forEach(x => {
        range(0, SIZE).forEach(y => {
            let bestDistance = 2 * SIZE
            let bestIndex = null
            cords.forEach((v, i) => {
                const d = taxiCabDistance(x, y, ...v)
                if (d < bestDistance) {
                    bestDistance = d
                    bestIndex = i
                } else if (d === bestDistance) {
                    bestIndex = null
                }
            })
            if (bestIndex !== null) {
                map.set(bestIndex, map.get(bestIndex) + 1)
                if (x === 0 || y === 0 || x === SIZE - 1 || y === SIZE - 1) {
                    bordering.add(bestIndex)
                }
            }
        })
    })
    const ans = Math.max(...range(0, cords.length).filter(i => !bordering.has(i)).map(i => map.get(i)))
    return ans
}

const part2 = cords => {
    const visited = new Set()
    let area = 0
    const center = getCenter(cords)
    const visitQueue = [center]

    const inner = (x, y) => {
        const hash = cordsStr(x, y)
        if (visited.has(hash) || taxiCabDistanceSum(x, y, cords) >= LIMIT) {
            return 0
        }
        visited.add(hash)
        range(-1, 2).forEach(dx => {
            range(-1, 2).forEach(dy => {
                if (!visited.has(cordsStr(x + dx, y + dy)))
                    visitQueue.push([x + dx, y + dy])
            })
        })
        return 1
    }

    while (visitQueue.length > 0) {
        area += inner(...visitQueue.shift())
    }

    return area
}

fs.readFile(FILENAME, 'utf8', (err, data) => {
    if (err) throw err
    const cords = data.split('\n').map(line => line.split(', ').map(Number))
    console.log(`Part 1: ${part1(cords)}, Part 2: ${part2(cords)}`)    
})
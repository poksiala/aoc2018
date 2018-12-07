const fs = require('fs')
const assert = require('assert')
const range = require('range').range

const orderByDate = require('./order-by-date')
const FILENAME = 'input4'

const parseDate = (line) => {
    const dateStr = /\[([\d\s-:]*)\].*/.exec(line)[1]
    return new Date(dateStr)
}

const parseGuardId = (line) => {
    const tmp = /[^#]*#(\d*).*/.exec(line)
    return (tmp === null) ? tmp : tmp[1]
}

const isGuardLine = (line) => (parseGuardId(line) !== null)

const isSleepStart = (line) => /falls/.exec(line) !== null

const parseMinute = (line) => {
    const minute = /[^:]*:(\d\d).*/.exec(line)[1]
    return Number(minute)
}

const getGuardTemplate = () => {
    const obj = {}
    range(0, 60).forEach(n => obj[n] = 0)
    return {
        total: 0,
        sleepiestMinute: 0,
        minutes: obj
    }
}

const getGuards = (lines) => {
    const guards = new Map()
    const guardIds = []
    let guard = null
    let startSleepMinute = -1

    for (let line of lines) {
        const minute = parseMinute(line)
        if (isGuardLine(line)) {
            const id = parseGuardId(line)
            guardIds.push(id)
            if (guards[id] === undefined) guards[id] = getGuardTemplate()
            guard = guards[id]
            startSleepMinute = -1
        } else if (isSleepStart(line)) {
            startSleepMinute = minute
        } else {
            assert(startSleepMinute >= 0)
            range(startSleepMinute, minute).forEach(m => {
                guard.total += 1
                guard.minutes[m] += 1
                guard.sleepiestMinute = 
                    (guard.minutes[m] > guard.minutes[guard.sleepiestMinute])
                    ? m : guard.sleepiestMinute
            })
        }
    }
    return [guards, guardIds]
}

const part1 = (guards, Ids) => {
    let mostSleep = -1
    let sleepiestMinute = -1
    let guardId = -1
    Ids.forEach(id => {
        data = guards[id]
        if (data.total > mostSleep) {
            mostSleep = data.total
            guardId = id
            sleepiestMinute = data.sleepiestMinute
        }
    })
    return guardId * sleepiestMinute
}

const part2 = (guards, Ids) => {
    let guardId = -1
    let minute = -1
    let count = -1

    Ids.forEach(id => {
        data = guards[id]
        range(0, 60).forEach(n => {
            if (data.minutes[n] > count) {
                count = data.minutes[n]
                minute = n
                guardId = id
            }
        })
    })

    return guardId * minute
}

fs.readFile(FILENAME, 'utf8', (err, data) => {
    if (err) throw err
    const lines = data.split('\n')
    const orderedLines = orderByDate(lines, parseDate)
    const [guards, guardIds] = getGuards(orderedLines)
    console.log(part1(guards, guardIds))
    console.log(part2(guards, guardIds))
})
const fs = require('fs')
const range = require('range').range
const FILENAME = 'input08'

const generateTree = data => {
    const inner = () => {
        const noOfChilds = data.shift()
        const noOfMetadata = data.shift()
        return {
            childs: [...range(0, noOfChilds).map(_ => inner())],
            metadata: [...range(0, noOfMetadata).map(_ => data.shift())]
        }
    }
    return inner()
}

const part1 = ({metadata, childs}) =>
    metadata
        .reduce((acc, m) => acc + m)   
    + childs
        .map(c => part1(c))
        .reduce((acc, c) => acc + c, 0)

const part2 = ({metadata, childs}) => 
    (childs.length === 0)
        ? metadata.reduce((acc, m) => acc + m)
        : metadata
            .map(i => i - 1)
            .map(i => 
                (i < childs.length) 
                    ? part2(childs[i])
                    : 0
            ).reduce((acc, c) => acc + c, 0)

fs.readFile(FILENAME, 'utf8', (err, data) => {
    if (err) throw err
    const arr = data.split(' ').map(Number)
    const tree = generateTree(arr)
    console.log(part1(tree))
})

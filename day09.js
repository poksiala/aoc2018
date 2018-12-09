/*
  Part 2 requires a lot of memory. run with:
  node --max-old-space-size=4096
*/

const range = require('range').range
const marbleRing = require('./marble-ring')

const calculateHighscore = (noOfPlayers, lastVal) => {
  const scores = new Array(noOfPlayers).fill(0)

  let ring = marbleRing(0, null, null)

  range(ring.value + 1, lastVal).forEach(v => {
    if (v % 23 === 0) {
      ring = ring.rotate(-7)
      scores[v % noOfPlayers] += v + ring.value
      ring = ring.removeCurrent()
    } else {
      ring = ring.rotate(2).insert(v)
    }
  })

  return Math.max(...scores)
}

console.log(
  `Part 1: ${calculateHighscore(439, 71307)}, Part 2: ${calculateHighscore(439, 71307 * 100)}`
)

const range = require('range').range
const marbleRing = require('./marble-ring')

const calculateHighscore = (noOfPlayers, lastVal) => {
  const scores = new Array(noOfPlayers).fill(0)
  const ring = marbleRing().insert(0)

  range(1, lastVal).forEach(v => {
    if (v % 23 === 0) {
      ring.rotate(-7)
      scores[v % noOfPlayers] += v + ring.pop().value
    } else {
      ring.rotate(2).insert(v)
    }
  })

  return Math.max(...scores)
}

console.log(
  `Part 1: ${calculateHighscore(439, 71307)}, Part 2: ${calculateHighscore(439, 71307 * 100)}`
)

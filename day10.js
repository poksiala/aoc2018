/* speed coding for the leaderboards. rank ~500 */

const fs = require('fs')
const range = require('range').range
const FILENAME = 'input10'

fs.readFile(FILENAME, 'utf8', (err, data) => {
  if (err) throw err
  const lines = data.split('\n')
  const points = lines.map(l => l.split('<')[1].split('>')[0].split(', ').map(Number))
  const velocities = lines.map(l => l.split('<')[2].split('>')[0].split(', ').map(Number))
part1(points, velocities)
})

const part1 = (points, velocities) => {
  const maxY = (cords) => cords.reduce((max, c) => c[1] > max ? c[1] : max, -999999999)
  const minY = (cords) => cords.reduce((min, c) => c[1] < min ? c[1] : min, 999999999)
  const maxX = (cords) => cords.reduce((max, c) => c[0] > max ? c[0] : max, -999999999)
  const minX = (cords) => cords.reduce((min, c) => c[0] < min ? c[0] : min, 999999999)

  let seconds = 0
  while (Math.abs(maxY(points) - minY(points) > 9)) {
    seconds += 1
    range(0, points.length).forEach(i => {
      points[i][0] += velocities[i][0]
      points[i][1] += velocities[i][1]
    })
  }

  const x1 = minX(points)
  const x2 = maxX(points)
  const dx = x2 - x1
  const y1 = minY(points)
  const y2 = maxY(points)
  const dy = y2 - y1  
  console.log(x1, x2, y1, y2, dx, dy)
  
  const grid = range(0, dy + 1).map(line => 
    range(0, dx + 1).map(column => '.')  
  )
  console.log(grid)

  points.forEach(cords => {
    const x = cords[0] - x1 
    const y = cords[1] - y1
    console.log(x, y)
    grid[y][x] = '#'
  })

  console.log(grid)

  const lines = grid.map(l => l.reduce((acc, c) => acc+c))
  lines.forEach(l => console.log(l))
  console.log(seconds)
  

}
import { Tile } from 'interface/store/initialData'

// knuth shuffle
// src: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array: Tile[]) {
  let currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}

export default shuffle

import type { Bag, BoardTile, GameState } from 'interface/store/initialData'

export const INIT_BAG: Bag = [
  { letter: 'a', id: 'a1' },
  { letter: 'a', id: 'a2' },
  { letter: 'a', id: 'a3' },
  { letter: 'a', id: 'a4' },
  { letter: 'a', id: 'a5' },
  { letter: 'a', id: 'a6' },
  { letter: 'a', id: 'a7' },
  { letter: 'a', id: 'a8' },
  { letter: 'a', id: 'a9' },
  { letter: 'b', id: 'b1' },
  { letter: 'b', id: 'b2' },
  { letter: 'c', id: 'c1' },
  { letter: 'c', id: 'c2' },
  { letter: 'd', id: 'd1' },
  { letter: 'd', id: 'd2' },
  { letter: 'd', id: 'd3' },
  { letter: 'd', id: 'd4' },
  { letter: 'e', id: 'e1' },
  { letter: 'e', id: 'e2' },
  { letter: 'e', id: 'e3' },
  { letter: 'e', id: 'e4' },
  { letter: 'e', id: 'e5' },
  { letter: 'e', id: 'e6' },
  { letter: 'e', id: 'e7' },
  { letter: 'e', id: 'e8' },
  { letter: 'e', id: 'e9' },
  { letter: 'e', id: 'e10' },
  { letter: 'e', id: 'e11' },
  { letter: 'e', id: 'e12' },
  { letter: 'f', id: 'f1' },
  { letter: 'f', id: 'f2' },
  { letter: 'g', id: 'g1' },
  { letter: 'g', id: 'g2' },
  { letter: 'g', id: 'g3' },
  { letter: 'h', id: 'h1' },
  { letter: 'h', id: 'h2' },
  { letter: 'i', id: 'i1' },
  { letter: 'i', id: 'i2' },
  { letter: 'i', id: 'i3' },
  { letter: 'i', id: 'i4' },
  { letter: 'i', id: 'i5' },
  { letter: 'i', id: 'i6' },
  { letter: 'i', id: 'i7' },
  { letter: 'i', id: 'i8' },
  { letter: 'i', id: 'i9' },
  { letter: 'j', id: 'j1' },
  { letter: 'k', id: 'k1' },
  { letter: 'l', id: 'l1' },
  { letter: 'l', id: 'l2' },
  { letter: 'l', id: 'l3' },
  { letter: 'l', id: 'l4' },
  { letter: 'm', id: 'm1' },
  { letter: 'm', id: 'm2' },
  { letter: 'n', id: 'n1' },
  { letter: 'n', id: 'n2' },
  { letter: 'n', id: 'n3' },
  { letter: 'n', id: 'n4' },
  { letter: 'n', id: 'n5' },
  { letter: 'n', id: 'n6' },
  { letter: 'o', id: 'o1' },
  { letter: 'o', id: 'o2' },
  { letter: 'o', id: 'o3' },
  { letter: 'o', id: 'o4' },
  { letter: 'o', id: 'o5' },
  { letter: 'o', id: 'o6' },
  { letter: 'o', id: 'o7' },
  { letter: 'o', id: 'o8' },
  { letter: 'p', id: 'p1' },
  { letter: 'p', id: 'p2' },
  { letter: 'q', id: 'q1' },
  { letter: 'r', id: 'r1' },
  { letter: 'r', id: 'r2' },
  { letter: 'r', id: 'r3' },
  { letter: 'r', id: 'r4' },
  { letter: 'r', id: 'r5' },
  { letter: 'r', id: 'r6' },
  { letter: 's', id: 's1' },
  { letter: 's', id: 's2' },
  { letter: 's', id: 's3' },
  { letter: 's', id: 's4' },
  { letter: 't', id: 't1' },
  { letter: 't', id: 't2' },
  { letter: 't', id: 't3' },
  { letter: 't', id: 't4' },
  { letter: 't', id: 't5' },
  { letter: 't', id: 't6' },
  { letter: 'u', id: 'u1' },
  { letter: 'u', id: 'u2' },
  { letter: 'u', id: 'u3' },
  { letter: 'u', id: 'u4' },
  { letter: 'v', id: 'v1' },
  { letter: 'v', id: 'v2' },
  { letter: 'w', id: 'w1' },
  { letter: 'w', id: 'w2' },
  { letter: 'x', id: 'x1' },
  { letter: 'y', id: 'y1' },
  { letter: 'y', id: 'y2' },
  { letter: 'z', id: 'z1' },
  { letter: '*', id: '*1' },
  { letter: '*', id: '*2' },
]

export const NULL_TILE: BoardTile = {
  letter: null,
  id: null,
  fixed: true,
}

const stateString = localStorage.getItem('game')
const parsedState = stateString && JSON.parse(stateString)

export function getInitialState() {
  const state: GameState = {
    board: new Array(225).fill(NULL_TILE),
    rack: [],
    bag: [...INIT_BAG],
  }

  for (let i = 0; i < 7; i++) {
    const len = state.bag.length
    const randIndex = Math.floor(Math.random() * len) //[0, len)
    //remove from bag
    const [removedLetter] = state.bag.splice(randIndex, 1)
    state.rack.push(removedLetter)
  }

  return state
}

export const gameState: GameState = parsedState || getInitialState()

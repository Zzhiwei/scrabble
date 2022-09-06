export interface TilePlacedPayload {
  index: number
  id: string
  letter: string
}

export interface TileRetractedToRackPayload {
  letter: string
  draggableId: string
  index: number
  squareIndex: number
}

export interface RemovedFromRackPayload {
  draggableId: string
}

export interface RackRearrangedPayload {
  sourceIndex: number
  destinationIndex: number
}

export interface TileMovedOnBoardPayload {
  sourceIndex: number
  destinationIndex: number
}

export interface TilesSwappedPayload {
  selected: string[]
}

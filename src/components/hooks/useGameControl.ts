import { Howl } from 'howler'
import { useEffect, useState } from 'react'
import { DraggableLocation, DropResult } from 'react-beautiful-dnd'

import { useAppDispatch, useAppSelector } from 'store/hook'

import {
  gameReset,
  moveConfirmed,
  rackRearranged,
  removedFromRack,
  retractAll,
  returnTilesToBag,
  tileDrawn,
  tileMovedOnBoard,
  tilePlaced,
  tileRetractedToRack,
  tilesShuffled,
} from 'store/game/slice'

const useGameControl = () => {
  const dispatch = useAppDispatch()
  const [isSwapping, setIsSwapping] = useState(false)
  const [selectedTiles, setSelectedTiles] = useState<string[]>([])
  const gameState = useAppSelector((state) => state.game)
  const boardState = gameState.board
  const numTilesLeft = gameState.rack.length

  useEffect(() => {
    localStorage.setItem('game', JSON.stringify(gameState))
  }, [gameState])

  const onRetractAll = () => {
    retractSound.play()
    dispatch(retractAll())
  }

  const onShuffle = () => {
    dispatch(tilesShuffled())
  }

  const onConfirmPlacement = () => {
    const numToDraw = 7 - numTilesLeft
    confirmSound.play()
    dispatch(moveConfirmed())
    for (let i = 0; i < numToDraw; i++) {
      dispatch(tileDrawn())
    }
  }

  const onReset = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure you want to reset the board?')) {
      restartSound.play()
      dispatch(gameReset())
    }
  }

  const onClickSwap = () => {
    if (numTilesLeft !== 0) {
      setIsSwapping(true)
    }
  }

  const onConfirmSwap = () => {
    shakeSound.play()
    dispatch(
      returnTilesToBag({
        selected: selectedTiles,
      })
    )
    for (let i = 0; i < selectedTiles.length; i++) {
      dispatch(tileDrawn())
    }
    setSelectedTiles([])
    setIsSwapping(false)
  }

  const dispatchMove = (destination: DraggableLocation, result: DropResult) => {
    if (destination.droppableId === 'rack') {
      // 1)move from board to rack
      if (result.source.droppableId !== 'rack') {
        return dispatch(
          tileRetractedToRack({
            letter: result.draggableId[0],
            draggableId: result.draggableId,
            index: destination.index,
            squareIndex: Number(result.source.droppableId),
          })
        )
      }

      // 2)move from rack to rack
      return dispatch(
        rackRearranged({
          sourceIndex: result.source.index,
          destinationIndex: destination.index,
        })
      )
    }

    if (result.source.droppableId !== 'rack') {
      // 3)move from board to board
      return dispatch(
        tileMovedOnBoard({
          sourceIndex: Number(result.source.droppableId),
          destinationIndex: Number(destination.droppableId),
        })
      )
    }

    // 4)move from rack to board
    dispatch(
      tilePlaced({
        index: Number(destination.droppableId),
        id: result.draggableId,
        letter: result.draggableId[0],
      })
    )

    dispatch(
      removedFromRack({
        draggableId: result.draggableId,
      })
    )
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }
    dispatchMove(result.destination, result)
    if (result.destination.droppableId !== 'rack') {
      placeTileSound.play()
    }
  }

  return {
    onDragEnd,
    boardState,
    isSwapping,
    setSelectedTiles,
    selectedTiles,
    onConfirmSwap,
    onRetractAll,
    onConfirmPlacement,
    setIsSwapping,
    onShuffle,
    onReset,
    onClickSwap,
  }
}

const placeTileSound = new Howl({
  src: ['/sound/placeTile2.mp3'],
})

const retractSound = new Howl({
  src: ['/sound/retract.mp3'],
})

const confirmSound = new Howl({
  src: ['/sound/confirm.mp3'],
})

const shakeSound = new Howl({
  src: ['/sound/swapTiles.mp3'],
})

const restartSound = new Howl({
  src: ['/sound/restart.mp3'],
})

export default useGameControl

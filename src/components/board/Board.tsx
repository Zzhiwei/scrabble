import {
  DragDropContext,
  DraggableLocation,
  DropResult,
} from "react-beautiful-dnd";
import { Howl, Howler } from "howler";

import Square from "components/Square/Square";
import styles from "components/board/Board.module.css";
import Rack from "components/Rack/Rack";
import { useAppDispatch, useAppSelector } from "store/hook";
import {
  rackRearranged,
  removedFromRack,
  tilePlaced,
  tileRetractedToRack,
  tileMovedOnBoard,
  moveConfirmed,
  tileDrawn,
  retractAll,
  returnTilesToBag,
} from "store/game/slice";
import { useState } from "react";
import SwapRack from "components/Rack/SwapRack";

const Board = () => {
  const dispatch = useAppDispatch();
  const [isSwapping, setIsSwapping] = useState(false);
  const [selectedTiles, setSelectedTiles] = useState<string[]>([]);
  const boardState = useAppSelector((state) => state.game.board);
  const numTilesLeft = useAppSelector((state) => state.game.rack.length);

  const onRetractAll = () => {
    retractSound.play();
    dispatch(retractAll());
  };

  const onConfirmPlacement = () => {
    const numToDraw = 7 - numTilesLeft;
    dispatch(moveConfirmed());
    for (let i = 0; i < numToDraw; i++) {
      dispatch(tileDrawn());
    }
  };

  const onConfirmSwap = () => {
    dispatch(
      returnTilesToBag({
        selected: selectedTiles,
      })
    );
    for (let i = 0; i < selectedTiles.length; i++) {
      dispatch(tileDrawn());
    }
    setSelectedTiles([]);
    setIsSwapping(false);
  };

  const dispatchMove = (destination: DraggableLocation, result: DropResult) => {
    if (destination.droppableId === "rack") {
      // 1)move from board to rack
      if (result.source.droppableId !== "rack") {
        return dispatch(
          tileRetractedToRack({
            letter: result.draggableId[0],
            draggableId: result.draggableId,
            index: destination.index,
            squareIndex: Number(result.source.droppableId),
          })
        );
      }

      // 2)move from rack to rack
      return dispatch(
        rackRearranged({
          sourceIndex: result.source.index,
          destinationIndex: destination.index,
        })
      );
    }

    if (result.source.droppableId !== "rack") {
      // 3)move from board to board
      return dispatch(
        tileMovedOnBoard({
          sourceIndex: Number(result.source.droppableId),
          destinationIndex: Number(destination.droppableId),
        })
      );
    }

    // 4)move from rack to board
    dispatch(
      tilePlaced({
        index: Number(destination.droppableId),
        id: result.draggableId,
        letter: result.draggableId[0],
      })
    );

    dispatch(
      removedFromRack({
        draggableId: result.draggableId,
      })
    );
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    dispatchMove(result.destination, result);
    if (result.destination.droppableId !== "rack") {
      placeTileSound.play();
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.outer_container}>
        <div className={styles.horizontal_label_container}>
          {horizontalLabels}
        </div>
        <div className={styles.flexWrapper}>
          <div className={styles.vertical_label_container}>
            {verticalLabels}
          </div>
          <div className={styles.Board_container}>
            {boardState.map((tile, index) => {
              return <Square key={index} index={index} tile={tile} />;
            })}
          </div>
        </div>
      </div>
      <div className={styles.rackWrapper}>
        {isSwapping ? (
          <>
            <SwapRack
              setSelectedTiles={setSelectedTiles}
              selectedTiles={selectedTiles}
            />
            <button onClick={onConfirmSwap} className={styles.button}>
              Confirm Swap
            </button>
          </>
        ) : (
          <>
            <Rack />
            <div className={styles.tooltipWrapper}>
              <button onClick={onRetractAll} className={styles.button}>
                RETRACT
              </button>
              <div className={styles.tooltip}>
                retracts all unconfirmed tiles
              </div>
            </div>
            <div className={styles.tooltipWrapper}>
              <button onClick={onConfirmPlacement} className={styles.button}>
                PLACE TILES
              </button>
              <div className={styles.tooltip}>
                fix tiles on the board, automatically draw new tiles
              </div>
            </div>
            <div className={styles.tooltipWrapper}>
              <button
                onClick={() => setIsSwapping(true)}
                className={styles.button}
              >
                SWAP TILES
              </button>
              <div className={styles.tooltip}>swap selected tiles</div>
            </div>
          </>
        )}
      </div>
    </DragDropContext>
  );
};

const verticalLabels = new Array(15).fill(1).map((x, index) => {
  return (
    <div key={index} className={styles.vertical_label}>
      {index + 1}
    </div>
  );
});

const horizontalLabels = new Array(15).fill(1).map((x, index) => {
  return (
    <div key={index} className={styles.horizontal_label}>
      {String.fromCharCode(index + 65)}
    </div>
  );
});

const placeTileSound = new Howl({
  src: ["/sound/placeTile2.mp3"],
});

const retractSound = new Howl({
  src: ["/sound/retract.mp3"],
});

export default Board;

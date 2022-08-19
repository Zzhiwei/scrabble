import Square from "components/Square/Square";
import styles from "components/board/Board.module.css";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
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
} from "store/game/slice";

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

// board doesn't make use of index in 'source' and 'destination' property

const Board = () => {
  const dispatch = useAppDispatch();
  const boardState = useAppSelector((state) => state.game.board);
  const numTilesLeft = useAppSelector((state) => state.game.rack.length);

  const onConfirm = () => {
    const numToDraw = 7 - numTilesLeft;
    dispatch(moveConfirmed());
    for (let i = 0; i < numToDraw; i++) {
      dispatch(tileDrawn());
    }
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const destination = result.destination!;
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
          destinationIndex: Number(result.destination.droppableId),
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

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.outer_container}>
          <div className={styles.horizontal_label_container}>
            {horizontalLabels}
          </div>
          <div style={{ display: "flex" }}>
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

        <Rack />
      </DragDropContext>
      <button onClick={onConfirm}>Confirm Moves</button>
    </>
  );
};

export default Board;

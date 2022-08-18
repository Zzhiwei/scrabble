import { useState } from "react";
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
  const [error, setError] = useState("");

  const onConfirm = () => {
    // for now we will accept any words

    // change placed tiles on board to be fixed
    dispatch(moveConfirmed());

    setError("Invalid Move!");

    //if invalid, show error msg
    //if valid, lock all placed tiles
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
          {/* <button onClick={() => setState(!state)}>click</button> */}
          <form>{/* <input type="text" value={}></> */}</form>
        </div>

        <Rack />
      </DragDropContext>
      <button onClick={onConfirm}>Confirm Moves</button>
      <div></div>
    </>
  );
};

export default Board;

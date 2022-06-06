import React from "react";
import Square from "./Square";
import styles from "./css/Board.module.css";
import { DragDropContext } from "react-beautiful-dnd";
import Rack from "./Rack";
import { useSelector, useDispatch } from "react-redux";
import {
  rackRearranged,
  removedFromRack,
  tilePlaced,
  tileRetractedToRack,
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
    <div key={index} className={styles.vertical_label}>
      {index + 1}
    </div>
  );
});

const Board = () => {
  const dispatch = useDispatch();
  const boardState = useSelector((state) => state.game.board);

  const onDragEnd = (result) => {
    console.log(result);
    if (result.destination.droppableId === "rack") {
      if (result.source.droppableId !== "rack") {
        return dispatch(
          tileRetractedToRack({
            letter: result.draggableId[0],
            draggableId: result.draggableId,
            index: result.destination.index,
            squareIndex: result.source.droppableId,
          })
        );
      }

      // move from rack to rack
      return dispatch(
        rackRearranged({
          sourceIndex: result.source.index,
          destinationIndex: result.destination.index,
        })
      );
    }

    // place tile on board
    dispatch(
      tilePlaced({
        index: Number(result.destination.droppableId),
        id: result.draggableId,
        letter: result.draggableId[0],
      })
    );

    // remove from rack
    dispatch(
      removedFromRack({
        draggableId: result.draggableId,
      })
    );

    //remove tile from rack
  };

  return (
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

      <Rack></Rack>
    </DragDropContext>
  );
};

export default Board;

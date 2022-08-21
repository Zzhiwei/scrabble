import { DragDropContext } from "react-beautiful-dnd";

import Square from "components/Square/Square";
import styles from "components/board/Board.module.css";
import Rack from "components/Rack/Rack";

import SwapRack from "components/Rack/SwapRack";
import useGameControl from "components/hooks/useGameControl";

const Board = () => {
  const {
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
  } = useGameControl();

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
            <div className={styles.buttonPanel}>
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
                <button onClick={onClickSwap} className={styles.button}>
                  SWAP TILES
                </button>
                <div className={styles.tooltip}>swap selected tiles</div>
              </div>
              <button onClick={onShuffle} className={styles.button}>
                SHUFFLE
              </button>
              <button onClick={onReset} className={styles.button}>
                RESET
              </button>
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

export default Board;

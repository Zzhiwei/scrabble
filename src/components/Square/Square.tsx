import { SquareProps } from "interface/components/Square";

import { Droppable } from "react-beautiful-dnd";

import styles from "components/Square/Square.module.css";
import Tile from "components/Tile/Tile";
import { layout } from "constant/layout";
import { multiplierMap } from "constant/multiplier";

const Square = ({ tile, index }: SquareProps) => {
  const multipler = layout[index.toString()];

  return (
    <Droppable
      droppableId={index.toString()}
      isDropDisabled={Boolean(tile.letter)}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`${styles.Square} ${
            snapshot.isDraggingOver ? styles.highlight : ""
          } ${styles[multipler]}`}
        >
          <div className={styles.multiplierText}>
            {multiplierMap[multipler]}
          </div>
          {tile.letter && tile.id && (
            <Tile
              letter={tile.letter}
              id={tile.id}
              index={0}
              isDragDisabled={tile.fixed}
            />
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Square;

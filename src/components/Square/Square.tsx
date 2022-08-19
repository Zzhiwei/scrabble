import styles from "components/Square/Square.module.css";
import { Droppable } from "react-beautiful-dnd";
import Tile from "components/Tile/Tile";
import { SquareProps } from "interface/components/Square";
import { layout } from "constant/layout";
import { multiplierMap } from "constant/multiplier";

export default function Square({ tile, index }: SquareProps) {
  const hasTile = Boolean(tile.letter);
  const multipler = layout[index.toString()];

  return (
    <Droppable droppableId={index.toString()} isDropDisabled={hasTile}>
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
          {hasTile && (
            <Tile
              letter={tile.letter !== "*" ? tile.letter! : ""}
              id={tile.id!}
              index={0}
              isDragDisabled={tile.fixed}
            />
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

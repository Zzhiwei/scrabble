import styles from "components/Square/Square.module.css";
import { Droppable } from "react-beautiful-dnd";
import Tile from "components/Tile/Tile";
import { SquareProps } from "interface/components/Square";
import { layout } from "constant/layout";

export default function Square({ tile, index }: SquareProps) {
  const hasTile = Boolean(tile.letter);
  console.log(layout[index.toString()]);
  const multipler = layout[index.toString()];

  const multiplerMap: Record<string, string> = {
    tw: "triple word",
    dw: "double word",
    tl: "triple letter",
    dl: "double letter",
  };

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
          <div className={styles.multiplierText}>{multiplerMap[multipler]}</div>
          {hasTile && (
            <Tile
              letter={tile.letter!}
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

import styles from "./css/square.module.css";
import { Droppable } from "react-beautiful-dnd";
import Tile from "components/Tile/Tile";

export default function Square({ tile, index }) {
  const hasTile = Boolean(tile.letter);

  return (
    <Droppable droppableId={index.toString()} isDropDisabled={hasTile}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`${styles.Square} ${
            snapshot.isDraggingOver ? styles.highlight : ""
          }`}
        >
          {hasTile && <Tile letter={tile.letter} id={tile.id} index={0} />}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

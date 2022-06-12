import { Draggable } from "react-beautiful-dnd";
import styles from "components/Tile/Tile.module.css";
import { Tileprops } from "interface/components/Tile";

export default function Tile({ letter, index, id }: Tileprops) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={styles.tile}
        >
          <div className={styles.letter}>{letter}</div>
        </div>
      )}
    </Draggable>
  );
}

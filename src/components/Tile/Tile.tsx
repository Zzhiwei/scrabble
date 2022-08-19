import { Draggable } from "react-beautiful-dnd";
import styles from "components/Tile/Tile.module.css";
import { Tileprops } from "interface/components/Tile";
import { score } from "constant/score";

export default function Tile({ letter, index, id, isDragDisabled }: Tileprops) {
  return (
    <Draggable draggableId={id} index={index} isDragDisabled={isDragDisabled}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={styles.tile}
        >
          <div className={styles.letter}>{letter !== "*" && letter}</div>
          <span className={styles.score}>
            {letter !== "*" && score[letter]}
          </span>
        </div>
      )}
    </Draggable>
  );
}

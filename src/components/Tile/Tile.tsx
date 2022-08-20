import { Draggable } from "react-beautiful-dnd";

import styles from "components/Tile/Tile.module.css";
import { Tileprops } from "interface/components/Tile";
import { score } from "constant/score";

const Tile = ({ letter, index, id, isDragDisabled, unSelected }: Tileprops) => {
  return (
    <Draggable draggableId={id} index={index} isDragDisabled={isDragDisabled}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`${styles.tile} ${unSelected && styles.unSelected}`}
        >
          <div className={styles.letter}>{letter !== "*" && letter}</div>
          <span className={styles.score}>
            {letter !== "*" && score[letter]}
          </span>
        </div>
      )}
    </Draggable>
  );
};

export default Tile;

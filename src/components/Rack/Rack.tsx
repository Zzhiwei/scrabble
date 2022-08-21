import { Droppable } from "react-beautiful-dnd";

import styles from "components/Rack/Rack.module.css";
import Tile from "components/Tile/Tile";
import { useAppSelector } from "store/hook";

export default function Rack() {
  const rack = useAppSelector((state) => state.game.rack);

  return (
    <div className={styles.rackWrapper}>
      <Droppable droppableId="rack" direction="horizontal">
        {(provided) => {
          return (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={styles.Rack}
            >
              {rack.map((tile, index) => (
                <Tile
                  key={tile.id}
                  letter={tile.letter}
                  index={index}
                  id={tile.id}
                  isDragDisabled={false}
                />
              ))}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
}

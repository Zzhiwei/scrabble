import { useEffect } from "react";
import { Droppable } from "react-beautiful-dnd";

import styles from "components/Rack/Rack.module.css";
import Tile from "components/Tile/Tile";
import { tileDrawn } from "store/game/slice";
import { useAppDispatch, useAppSelector } from "store/hook";

let initialized = false;

export default function Rack() {
  const rack = useAppSelector((state) => state.game.rack);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (initialized) {
      return;
    }

    for (let i = 0; i < 7; i++) {
      dispatch(tileDrawn());
    }

    initialized = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

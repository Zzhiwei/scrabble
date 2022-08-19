import { Key, useRef } from "react";
import { useEffect } from "react";
import { Droppable } from "react-beautiful-dnd";
import { clearRack, tileDrawn } from "store/game/slice";
import styles from "components/Rack/Rack.module.css";
import { useAppDispatch, useAppSelector } from "store/hook";
import { Tile as TileType } from "interface/store/initialData";
import Tile from "components/Tile/Tile";

export default function Rack() {
  const rack = useAppSelector((state) => state.game.rack);
  const dispatch = useAppDispatch();

  const executedRef = useRef(false);
  // solves a problem with rack tiles not rendering properly after change
  const tempKey = useRef(0);
  tempKey.current++;

  useEffect(() => {
    if (executedRef.current) {
      return;
    }

    for (let i = 0; i < 7; i++) {
      dispatch(tileDrawn());
    }

    executedRef.current = true;
  }, []);

  return (
    <div className={styles.rackWrapper}>
      <Droppable droppableId="rack" direction="horizontal">
        {(provided, snapshot) => {
          return (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={styles.Rack}
            >
              <TilesInRack rack={rack} key={tempKey.current} />
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
}

const TilesInRack = ({ rack }: TilesInRackProps): JSX.Element => {
  return (
    <>
      {rack.map((tile, index) => {
        return (
          <Tile
            key={index}
            letter={tile.letter}
            index={index}
            id={tile.id}
            isDragDisabled={false}
          />
        );
      })}
    </>
  );
};

interface TilesInRackProps {
  rack: TileType[];
}

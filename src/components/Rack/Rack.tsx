import { useRef } from "react";
import { useEffect } from "react";
import { Droppable } from "react-beautiful-dnd";
import { tilesDrawn } from "store/game/slice";
import styles from "./css/Rack.module.css";
import Tile from "components/Tile/Tile";
import { useAppDispatch, useAppSelector } from "store/hook";

export default function Rack() {
  const rack = useAppSelector((state) => state.game.rack);
  const dispatch = useAppDispatch();

  // solves a problem with rack tiles not rendering properly after change
  const tempKey = useRef(0);
  tempKey.current++;

  useEffect(() => {
    for (let i = 0; i < 7; i++) {
      dispatch(tilesDrawn());
    }
  }, []);

  return (
    <Droppable droppableId="rack" direction="horizontal">
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={styles.Rack}
          >
            {/* <TilesInRack rack={rack} /> */}
            <TilesInRack key={tempKey.current} rack={rack} />
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
}

const TilesInRack = ({ rack }) => {
  return rack.map((tile, index) => {
    return <Tile key={index} letter={tile.letter} index={index} id={tile.id} />;
  });
};

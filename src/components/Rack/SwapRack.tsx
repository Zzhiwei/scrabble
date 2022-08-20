import { Droppable } from "react-beautiful-dnd";

import styles from "components/Rack/Rack.module.css";
import Tile from "components/Tile/Tile";
import { useAppSelector } from "store/hook";

const SwapRack = ({ setSelectedTiles, selectedTiles }: SwapRackProps) => {
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
                <div
                  onClick={() =>
                    setSelectedTiles((state) => {
                      if (state.includes(tile.id)) {
                        return state.filter((id) => tile.id !== id);
                      }
                      return [...state, tile.id];
                    })
                  }
                  className={styles.cursorPointer}
                >
                  <Tile
                    key={tile.id}
                    letter={tile.letter}
                    index={index}
                    id={tile.id}
                    isDragDisabled={true}
                    //   falsy -> normal color
                    unSelected={!selectedTiles.includes(tile.id)}
                  />
                </div>
              ))}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
};

interface SwapRackProps {
  setSelectedTiles: React.Dispatch<React.SetStateAction<string[]>>;
  selectedTiles: string[];
}

export default SwapRack;

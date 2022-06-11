import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import {
  RackRearrangedPayload,
  RemovedFromRackPayload,
  TilePlacedPayload,
  TileRetractedToRackPayload,
} from "interface/store/game";
import { initialState } from "store/game/initialData";

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    tilePlaced(state, action: PayloadAction<TilePlacedPayload>) {
      state.board[action.payload.index] = {
        letter: action.payload.letter,
        id: action.payload.id,
      };
    },
    tileRetractedToRack(
      state,
      action: PayloadAction<TileRetractedToRackPayload>
    ) {
      state.rack.splice(action.payload.index, 0, {
        letter: action.payload.letter,
        id: action.payload.draggableId,
      });

      //remove tile from squre
      state.board.splice(action.payload.squareIndex, 1, {
        letter: null,
        id: null,
      });
    },
    tilesDrawn(state) {
      const len = state.bag.length;
      const randIndex = Math.floor(Math.random() * len); //[0, len)
      //remove from bag
      const [removedLetter] = state.bag.splice(randIndex, 1);
      state.rack.push(removedLetter);
    },
    removedFromRack(state, action: PayloadAction<RemovedFromRackPayload>) {
      state.rack = state.rack.filter(
        (tile) => tile.id !== action.payload.draggableId
      );
    },
    rackRearranged(state, action: PayloadAction<RackRearrangedPayload>) {
      const { sourceIndex, destinationIndex } = action.payload;
      const [removedLetter] = state.rack.splice(sourceIndex, 1);
      state.rack.splice(destinationIndex, 0, removedLetter);
    },
  },
});

export const {
  tilePlaced,
  tilesDrawn,
  removedFromRack,
  rackRearranged,
  tileRetractedToRack,
} = gameSlice.actions;

export default gameSlice.reducer;

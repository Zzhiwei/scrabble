import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  RackRearrangedPayload,
  RemovedFromRackPayload,
  TileMovedOnBoardPayload,
  TilePlacedPayload,
  TileRetractedToRackPayload,
} from "interface/store/game";
import { initialState, NULL_TILE } from "store/game/initialData";

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    tilePlaced(state, action: PayloadAction<TilePlacedPayload>) {
      state.board[action.payload.index] = {
        letter: action.payload.letter,
        id: action.payload.id,
        fixed: false,
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
      state.board.splice(action.payload.squareIndex, 1, NULL_TILE);
    },
    tileDrawn(state) {
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
    clearRack(state) {
      state.rack = [];
    },
    tileMovedOnBoard(state, action: PayloadAction<TileMovedOnBoardPayload>) {
      const { sourceIndex, destinationIndex } = action.payload;
      const oldTile = state.board[sourceIndex];
      state.board[sourceIndex] = NULL_TILE;

      state.board[destinationIndex] = oldTile;
    },
    moveConfirmed(state) {
      state.board = state.board.map((tile) => {
        //NULL_TILE is true
        if (!tile.fixed) {
          return {
            ...tile,
            fixed: true,
          };
        }
        return tile;
      });
    },
  },
});

export const {
  tilePlaced,
  tileDrawn,
  removedFromRack,
  rackRearranged,
  tileRetractedToRack,
  clearRack,
  tileMovedOnBoard,
  moveConfirmed,
} = gameSlice.actions;

export default gameSlice.reducer;

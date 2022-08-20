import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  RackRearrangedPayload,
  RemovedFromRackPayload,
  TileMovedOnBoardPayload,
  TilePlacedPayload,
  TileRetractedToRackPayload,
  TilesSwappedPayload,
} from "interface/store/game";
import { Tile } from "interface/store/initialData";
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
    retractAll(state) {
      const retractedTiles: any[] = [];
      state.board = state.board.map((tile) => {
        if (!tile.fixed) {
          retractedTiles.push(tile);
          return NULL_TILE;
        }
        return tile;
      });

      state.rack = [...state.rack, ...retractedTiles];
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
    tileMovedOnBoard(state, action: PayloadAction<TileMovedOnBoardPayload>) {
      const { sourceIndex, destinationIndex } = action.payload;
      const oldTile = state.board[sourceIndex];
      state.board[sourceIndex] = NULL_TILE;

      state.board[destinationIndex] = oldTile;
    },
    moveConfirmed(state) {
      state.board = state.board.map((tile) => {
        if (!tile.fixed) {
          return {
            ...tile,
            fixed: true,
          };
        }
        return tile;
      });
    },
    returnTilesToBag(state, action: PayloadAction<TilesSwappedPayload>) {
      const [selectedTiles, remainingTiles] = state.rack.reduce(
        (result: [Tile[], Tile[]], tile: Tile) => {
          if (action.payload.selected.includes(tile.id)) {
            result[0].push(tile);
          } else {
            result[1].push(tile);
          }
          return result;
        },
        [[], []]
      );

      state.rack = remainingTiles;
      state.bag = [...state.bag, ...selectedTiles];
    },
  },
});

export const {
  tilePlaced,
  tileDrawn,
  removedFromRack,
  rackRearranged,
  tileRetractedToRack,
  tileMovedOnBoard,
  retractAll,
  moveConfirmed,
  returnTilesToBag,
} = gameSlice.actions;

export default gameSlice.reducer;

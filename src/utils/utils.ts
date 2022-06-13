import axios from "axios";
import { BoardTile } from "interface/store/initialData";
import { BoardTileWithIndex } from "interface/utils/utils";
import { NULL_TILE } from "store/game/initialData";

fetch(new Request("./dictionary.txt"));

const getBoundaryLeft = (index: number) => {
  //index of first tile on the row
  return Math.floor(index / 15) * 15;
};
const getBoundaryRight = (index: number) => {
  //index of last tile on the row
  return Math.floor(index / 15) * 15 + 14;
};

const hasNeighbor = (tileIndex: number, board: Array<BoardTile>) => {
  //untested
  const leftBoundaryIndex = getBoundaryLeft(tileIndex);
  const rightBoundaryIndex = getBoundaryRight(tileIndex);
  const top = tileIndex - 15;
  const bot = tileIndex + 15;
  const left = tileIndex - 1;
  const right = tileIndex + 1;
  const topHasNbr = top < 0 || board[top].id !== null;
  const botHasNbr = bot > 224 || board[bot].id !== null;
  const leftHasNbr = left < leftBoundaryIndex || board[left].id !== null;
  const rightHasNbr = right > rightBoundaryIndex || board[right].id !== null;
  return topHasNbr || botHasNbr || leftHasNbr || rightHasNbr;
};

//function - input: a list of tiles, output: string
const helperLeft = (
  index: number,
  board: Array<BoardTile>,
  leftBoundary: number
): string => {
  if (index < leftBoundary) {
    return "";
  }
  if (board[index].letter) {
    return helperLeft(index - 1, board, leftBoundary) + board[index].letter;
  }
  return "";
};

const helperRight = (
  index: number,
  board: Array<BoardTile>,
  rightBoundary: number
): string => {
  if (index > rightBoundary) {
    return "";
  }
  if (board[index].letter) {
    return board[index].letter + helperRight(index + 1, board, rightBoundary);
  }
  return "";
};

const helperTop = (index: number, board: Array<BoardTile>): string => {
  if (index < 0) {
    return "";
  }
  if (board[index].letter) {
    return helperTop(index - 15, board) + board[index].letter;
  }
  return "";
};

const helperBot = (index: number, board: Array<BoardTile>): string => {
  if (index > 224) {
    return "";
  }
  if (board[index].letter) {
    return board[index].letter + helperBot(index + 15, board);
  }
  return "";
};

const getHorizontalWord = (index: number, board: Array<BoardTile>): string => {
  const leftBoundary = getBoundaryLeft(index);
  const rightBoundary = getBoundaryRight(index);

  return (
    helperLeft(index - 1, board, leftBoundary) +
    board[index].letter +
    helperRight(index + 1, board, rightBoundary)
  );
};
const getVerticalWord = (index: number, board: Array<BoardTile>): string => {
  return (
    helperTop(index - 15, board) +
    board[index].letter +
    helperBot(index + 15, board)
  );
};

const getWords = (
  placedTiles: Array<BoardTileWithIndex>,
  board: Array<BoardTile>
): Array<string> => {
  if (placedTiles.length === 1) {
    return [
      getHorizontalWord(placedTiles[0].index, board), //TODO if one tile then shouldn't be considered a word
      getVerticalWord(placedTiles[0].index, board),
    ];
  }

  //can easily derive main direction from placed tiles if tiles has >= 2 letters
  //if 1 letter, then no main direction
  //there can be a better way to get all the words but this is fine for now
  const words = [];
  const isVertical = placedTiles[1].index - placedTiles[0].index > 1;

  if (isVertical) {
    words.push(getVerticalWord(placedTiles[0].index, board));
    placedTiles.forEach((tile) => {
      words.push(getHorizontalWord(tile.index, board));
    });
  } else {
    words.push(getHorizontalWord(placedTiles[0].index, board));
    placedTiles.forEach((tile) => {
      words.push(getVerticalWord(tile.index, board));
    });
  }

  return words;
};

export const isValidMove = (board: Array<BoardTile>) => {
  const placedTiles = [];
  for (let i = 0; i < board.length; i++) {
    const tile = board[i];
    if (tile === NULL_TILE || tile.fixed) {
      continue;
    }

    if (!hasNeighbor(i, board)) {
      return false;
    }

    placedTiles.push({ ...tile, index: i });
  }

  const words = getWords(placedTiles, board);

  // const verifiedWords = Promise.all(words.map)
  //wordnik di

  return true;
};

// tile not neighboring anything
// not a valid word
// orientiation: left to right OR top to bottom

// const check

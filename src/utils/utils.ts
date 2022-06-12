import { BoardTile } from "interface/store/initialData";
import { BoardTileWithIndex } from "interface/utils/utils";
import { NULL_TILE } from "store/game/initialData";

const hasNeighbor = (tileIndex: number, board: Array<BoardTile>) => {
  //untested
  const leftBoundaryIndex = Math.floor(tileIndex / 15) * 15;
  const rightBoundaryIndex = Math.floor(tileIndex / 15) * 15 + 14;
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

const getHorizontalWord = (
  index: number,
  board: Array<BoardTile>
): string => {};
const getVerticalWord = (index: number, board: Array<BoardTile>): string => {};

const getWords = (
  placedTiles: Array<BoardTileWithIndex>,
  board: Array<BoardTile>
): Array<string> => {
  if (placedTiles.length === 1) {
    return [
      getHorizontalWord(placedTiles[0].index, board),
      getVerticalWord(placedTiles[0].index, board),
    ];
  }
  const words = [];
  const isVertical = placedTiles[1].index - placedTiles[0].index > 1;

  if (isVertical) {
    getHorizontalWord;
  }

  //initial info. placed tiles +
  //can easily derive main direction from placed tiles if tiles has >= 2 letters
  //if 1 letter, then no main direction

  //main words/direction

  //secondary words

  //consider
  const index1 = placedTiles;
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
    const words = getWords(placedTiles, board);
  }

  return true;
};

// tile not neighboring anything
// not a valid word
// orientiation: left to right OR top to bottom

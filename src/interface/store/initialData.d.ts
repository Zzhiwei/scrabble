export interface Tile {
  letter: string;
  id: string;
}

export interface BoardTile {
  letter: string | null;
  id: string | null;
  fixed: boolean;
}

export type Bag = Array<Tile>;

export interface InitialState {
  board: BoardTile[];
  rack: Tile[];
  bag: Tile[];
}

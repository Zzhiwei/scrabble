export interface Tile {
  letter: string;
  id: string;
}

export interface NullableTile {
  letter: string | null;
  id: string | null;
}

export type Bag = Array<Tile>;

export interface InitialState {
  board: NullableTile[];
  rack: Tile[];
  bag: Tile[];
}

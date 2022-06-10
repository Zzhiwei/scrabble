export interface Tile {
  letter: string;
  id: string;
}

export type Bag = Array<Tile>;

export interface InitialState {
  board: Tile[];
  rack: Tile[];
  bag: {
    letter: string;
    id: string;
  }[];
}

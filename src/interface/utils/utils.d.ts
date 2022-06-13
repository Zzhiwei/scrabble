import { BoardTile } from "interface/store/initialData";

export interface BoardTileWithIndex extends BoardTile{
    index: number;
}
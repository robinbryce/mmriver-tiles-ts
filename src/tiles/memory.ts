import { TileHeight } from "../logconfig.js";
import { LogField } from "../logvalue.js";

export class Tile {
    firstMMRIndex: number;
    nodesStart: number;

    // A list of 32 byte generic records. A fixed number of records are reserved
    // to maintain the ancestor peaks committing the preceding tiles.
    data: LogField[];

    constructor(firstMMRIndex: number) {
        this.firstMMRIndex = firstMMRIndex;
        // The stack of ancestors committing the preceding tiles is never greater than the height of the tree.
        this.nodesStart = TileHeight;
        this.data = [];
    }
}
import { Index } from "./numbers.js";
import { LogField } from "./logvalue.js";


export type Hasher = (content: Uint8Array) => Uint8Array;

export interface ILeafAccessor {
  // Retrieves the requested node value if available, this includes the peak nodes committing the ancestor tiles.
  get(i: Index): any;
  // // The start of the node values relative to data()
  // first(): Index; 
  // data(): LogField[];
}
export interface ILeafAdder extends ILeafAccessor{
  append(v: LogField): Index;
}

/**
 * Interface for a tile storage provider.
 * 
 * tile id's
 *  
 *  for a merkle mountain range based log the tile id is just leaf_count(mmr_index) / leaves per tile.
 *  Leaves per tile is just 2^(tile_height-1.
 *  For an mmr, tiles are just sections of a linear array.
 *  The strict append only nature of an MMR makse it possible to change the
 *  tile_height at a later time in response to changing usage of the log.
 *  If desired historic tiles for the same log can be re-built using a new tile height without breaking verifiability.
 *
 */
export interface ITileStorageProvider {
  /**  Reads the identified tile
   * Note the returned version obeys etag optimistic concurrency semantics.
   * The value must be retained in order to call replace_tile successfully.
   * @returns {[ArrayBuffer, number]} the tile data and its version
   */
  read_tile(tileid: number): [Buffer, number];


  /** reads the newest tile in the log, raises EmptyError if not tiles exist */
  read_head(): [Buffer, number];

  /** Creates the identified tile, throws {ExistsError} if the id exists */
  create_tile: (tileid: number, data: Buffer) => void;
  /**
   * Replaces identified tile
   * Throws {ChangedError} if the version does not match the current record.
   * @param {number} version the version returned by read_tile */
  replace_tile: (tileid: number, version: number, data: Buffer) => void;
}

export interface ITileStore {
  /** Retrieves the current head tile, creating a new one if the most recent is full */
  head(): Promise<ILeafAdder>;

  /** Creates a new tile, optionally extending an existing tile by propagating the ancsetor peaks.
   * The new tile is not committed to storage until the commit method is called.
  */
  create(parent?: ILeafAdder): ILeafAdder;

  /** Attempts to commit the extended tile, underlying storage may reject this
   * based on optimistic consistency primitives. */
  commit(t: ILeafAccessor): Promise<void>;
}
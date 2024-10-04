import { Index } from "./numbers.js";


export type Hasher = (content: Uint8Array) => Uint8Array;

export interface INodeAccesosor {
  // Retrieves the requested node value if available, this includes the peak nodes committing the ancestor tiles.
  get(i: Index): any;
}
export interface ILeafAdder extends INodeAccesosor{
  /** apends a leaf using the add_leaf_hash algorithm, which in turn invokes append on the implementation */
  append_leaf(v: Uint8Array): Index;
  append(v: Uint8Array): Index;
}

export interface ITileNodeAccessor extends INodeAccesosor {
  has_ancestor(i: Index): boolean;
}

/**
 * Interface for a tile storage provider.
 * 
 * tile id's
 *  
 *  for a merkle mountain range based log the tile id is just leaf_count(mmr_index) / leaves per tile.
 *  Leaves per tile is just 2^tile_height (As This implementation works with zero based tile heights).
 *  For an mmr, tiles are just sections of a linear array.
 *  The strict append only nature of an MMR makes it possible to change the
 *  tile_height at a later time in response to changing usage of the log.
 *  If desired, historic tiles for the same log can be re-built using a new tile
 *  height without breaking verifiability of pre-existing log seals.
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
  /** Retrieves the current head tile, creating a new one if the most recent is full
   * @returns {[ILeafAdder, number]} the leaf adder and the version (etag) of the tile
   */
  head(): [ILeafAdder, number|undefined];
  get(id: number): [ILeafAdder, number|undefined];

  /** Creates a new tile, optionally extending an existing tile by propagating the ancsetor peaks.
   * The new tile is not committed to storage until the commit method is called.
  */
  create(parent?: ILeafAdder): ILeafAdder;

  /** Attempts to commit the extended tile, underlying storage may reject this
   * based on optimistic consistency primitives.
   * @param {number} version an etag like version for the tile when it was read from storage */
  commit(t: INodeAccesosor, version: number|undefined): void;
}
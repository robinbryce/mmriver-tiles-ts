// An approximation of the tiles interface defined for rfc9162
//
import { ILeafAccessor, ILeafAdder, ITileStorageProvider, ITileStore } from "./interfaces.js";
import { Index } from "./numbers.js";
import { LogField } from "./logvalue.js";
import { Numbers } from "./numbers.js";
import { EmptyError } from "./storage/errors.js";

import { peaks, index_height, mmr_index, ones, trailing_zeros64 } from "./algorithms.js";


export class TileLog {
    cfg: TileFormat;

    store: ITileStore;
    constructor(params: TileLogParameters | undefined) {
      this.cfg = Tiles.format(params ?? new TileLogParameters());
      this.store = new TileStore(this.cfg);
    }

    /** appends all records to the log
     * Guarantees that all entries are added or none are.
     * @returns the mmr indices of the added records
     */
    append(leaves: LogField[]): Index[] {

      let adder: ILeafAdder;
      let version: number | undefined;
      try {
        [adder, version] = this.store.head();
      } catch (error) {
        if (error instanceof TileFullError || error instanceof EmptyError) {
          adder = this.store.create();
          version = undefined;
        }
        else
          throw error;
      }

      const indices: Index[] = [];

      for (const leaf of leaves) {
        try {
          indices.push(adder.append(leaf));
        } catch (error) {
          if (error instanceof TileFullError) {
            // First commit the tile we just filled,
            // if the commit raises, everything is rolled back
            this.store.commit(adder, version);

            adder = this.store.create(adder);
            version = undefined;
          }
          else
            throw error; // rethrow other errors
        }
      }

      // We always have an adder to commit at this point

      this.store.commit(adder, version);
      return indices
    }
}

export class TileLogParameters {
  // the zero based height of the tile. a tile with a height of 0 would have a single leaf.
  tile_height: number = 14;
  hash_size: number = 32;
  hash_function?: (bytes: Uint8Array) => Uint8Array;
  storage?: ITileStorageProvider;
}

export class TileStore {
  cfg: TileFormat;
  store: ITileStorageProvider;
  constructor(cfg: TileFormat) {
    this.cfg = cfg;
    this.store = cfg.storage;
  }
  head(): [ILeafAdder, number] {
    const [data, version] = this.store.read_head();
    return [Tile.load(this.cfg, data), version];
  }
  /** Creates a new tile, optionally extending an existing tile by propagating the ancsetor peaks. */
  create(parent?: Tile): Tile{
    return Tile.create(this.cfg, parent);
  };

  commit(tile :Tile, version: number|undefined= undefined): void {
    // crop the data
    const data = tile.data.subarray(0, tile.used_bytes());
    if (typeof version === 'undefined')
      this.store.create_tile(tile.id, data);
    else
      this.store.replace_tile(tile.id, version, data);
  }
}

export class TileFullError extends Error {
  constructor(message: string = 'The tile is full') {
    super(message);
    this.name = 'TileFullError';
  }
}

/** tile storage */
export class Tile {

    cfg: TileFormat;
    id: Index = 0;
    firstIndex: Index  = 0;
    lastIndex: Index = 0;
    ancestorPeaks: Record<Index, LogField> = {};

    // Organised as an array of fieldSize (default 32) byte generic records. The
    // first record stores the tile id and the configured tile height for the
    // log.  A fixed number of records are reserved to maintain the ancestor
    // peaks committing the preceding tiles. An inclusion proof for any leaf
    // will reference only data for the tile it resides in.
    data: Buffer;

    constructor(cfg: TileFormat, data: Buffer, id: Index, lastIndex: Index|undefined=undefined) {

      const firstIndex = mmr_index(id * (1 << cfg.tileHeight));

      // To allow the data to be allocated once and trimmed when persisted, we don't compute this based on data.byteLength
      lastIndex = lastIndex ?? firstIndex;

      if (lastIndex < firstIndex)
        throw new Error('lastIndex is before the current tile data');

      this.cfg = cfg;
      this.data = data;
      this.id = id;
      this.firstIndex = firstIndex;
      this.lastIndex = lastIndex;
      if (this.firstIndex > 0)
        this.ancestorPeaks = this.read_ancestor_peaks_map();
    }

    append(v: LogField): Index {

      const i = this.lastIndex + 1;
      if (i >= this.firstIndex + (1 << this.cfg.tileHeight))
        throw new TileFullError();
      this.write_field(i, v);
      this.lastIndex = i;
      return this.lastIndex + 1; // return the index for the *next* leaf
    }

    get(i: Index): LogField {
      if (i < this.firstIndex) {
        if (i in this.ancestorPeaks)
          return this.ancestorPeaks[i];
        throw new Error('Node index out of bounds');
      }
      return this.read_index(i);
    }

    // creates a new Tile which is empty and which optionally follows a 'parent' tile
    static create(cfg: TileFormat, parent?: Tile): Tile {

      const tileid = parent ? parent.id + 1 : 0;

      // for convenience, allocate the buffer to the size required once all leaves have been added. 
      // trim if/when it is persisted.
      const data = Buffer.alloc(Tiles.max_tile_size(cfg, tileid));
      if (!parent) {
        // Initiaising a log, the tile will have id zero and a firstIndex of zero.
        // We don't commit it to storage until after we add leaves. This
        // guarantees that tiles exist and are non empty or do not exist at all.
        return new Tile(cfg, data, 0);
      }


      Tiles.write_start_field(cfg, data, tileid);

      // propagate the retained peak from the parent to the new tile, adding the
      // last parent node to the stack as we go.
      data.set(parent.next_peak_stack(), cfg.peaksStart);

      // The new tile is initialy empty of nodes
      return new Tile(cfg, data, tileid);
    }

    // loads a tile from a buffer, the lastIndex is calculated from the data size
    static load(cfg: TileFormat, data: Buffer): Tile {

      const [tileHeight, tileid] = Tiles.read_start_field(cfg, data);

      // It is perfectly reasonable to re-configure a log tile height at any
      // time, though the need to do so is likely rare. This can be accomplished
      // safely and  *hot*. The seals cover the nodes not the raw file content,
      // so the seals remain valid even for re-configured logs. From the
      // perspective of the log, all tiles are the same height, even if they are
      // not available yet for the new config.  Here we check that the expected
      // config matches the tile data we just read.
      if (cfg.tileHeight !== tileHeight)
        throw new Error('Tile height mismatch');

      const firstIndex = mmr_index(tileid * (1 << cfg.tileHeight));

      // Compute the last index based on the data size. When tiles are persisted
      // by this implementation we crop the byte array to the last node.
      const lastIndex = firstIndex + ((data.byteLength - cfg.nodesStart) / cfg.fieldWidth) - 1;

      return new Tile(cfg, data, tileid, lastIndex);
    }

    last_index(): Index {
      return this.lastIndex ;
    }

    used_bytes(): number {
      return this.cfg.nodesStart + (this.lastIndex - this.firstIndex) * this.cfg.fieldWidth;
    }

    /** prepares the stack of peaks required by the *next* tile */
    next_peak_stack(): Buffer {

      // We need to propagate the peaks from the current tile to the next. We
      // take all the peaks from the stack except those which are "cast into
      // shadow" by last leaf in this tile.
      //
      // To work out the peaks to add and remove, the same binary tricks that
      // work with the whole mmr are applied to the tile ids. Essentially
      // treating them as leaf indices in a smaller mmr.

      // The ones count for the current tile id is the peak count carried over from the previous.
      const peakCount  = ones(this.id);
      // The trailing zeros of the *one* based tile number is the number of peaks we can
      // discard from the stack for next tile, and this - slightly confusingly -
      // is also the next tile index.
      const popCount = trailing_zeros64(this.id+1);

      // take all the peaks we don't pop, but over allocate by adding back space for a single addition.
      let peaks =  this.data.subarray(
        this.cfg.peaksStart, // start of peaks
        this.cfg.peaksStart
        + (peakCount - popCount) * this.cfg.fieldWidth // end of the peaks we are keeping
        + this.cfg.fieldWidth // add back one which will be over written by the peak we propagate from this tile.
      );
     
      // The last node of the current tile is the peak to propagate to the next tile, set it at the end of the peak stack
      const lastNode = this.read_index(this.last_index()) as Uint8Array;
      peaks.set(lastNode, (peakCount - popCount) * this.cfg.fieldWidth);
      return peaks;
    }

    // read* methods all go direct to the data

    read_first_index() {
      const big = this.data.subarray(this.cfg.fieldWidth-8, this.cfg.fieldWidth).readBigInt64BE();
      if (big > Number.MAX_SAFE_INTEGER)
        throw new Error('uint64 support tbd');
      return Number(big);
    }

    /** reads the ancestor peaks and builds a mapping from their mmr indices to their values */
    read_ancestor_peaks_map(): Record<Index, LogField> {
      const ancestorPeaks: Record<Index, LogField> = {};

      if (this.firstIndex === 0)
        throw new Error('No ancestor peaks for the first tile');

      peaks(this.firstIndex - 1).forEach((p, i) => {
        // Note: by definition each peak index p will be less than the firstIndex,
        // the process of starting a new tile ensures the necessary peaks are
        // accumulated from the previous tile.
        const g = index_height(p);
        if (g < this.cfg.tileHeight - 1)
          return;
        // read_field because we are reading the carried forward peaks from the fixed allocation preceding the node data.
        const f = this.read_field(i, this.cfg.peaksStart) as LogField;
        ancestorPeaks[p] = f;
      });
      return ancestorPeaks
    }

    /*
    read_ancestor_peaks(): Buffer {
      const lastIndex = this.last_index();
      const peakCount = ones(lastIndex+ 1);
      return this.data.subarray(this.cfg.peaksStart, peakCount * this.cfg.fieldWidth);
    }*/

    read_index(i: Index): LogField {
      if (i < this.firstIndex)
        throw new Error('Index out of bounds');
      return this.read_field(i - this.firstIndex, this.cfg.nodesStart) as LogField;
    }

    read_field(i: Index, offset: number = 0): Buffer {
      return this.data.subarray(
        offset + i * this.cfg.fieldWidth,
        offset + (i+1) * this.cfg.fieldWidth);
    }

    write_field(i: Index, v: LogField, offset: number = 0): void {
      this.data.set(v as Uint8Array, offset + i * this.cfg.fieldWidth);
    }
}

export type TileFormat = {
  // derived from the parameters, see Tiles.format
  tileHeight: number;
  fieldWidth: number;
  peaksStart: number;
  nodesStart: number;
  leafCount: number;
  maxPeaks: number;
  maxTileDataSize: number;
  hash_function: (bytes: Uint8Array) => Uint8Array;
  storage: ITileStorageProvider;
}

export type TypeTileStartField = {
  tileHeight: number;
  tileid: number;
  firstIndex: number;
}

export namespace Tiles {

  export function write_start_field(cfg: TileFormat, data: Buffer, tileid: number) {
    // NOTE: it should be able to do something with cbor short types here and
    // still maintain the field alignment. having a type 2 long value, whose
    // payload just happens to be the log, as the last value could work too, but
    // it would have to be set on persist when the tile size is known.
    const field = data.subarray(0, cfg.fieldWidth);
    Numbers.setBE64(cfg.tileHeight, cfg.fieldWidth-16, field);
    Numbers.setBE64(tileid, cfg.fieldWidth-8, field);
  }

  export function read_start_field(cfg: TileFormat, data: Buffer): [number, number] {
    const field = data.subarray(0, cfg.fieldWidth);
    const tileHeight = Numbers.fromBE64(field, cfg.fieldWidth-16, 8);
    const tileid = Numbers.fromBE64(field, cfg.fieldWidth-8, 8);
    return [tileHeight, tileid];
  }

  export function max_tile_size(fmt: TileFormat, tileid: number): number {
    // there are more efficient ways to compute this, done this way for clarity.
    const i0 = mmr_index(fmt.leafCount * (tileid + 0));
    const i1 = mmr_index(fmt.leafCount * (tileid + 1));
    return fmt.nodesStart + (i1 - i0) * fmt.fieldWidth;
  }

  // Returns the tile format for the given parameters
  export function format(params: TileLogParameters): TileFormat {

    if (!params.hash_function) throw new Error('Hash function required');
    if (!params.storage) throw new Error('Storage provider required');

    const tileHeightIndex = params.tile_height;

    // The maximum number of peaks in the MMR. Space is reserved at the begining
    // of each tile for up to this many ancestor peaks. The bit count allowed
    // for an index determins this. Note that strictly speaking the number type
    // of javascript only allows 53 bits, but the draft for MMR's is defined for
    // 64 bit unsigned integer indices.
    const maxPeaks = 64;

    // The log data is organised in to generic 32 byte fields.
    if (params.hash_size !== 32) throw new Error('Hash size must be 32 for now');
    const fieldWidth = 32;

    const peaksStart = 1 * fieldWidth;
    const nodesStart = peaksStart + maxPeaks * fieldWidth;
    const leafCount = 1 << tileHeightIndex;

    // There are at most TileHeight additional nodes in each tile. They are
    // dependent only on the peaks carried over from earlier tiles. For
    // convenience we just commit that much ram to each tile we handle.
    // The nature of the MMR is such that we need only ever handle at most two at a time.
    // And only one at a time for generating proofs of inclusion.
    const maxTileDataSize = nodesStart
      + (1 << tileHeightIndex) * fieldWidth // the nodes fully contained by the tile
      + maxPeaks * fieldWidth; // the nodes committing the peaks of the preceding tiles

    return {
      tileHeight: tileHeightIndex,
      fieldWidth,
      peaksStart,
      nodesStart,
      leafCount,
      maxPeaks,
      maxTileDataSize,
      hash_function: params.hash_function,
      storage: params.storage
    }
  }
}
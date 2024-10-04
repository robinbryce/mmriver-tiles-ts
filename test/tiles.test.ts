import { describe, it, expect } from 'vitest';
import { ITileStorageProvider } from '../src/interfaces.js';
import { Tile, TileFormat, Tiles } from '../src/tiles.js';
import { mmr_index } from '../src/algorithms.js';
import { Buffer } from 'buffer';
import { Numbers } from '../src/bytes.js';

 /* log structure for the height 2 tests. a regular mmr would have a larger tile height, 14 is 16k leaves/tile

               14                        29
	3           .  \                      .   \
	           .    \                    .     \
	          .      \                  .       \
	         .        \                .         \
	2      6 .         13             21          28
	      .   \       .   \          .  \        .   \
	1    2  |  5  |  9  |  12   |  17  | 20   | 24   | 27   |  --- massif tree line massif height = 1
	    / \ |/  \ | / \ |  /  \ | /  \ | / \  | / \  | / \  |
	   0   1|3   4|7   8|10   11|15  16|18  19|22  23|25  26| MMR INDICES
    .-----|-----|-----|-------|------|------|------|------|
	  |0   1|2   3|4   5| 6    7| 8   9|10  11|12  13|14  15| LEAF INDICES
    |-----|-----|-----|-------|------|------|------|------|
    |  0  |  1  |  2  |  3    |   4  |   5  |   6  |   7  | TILE INDICES (We call these massif's)
    .-----|-----|-----|-------|------|------|------|------|
 */

const NUM_FIELD = (x:number)=> Numbers.toBE64(x, 32);

describe("Tile's", () => {
  it('Should create a tile with the expected firstIndex', () => {
      const cfg = cfg_default({});
      const data = Buffer.alloc(cfg.maxTileDataSize);
      Tiles.write_start_field(cfg, data, 456);
      const [g, id] = Tiles.read_start_field(cfg, data);
      expect(g).toBe(14);
      expect(id).toBe(456);

      const tile = Tile.load(cfg, data);

      expect(tile.id).toBe(456);
      const indexOfFirstLeaf = mmr_index(tile.id * cfg.leafCount)
      expect(tile.firstIndex).toBe(indexOfFirstLeaf);
    });

  it('Should maintain the correct peak stacks for height 2 second tile', () => {
    const cfg = cfg_default({tile_height:1});
    // pre-allocate exactly the right number of nodes for tile id 0
    const data0 = Buffer.alloc(Tiles.max_tile_size(cfg, 0));
    Tiles.write_start_field(cfg, data0, 0);
    // populate each node with a value which is also its index.
    set_node(data0, cfg, 0, 0);
    set_node(data0, cfg, 1, 1);
    set_node(data0, cfg, 2, 2);
    const t0 = Tile.load(cfg, data0);
    const t1 = Tile.create(cfg, t0);
    expect(t1.ancestorPeaks[2]).toEqual(NUM_FIELD(2));
    expect(Object.keys(t1.ancestorPeaks).length).toBe(1); 
    expect(get_peak(t1.data, 0, cfg)).toEqual(NUM_FIELD(2));
  });	

  it('Should maintain the correct peak stacks for five height 2 tiles', () => {

    // Typically the tiles would be a lot larger, but this is the smallest tile
    // size which can excersise the corner cases in the propagation of the
    // ancestor peaks.

    const cfg = cfg_default({tile_height:1});
    // pre-allocate exactly the right number of nodes for tile id 0
    const data0 = Buffer.alloc(Tiles.max_tile_size(cfg, 0));
    Tiles.write_start_field(cfg, data0, 0);
    // populate each node with a value which is also its index.
    set_node(data0, cfg, 0, 0);
    set_node(data0, cfg, 1, 1);
    set_node(data0, cfg, 2, 2);
    const t0 = Tile.load(cfg, data0);
    const t1 = Tile.create(cfg, t0);
    expect(t1.ancestorPeaks[2]).toEqual(NUM_FIELD(2));
    expect(Object.keys(t1.ancestorPeaks).length).toBe(1); 
    expect(get_peak(t1.data, 0, cfg)).toEqual(NUM_FIELD(2));

    // populate tile id 1
    for (let i = 3; i < 7; i++)
      set_node(t1.data, cfg, i-t1.firstIndex, i);
    t1.nextIndex = 7;

    // create tile id 2
    const t2 = Tile.create(cfg, t1);
    expect(t2.ancestorPeaks[6]).toEqual(NUM_FIELD(6));
    expect(Object.keys(t1.ancestorPeaks).length).toBe(1); 
    expect(get_peak(t1.data, 0, cfg)).toEqual(NUM_FIELD(6));

    // populate tile id 2
    for (let i = 7; i < 10; i++)
      set_node(t2.data, cfg, i-t2.firstIndex, i);
    t2.nextIndex = 10;

    // create tile id 3
    const t3 = Tile.create(cfg, t2);
    expect(t3.ancestorPeaks[6]).toEqual(NUM_FIELD(6));
    expect(t3.ancestorPeaks[9]).toEqual(NUM_FIELD(9));
    expect(Object.keys(t3.ancestorPeaks).length).toBe(2); 
    expect(get_peak(t3.data, 0, cfg)).toEqual(NUM_FIELD(6));
    expect(get_peak(t3.data, 1, cfg)).toEqual(NUM_FIELD(9));

    // populate tile id 3
    for (let i = 10; i < 15; i++)
      set_node(t3.data, cfg, i-t3.firstIndex, i);
    t3.nextIndex = 15;

    // create tile id 4, this is a perfect peak and it resets the stack
    const t4 = Tile.create(cfg, t3);
    expect(t4.ancestorPeaks[14]).toEqual(NUM_FIELD(14));
    expect(Object.keys(t4.ancestorPeaks).length).toBe(1); 
    expect(get_peak(t4.data, 0, cfg)).toEqual(NUM_FIELD(14));

    // populate tile id 4
    for (let i = 15; i < 18; i++)
      set_node(t4.data, cfg, i-t4.firstIndex, i);
    t4.nextIndex = 18;

    const t5 = Tile.create(cfg, t4);
    expect(t5.ancestorPeaks[17]).toEqual(NUM_FIELD(17));
    expect(t5.ancestorPeaks[14]).toEqual(NUM_FIELD(14));
    expect(Object.keys(t5.ancestorPeaks).length).toBe(2); 
    expect(get_peak(t5.data, 0, cfg)).toEqual(NUM_FIELD(14));
    expect(get_peak(t5.data, 1, cfg)).toEqual(NUM_FIELD(17));
  });	
});

describe('max_tile_size', () => {
  it('Should calculate the correct max tile size for height 2 tiles 0', () => {
    const cfg = cfg_default({tile_height: 1});

    const nodeCounts = [3, 4, 3, 5, 3, 4, 3, 6];
    for (let i = 0; i < nodeCounts.length; i++) {
      const tileSize = Tiles.max_tile_size(cfg, i);
      const expectNodeSize = nodeCounts[i] * cfg.fieldWidth;
      if (tileSize != cfg.nodesStart + expectNodeSize)
        console.log(`tile ${i} size: ${tileSize} expected: ${cfg.nodesStart + expectNodeSize}`);
      expect(tileSize).toEqual(cfg.nodesStart +  expectNodeSize);
    }
  });

  it('Should calculate the correct max tile size for tileid 1', () => {
    const cfg = cfg_default({tile_height: 2});
    const tileSize = Tiles.max_tile_size(cfg, 1);
    expect(tileSize).toBe(cfg.nodesStart + (mmr_index(cfg.leafCount * 2) - mmr_index(cfg.leafCount * 1)) * cfg.fieldWidth);
  });

  it('Should calculate the correct max tile size for a larger tile height', () => {
    const cfg = cfg_default({tile_height: 4});
    const tileSize = Tiles.max_tile_size(cfg, 2);
    expect(tileSize).toBe(cfg.nodesStart + (mmr_index(cfg.leafCount * 3) - mmr_index(cfg.leafCount * 2)) * cfg.fieldWidth);
  });

  it('Should handle edge cases with tileid 0 and minimum tile height', () => {
    const cfg = cfg_default({tile_height: 1});
    const tileSize = Tiles.max_tile_size(cfg, 0);
    expect(tileSize).toBe(cfg.nodesStart + (mmr_index(cfg.leafCount * 1) - mmr_index(cfg.leafCount * 0)) * cfg.fieldWidth);
  });
});

export class NotImplementedTileStorageProvider implements ITileStorageProvider {
  read_tile(_tileid: number): [Buffer, number] { throw new Error('not implemented');}
  read_head(): [Buffer, number] { throw new Error('not implemented');}
  create_tile(_tileid: number, _data: Buffer) { throw new Error('not implemented');}
  replace_tile(_tileid: number, _version: number, _data: Buffer) { throw new Error('not implemented');}
}

function cfg_default({tile_height = 14, hash_size = 32}): TileFormat {
  return Tiles.format({
    tile_height, hash_size,
    hash_function: (_bytes: Uint8Array): Buffer => {throw new Error('not implemented');},
    storage: new NotImplementedTileStorageProvider()
 });
}

// Set a number in the indexed buffer field. the value will be in the least significant bits of the field.
function set_number(data: Buffer, base: number, index: number, value: number, size: number = 32) {
  data.writeBigInt64BE(BigInt(value), base + (index+1)*size - 8);
}

function set_node(data: Buffer, cfg: TileFormat, index: number, value: number) {
  set_number(data, cfg.nodesStart, index, value, cfg.fieldWidth);
}

function get_field(data: Buffer, index: number, offset: number, size: number): Buffer {
  return data.subarray(offset + index*size, offset + (index+1)*size);
}

function get_peak(data: Buffer, index: number, cfg: TileFormat): Buffer {
  return get_field(data, index, cfg.peaksStart, cfg.fieldWidth);
}

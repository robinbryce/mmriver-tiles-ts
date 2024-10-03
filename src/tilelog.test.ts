import { describe, it, expect } from 'vitest';
import { ITileStorageProvider } from './interfaces.ts';
import { TileLog, Tile, TileLogParameters } from './tiles.ts';
import { TileStorageProvider } from './storage/sqlite.js';
import { Numbers } from './numbers.ts';
import { sha256 } from './hashing.ts';
import { LogField } from './logvalue.ts';
import { mmr_index } from './algorithms.ts';

describe('TileLog', () => {
  it('Should build a height 2, five tile log correctly one leaf at a time', () => {
    const storage = new TileStorageProvider(':memory:');
    const cfg = cfg_default({tile_height:1}, storage);
    const log = new TileLog(cfg);
    for (let i = 0; i < (1 << cfg.tile_height) * 5; i++) {
      const value = Numbers.toBE64(i, cfg.hash_size) as LogField;
      // typically, the hash of some pre image would be the append value . its
      // just easier to for the tests to use the index.
      log.append([value]);
    }
    const [head, version] = log.store.head();
    expect(version).toBe(0);
    expect((head as Tile).id).toBe(4);
    expect((head as Tile).firstIndex).toBe((1 << cfg.tile_height) * 4);
    expect((head as Tile).lastIndex).toBe(mmr_index(1 << cfg.tile_height) * 5 -1);
  });
});

function cfg_default({tile_height = 14, hash_size = 32}, storage: ITileStorageProvider): TileLogParameters {
  return {
    tile_height, hash_size,
    hash_function: sha256,
    storage
 };
}
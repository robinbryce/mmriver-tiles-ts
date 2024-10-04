import { describe, it, expect } from 'vitest';
import { ITileStorageProvider } from '../src/interfaces.js';
import { TileLog, Tile, TileLogParameters } from '../src/tiles.js';
import { TileStorageProvider } from '../src/storage/sqlite.js';
import { Numbers, hex2bytes } from '../src/bytes.ts';
import { sha256 } from '../src/hashing.ts';
import {
  mmr_index, peaks, inclusion_proof_path, included_root, complete_mmr,
  consistency_proof_paths, consistent_roots, 
  bytes_equal} from '../src/algorithms.ts';

import { kat39_nodes, kat39_leaves, kat39_included_roots} from '../src/kat39.ts';

describe('TileLog append tests', () => {
  it('Should build a height 2, five tile log correctly one leaf at a time', () => {
    const storage = new TileStorageProvider(':memory:');
    const cfg = cfg_default({tile_height:1}, storage);
    const log = new TileLog(cfg);

    const numLeaves = (1 << cfg.tile_height) * 5;
    for (let i = 0; i < numLeaves; i++) {
      const value = Numbers.toBE64(i, cfg.hash_size) as Uint8Array;
      // typically, the hash of some pre image would be the append value . its
      // just easier to for the tests to use the index.
      log.append([value]);
    }
    const [head, version] = log.store.head();
    // note: it takes two writes to fill the last tile so the version is 1, but
    // this is specific to the tile configuration and the fact that we write one
    // leaf at a time.
    expect(version).toBe(1);
    expect((head as Tile).id).toBe(4);
    expect((head as Tile).firstIndex).toBe(mmr_index((1 << cfg.tile_height) * 4));
    expect((head as Tile).nextIndex).toBe(mmr_index((1 << cfg.tile_height) * 5));
  });

  it('Should build a height 2, five tile log correctly all leaves in one shot', () => {
    const storage = new TileStorageProvider(':memory:');
    const cfg = cfg_default({tile_height:1}, storage);
    const log = new TileLog(cfg);

    const leaves: Uint8Array[] = [];
    const numLeaves = (1 << cfg.tile_height) * 5;
    for (let i = 0; i < numLeaves; i++) {
      const value = Numbers.toBE64(i, cfg.hash_size) as Uint8Array;
      leaves.push(value);
      // typically, the hash of some pre image would be the append value . its
      // just easier to for the tests to use the index.
    }
    log.append(leaves);
    const [head, version] = log.store.head();
    // note: it takes  one write for each tile so the version is 0, but this is
    // specific to the tile configuration and the fact that we write all the
    // leaves at once.
    expect(version).toBe(0);
    expect((head as Tile).id).toBe(4);
    expect((head as Tile).firstIndex).toBe(mmr_index((1 << cfg.tile_height) * 4));
    expect((head as Tile).nextIndex).toBe(mmr_index((1 << cfg.tile_height) * 5));
  });

  it('Should build the kat39 log in one shot', () => {
    const storage = new TileStorageProvider(':memory:');
    const cfg = cfg_default({tile_height:1}, storage);
    const log = new TileLog(cfg);

    log.append(kat39_leaves);

    const nodes = [...log.enumerate_nodes(0, 38)].map((v) => new Uint8Array(v));

    expect(nodes.length).toEqual(39);
    expect(nodes).toEqual(kat39_nodes);

  });

  it('Should enumerate leaves in kat39', () => {
    const storage = new TileStorageProvider(':memory:');
    const cfg = cfg_default({tile_height:1}, storage);
    const log = new TileLog(cfg);

    log.append(kat39_leaves);

    const leaves = [...log.enumerate_leaves(0, 20)].map((v) => new Uint8Array(v));

    expect(leaves.length).toEqual(21);
    expect(leaves).toEqual(kat39_leaves);

  });
});

describe('TileLog proofs', () => {
  it('Should prove inclusion for all nodes for all kat39 complete mmrs', ()=>{
    const storage = new TileStorageProvider(':memory:');
    const cfg = cfg_default({tile_height:1}, storage);
    const log = new TileLog(cfg);
    log.append(kat39_leaves);

    for (let iw = 0; iw < 39; iw++) {

      let ito = complete_mmr(iw+1);
      let jkat39Root = 0;
      while (ito < kat39_included_roots.length) {

        const proof: Uint8Array[] = inclusion_proof_path(iw, ito).map((i) => log.get(i));
        const root = new Uint8Array(included_root(log.cfg.hash_function, iw, log.get(iw), proof));
        const expected_root = kat39_included_roots[iw][jkat39Root];

        expect(root).toEqual(expected_root);

        // advance to the next complete mmr
        ito = complete_mmr(ito + 1);
        jkat39Root += 1;
      }
      // check that we found all the roots for the element in all states of the mmr which contain it.
      expect(jkat39Root).toBe(kat39_included_roots[iw].length);
    }
  })
  it('Should prove consistency between all kat39 complete mmrs', ()=>{

    const storage = new TileStorageProvider(':memory:');
    const cfg = cfg_default({tile_height:1}, storage);
    const log = new TileLog(cfg);
    log.append(kat39_leaves);

    let ifrom = 0;
    let ito = complete_mmr(ifrom+1);
    while (ifrom < 39){

      ifrom = complete_mmr(ifrom+1);
      while(ito < 39) {

        const proof: Uint8Array[][] = consistency_proof_paths(ifrom, ito).map((path) => path.map((sibling) => log.get(sibling)));
        const accumulatorfrom: Uint8Array[] = peaks(ifrom).map((i) => log.get(i));
        const accumulatorto: Uint8Array[] = peaks(ito).map((i) => new Uint8Array(log.get(i)));
        const proven: Uint8Array[] = consistent_roots(log.cfg.hash_function, ifrom, accumulatorfrom, proof).map((r) => new Uint8Array(r));
        expect(proven.length).toBeGreaterThan(0);
        expect(proven.length).toBeLessThanOrEqual(accumulatorto.length);
        expect(proven).toEqual(accumulatorto.slice(0, proven.length));

        ito = complete_mmr(ito+1);
      }
    }
  });
  it('Should show the example works', () => {
    const storage = new TileStorageProvider(':memory:');

    // tile_height would typically be around 12-15, 1 matches the tests and results in a log whose tiles each contain 2 leaves.
    const params = {tile_height: 1, hash_size: 32, hash_function: sha256, storage};
    const log = new TileLog(params);

    log.append(kat39_leaves); // canonical Known Answer Test leaves

    // leaf 2 is mmr index 3, getting the proof for MMR(15) to MMR(25) will always produce the peak at 14

    const proof: Uint8Array[] = inclusion_proof_path(2, 15).map((i) => log.get(i));
    const root = new Uint8Array(included_root(log.cfg.hash_function, 2, log.get(2), proof));
    if (!bytes_equal(root, hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112")))
      throw new Error("inclusion proof failed");
  });
});


function cfg_default({tile_height = 14, hash_size = 32}, storage: ITileStorageProvider): TileLogParameters {
  return {
    tile_height, hash_size,
    hash_function: sha256,
    storage
 };
}
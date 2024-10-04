import { describe, it, expect } from 'vitest';
import { index_height, peaks, add_leaf_hash, mmr_index, complete_mmr } from './algorithms.js';
import { bit_length, trailing_zeros64 } from './algorithms.js';
import { ILeafAdder } from './interfaces.js';
import { Index } from './numbers.js';
import { sha256 } from './hashing.js';

import {
  kat39_leaves,
  kat39_nodes,
  kat39_mmr_index_heights,
  kat39_mmr_index_of_leaf,
  kat39_peak_indices_map,
  kat39_complete_mmr_indices,
} from '../test/kat39.js';

class LeafAdder implements ILeafAdder {
  nodes: (Uint8Array & {length: 32})[] = [];

  append_leaf(v: Uint8Array): Index {
    throw new Error('Method not implemented.');
  }
  append(node: Uint8Array & {length: 32}): number {
    this.nodes.push(node);
    return this.nodes.length;
  }
  get(i: number): Uint8Array & {length: 32} {
    return this.nodes[i];
  }
}

describe('algorithms', () => {

  it('add_leaf_hash', () => {
    const db = new LeafAdder();
    for (let i = 0; i < kat39_leaves.length; i++) {
      add_leaf_hash(db, sha256, kat39_leaves[i]);
    }

    for (let i = 0; i < kat39_nodes.length; i++) {
      expect(db.nodes[i]).toEqual(kat39_nodes[i]);
    }
  });

  it('index_height', () => {
    const kat = kat39_mmr_index_heights;
    for (let i = 0; i < kat.length; i++) {
      expect(index_height(i)).toBe(kat[i]);
    }
  });

  it('peaks', () => {
    const kat = kat39_peak_indices_map;
    for (const [i, peak_indices] of kat) {
      expect(peaks(i)).toEqual(peak_indices);
    }
  });

  it('mmr_index', () => {
    for (const [e, i] of kat39_mmr_index_of_leaf) {
      expect(mmr_index(e)).toEqual(i);
    }
  });

  it('complete_mmr', () => {
    const kat = kat39_complete_mmr_indices;
    for (let i = 0; i < kat.length; i++) {
      expect( complete_mmr(i)).toEqual(kat[i]);
    }
  });

});

describe('trailingZeros', () => {
  it('should return the correct number of trailing zeros', () => {
    expect(() => trailing_zeros64(-1)).toThrowError();
    expect(() => trailing_zeros64(Math.pow(2, 33))).toThrowError();
    expect(trailing_zeros64(0)).toBe(64);
    expect(trailing_zeros64(1)).toBe(0);
    expect(trailing_zeros64(2)).toBe(1);
    expect(trailing_zeros64(3)).toBe(0);
    expect(trailing_zeros64(4)).toBe(2);
    expect(trailing_zeros64(8)).toBe(3);
    expect(trailing_zeros64(16)).toBe(4);
  });
});

describe('bitLength', () => {
  it('should return the right size for inputs up to 8', () => {

    const i: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    const exp: number[] = [
      0, 1, 2, 2, 3, 3, 3, 3, 4
    ]
    const got = i.map(bit_length);
    expect(got).toStrictEqual(exp)

    expect(bit_length(1)).toBe(1);
  });
});
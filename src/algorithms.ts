// The algorithms corresponding to the MMRIVER draft

import { ILeafAdder, Hasher } from "./interfaces.js";
import { LogField } from "./logvalue.js";
import { Index } from "./numbers.js";
import { concat_bytes } from "./bytes.js"
import { Numbers } from "./numbers.js";


export function add_leaf_hash(db: ILeafAdder, hasher: Hasher, f: LogField): Index {
    let g = 0;
    let i:Index = db.append(f);

    while (index_height(i) > g) {
      const left = db.get(i - (2 << g));
      const right = db.get(i - 1);

      i = db.append(hash_pos_pair64(hasher, i + 1, left, right));
      g += 1;
    }

    return i;

}

export function index_height(i: Index): number {
  let pos = i + 1
  while (!all_ones(pos)) {
      pos = pos - (most_sig_bit(pos) - 1)
  }

  return bit_length(pos) - 1
}

export function peaks(i: Index): Index[] {
  let peak = 0;
  const peaks: Index[] = [];
  let s = i + 1;

  while (s !== 0) {
      // Find the highest peak size in the current MMR(s)
      const highest_size = (1 << log2_floor(s + 1)) - 1;
      peak = peak + highest_size;
      peaks.push(peak - 1);
      s -= highest_size;
  }

  return peaks;
}

/**
 * Returns the count of leaf elements in MMR(i)
 * 
 *  The bits of the count also form a mask, where a single bit is set for each
 *  "peak" present in the accumulator. The bit position is the height of the
 *  binary tree committing the elements to the corresponding accumulator entry.
 * 
 * @param i 
 * @returns 
 */
export function leaf_count(i: Index): number {

  let s = i + 1;

  let peaksize = (1 << bit_length(s)) - 1;
  let peakmap = 0;
  while (peaksize > 0) {
    peakmap <<= 1;
    if (s >= peaksize) {
      s -= peaksize;
      peakmap |= 1;
    }
    peaksize >>= 1;
  }
  return peakmap
}

/**
 * Returns the node index for the leaf `e`
 * 
 * @param e - the leaf index, where the leaves are numbered consecutively, ignoring interior nodes
 * @returns The mmr index `i` for the element `e`
 */
export function mmr_index(e: Index): Index {
    let sum = 0;
    while (e > 0) {

        const h = bit_length(e)
        sum += (1 << h) - 1
        const half = 1 << (h - 1)
        e -= half
    }
    return sum
}

/** Returns the number of nodes above and to the left of i.
 * Assuming that i is a leaf. This is also the number of previous peak nodes
 * burried as a consequence of adding the leaf.
 */
export function height_leaft(i: Index): Index {
  return bit_length(i) - 1
}

/*
def mmr_index(e: int) -> int:
    """Returns the node index for the leaf `e`

    Args:
        e - the leaf index, where the leaves are numbered consecutively, ignoring interior nodes
    Returns:
        The mmr index `i` for the element `e`
    """
    sum = 0
    while e > 0:
        h = e.bit_length()
        sum += (1 << h) - 1
        half = 1 << (h - 1)
        e -= half
    return sum
*/
export function complete_mmr(i: Index): Index {
	let h0 = index_height(i)
	let h1 = index_height(i + 1)
	while(h0 < h1) {
		i++
		h0 = h1
		h1 = index_height(i + 1)
	}

	return i
}

export function hash_pos_pair64(hasher: Hasher, i: Index, left: LogField, right: LogField): LogField {
  return hasher(concat_bytes(Numbers.toBE64(i),left, right)) as LogField;
}

// 
// Binary primitives for the essential algorithms
// 

// Returns true if all bits, starting with the most significant, are 1
export function all_ones(pos: Index): boolean {
  const imsb = bit_length(pos) - 1
  const mask = (1 << (imsb+1)) - 1
  return pos === mask
}

// returns the number of bits set in the integer x (popcnt is webassembly only)
export function ones(x: Index): number {
  let count = 0;
  while (x !== 0) {
    count += x & 1;
    x >>= 1;
  }
  return count;
}

// returns the number of trailing zeros in the integer x,
// WARNING: this function is not defined for x > 2^32 -1
export function trailing_zeros64(x: Index): number {
  if (x < 0 || x > Math.pow(2, 32) - 1) {
    throw new RangeError('Input must be a positive integer within the range of a JavaScript safe integer (0 to 2^53 - 1)');
  }
  if (x === 0)
    return 64;

  return 31 - Math.clz32(x & -x);
}

export function most_sig_bit(x: Index): Index {
  return 1 << (bit_length(x) - 1);
}

// Returns the number of bits required to represent the integer x
export function bit_length(x: Index): number {
  if (x === 0) {
    return 0;
  }
  return log2_floor(x) + 1;
}

export function log2_floor(x: number): number {
  return Math.floor(Math.log2(x));
}


// The algorithms corresponding to the MMRIVER draft

import { Index, ILeafAdder, Hasher  } from "./interfaces.js";
import { concat_bytes, Numbers } from "./bytes.js"

/**
 * Adds the leaf hash value f to the MMR
 * 
 * Interior nodes are appended by this algorithm as necessary to for a complete mmr.
 * 
 * @param db an interface providing the required append and get methods.
 *    `db.append` must return the index for the next item to be added, and make the
 *     value added available to subsequent get calls in the same invocation.
 *     `db.get` must return the requested value or raise an exception.
 * @param hasher a function that hashes a byte array and returns a byte array
 * @param f the hash sized leaf value to add to the MMR
 * @returns 
 */
export function add_leaf_hash(db: ILeafAdder, hasher: Hasher, f: Uint8Array): Index {
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

/**
 * Returns the list of node indices whose values prove the inclusion of node i,
 * in the complete MMR, containing i, whose last index is c + 1.
 * 
 * Note that where i < c0; c0 < c1; the following hold, and are the basis of proofs of consistency.
 * 
 *   path_c0 = inclusion_proof_path(i, c0);
 *   path_c1 = inclusion_proof_path(parent(last_item(path[c])]), c1);
 *   inclusion_proof_path(i, c1) == [...path_c0, ...path_c1]
 * 
 * @param i The index of the node to whose inclusion path is required.
 * @param c The index of the last node of any complete MMR that contains i.
 * @returns The inclusion path of i with respect to c
 */
export function inclusion_proof_path(i: Index, c: Index): Index[] {
  // set the path to the empty list
  const path: Index[] = [];

  // Set `g` to `index_height(i)`
  let g = index_height(i)

  // Repeat until #termination_condition evaluates true
  let isibling: Index
  while (true) {

    // Set `siblingoffset` to 2^(g+1)
    let siblingoffset = (2 << g)

    // If `index_height(i+1)` is greater than `g`
    if (index_height(i+1) > g) {

      // Set isibling to `i - siblingoffset + 1`. because i is the right
      // sibling, its witness is the left which is offset behind.
      isibling = i - siblingoffset + 1

      // Set `i` to `i+1`. the parent of a right sibling is always
      // stored immediately after.
      i += 1
    } else {

        // Set isibling to `i + siblingoffset - 1`. because i is the left
        // sibling, its witness is the right and is offset ahead.
        isibling = i + siblingoffset - 1

        // Set `i` to `i+siblingoffset`. the parent of a left sibling is
        // stored at 1 position ahead of the right sibling.
        i += siblingoffset
    }

    // If `isibling` is greater than `ix`, return the collected path. this is
    // the #termination_condition
    if (isibling > c)
        return path;

    // Append isibling to the proof.
    path.push(isibling)
    // Increment the height index `g`.
    g += 1
  }

  return path;
}

/**
 * Apply the proof to value to produce the implied root
 * 
 * Note that any MMR node can be proven, leaves and interiors alike.
 * 
 * For a valid cose receipt of inclusion, using the returned root as the
 * detached payload will result in a receipt message whose signature can be
 * verified.
 *
 * @param hasher - applies the configured hash
 * @param i - the mmr index of the node to be proven
 * @param value - the value of the node to be proven
 * @param proof - the list of sibling nodes required to prove the inclusion of the node
 * @returns the root hash produced for value using the proof
 */
export function included_root(
  hasher: Hasher, i: Index, value: Uint8Array, proof: Uint8Array[]): Uint8Array {

  // set `root` to the value whose inclusion is to be proven
  let root = value;

  // set g to the zero based height of i, this allows for interior node proofs
  // and hence proofs of consistency based on inclusion proofs.
  let g = index_height(i);

  // for each sibling in the proof
  for (const sibling of proof) {
    // if the height of the entry immediately after i is greater than g, then
    // i is a right child.
    if (index_height(i + 1) > g) {
        // advance i to the parent. As i is a right child, the parent is at `i+1`
        i = i + 1;
        // Set `root` to `H(i+1 || sibling || root)` (we hash the positions)
        root = hash_pos_pair64(hasher, i+1, sibling, root);
    } else {
        // Advance i to the parent. As i is a left child, the parent is at `i + (2^(g+1))`
        i = i + (2 << g);
        // Set `root` to `H(i+1 || root || sibling)`
        root = hash_pos_pair64(hasher, i+1, root, sibling);
    }

    // Set g to the height index above the current
    g = g + 1;
  }
  // Return the hash produced. If the path length was zero, the original nodehash is returned
  return root
}

/**
 * Returns the proof paths showing consistency between the MMR's identified by ifrom and ito.
 * 
 *  The proof is an inclusion path for each peak in MMR(ifrom) in MMR(ito)
 * 
 * @param ifrom 
 * @param ito 
 */
export function consistency_proof_paths(ifrom: Index, ito: Index): Index[][] {
  const frompeaks = peaks(ifrom);
  const proof: Index[][] = [];
  for (const ipeak of frompeaks)
    proof.push(inclusion_proof_path(ipeak, ito));
  return proof;
}

/**
 * Apply the inclusion paths for each origin accumulator peak
 * The returned list will be a descending height ordered list of elements from
 * the accumulator for the consistent future state. It may be *exactly* the
 * future accumulator or it may be a prefix of it.
 *
 * For a valid COSE Receipt of consistency, using the returned array as the
 * detached payload will result in a receipt message whose signature can be
 * verified.
 *
 * @param ifrom 
 * @param accumulatorfrom 
 * @param proofs 
 */
export function consistent_roots(
  hasher: Hasher,
  ifrom: Index,
  accumulatorfrom: Uint8Array[],
  proofs: Uint8Array[][],
): Uint8Array[] {
    // It is an error if the lengths of frompeaks, paths and accumulatorfrom are not all equal.
    const frompeaks = peaks(ifrom)
    if (frompeaks.length != accumulatorfrom.length)
      throw new Error(`accumulator has invalid length for index ifrom`)
    if (frompeaks.length != proofs.length)
      throw new Error(`incorrect proof count for the provided accumulator`)

    const roots: Uint8Array[] = [];
    for (let i = 0; i < accumulatorfrom.length; i++) {
      const root = included_root(hasher, frompeaks[i], accumulatorfrom[i], proofs[i]);
      // Many peaks from the old accumulator may be under the same parent in the
      // new accumulator.
      if (roots.length && bytes_equal(roots[roots.length - 1], root))
        continue;
      roots.push(root);
    }

    return roots
}

/*
 * Essential supporting algorithms
 */

/**Returns the 0 based height of the MMR index i */
export function index_height(i: Index): number {
  let pos = i + 1
  while (!all_ones(pos)) {
      pos = pos - (most_sig_bit(pos) - 1)
  }

  return bit_length(pos) - 1
}

/**Returns the peak indices for MMR(i) in highest to lowest order */
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

/** Returns the interior parent node value for the node with *position* pos,
 * whose children are left, right
 * This commits the position of the the parent in the mmr to it's hash
 */
export function hash_pos_pair64(
  hasher: Hasher, pos: Index, left: Uint8Array, right: Uint8Array): Uint8Array {
  return hasher(concat_bytes(Numbers.toBE64(pos),left, right));
}

/* 
 * Byte and binary primitives for the essential algorithms
 */ 

export function bytes_equal(a: Uint8Array, b: Uint8Array): boolean {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

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

/*
 * Complimentary algorithms required by typical implementations
 */

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

/**
 * Returns the first complete mmr index which contains i
 * A complete mmr index is defined as the first left sibling node above or equal to i.
 * @param i an mmr index
 * @returns a complete mmr index, if i is complete i is returned.
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

/**
 * Returns the mmr index of the peak root containing `i` in MMR(c)
 * 
 * @param i - The mmr index for the element of interest
 * @param c - The identifying last index of the MMR state containing i
 */
export function accumulator_root(i: Index, c: Index): Index {
    let s = c + 1

    let peaksize = (1 << bit_length(s)) - 1
    let r = 0
    while (peaksize > 0) {
      // If the next peak size exceeds the size identifying the accumulator, it
      // is not included in the accumulator.
      if (r + peaksize > s) {
          peaksize >>= 1
          continue
      }

      // The first peak that surpasses i, without exceeding s, is the root for i
      if (r + peaksize > i)
          return r + peaksize - 1

      r += peaksize

      peaksize >>= 1
    }

    return r
}


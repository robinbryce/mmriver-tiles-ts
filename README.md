# mmriver-tiles-ts

typescript implementation of a verifiable log based on MMR's

With a tile like interface for contrast with tiles a'la RFC 9162 and sunlight

Usage


```
// Note: bundling tbd, so imports should be direct for now
import { sha256, TileStorageProvider, TileLog, kat32_leaves } from 'mmriver';

const storage = new TileStorageProvider(':memory:');
const params =  {
    tile_height, hash_size,
    hash_function: sha256,
    storage
 };

 // tile_height would typically be around 12-15,
 // here we use 1, which matches the tests, and results in a log whose tiles each contain 2 leaves.
 const params = {tile_height: 1, hash_size: 32, hash_function: sha256, storage};
 const log = new TileLog(params);

 log.append(kat39_leaves); // canonical Known Answer Test leaves

 // leaf 2 is mmr index 3, getting the proof for MMR(15) to MMR(25) will always produce the peak at 14

 const proof: Uint8Array[] = inclusion_proof_path(2, 15).map((i) => log.get(i));
 const root = new Uint8Array(included_root(log.cfg.hash_function, 2, log.get(2), proof));
 if (!bytes_equal(root, hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112")))
   throw new Error("inclusion proof failed");

```

See [tilelog.test.ts](./test/tilelog.test.ts), [tiles.test.ts](./test/tiles.test.ts) and [algorithms.test.ts](./test/algorithms.test.ts) for more examples
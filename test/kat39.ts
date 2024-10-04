import { hex2bytes } from '../src/bytes.js';

/** the kat39 test tree.
 
	4                         30
	
	
	3              14                       29
	             /    \
	          /          \
	2        6            13           21             28                37
	       /   \        /    \
	1     2     5      9     12     17     20     24       27       33      36
	     / \   / \    / \   /  \   /  \
	0   0   1 3   4  7   8 10  11 15  16 18  19 22  23   25   26  31  32   34  35   38
	.   0 . 1 2 . 3 .4 . 5  6 . 7  8 . 9 10  11 12  13   14   15  16  17   18  19   20
 */

export const kat39_mmr_index_heights = [
  0, 0, 1, 0, 0, 1, 2, 0, 0, 1, 0, 0, 1, 2, 3, 0, 0, 1, 0, 0, 1, 2, 0, 0, 1, 0, 0, 1, 2, 3, 4, 0, 0, 1, 0, 0, 1, 2, 0];
export const kat39_complete_mmr_indices = [
  0, 2, 2, 3, 6, 6, 6, 7, 9, 9, 10, 14, 14, 14, 14, 15, 17, 17, 18, 21, 21, 21, 22, 24, 24, 25, 30, 30, 30, 30, 30, 31, 33, 33, 34, 37, 37, 37, 38];

export const kat39_mmr_index_of_leaf = [
		[0, 0],
		[1, 1],
		[2, 3],
		[3, 4],
		[4, 7],
		[5, 8],
		[6, 10],
		[7, 11],
		[8, 15],
		[9, 16],
		[10, 18],
		[11, 19],
		[12, 22],
		[13, 23],
		[14, 25],
		[15, 26],
		[16, 31],
		[17, 32],
		[18, 34],
		[19, 35],
		[20, 38],
  ]

export const kat39_peak_indices_map = new Map<number, number[]>([
  [0,  [0]],
  [2,  [2]],
  [3,  [2, 3]],
  [6,  [6]],
  [7,  [6, 7]],
  [9,  [6, 9]],
  [10, [6, 9, 10]],
  [14, [14]],
  [15, [14, 15]],
  [17, [14, 17]],
  [18, [14, 17, 18]],
  [21, [14, 21]],
  [22, [14, 21, 22]],
  [24, [14, 21, 24]],
  [25, [14, 21, 24, 25]],
  [30, [30]],
  [31, [30, 31]],
  [33, [30, 33]],
  [34, [30, 33, 34]],
  [37, [30, 37]],
  [38, [30, 37, 38]],
]);

export const kat39_leaves: (Uint8Array & {length:32})[] = [
	hex2bytes("af5570f5a1810b7af78caf4bc70a660f0df51e42baf91d4de5b2328de0e83dfc") as Uint8Array & {length:32},
	hex2bytes("cd2662154e6d76b2b2b92e70c0cac3ccf534f9b74eb5b89819ec509083d00a50") as Uint8Array & {length:32},
	hex2bytes("d5688a52d55a02ec4aea5ec1eadfffe1c9e0ee6a4ddbe2377f98326d42dfc975") as Uint8Array & {length:32},
	hex2bytes("8005f02d43fa06e7d0585fb64c961d57e318b27a145c857bcd3a6bdb413ff7fc") as Uint8Array & {length:32},
	hex2bytes("a3eb8db89fc5123ccfd49585059f292bc40a1c0d550b860f24f84efb4760fbf2") as Uint8Array & {length:32},
	hex2bytes("4c0e071832d527694adea57b50dd7b2164c2a47c02940dcf26fa07c44d6d222a") as Uint8Array & {length:32},
	hex2bytes("8d85f8467240628a94819b26bee26e3a9b2804334c63482deacec8d64ab4e1e7") as Uint8Array & {length:32},
	hex2bytes("0b5000b73a53f0916c93c68f4b9b6ba8af5a10978634ae4f2237e1f3fbe324fa") as Uint8Array & {length:32},
	hex2bytes("e66c57014a6156061ae669809ec5d735e484e8fcfd540e110c9b04f84c0b4504") as Uint8Array & {length:32},
	hex2bytes("998e907bfbb34f71c66b6dc6c40fe98ca6d2d5a29755bc5a04824c36082a61d1") as Uint8Array & {length:32},
	hex2bytes("5bc67471c189d78c76461dcab6141a733bdab3799d1d69e0c419119c92e82b3d") as Uint8Array & {length:32},
	hex2bytes("1b8d0103e3a8d9ce8bda3bff71225be4b5bb18830466ae94f517321b7ecc6f94") as Uint8Array & {length:32},
	hex2bytes("7a42e3892368f826928202014a6ca95a3d8d846df25088da80018663edf96b1c") as Uint8Array & {length:32},
	hex2bytes("aed2b8245fdc8acc45eda51abc7d07e612c25f05cadd1579f3474f0bf1f6bdc6") as Uint8Array & {length:32},
	hex2bytes("561f627b4213258dc8863498bb9b07c904c3c65a78c1a36bca329154d1ded213") as Uint8Array & {length:32},
	hex2bytes("1209fe3bc3497e47376dfbd9df0600a17c63384c85f859671956d8289e5a0be8") as Uint8Array & {length:32},
	hex2bytes("1664a6e0ea12d234b4911d011800bb0f8c1101a0f9a49a91ee6e2493e34d8e7b") as Uint8Array & {length:32},
	hex2bytes("707d56f1f282aee234577e650bea2e7b18bb6131a499582be18876aba99d4b60") as Uint8Array & {length:32},
	hex2bytes("4d75f61869104baa4ccff5be73311be9bdd6cc31779301dfc699479403c8a786") as Uint8Array & {length:32},
	hex2bytes("0764c726a72f8e1d245f332a1d022fffdada0c4cb2a016886e4b33b66cb9a53f") as Uint8Array & {length:32},
	hex2bytes("e9a5f5201eb3c3c856e0a224527af5ac7eb1767fb1aff9bd53ba41a60cde9785") as Uint8Array & {length:32},
]

export const kat39_nodes: (Uint8Array & {length:32})[] = [
	hex2bytes("af5570f5a1810b7af78caf4bc70a660f0df51e42baf91d4de5b2328de0e83dfc") as Uint8Array & {length: 32},
	hex2bytes("cd2662154e6d76b2b2b92e70c0cac3ccf534f9b74eb5b89819ec509083d00a50") as Uint8Array & {length: 32},
	hex2bytes("ad104051c516812ea5874ca3ff06d0258303623d04307c41ec80a7a18b332ef8") as Uint8Array & {length: 32},
	hex2bytes("d5688a52d55a02ec4aea5ec1eadfffe1c9e0ee6a4ddbe2377f98326d42dfc975") as Uint8Array & {length: 32},
	hex2bytes("8005f02d43fa06e7d0585fb64c961d57e318b27a145c857bcd3a6bdb413ff7fc") as Uint8Array & {length: 32},
	hex2bytes("9a18d3bc0a7d505ef45f985992270914cc02b44c91ccabba448c546a4b70f0f0") as Uint8Array & {length: 32},
	hex2bytes("827f3213c1de0d4c6277caccc1eeca325e45dfe2c65adce1943774218db61f88") as Uint8Array & {length: 32},
	hex2bytes("a3eb8db89fc5123ccfd49585059f292bc40a1c0d550b860f24f84efb4760fbf2") as Uint8Array & {length: 32},
	hex2bytes("4c0e071832d527694adea57b50dd7b2164c2a47c02940dcf26fa07c44d6d222a") as Uint8Array & {length: 32},
	hex2bytes("b8faf5f748f149b04018491a51334499fd8b6060c42a835f361fa9665562d12d") as Uint8Array & {length: 32},
	hex2bytes("8d85f8467240628a94819b26bee26e3a9b2804334c63482deacec8d64ab4e1e7") as Uint8Array & {length: 32},
	hex2bytes("0b5000b73a53f0916c93c68f4b9b6ba8af5a10978634ae4f2237e1f3fbe324fa") as Uint8Array & {length: 32},
	hex2bytes("6f3360ad3e99ab4ba39f2cbaf13da56ead8c9e697b03b901532ced50f7030fea") as Uint8Array & {length: 32},
	hex2bytes("508326f17c5f2769338cb00105faba3bf7862ca1e5c9f63ba2287e1f3cf2807a") as Uint8Array & {length: 32},
	hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
	hex2bytes("e66c57014a6156061ae669809ec5d735e484e8fcfd540e110c9b04f84c0b4504") as Uint8Array & {length: 32},
	hex2bytes("998e907bfbb34f71c66b6dc6c40fe98ca6d2d5a29755bc5a04824c36082a61d1") as Uint8Array & {length: 32},
	hex2bytes("f4a0db79de0fee128fbe95ecf3509646203909dc447ae911aa29416bf6fcba21") as Uint8Array & {length: 32},
	hex2bytes("5bc67471c189d78c76461dcab6141a733bdab3799d1d69e0c419119c92e82b3d") as Uint8Array & {length: 32},
	hex2bytes("1b8d0103e3a8d9ce8bda3bff71225be4b5bb18830466ae94f517321b7ecc6f94") as Uint8Array & {length: 32},
	hex2bytes("0a4d7e66c92de549b765d9e2191027ff2a4ea8a7bd3eb04b0ed8ee063bad1f70") as Uint8Array & {length: 32},
	hex2bytes("61b3ff808934301578c9ed7402e3dd7dfe98b630acdf26d1fd2698a3c4a22710") as Uint8Array & {length: 32},
	hex2bytes("7a42e3892368f826928202014a6ca95a3d8d846df25088da80018663edf96b1c") as Uint8Array & {length: 32},
	hex2bytes("aed2b8245fdc8acc45eda51abc7d07e612c25f05cadd1579f3474f0bf1f6bdc6") as Uint8Array & {length: 32},
	hex2bytes("dd7efba5f1824103f1fa820a5c9e6cd90a82cf123d88bd035c7e5da0aba8a9ae") as Uint8Array & {length: 32},
	hex2bytes("561f627b4213258dc8863498bb9b07c904c3c65a78c1a36bca329154d1ded213") as Uint8Array & {length: 32},
	hex2bytes("1209fe3bc3497e47376dfbd9df0600a17c63384c85f859671956d8289e5a0be8") as Uint8Array & {length: 32},
	hex2bytes("6b4a3bd095c63d1dffae1ac03eb8264fdce7d51d2ac26ad0ebf9847f5b9be230") as Uint8Array & {length: 32},
	hex2bytes("4459f4d6c764dbaa6ebad24b0a3df644d84c3527c961c64aab2e39c58e027eb1") as Uint8Array & {length: 32},
	hex2bytes("77651b3eec6774e62545ae04900c39a32841e2b4bac80e2ba93755115252aae1") as Uint8Array & {length: 32},
	hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
	hex2bytes("1664a6e0ea12d234b4911d011800bb0f8c1101a0f9a49a91ee6e2493e34d8e7b") as Uint8Array & {length: 32},
	hex2bytes("707d56f1f282aee234577e650bea2e7b18bb6131a499582be18876aba99d4b60") as Uint8Array & {length: 32},
	hex2bytes("0c9f36783b5929d43c97fe4b170d12137e6950ef1b3a8bd254b15bbacbfdee7f") as Uint8Array & {length: 32},
	hex2bytes("4d75f61869104baa4ccff5be73311be9bdd6cc31779301dfc699479403c8a786") as Uint8Array & {length: 32},
	hex2bytes("0764c726a72f8e1d245f332a1d022fffdada0c4cb2a016886e4b33b66cb9a53f") as Uint8Array & {length: 32},
	hex2bytes("c861552e9e17c41447d375c37928f9fa5d387d1e8470678107781c20a97ebc8f") as Uint8Array & {length: 32},
	hex2bytes("6a169105dcc487dbbae5747a0fd9b1d33a40320cf91cf9a323579139e7ff72aa") as Uint8Array & {length: 32},
	hex2bytes("e9a5f5201eb3c3c856e0a224527af5ac7eb1767fb1aff9bd53ba41a60cde9785") as Uint8Array & {length: 32},
]

export const kat39_included_roots: (Uint8Array & {length: 32})[][] = [
  // 0 in mmr's 0 - 38
[
  hex2bytes("ad104051c516812ea5874ca3ff06d0258303623d04307c41ec80a7a18b332ef8") as Uint8Array & {length: 32},
  hex2bytes("ad104051c516812ea5874ca3ff06d0258303623d04307c41ec80a7a18b332ef8") as Uint8Array & {length: 32},
  hex2bytes("827f3213c1de0d4c6277caccc1eeca325e45dfe2c65adce1943774218db61f88") as Uint8Array & {length: 32},
  hex2bytes("827f3213c1de0d4c6277caccc1eeca325e45dfe2c65adce1943774218db61f88") as Uint8Array & {length: 32},
  hex2bytes("827f3213c1de0d4c6277caccc1eeca325e45dfe2c65adce1943774218db61f88") as Uint8Array & {length: 32},
  hex2bytes("827f3213c1de0d4c6277caccc1eeca325e45dfe2c65adce1943774218db61f88") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  ],
  
  // 1 in mmr's 1 - 38
  [
  hex2bytes("ad104051c516812ea5874ca3ff06d0258303623d04307c41ec80a7a18b332ef8") as Uint8Array & {length: 32},
  hex2bytes("ad104051c516812ea5874ca3ff06d0258303623d04307c41ec80a7a18b332ef8") as Uint8Array & {length: 32},
  hex2bytes("827f3213c1de0d4c6277caccc1eeca325e45dfe2c65adce1943774218db61f88") as Uint8Array & {length: 32},
  hex2bytes("827f3213c1de0d4c6277caccc1eeca325e45dfe2c65adce1943774218db61f88") as Uint8Array & {length: 32},
  hex2bytes("827f3213c1de0d4c6277caccc1eeca325e45dfe2c65adce1943774218db61f88") as Uint8Array & {length: 32},
  hex2bytes("827f3213c1de0d4c6277caccc1eeca325e45dfe2c65adce1943774218db61f88") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  ],
  
  // 2 in mmr's 2 - 38
  [
  hex2bytes("ad104051c516812ea5874ca3ff06d0258303623d04307c41ec80a7a18b332ef8") as Uint8Array & {length: 32},
  hex2bytes("827f3213c1de0d4c6277caccc1eeca325e45dfe2c65adce1943774218db61f88") as Uint8Array & {length: 32},
  hex2bytes("827f3213c1de0d4c6277caccc1eeca325e45dfe2c65adce1943774218db61f88") as Uint8Array & {length: 32},
  hex2bytes("827f3213c1de0d4c6277caccc1eeca325e45dfe2c65adce1943774218db61f88") as Uint8Array & {length: 32},
  hex2bytes("827f3213c1de0d4c6277caccc1eeca325e45dfe2c65adce1943774218db61f88") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  ],
  
  // 3 in mmr's 3 - 38
  [
  hex2bytes("827f3213c1de0d4c6277caccc1eeca325e45dfe2c65adce1943774218db61f88") as Uint8Array & {length: 32},
  hex2bytes("827f3213c1de0d4c6277caccc1eeca325e45dfe2c65adce1943774218db61f88") as Uint8Array & {length: 32},
  hex2bytes("827f3213c1de0d4c6277caccc1eeca325e45dfe2c65adce1943774218db61f88") as Uint8Array & {length: 32},
  hex2bytes("827f3213c1de0d4c6277caccc1eeca325e45dfe2c65adce1943774218db61f88") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  ],
  
  // 4 in mmr's 4 - 38
  [
  hex2bytes("827f3213c1de0d4c6277caccc1eeca325e45dfe2c65adce1943774218db61f88") as Uint8Array & {length: 32},
  hex2bytes("827f3213c1de0d4c6277caccc1eeca325e45dfe2c65adce1943774218db61f88") as Uint8Array & {length: 32},
  hex2bytes("827f3213c1de0d4c6277caccc1eeca325e45dfe2c65adce1943774218db61f88") as Uint8Array & {length: 32},
  hex2bytes("827f3213c1de0d4c6277caccc1eeca325e45dfe2c65adce1943774218db61f88") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  ],
  
  // 5 in mmr's 5 - 38
  [
  hex2bytes("827f3213c1de0d4c6277caccc1eeca325e45dfe2c65adce1943774218db61f88") as Uint8Array & {length: 32},
  hex2bytes("827f3213c1de0d4c6277caccc1eeca325e45dfe2c65adce1943774218db61f88") as Uint8Array & {length: 32},
  hex2bytes("827f3213c1de0d4c6277caccc1eeca325e45dfe2c65adce1943774218db61f88") as Uint8Array & {length: 32},
  hex2bytes("827f3213c1de0d4c6277caccc1eeca325e45dfe2c65adce1943774218db61f88") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  ],
  
  // 6 in mmr's 6 - 38
  [
  hex2bytes("827f3213c1de0d4c6277caccc1eeca325e45dfe2c65adce1943774218db61f88") as Uint8Array & {length: 32},
  hex2bytes("827f3213c1de0d4c6277caccc1eeca325e45dfe2c65adce1943774218db61f88") as Uint8Array & {length: 32},
  hex2bytes("827f3213c1de0d4c6277caccc1eeca325e45dfe2c65adce1943774218db61f88") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  ],
  
  // 7 in mmr's 7 - 38
  [
  hex2bytes("b8faf5f748f149b04018491a51334499fd8b6060c42a835f361fa9665562d12d") as Uint8Array & {length: 32},
  hex2bytes("b8faf5f748f149b04018491a51334499fd8b6060c42a835f361fa9665562d12d") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  ],
  
  // 8 in mmr's 8 - 38
  [
  hex2bytes("b8faf5f748f149b04018491a51334499fd8b6060c42a835f361fa9665562d12d") as Uint8Array & {length: 32},
  hex2bytes("b8faf5f748f149b04018491a51334499fd8b6060c42a835f361fa9665562d12d") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  ],
  
  // 9 in mmr's 9 - 38
  [
  hex2bytes("b8faf5f748f149b04018491a51334499fd8b6060c42a835f361fa9665562d12d") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  ],
  
  // 10 in mmr's 10 - 38
  [
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  ],
  
  // 11 in mmr's 11 - 38
  [
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  ],
  
  // 12 in mmr's 12 - 38
  [
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  ],
  
  // 13 in mmr's 13 - 38
  [
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  ],
  
  // 14 in mmr's 14 - 38
  [
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("78b2b4162eb2c58b229288bbcb5b7d97c7a1154eed3161905fb0f180eba6f112") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  ],
  
  // 15 in mmr's 15 - 38
  [
  hex2bytes("f4a0db79de0fee128fbe95ecf3509646203909dc447ae911aa29416bf6fcba21") as Uint8Array & {length: 32},
  hex2bytes("f4a0db79de0fee128fbe95ecf3509646203909dc447ae911aa29416bf6fcba21") as Uint8Array & {length: 32},
  hex2bytes("61b3ff808934301578c9ed7402e3dd7dfe98b630acdf26d1fd2698a3c4a22710") as Uint8Array & {length: 32},
  hex2bytes("61b3ff808934301578c9ed7402e3dd7dfe98b630acdf26d1fd2698a3c4a22710") as Uint8Array & {length: 32},
  hex2bytes("61b3ff808934301578c9ed7402e3dd7dfe98b630acdf26d1fd2698a3c4a22710") as Uint8Array & {length: 32},
  hex2bytes("61b3ff808934301578c9ed7402e3dd7dfe98b630acdf26d1fd2698a3c4a22710") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  ],
  
  // 16 in mmr's 16 - 38
  [
  hex2bytes("f4a0db79de0fee128fbe95ecf3509646203909dc447ae911aa29416bf6fcba21") as Uint8Array & {length: 32},
  hex2bytes("f4a0db79de0fee128fbe95ecf3509646203909dc447ae911aa29416bf6fcba21") as Uint8Array & {length: 32},
  hex2bytes("61b3ff808934301578c9ed7402e3dd7dfe98b630acdf26d1fd2698a3c4a22710") as Uint8Array & {length: 32},
  hex2bytes("61b3ff808934301578c9ed7402e3dd7dfe98b630acdf26d1fd2698a3c4a22710") as Uint8Array & {length: 32},
  hex2bytes("61b3ff808934301578c9ed7402e3dd7dfe98b630acdf26d1fd2698a3c4a22710") as Uint8Array & {length: 32},
  hex2bytes("61b3ff808934301578c9ed7402e3dd7dfe98b630acdf26d1fd2698a3c4a22710") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  ],
  
  // 17 in mmr's 17 - 38
  [
  hex2bytes("f4a0db79de0fee128fbe95ecf3509646203909dc447ae911aa29416bf6fcba21") as Uint8Array & {length: 32},
  hex2bytes("61b3ff808934301578c9ed7402e3dd7dfe98b630acdf26d1fd2698a3c4a22710") as Uint8Array & {length: 32},
  hex2bytes("61b3ff808934301578c9ed7402e3dd7dfe98b630acdf26d1fd2698a3c4a22710") as Uint8Array & {length: 32},
  hex2bytes("61b3ff808934301578c9ed7402e3dd7dfe98b630acdf26d1fd2698a3c4a22710") as Uint8Array & {length: 32},
  hex2bytes("61b3ff808934301578c9ed7402e3dd7dfe98b630acdf26d1fd2698a3c4a22710") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  ],
  
  // 18 in mmr's 18 - 38
  [
  hex2bytes("61b3ff808934301578c9ed7402e3dd7dfe98b630acdf26d1fd2698a3c4a22710") as Uint8Array & {length: 32},
  hex2bytes("61b3ff808934301578c9ed7402e3dd7dfe98b630acdf26d1fd2698a3c4a22710") as Uint8Array & {length: 32},
  hex2bytes("61b3ff808934301578c9ed7402e3dd7dfe98b630acdf26d1fd2698a3c4a22710") as Uint8Array & {length: 32},
  hex2bytes("61b3ff808934301578c9ed7402e3dd7dfe98b630acdf26d1fd2698a3c4a22710") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  ],
  
  // 19 in mmr's 19 - 38
  [
  hex2bytes("61b3ff808934301578c9ed7402e3dd7dfe98b630acdf26d1fd2698a3c4a22710") as Uint8Array & {length: 32},
  hex2bytes("61b3ff808934301578c9ed7402e3dd7dfe98b630acdf26d1fd2698a3c4a22710") as Uint8Array & {length: 32},
  hex2bytes("61b3ff808934301578c9ed7402e3dd7dfe98b630acdf26d1fd2698a3c4a22710") as Uint8Array & {length: 32},
  hex2bytes("61b3ff808934301578c9ed7402e3dd7dfe98b630acdf26d1fd2698a3c4a22710") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  ],
  
  // 20 in mmr's 20 - 38
  [
  hex2bytes("61b3ff808934301578c9ed7402e3dd7dfe98b630acdf26d1fd2698a3c4a22710") as Uint8Array & {length: 32},
  hex2bytes("61b3ff808934301578c9ed7402e3dd7dfe98b630acdf26d1fd2698a3c4a22710") as Uint8Array & {length: 32},
  hex2bytes("61b3ff808934301578c9ed7402e3dd7dfe98b630acdf26d1fd2698a3c4a22710") as Uint8Array & {length: 32},
  hex2bytes("61b3ff808934301578c9ed7402e3dd7dfe98b630acdf26d1fd2698a3c4a22710") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  ],
  
  // 21 in mmr's 21 - 38
  [
  hex2bytes("61b3ff808934301578c9ed7402e3dd7dfe98b630acdf26d1fd2698a3c4a22710") as Uint8Array & {length: 32},
  hex2bytes("61b3ff808934301578c9ed7402e3dd7dfe98b630acdf26d1fd2698a3c4a22710") as Uint8Array & {length: 32},
  hex2bytes("61b3ff808934301578c9ed7402e3dd7dfe98b630acdf26d1fd2698a3c4a22710") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  ],
  
  // 22 in mmr's 22 - 38
  [
  hex2bytes("dd7efba5f1824103f1fa820a5c9e6cd90a82cf123d88bd035c7e5da0aba8a9ae") as Uint8Array & {length: 32},
  hex2bytes("dd7efba5f1824103f1fa820a5c9e6cd90a82cf123d88bd035c7e5da0aba8a9ae") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  ],
  
  // 23 in mmr's 23 - 38
  [
  hex2bytes("dd7efba5f1824103f1fa820a5c9e6cd90a82cf123d88bd035c7e5da0aba8a9ae") as Uint8Array & {length: 32},
  hex2bytes("dd7efba5f1824103f1fa820a5c9e6cd90a82cf123d88bd035c7e5da0aba8a9ae") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  ],
  
  // 24 in mmr's 24 - 38
  [
  hex2bytes("dd7efba5f1824103f1fa820a5c9e6cd90a82cf123d88bd035c7e5da0aba8a9ae") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  ],
  
  // 25 in mmr's 25 - 38
  [
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  ],
  
  // 26 in mmr's 26 - 38
  [
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  ],
  
  // 27 in mmr's 27 - 38
  [
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  ],
  
  // 28 in mmr's 28 - 38
  [
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  ],
  
  // 29 in mmr's 29 - 38
  [
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  ],
  
  // 30 in mmr's 30 - 38
  [
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  hex2bytes("d4fb5649422ff2eaf7b1c0b851585a8cfd14fb08ce11addb30075a96309582a7") as Uint8Array & {length: 32},
  ],
  
  // 31 in mmr's 31 - 38
  [
  hex2bytes("0c9f36783b5929d43c97fe4b170d12137e6950ef1b3a8bd254b15bbacbfdee7f") as Uint8Array & {length: 32},
  hex2bytes("0c9f36783b5929d43c97fe4b170d12137e6950ef1b3a8bd254b15bbacbfdee7f") as Uint8Array & {length: 32},
  hex2bytes("6a169105dcc487dbbae5747a0fd9b1d33a40320cf91cf9a323579139e7ff72aa") as Uint8Array & {length: 32},
  hex2bytes("6a169105dcc487dbbae5747a0fd9b1d33a40320cf91cf9a323579139e7ff72aa") as Uint8Array & {length: 32},
  ],
  
  // 32 in mmr's 32 - 38
  [
  hex2bytes("0c9f36783b5929d43c97fe4b170d12137e6950ef1b3a8bd254b15bbacbfdee7f") as Uint8Array & {length: 32},
  hex2bytes("0c9f36783b5929d43c97fe4b170d12137e6950ef1b3a8bd254b15bbacbfdee7f") as Uint8Array & {length: 32},
  hex2bytes("6a169105dcc487dbbae5747a0fd9b1d33a40320cf91cf9a323579139e7ff72aa") as Uint8Array & {length: 32},
  hex2bytes("6a169105dcc487dbbae5747a0fd9b1d33a40320cf91cf9a323579139e7ff72aa") as Uint8Array & {length: 32},
  ],
  
  // 33 in mmr's 33 - 38
  [
  hex2bytes("0c9f36783b5929d43c97fe4b170d12137e6950ef1b3a8bd254b15bbacbfdee7f") as Uint8Array & {length: 32},
  hex2bytes("6a169105dcc487dbbae5747a0fd9b1d33a40320cf91cf9a323579139e7ff72aa") as Uint8Array & {length: 32},
  hex2bytes("6a169105dcc487dbbae5747a0fd9b1d33a40320cf91cf9a323579139e7ff72aa") as Uint8Array & {length: 32},
  ],
  
  // 34 in mmr's 34 - 38
  [
  hex2bytes("6a169105dcc487dbbae5747a0fd9b1d33a40320cf91cf9a323579139e7ff72aa") as Uint8Array & {length: 32},
  hex2bytes("6a169105dcc487dbbae5747a0fd9b1d33a40320cf91cf9a323579139e7ff72aa") as Uint8Array & {length: 32},
  ],
  
  // 35 in mmr's 35 - 38
  [
  hex2bytes("6a169105dcc487dbbae5747a0fd9b1d33a40320cf91cf9a323579139e7ff72aa") as Uint8Array & {length: 32},
  hex2bytes("6a169105dcc487dbbae5747a0fd9b1d33a40320cf91cf9a323579139e7ff72aa") as Uint8Array & {length: 32},
  ],
  
  // 36 in mmr's 36 - 38
  [
  hex2bytes("6a169105dcc487dbbae5747a0fd9b1d33a40320cf91cf9a323579139e7ff72aa") as Uint8Array & {length: 32},
  hex2bytes("6a169105dcc487dbbae5747a0fd9b1d33a40320cf91cf9a323579139e7ff72aa") as Uint8Array & {length: 32},
  ],
  
  // 37 in mmr's 37 - 38
  [
  hex2bytes("6a169105dcc487dbbae5747a0fd9b1d33a40320cf91cf9a323579139e7ff72aa") as Uint8Array & {length: 32},
  ],
  
  // 38 in mmr's 38 - 38
  [
  ]
]
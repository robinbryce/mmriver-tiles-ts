
export function hex2bytes(hex: string): Uint8Array {
  // Remove the '0x' prefix if it exists
  if (hex.startsWith('0x'))
      hex = hex.slice(2);

  // Ensure the hex string has an even length
  if (hex.length % 2 !== 0)
      hex = '0' + hex;

  const byteArray = new Uint8Array(hex.length / 2);

  // Convert each pair of hex characters to a byte
  for (let i = 0; i < hex.length; i += 2)
      byteArray[i / 2] = parseInt(hex.slice(i, i+2), 16);

  return byteArray;
}

// Returns a new Uint8Array that is the concatenation of all the arguments
export function concat_bytes(...inputs: Uint8Array[]): Uint8Array {
  const length = inputs.reduce((acc, input) => acc + input.length, 0);
  const c = new Uint8Array(length)
  for (let i = 0, j = 0; i < inputs.length; i++) {
    c.set(inputs[i], j);
    j += inputs[i].length;
  }
  return c
}

export namespace Numbers {

  export function toBE64(n: number, size=8): Buffer {
    if (size < 8)
      throw new Error('size minumum is 8');
    const buf = new ArrayBuffer(size);
    const dv = new DataView(buf);
    dv.setBigUint64(size - 8, BigInt(n), false);
    return Buffer.from(buf);
  }

  export function setBE64(n: number, at: number, buf: Uint8Array): void {
    const dv = new DataView(buf.buffer);
    const b = BigInt(n);
    dv.setBigUint64(at, b, false);
  }

  export function fromBE64(buf: Uint8Array, offset=0, byteLength:number|undefined=undefined): number {

    byteLength = byteLength ?? buf.byteLength;
    //const dv = new DataView(buf.buffer, offset, buf.byteLength < byteLength ? buf.byteLength : byteLength);
    const view = new DataView(buf.buffer, offset, byteLength);
    switch (byteLength) {
        case 1:
            return view.getUint8(0);
        case 2:
            return view.getUint16(0, false); // Big-endian
        case 4:
            return view.getUint32(0, false); // Big-endian
        case 8:
            const value = view.getBigUint64(0, false); // Big-endian
            if (value > Number.MAX_SAFE_INTEGER)
                throw new Error('Number exceeds MAX_SAFE_INTEGER');
            return Number(value);
        default:
            throw new Error('Unsupported byte length');
    }
  }

  export function toHex(num: number, includePrefix: boolean = false): string {
    // Convert the number to a hexadecimal string
    let hexString = num.toString(16);

    // Handle negative numbers
    if (num < 0)
        hexString = (num >>> 0).toString(16);

    // Optionally include the '0x' prefix
    if (includePrefix)
        hexString = '0x' + hexString;

    return hexString;
  }
}

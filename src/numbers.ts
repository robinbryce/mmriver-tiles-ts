import { hex2Bytes } from "./hexbytes.js";

// NOTICE: js ECM-262 5th edition permits all binary operators on number up to 2^53-1
// The draft is defined for 2^64-1.
export type Index = number;


export namespace Numbers {

  export function toBE64Uint8Array(n: number, size=8): Uint8Array {
    return new Uint8Array(toBE64(n, size));
  }

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

  export function fromBE64(buf: Uint8Array, byteLength = 8): number|BigInt {
    const dv = new DataView(buf.buffer);
    switch (byteLength) {
      case 1:
        return dv.getUint8(0);
      case 2:
        return dv.getUint16(0, false);
      case 4:
        return dv.getUint32(0, false);
      case 8:
        return dv.getBigUint64(0, false);
      default:
        throw new Error('Unsupported byte length');
    }
  }
  export function numberFromBE(buf: Buffer, byteLength = 4): number {
    if (byteLength === 8) {
      return Number(fromBE64(buf, byteLength));
    }
    return fromBE64(buf, byteLength) as number;
  }

  export function numberToBytes(num: number, byteLength = 8): Uint8Array {
    // return hex2Bytes(numberToHex(num));
    const buffer = new ArrayBuffer(byteLength);
    const view = new DataView(buffer);

    // Write the number to the DataView based on the byte length
    switch (byteLength) {
        case 1:
            view.setUint8(0, num);
            break;
        case 2:
            view.setUint16(0, num, false); // Big-endian
            break;
        case 4:
            view.setUint32(0, num, false); // Big-endian
            break;
        case 8:
            view.setBigUint64(0, BigInt(num), false); // Big-endian
            break;
        default:
            throw new Error('Unsupported byte length');
    }
    return new Uint8Array(buffer);
  }

  export function numberToHex(num: number, includePrefix: boolean = false): string {
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

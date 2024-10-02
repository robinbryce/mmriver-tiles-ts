import { describe, it, expect } from 'vitest';
import { Numbers } from './numbers';

describe('Numbers.setBE', () => {
  it('should set the Big Endian value correctly at the specified position', () => {
    const buf = new Uint8Array(16);

    Numbers.setBE64(123456789, 0, buf);
    const expected = new Uint8Array([
      0, 0, 0, 0, 7, 91, 205, 21, 
      0, 0, 0, 0, 0, 0, 0, 0]);
    expect(buf).toEqual(expected);
  });

  it('should set the Big Endian value correctly at a non-zero position', () => {
    const buf = new Uint8Array(16);
    Numbers.setBE64(987654321, 8, buf);
    const expected = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 58, 222, 104, 177
    ]);
    expect(buf).toEqual(expected);
  });
});

describe('Numbers.numberToBytes', () => {
  it('should convert a number to a 1-byte Uint8Array', () => {
    const result = Numbers.numberToBytes(255, 1);
    const expected = new Uint8Array([255]);
    expect(result).toEqual(expected);
  });

  it('should convert a number to a 2-byte Uint8Array', () => {
    const result = Numbers.numberToBytes(65535, 2);
    const expected = new Uint8Array([255, 255]);
    expect(result).toEqual(expected);
  });

  it('should convert a number to a 4-byte Uint8Array', () => {
    const result = Numbers.numberToBytes(4294967295, 4);
    const expected = new Uint8Array([255, 255, 255, 255]);
    expect(result).toEqual(expected);
  });

  it('should convert a number to an 8-byte Uint8Array', () => {
    const result = Numbers.numberToBytes(123456789, 8);
    const expected = new Uint8Array([0, 0, 0, 0, 7, 91, 205, 21]);
    const x = 7 * 256 * 256 * 256 + 91 * 256 * 256 + 205 * 256 + 21;
    expect(result).toEqual(expected);
    expect(x).toBe(123456789);
  });

  it('should throw an error for unsupported byte length', () => {
    expect(() => Numbers.numberToBytes(123456789, 3)).toThrow('Unsupported byte length');
  });

  it('should handle zero correctly for 1 byte', () => {
    const result = Numbers.numberToBytes(0, 1);
    const expected = new Uint8Array([0]);
    expect(result).toEqual(expected);
  });

  it('should handle zero correctly for 2 bytes', () => {
    const result = Numbers.numberToBytes(0, 2);
    const expected = new Uint8Array([0, 0]);
    expect(result).toEqual(expected);
  });

  it('should handle zero correctly for 4 bytes', () => {
    const result = Numbers.numberToBytes(0, 4);
    const expected = new Uint8Array([0, 0, 0, 0]);
    expect(result).toEqual(expected);
  });

  it('should handle zero correctly for 8 bytes', () => {
    const result = Numbers.numberToBytes(0, 8);
    const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
    expect(result).toEqual(expected);
  });

  it('should handle negative numbers correctly for 1 byte', () => {
    const result = Numbers.numberToBytes(-1, 1);
    const expected = new Uint8Array([255]);
    expect(result).toEqual(expected);
  });

  it('should handle negative numbers correctly for 2 bytes', () => {
    const result = Numbers.numberToBytes(-1, 2);
    const expected = new Uint8Array([255, 255]);
    expect(result).toEqual(expected);
  });

  it('should handle negative numbers correctly for 4 bytes', () => {
    const result = Numbers.numberToBytes(-1, 4);
    const expected = new Uint8Array([255, 255, 255, 255]);
    expect(result).toEqual(expected);
  });

  it('should handle negative numbers correctly for 8 bytes', () => {
    const result = Numbers.numberToBytes(-1, 8);
    const expected = new Uint8Array([255, 255, 255, 255, 255, 255, 255, 255]);
    expect(result).toEqual(expected);
  });

});

describe('Numbers.fromBE64', () => {
  it('should convert a 1-byte Big Endian Uint8Array to a number', () => {
    const buf = new Uint8Array([255]);
    const result = Numbers.fromBE64(buf, 1);
    const expected = 255;
    expect(result).toBe(expected);
  });

  it('should convert a 2-byte Big Endian Uint8Array to a number', () => {
    const buf = new Uint8Array([255, 255]);
    const result = Numbers.fromBE64(buf, 2);
    const expected = 65535;
    expect(result).toBe(expected);
  });

  it('should convert a 4-byte Big Endian Uint8Array to a number', () => {
    const buf = new Uint8Array([255, 255, 255, 255]);
    const result = Numbers.fromBE64(buf, 4);
    const expected = 4294967295;
    expect(result).toBe(expected);
  });

  it('should convert an 8-byte Big Endian Uint8Array to a BigInt', () => {
    const buf = new Uint8Array([0, 0, 0, 0, 7, 91, 205, 21]);
    const result = Numbers.fromBE64(buf, 8);
    const expected = BigInt(123456789);
    expect(result).toBe(expected);
  });

  it('should throw an error for unsupported byte length', () => {
    const buf = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
    expect(() => Numbers.fromBE64(buf, 3)).toThrow('Unsupported byte length');
  });

  it('should handle zero correctly for 1 byte', () => {
    const buf = new Uint8Array([0]);
    const result = Numbers.fromBE64(buf, 1);
    const expected = 0;
    expect(result).toBe(expected);
  });

  it('should handle zero correctly for 2 bytes', () => {
    const buf = new Uint8Array([0, 0]);
    const result = Numbers.fromBE64(buf, 2);
    const expected = 0;
    expect(result).toBe(expected);
  });

  it('should handle zero correctly for 4 bytes', () => {
    const buf = new Uint8Array([0, 0, 0, 0]);
    const result = Numbers.fromBE64(buf, 4);
    const expected = 0;
    expect(result).toBe(expected);
  });

  it('should handle zero correctly for 8 bytes', () => {
    const buf = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
    const result = Numbers.fromBE64(buf, 8);
    const expected = BigInt(0);
    expect(result).toBe(expected);
  });
});

describe('Numbers.numberToHex', () => {
   it('should convert a positive number to a hexadecimal string', () => {
     const result = Numbers.numberToHex(255);
     const expected = 'ff';
     expect(result).toBe(expected);
   });

   it('should convert a positive number to a hexadecimal string with prefix', () => {
     const result = Numbers.numberToHex(255, true);
     const expected = '0xff';
     expect(result).toBe(expected);
   });

   it('should convert zero to a hexadecimal string', () => {
     const result = Numbers.numberToHex(0);
     const expected = '0';
     expect(result).toBe(expected);
   });

   it('should convert a negative number to a hexadecimal string', () => {
     const result = Numbers.numberToHex(-255);
     const expected = 'ffffff01';
     expect(result).toBe(expected);
   });

   it('should convert a negative number to a hexadecimal string with prefix', () => {
     const result = Numbers.numberToHex(-255, true);
     const expected = '0xffffff01';
     expect(result).toBe(expected);
   });

   it('should handle the maximum safe integer correctly', () => {
     const result = Numbers.numberToHex(Number.MAX_SAFE_INTEGER);
     const expected = '1fffffffffffff';
     expect(result).toBe(expected);
   });

   it('should handle the maximum safe integer correctly with prefix', () => {
     const result = Numbers.numberToHex(Number.MAX_SAFE_INTEGER, true);
     const expected = '0x1fffffffffffff';
     expect(result).toBe(expected);
   });

   it('should handle the minimum safe integer correctly', () => {
     const result = Numbers.numberToHex(Number.MIN_SAFE_INTEGER);
     const expected = '1';
     expect(result).toBe(expected);
   });

   it('should handle the minimum safe integer correctly with prefix', () => {
     const result = Numbers.numberToHex(Number.MIN_SAFE_INTEGER, true);
     const expected = '0x1';
     expect(result).toBe(expected);
   });

 });

import { describe, it, expect } from 'vitest';
import { hex2bytes } from './hexbytes.js';

describe('hex2Bytes', () => {
  it('should convert a hex string to a Uint8Array', () => {
    const hex = '0x48656c6c6f';
    const expected = new Uint8Array([72, 101, 108, 108, 111]);
    expect(hex2bytes(hex)).toEqual(expected);
  });

  it('should handle hex strings without the 0x prefix', () => {
    const hex = '48656c6c6f';
    const expected = new Uint8Array([72, 101, 108, 108, 111]);
    expect(hex2bytes(hex)).toEqual(expected);
  });

  it('should handle hex strings with odd length by padding with a leading zero', () => {
    const hex = '123';
    const expected = new Uint8Array([1, 35]);
    expect(hex2bytes(hex)).toEqual(expected);
  });

  it('should return an empty Uint8Array for an empty string', () => {
    const hex = '';
    const expected = new Uint8Array([]);
    expect(hex2bytes(hex)).toEqual(expected);
  });

  it('should handle a single byte hex string', () => {
    const hex = '0x0a';
    const expected = new Uint8Array([10]);
    expect(hex2bytes(hex)).toEqual(expected);
  });

  it('should handle a hex string with uppercase letters', () => {
    const hex = '0x4A4B4C';
    const expected = new Uint8Array([74, 75, 76]);
    expect(hex2bytes(hex)).toEqual(expected);
  });
});
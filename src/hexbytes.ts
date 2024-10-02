
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

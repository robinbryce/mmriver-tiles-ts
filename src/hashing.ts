import crypto from 'crypto';

export function sha256(content: Uint8Array): Uint8Array {
  const d = crypto.createHash('sha256').update(content).digest();
  return new Uint8Array(d);
}
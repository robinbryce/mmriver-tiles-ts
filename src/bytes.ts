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
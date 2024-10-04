export class MMRIndexRangeError extends Error {
  constructor(message: string = 'The MMRIndex is not found (and is not an ancestors entry') {
    super(message);
    this.name = 'MMRIndexRangeError';
  }
}
export class EmptyError extends Error {
  constructor(message: string = 'No tiles found') {
    super(message);
    this.name = 'EmptyError';
  }
}
export class ExistsError extends Error {
  constructor(message: string = 'The tile already exists') {
    super(message);
    this.name = 'ExistsError';
  }
}

export class ChangedError extends Error {
  constructor(message: string = 'The data has changed since it was read') {
    super(message);
    this.name = 'ChangedError';
  }
}
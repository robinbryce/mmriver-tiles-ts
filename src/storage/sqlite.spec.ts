import { describe, it, expect } from 'vitest';
import { SQLite } from './sqlite.ts';
import { ExistsError, ChangedError } from './errors';

describe('SQLite Database with Optimistic Concurrency Control', () => {

  it('should insert a new record', () => {
    const db = SQLite.createDB(':memory:');
    expect(() => SQLite.insert(db, 1, Buffer.from('hello'))).not.toThrow();
  });

  it('should throw ExistsError when inserting a duplicate record', () => {
    const db = SQLite.createDB(':memory:');
    expect(() => SQLite.insert(db, 1, Buffer.from('hello'))).not.toThrow();
    expect(() => SQLite.insert(db, 1, Buffer.from('world'))).toThrowError(ExistsError);
  });

  it('should replace a record with matching counter', () => {
    const db = SQLite.createDB(':memory:');
    expect(() => SQLite.insert(db, 1, Buffer.from('hello'))).not.toThrow();
    expect(() => SQLite.replace(db, 1, Buffer.from('new data'), 0)).not.toThrow();
  });

  it('should throw ChangedError when replacing a record with non-matching counter', () => {
    const db = SQLite.createDB(':memory:');
    expect(() => SQLite.insert(db, 1, Buffer.from('hello'))).not.toThrow();
    // simulate lost race by using the wrong counter
    expect(() => SQLite.replace(db, 1, Buffer.from('another data'), 1)).toThrowError(ChangedError);
  });
});
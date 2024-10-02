import sqlite from 'better-sqlite3'
// import { open } from 'sqlite';
import { EmptyError, ExistsError, ChangedError } from './errors.js';
import { ITileStorageProvider } from '../interfaces.js';

  /**
   * Class that implements the ITileStorageProvider interface using SQLite functions.
   */
export class TileStorageProvider implements ITileStorageProvider {
  private db: sqlite.Database;

  constructor(url: string = ':memory:') {
    this.db = SQLite.createDB(url);
  }

  read_tile(tileid: number): [Buffer, number] { return SQLite.read(this.db, tileid);}
  read_head(): [Buffer, number] { return SQLite.read_head(this.db);}
  create_tile(tileid: number, data: Buffer) { SQLite.insert(this.db, tileid, data); }
  replace_tile(tileid: number, version: number, data: Buffer) { SQLite.replace(this.db, tileid, data, version); }
}

export namespace SQLite {

  // Create a database with a single table for the tile content.  Each record
  // includes a counter which is used to emulate optimistic concurrency afforded
  // by typical cloud block storage providers.  In a real-world scenario, this
  // avoids cross process co-ordination requirements between clients.  Contention
  // for the end of the log should be mitigated by adding more than one leaf at a
  // time.
  export function createDB(url:string = ':memory:') {
    const db = new sqlite(url);
    createTables(db)
    return db;
  }

  export function createTables(db: sqlite.Database) {
    db.prepare(`
      CREATE TABLE IF NOT EXISTS records (
        id INTEGER PRIMARY KEY,
        data BLOB,
        counter INTEGER DEFAULT 0
      );
    `).run();
  }

  export function insert(db: sqlite.Database, id: number, data: Buffer) {
    try {
      // note: INSERT OR ABORT is the sqlite default per the SQL standard.
      db.prepare(`
        INSERT INTO records (id, data, counter)
        VALUES (?, ?, 0)
      `).run(id, data);
    } catch (error) {
      if (error instanceof Error && (error as any).code === 'SQLITE_CONSTRAINT_PRIMARYKEY') {
        throw new ExistsError();
      }
      throw error;
    }
  }

  export function read(db: sqlite.Database, tileid: number): [Buffer, number] {
    const row = db.prepare(`
      SELECT data FROM records WHERE id = ?
    `).get(tileid) as { data: Buffer, counter: number };
    if (!row) {
      throw new Error(`Tile with ID ${tileid} not found`);
    }
    return [row.data, row.counter];
  }

  export function read_head(db: sqlite.Database): [Buffer, number] {
    const row = db.prepare(`
      SELECT data, counter
      FROM records
      ORDER BY id DESC
      LIMIT 1
    `).get() as { data: Buffer, counter: number };
    if (!row) {
      throw new EmptyError();
    }
    return [row.data, row.counter]
  }
 

  // note: the counter is used to emulate optimistic concurrency control, this only works if all replacements honour the mechanism.
  export function replace(db: sqlite.Database, id: number, data: Buffer, counter: number) {
    const result = db.prepare(`
      UPDATE records
      SET data = ?, counter = counter + 1
      WHERE id = ? AND counter = ?
    `).run(data, id, counter);
    if (result.changes === 0) {
      throw new ChangedError();
    }
  }

  // Function to remove all records from the table but keep the table
  export function clearTable(db: sqlite.Database) {
    db.prepare(`
      DELETE FROM records;
    `).run();
  }
}
// https://github.com/signalapp/better-sqlite3
// setup sqlite so i can write/read into it
// + manage its schema nicely (drizzle orm?)
import Database from "better-sqlite3"

const db = new Database("la.db", {
  verbose: console.log,
})

db.pragma("journal_mode = WAL")
// const stmt = db.prepare(`
// CREATE TABLE topic (
//   id INTEGER PRIMARY KEY,
//   name TEXT NOT NULL
// );
// `);

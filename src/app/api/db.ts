import { open } from "sqlite";
import sqlite3 from "sqlite3";

async function getDatabase() {
    return open({
      filename: "./db.sqlite",
      driver: sqlite3.Database,
    });
  }

export { getDatabase };
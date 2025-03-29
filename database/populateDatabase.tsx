import * as SQLite from "expo-sqlite";
import dictionary from '../assets/dictionary.json';

export default async function createAndPopulateDatabase() {
  const db = await SQLite.openDatabaseAsync("dictionary.db");
  
  await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS words (id INTEGER PRIMARY KEY NOT NULL, word TEXT NOT NULL UNIQUE);
    `);
 
  for (const word of dictionary.words) {
    try {
      await db.runAsync('INSERT INTO words (word) VALUES (?)', word);
    } catch (error) {
      console.error('Error inserting word: ', error);
    }
  }
};

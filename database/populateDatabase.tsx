import * as SQLite from "expo-sqlite";
import dictionary from '../assets/dictionary.json';

const db = SQLite.openDatabaseAsync("dictionary.db");

const createAndPopulateDatabase = async () => {
  const database = await db;
  await database.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS words (id INTEGER PRIMARY KEY NOT NULL, word TEXT NOT NULL UNIQUE);
    `);
 
  for (const word of dictionary.words) {
    try {
      await database.runAsync('INSERT INTO words (word) VALUES (?)', word);
    } catch (error) {
      // console.error('Error inserting word: ', error);
    }
  }
};

const isWordValid = async (word: string): Promise<boolean> => {
  try {
    const result = await (await db).getFirstAsync('SELECT * FROM words WHERE word = ?', word);
    console.log(result);
    if (result === null) return false;
    return true;
  } catch (error) {
    console.log("Error checking if word is valid: ", error);
    return false;
  }
};

export { createAndPopulateDatabase, isWordValid };

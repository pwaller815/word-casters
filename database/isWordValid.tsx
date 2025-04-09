import * as SQLite from "expo-sqlite";

export default async function isWordValid(
  db: SQLite.SQLiteDatabase,
  word: string
): Promise<boolean> {
  try {
    const result = await db.getFirstAsync(
      "SELECT * FROM words WHERE word = ?",
      word
    );
    if (result === null || word.length < 3) return false;
    return true;
  } catch (error) {
    console.log("Error checking if word is valid: ", error);
    return false;
  }
}

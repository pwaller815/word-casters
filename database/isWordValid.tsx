import * as SQLite from "expo-sqlite";

export default async function isWordValid(
  db: SQLite.SQLiteDatabase,
  word: string
): Promise<boolean> {
  if (word.length < 3) return false;

  try {
    const result = await db.getFirstAsync(
      "SELECT * FROM words WHERE word = ? LIMIT 1",
      word
    );
    return result !== null;
  } catch (error) {
    console.log("Error checking if word is valid: ", error);
    return false;
  }
}

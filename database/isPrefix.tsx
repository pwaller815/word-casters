import * as SQLite from "expo-sqlite";

export default async function isPrefix(
  db: SQLite.SQLiteDatabase,
  prefix: string
): Promise<boolean> {
  try {
    const result = await db.getFirstAsync(
      "SELECT 1 FROM words WHERE word LIKE ? LIMIT 1",
      prefix
    );
    return result !== null;
  } catch (error) {
    console.log("Error checking if string is a prefix: ", error);
    return false;
  }
}
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { TrieNode, Trie } from "@/assets/classes/trie";

export default async function buildTrieFromDB() {
  const db = await SQLite.openDatabaseAsync("dictionary.db");
  const t = new Trie();

  try {
    const words = await db.getAllAsync<{ word: string }>("SELECT * FROM words");

    for (const { word } of words) {
      t.insert(word);
    }

    const trieJSON = JSON.stringify(t);

    const filePath = FileSystem.documentDirectory + "trie.json";
    await FileSystem.writeAsStringAsync(filePath, trieJSON);

    console.log("Trie successfully saved to: ", filePath);
  } catch (error) {
    console.log("Error loading trie: ", error);
  }
}

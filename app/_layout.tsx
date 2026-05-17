import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect } from "react";
import * as FileSystem from "expo-file-system/legacy";
import createAndPopulateDatabase from "@/database/populateDatabase";
import buildTrieFromDB from "@/database/generateTrie";
import { setTrie } from "@/assets/classes/trieStore";
import { Trie } from "@/assets/classes/trie";
import * as SQLite from "expo-sqlite";

export default function RootLayout() {
  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        const dbPath = FileSystem.documentDirectory + "SQLite/dictionary.db";
        const fileInfo = await FileSystem.getInfoAsync(dbPath);

        if (!fileInfo.exists) {
          console.log("Database does not exist, creating and populating...");
          await createAndPopulateDatabase();
        } else {
          // Verify the db is actually populated
          const db = await SQLite.openDatabaseAsync("dictionary.db");
          const result = await db.getFirstAsync<{ count: number }>(
            "SELECT count(*) as count FROM sqlite_master WHERE type='table' AND name='words'",
          );
          if (!result || result.count === 0) {
            console.log("Database exists but is empty, repopulating...");
            await createAndPopulateDatabase();
          }
        }

        try {
          await buildTrieFromDB();
          console.log("buildTrieFromDB completed");
        } catch (error) {
          console.error("buildTrieFromDB threw:", error);
        }

        try {
          const jsonString = await FileSystem.readAsStringAsync(
            FileSystem.documentDirectory + "trie.json",
          );
          const parsedData = JSON.parse(jsonString);
          const trie = Trie.fromJSON(parsedData);

          console.log("Trie successfully loaded");
          setTrie(trie);
        } catch (error) {
          console.error("Error loading trie from file:", error);
          return null;
        }
      } catch (error) {
        console.error("Error initializing database:", error);
      }
    };

    initializeDatabase();
  }, []);

  return (
    <GestureHandlerRootView>
      <Stack
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </GestureHandlerRootView>
  );
}

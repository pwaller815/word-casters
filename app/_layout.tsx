import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect } from "react";
import * as FileSystem from "expo-file-system";
import createAndPopulateDatabase from "@/database/populateDatabase";
import buildTrieFromDB from "@/database/generateTrie";
import { setTrie } from "@/assets/classes/trieStore";
import { Trie } from "@/assets/classes/trie";

export default function RootLayout() {
  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        const dbPath = FileSystem.documentDirectory + "SQLite/dictionary.db";
        const fileInfo = await FileSystem.getInfoAsync(dbPath);

        if (!fileInfo.exists) {
          console.log("Database does not exist, creating and populating...");
          await createAndPopulateDatabase();

          buildTrieFromDB();
        } else {
          console.log("Database already exists, skipping population.");
        }
        try {
          const jsonString = await FileSystem.readAsStringAsync(
            FileSystem.documentDirectory + "trie.json"
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

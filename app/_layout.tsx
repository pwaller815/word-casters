import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect } from "react";
import * as FileSystem from "expo-file-system";
import createAndPopulateDatabase from "@/database/populateDatabase";

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
          console.log("Database already exists, skipping population.");
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

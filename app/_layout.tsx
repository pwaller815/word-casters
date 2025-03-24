import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect } from "react";
import { createAndPopulateDatabase } from "@/database/populateDatabase";

export default function RootLayout() {
  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        await createAndPopulateDatabase();
        console.log("Database initialized and populated successfully.");
      } catch (error) {
        console.error("Error initializing database:", error);
      }
    };

    initializeDatabase();
  }, []);

  return (
    <GestureHandlerRootView>
      <Stack />
    </GestureHandlerRootView>
  );
}

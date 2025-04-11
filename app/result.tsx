import { View, Text, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import resultStyles from "@/styles/resultStyles";

export default function Result() {
  const { wordsString, totalTime } = useLocalSearchParams<{
    wordsString: string;
    totalTime: string;
  }>();

  const parseWordsString = (wordsString: string): string[] => {
    const words = wordsString.split('","');
    words[0] = words[0].replace(/[\[\]"]/g, "");
    words[words.length - 1] = words[words.length - 1].replace(/[\[\]"]/g, "");
    return words;
  };

  const words = parseWordsString(wordsString);

  return (
    <View style={resultStyles.result}>
      <View style={resultStyles.resultInfoContainer}>
        <Text style={resultStyles.timeLasted}>
          You lasted {totalTime} seconds
        </Text>
        <TouchableOpacity onPress={() => router.push("/")}>
          <Text>Home</Text>
        </TouchableOpacity>
      </View>
      <View style={resultStyles.wordListContainer}>
        <FlatList
          style={resultStyles.wordList}
          contentContainerStyle={resultStyles.contentContainerStyle}
          data={words}
          renderItem={({ item }) => (
            <View style={resultStyles.wordContainer}>
              <Text style={resultStyles.word}>{item}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

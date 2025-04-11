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
        <Text style={resultStyles.timeLastedMessage}>
          Score:  <Text style={resultStyles.timeLasted}>{totalTime}</Text> s
        </Text>
        <View style={resultStyles.resultBtnsContainer}>
        <TouchableOpacity onPress={() => router.push("/game")} style={resultStyles.resultBtn}>
          <Text style={resultStyles.resultBtnText}>Play Again</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/")} style={resultStyles.resultBtn}>
          <Text style={resultStyles.resultBtnText}>Home</Text>
        </TouchableOpacity>
        </View>
      </View>
      <View style={resultStyles.wordListContainer}>
      <Text style={resultStyles.wordsFound}>
          Words Found: {words[0] === "" ? 0 : words.length}
        </Text>
        <FlatList
          style={resultStyles.wordList}
          contentContainerStyle={resultStyles.contentContainerStyle}
          data={words}
          renderItem={({ item }) => {
            if (item === "") return (<View style={[resultStyles.wordContainer, { gap: 5, alignItems: "flex-start" }]}>
              <Text style={resultStyles.word}>Nothing?</Text>
              <Text style={resultStyles.word}>Try again!</Text>
            </View>);
            return (
              <View style={resultStyles.wordContainer}>
                <Text style={resultStyles.word}>{item}</Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

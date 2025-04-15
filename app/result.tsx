import { View, Text, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import resultStyles from "@/styles/resultStyles";

export default function Result() {
  const [wordList, setWordList] = useState<boolean>(true);

  const { wordsString, allWords, totalTime } = useLocalSearchParams<{
    wordsString: string;
    allWords: string;
    totalTime: string;
  }>();

  const parseWordsString = (wordsString: string): string[] => {
    const words = wordsString.split('","');
    words[0] = words[0].replace(/[\[\]"]/g, "");
    words[words.length - 1] = words[words.length - 1].replace(/[\[\]"]/g, "");
    return words;
  };

  const words = parseWordsString(wordsString);
  const everyWord = parseWordsString(allWords);

  return (
    <View style={resultStyles.result}>
      <View style={resultStyles.resultInfoContainer}>
        <View style={resultStyles.timeLastedContainer}>
          <Text style={resultStyles.timeLastedMessage}>
            Score: <Text style={resultStyles.timeLasted}>{totalTime}</Text> s
          </Text>
          <Text style={resultStyles.wordsFound}>
            {words[0] === "" ? 0 : words.length} Words Found
          </Text>
        </View>

        <View style={resultStyles.resultBtnsContainer}>
          <TouchableOpacity
            onPress={() => router.push("/game")}
            style={resultStyles.resultBtn}
          >
            <Text style={resultStyles.resultBtnText}>Play Again</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/")}
            style={resultStyles.resultBtn}
          >
            <Text style={resultStyles.resultBtnText}>Home</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={resultStyles.wordListContainer}>
        <View style={resultStyles.tabContainer}>
          <TouchableOpacity onPress={() => setWordList(true)} style={[resultStyles.tab, wordList && resultStyles.activeTab]}>
            <Text style={resultStyles.tabText}>Your Words</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setWordList(false)} style={[resultStyles.tab, !wordList && resultStyles.activeTab]}>
            <Text style={resultStyles.tabText}>All Words</Text>
          </TouchableOpacity>
        </View>
        {wordList ? (
          <FlatList
            style={resultStyles.wordList}
            contentContainerStyle={resultStyles.contentContainerStyle}
            data={words}
            renderItem={({ item }) => {
              if (item === "")
                return (
                  <View
                    style={[
                      resultStyles.wordContainer,
                      { gap: 5, alignItems: "flex-start" },
                    ]}
                  >
                    <Text style={resultStyles.word}>Nothing?</Text>
                    <Text style={resultStyles.word}>Try again!</Text>
                  </View>
                );
              return (
                <View style={resultStyles.wordContainer}>
                  <Text style={resultStyles.word}>{item}</Text>
                </View>
              );
            }}
          />
        ) : (
          <FlatList
            style={resultStyles.wordList}
            contentContainerStyle={resultStyles.contentContainerStyle}
            data={everyWord}
            renderItem={({ item }) => {
              return (
                <View style={resultStyles.wordContainer}>
                  <Text style={resultStyles.word}>{item.toUpperCase()}</Text>
                </View>
              );
            }}
          />
        )}
      </View>
    </View>
  );
}

import { Text, View, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import boardStyles from "@/styles/boardStyles";

export default function Board() {
  const [letters, setLetters] = useState<string[]>([]);

  const die = [
    ["S", "R", "E", "L", "A", "C"],
    ["D", "P", "A", "C", "E", "M"],
    ["Qu", "B", "A", "O", "J", "M"],
    ["D", "U", "T", "O", "K", "N"],
    ["O", "M", "H", "R", "S", "A"],
    ["E", "I", "F", "E", "H", "Y"],
    ["B", "R", "I", "F", "O", "X"],
    ["R", "L", "U", "W", "I", "G"],
    ["N", "S", "O", "W", "E", "D"],
    ["Y", "L", "I", "B", "A", "T"],
    ["T", "N", "I", "G", "E", "V"],
    ["T", "A", "C", "I", "T", "O"],
    ["P", "S", "U", "T", "E", "L"],
    ["E", "P", "I", "S", "H", "N"],
    ["Y", "K", "U", "L", "E", "G"],
    ["N", "Z", "E", "V", "A", "D"],
  ];

  function shuffleArray(array: string[][]): string[][] {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function generateBoard(): void {
    let shuffled: string[][] = shuffleArray(JSON.parse(JSON.stringify(die)));
    let newBoard: string[] = [];
    for (let i = 0; i < 16; i++) {
      newBoard[i] = shuffled[i][Math.floor(Math.random() * 6)];
    }
    setLetters(newBoard);
  }

  useEffect(() => {
    if (letters.length === 0) {
        generateBoard();
    }
  }, []);

  return (
    <View style={boardStyles.board}>
      <View style={boardStyles.gridBoard}>
        {letters ? (
          letters.map((character: string, index: number) => {
            return (
              <TouchableOpacity key={index} style={boardStyles.gridItem}>
                <Text style={boardStyles.letter}>{character}</Text>
              </TouchableOpacity>
            );
          })
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </View>
  );
}

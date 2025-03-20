import { Text, View, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import boardStyles from "@/styles/boardStyles";

export default function Board() {
  const [letters, setLetters] = useState<string[]>([]);
  const [currentString, setCurrentString] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

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

  const getLetterIndex = (x: number, y: number) => {
    const gridWidth = 4;
    const letterSize = 78.5;

    const xIndex = Math.floor(x / letterSize);
    const yIndex = Math.floor(y / letterSize);
    const index = yIndex * gridWidth + xIndex;

    return index >= 0 && index < letters.length ? index : -1;
  };

  const getNextLetterIndex = (x: number, y: number) => {
    const gridWidth = 4;
    const letterSize = 78.5;

    const currentX = (currentIndex % gridWidth) * letterSize + letterSize / 2;
    const currentY =
      Math.floor(currentIndex / gridWidth) * letterSize + letterSize / 2;

    const threshold =
      Math.abs(Math.abs(x - currentX) - Math.abs(y - currentY)) <= 30
        ? 0.9
        : 0.6;

    const dx = Math.abs(x - currentX);
    const dy = Math.abs(y - currentY);

    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance > letterSize * threshold ? getLetterIndex(x, y) : -1;
  };

  const addLetter = (index: number) => {
    if (!selectedIndices.includes(index)) {
      setCurrentIndex(index);
      setSelectedIndices([...selectedIndices, index]);
      setCurrentString((prev) => prev + letters[index]);
    }
  };

  const handleGesture = Gesture.Pan()
    .onBegin((event) => {
      const { x, y } = event;
      const index = getLetterIndex(x, y);
      addLetter(index);
    })
    .onUpdate((event) => {
      const { x, y } = event;
      const index = getNextLetterIndex(x, y);
      if (index !== -1) {
        addLetter(index);
      }
    })
    .onEnd(() => {
      console.log("Selected word:" + currentString);
      setCurrentString("");
      setSelectedIndices([]);
    })
    .runOnJS(true);

  return (
    <View style={boardStyles.board}>
      <View>
        <Text>{currentString}</Text>
      </View>
      <View style={boardStyles.gridBoard}>
        <GestureDetector gesture={handleGesture}>
          <View style={boardStyles.gridItems}>
            {letters.map((character: string, index: number) => {
              const isDragged = selectedIndices.includes(index);
              return (
                <View
                  key={index}
                  style={[
                    boardStyles.gridItem,
                    isDragged && boardStyles.activeGridItem,
                  ]}
                >
                  <Text style={boardStyles.letter}>{character}</Text>
                </View>
              );
            })}
          </View>
        </GestureDetector>
      </View>
    </View>
  );
}

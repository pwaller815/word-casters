import { Animated, Text, View } from "react-native";
import { useEffect, useState, useRef, useMemo } from "react";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";
import isWordValid from "@/database/isWordValid";
import boardStyles from "@/styles/boardStyles";
import * as SQLite from "expo-sqlite";
import { useRouter } from "expo-router";
import findAllWords from "@/assets/methods/findAllWords";

export default function Board() {
  const db = useRef<SQLite.SQLiteDatabase | null>(null);

  const [letters, setLetters] = useState<string[]>([]);
  const [currentString, setCurrentString] = useState<string>("");
  const [prevString, setPrevString] = useState<string>("");
  const [validity, setValidity] = useState<boolean>(false);
  const [alreadyFound, setAlreadyFound] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(15);
  const [addedTime, setAddedTime] = useState<number>(0);

  const changeColorRef = useRef<boolean>(false);
  const validityRef = useRef<boolean>(false);
  const alreadyFoundRef = useRef<boolean>(false);
  const currentIndexRef = useRef<number>(-1);
  const firstIndexRef = useRef<number>(-1);
  const selectedIndicesRef = useRef<number[]>([]);
  const currentStringRef = useRef<string>("");
  const timerRef = useRef<number>(0);
  const totalTimeRef = useRef<number>(0);
  const wordsFoundRef = useRef<string[]>([]);
  const isDraggingRef = useRef<boolean>(false);
  const prevColorRef = useRef<object>({});
  const allWords = useRef<string[]>([]);

  const [longPressed, setLongPressed] = useState<number>(-1);

  const letterScales = useRef(new Map<number, Animated.Value>());
  const fadeString = useRef(new Animated.Value(1)).current;
  const fadeAddedTime = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const moveUpAndFade = () => {
    translateY.setValue(0);
    fadeAddedTime.setValue(1);

    const translateYAnimation = Animated.timing(translateY, {
      toValue: -50,
      duration: 500,
      useNativeDriver: true,
    });

    const fadeAddedTimeAnimation = Animated.timing(fadeAddedTime, {
      toValue: 0,
      duration: 700,
      useNativeDriver: true,
    });

    Animated.parallel([translateYAnimation, fadeAddedTimeAnimation]).start();
  };

  const fadeOut = () => {
    fadeString.setValue(1);
    Animated.timing(fadeString, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const scaleUp = (index: number) => {
    if (!letterScales.current.has(index)) {
      letterScales.current.set(index, new Animated.Value(1));
    }

    Animated.timing(letterScales.current.get(index)!, {
      toValue: 1.08,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const scaleDown = () => {
    if (isDraggingRef.current) return;
    letterScales.current.forEach((scale) => {
      scale.setValue(1);
    });
  };

  const router = useRouter();

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

  function generateBoard(): string[] {
    let shuffled: string[][] = shuffleArray(JSON.parse(JSON.stringify(die)));
    let newBoard: string[] = [];
    for (let i = 0; i < 16; i++) {
      newBoard[i] = shuffled[i][Math.floor(Math.random() * 6)];
    }
    return newBoard;
  }

  useEffect(() => {
    const openConnection = async () => {
      db.current = await SQLite.openDatabaseAsync("dictionary.db");
    };

    const SetAllWords = async (letters: string[]) => {
      allWords.current = await findAllWords(letters);
    };

    const startTimer = () => {
      if (timerRef.current > 0) return;

      timerRef.current = 15;

      let timerInterval = setInterval(() => {
        if (timerRef.current > 0) {
          timerRef.current -= 1;
          totalTimeRef.current += 1;
          setTimer(timerRef.current);
        } else {
          clearInterval(timerInterval);
          wordsFoundRef.current.sort((a, b) => {
            return a.length !== b.length
              ? b.length - a.length
              : a.localeCompare(b);
          });
          router.push({
            pathname: "/result",
            params: {
              wordsString: JSON.stringify(wordsFoundRef.current),
              allWords: JSON.stringify(allWords.current),
              totalTime: totalTimeRef.current,
            },
          });
        }
      }, 1000);
    };

    if (letters.length === 0) {
      openConnection();

      const newLetters = generateBoard();
      setLetters(newLetters);
      SetAllWords(newLetters);
    }

    startTimer();
  }, []);

  const getLetterIndex = (x: number, y: number) => {
    const gridWidth = 4;
    const letterSize = 78.5;

    const xIndex = Math.floor(x / letterSize);
    const yIndex = Math.floor(y / letterSize);
    const index = yIndex * gridWidth + xIndex;

    return x < letterSize * gridWidth &&
      x > 0 &&
      index >= 0 &&
      index < letters.length
      ? index
      : -1;
  };

  const getNextLetterIndex = (x: number, y: number) => {
    const gridWidth = 4;
    const letterSize = 78.5;

    const currentX =
      (currentIndexRef.current % gridWidth) * letterSize + letterSize / 2;
    const currentY =
      Math.floor(currentIndexRef.current / gridWidth) * letterSize +
      letterSize / 2;

    const threshold =
      Math.abs(Math.abs(x - currentX) - Math.abs(y - currentY)) <= 30
        ? 0.9
        : 0.6;

    const dx = Math.abs(x - currentX);
    const dy = Math.abs(y - currentY);

    const distance = Math.sqrt(dx * dx + dy * dy);
    const index = getLetterIndex(x, y);

    return x < letterSize * gridWidth &&
      x > 0 &&
      isNeighbor(index) &&
      distance > letterSize * threshold
      ? index
      : -1;
  };

  const isNeighbor = (index: number) => {
    const rowDiff = Math.abs(
      Math.floor(currentIndexRef.current / 4) - Math.floor(index / 4)
    );
    const colDiff = Math.abs((currentIndexRef.current % 4) - (index % 4));

    return rowDiff <= 1 && colDiff <= 1 && rowDiff + colDiff > 0;
  };

  const addLetter = async (index: number) => {
    if (!selectedIndicesRef.current.includes(index)) {
      currentIndexRef.current = index;
      selectedIndicesRef.current.push(index);

      currentStringRef.current = currentStringRef.current + letters[index];
      setCurrentString(currentStringRef.current);
      if (currentStringRef.current.length >= 3) {
        if (db.current != null) {
          alreadyFoundRef.current = wordsFoundRef.current.includes(
            currentStringRef.current
          );
          validityRef.current = await isWordValid(
            db.current,
            currentStringRef.current.toLowerCase()
          );

          changeColorRef.current = true;

          setAlreadyFound(alreadyFoundRef.current);
          setValidity(validityRef.current);

          if (validityRef.current && !alreadyFoundRef.current)
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }
      }
    }
  };

  const evaluateWord = (word: string) => {
    const length = word.length;
    let additionalTime = 0;

    switch (length) {
      case 3:
        additionalTime = 2;
        break;
      case 4:
        additionalTime = 3;
        break;
      case 5:
        additionalTime = 4;
        break;
      case 6:
        additionalTime = 6;
        break;
      default:
        additionalTime = 10;
    }

    setAddedTime(additionalTime);
    moveUpAndFade();
    timerRef.current += additionalTime;
    setTimer(timerRef.current);
  };

  const longPress = Gesture.LongPress()
    .minDuration(1)
    .onBegin((event) => {
      const index = getLetterIndex(event.x, event.y);
      setLongPressed(index);
      scaleUp(index);
    })
    .onEnd(() => {
      setLongPressed(-1);
      scaleDown();
    })
    .runOnJS(true);

  const pan = Gesture.Pan()
    .minDistance(5)
    .onBegin((event) => {
      const { x, y } = event;
      firstIndexRef.current = getLetterIndex(x, y);
    })
    .onUpdate((event) => {
      isDraggingRef.current = true;
      const { x, y } = event;
      let index;
      if (currentIndexRef.current === -1) {
        index = firstIndexRef.current;
      } else {
        index = getNextLetterIndex(x, y);
      }

      if (index !== -1) {
        addLetter(index);
        changeColorRef.current = false;
        scaleUp(index);
      }
    })
    .onEnd(() => {
      isDraggingRef.current = false;
      scaleDown();
      if (validity && !alreadyFound) {
        evaluateWord(currentStringRef.current);
        wordsFoundRef.current.push(currentStringRef.current);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      }
      letterScales.current = new Map<number, Animated.Value>();
      currentIndexRef.current = -1;
      selectedIndicesRef.current = [];

      setPrevString(currentStringRef.current);
      fadeOut();

      currentStringRef.current = "";
      setCurrentString("");
      setValidity(false);
      setAlreadyFound(false);
    })
    .runOnJS(true);

  const handleGesture = Gesture.Simultaneous(longPress, pan);

  const colorStyle = useMemo(() => {
    const determineColor = () => {
      if (alreadyFound) {
        return (prevColorRef.current = boardStyles.alreadyFound);
      } else if (!validity) {
        return (prevColorRef.current = boardStyles.activeGridItemIncorrect);
      } else {
        return (prevColorRef.current = boardStyles.activeGridItemCorrect);
      }
    };

    return determineColor();
  }, [changeColorRef.current]);

  return (
    <View style={boardStyles.board}>
      <View style={boardStyles.timerContainer}>
        <Animated.Text
          style={[
            boardStyles.addedTime,
            { transform: [{ translateY: translateY }], opacity: fadeAddedTime },
          ]}
        >
          {"+" + addedTime}
        </Animated.Text>
        <Text style={boardStyles.timer}>{timer}</Text>
      </View>
      <View style={boardStyles.currentStringContainer}>
        {currentString !== "" && (
          <Text style={[boardStyles.currentString, colorStyle]}>
            {currentString}
          </Text>
        )}
        {currentString === "" && prevString !== "" && (
          <Animated.Text
            style={[
              boardStyles.prevString,
              prevColorRef.current,
              { opacity: fadeString },
            ]}
          >
            {prevString}
          </Animated.Text>
        )}
      </View>
      <View style={boardStyles.gridBoard}>
        <GestureDetector gesture={handleGesture}>
          <View style={boardStyles.gridItems}>
            {letters.map((character: string, index: number) => {
              const selected =
                selectedIndicesRef.current.includes(index) ||
                longPressed === index;
              const animatedStyle = selected
                ? {
                    transform: [
                      {
                        scale:
                          letterScales.current.get(index) ||
                          new Animated.Value(1),
                      },
                    ],
                  }
                : {};
              return (
                <Animated.View
                  key={index}
                  style={[
                    animatedStyle,
                    boardStyles.gridItem,
                    selected && colorStyle,
                  ]}
                >
                  <Text style={boardStyles.letter}>{character}</Text>
                </Animated.View>
              );
            })}
          </View>
        </GestureDetector>
      </View>
    </View>
  );
}

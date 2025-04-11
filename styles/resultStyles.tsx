import { StyleSheet, ViewStyle } from "react-native";
import colors from "./colors";

const baseContainer: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
};

export default StyleSheet.create({
  result: {
    ...baseContainer,
    backgroundColor: colors.background,
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
  },
  resultInfoContainer: {
    ...baseContainer,
    width: "100%",
    height: "10%",
    marginTop: "32%",
    gap: 20,
  },
  timeLastedMessage: {
    color: colors.timerColor,
    fontSize: 50,
    fontWeight: "bold",
  },
  timeLasted: {
    color: colors.timerColor,
    fontSize: 54,
    fontWeight: "bold",
  },
  resultBtnsContainer: {
    ...baseContainer,
    gap: 5,
    flexDirection: "row",
  },
  resultBtn: {
    backgroundColor: colors.letterBackground,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: colors.letterColor,
    padding: 5, 
    shadowColor: colors.letterColor,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  resultBtnText: {
    fontSize: 15,
    color: colors.letterColor,
    fontWeight: "bold",
  },
  wordListContainer: {
    ...baseContainer,
    width: "100%",
    marginTop: "15%",
    shadowColor: colors.letterColor,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 7,
    gap: 10,
  },
  wordsFound: {
    color: colors.timerColor,
    fontSize: 16,
    fontWeight: "bold",
  },
  wordList: {
    width: "45%",
    height: "50%",
    paddingLeft: 10,
    paddingTop: 5,
    borderWidth: 7,
    borderColor: colors.border,
    borderRadius: 15,
    backgroundColor: colors.boardBackground,
  },
  contentContainerStyle: {
    alignItems: "flex-start",
    justifyContent: "center",
  },
  wordContainer: {
    width: "auto",
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  word: {
    fontSize: 15,
    fontWeight: "bold",
    padding: 4,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.letterColor,
    backgroundColor: colors.letterBackground,
    shadowColor: colors.letterColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
});

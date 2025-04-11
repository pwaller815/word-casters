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
    backgroundColor: colors.boardBackground,
    width: "35%",
    height: "10%",
    marginTop: "20%",
    borderRadius: 15,
    borderWidth: 5,
    borderColor: colors.border,
  },
  wordListContainer: {
    ...baseContainer,
    width: "100%",
    marginTop: "10%",
  },
  wordList: {
    width: "45%",
    height: 300,
    paddingLeft: 10,
    paddingTop: 5,
    borderWidth: 5,
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
    borderColor: colors.border,
    backgroundColor: colors.letterBackground,
    shadowColor: colors.letterColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
});

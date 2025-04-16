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
    gap: 25,
  },
  timeLastedContainer: {
    ...baseContainer,
  },
  timeLastedMessage: {
    color: colors.timerColor,
    fontSize: 50,
    fontWeight: "800",
  },
  timeLasted: {
    color: colors.timerColor,
    fontSize: 54,
    fontWeight: "800",
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
    fontWeight: "800",
  },
  wordListContainer: {
    ...baseContainer,
    width: "100%",
    marginTop: "20%",
    shadowColor: colors.letterColor,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 7,
  },
  tabContainer: {
    flexDirection: "row",
  },
  tab: {
    width: "25%",
    paddingTop: 3,
    paddingBottom: 3,
    borderWidth: 2,
    borderBottomWidth: 0,
    borderColor: colors.letterColor,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: colors.letterColor,
    textAlign: "center",
  },
  activeTab: {
    backgroundColor: colors.border,
    borderColor: colors.border,
  },
  tabText: {
    fontSize: 13,
    textAlign: "center",
    color: colors.timerColor,
    fontWeight: "800",
  },
  activeTabText: {
    color: "rgba(252, 246, 246, 0.74)",
  },
  wordsFound: {
    color: colors.timerColor,
    fontSize: 16,
    fontWeight: "800",
  },
  wordList: {
    width: "55%",
    height: "50%",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    borderWidth: 7,
    borderColor: colors.border,
    borderRadius: 15,
    backgroundColor: colors.boardBackground,
  },
  contentContainerStyle: {
    justifyContent: "center",
    paddingBottom: 15,
  },
  listRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  wordContainer: {
    width: "auto",
    marginTop: 5,
  },
  word: {
    fontSize: 15,
    fontWeight: "800",
    padding: 4,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.letterColor,
    backgroundColor: colors.letterBackground,
    shadowColor: colors.letterColor,
    color: colors.letterColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    textAlign: "center",
  },
  activeGridItemCorrect: {
    backgroundColor: colors.valid,
    borderColor: colors.border,
  },
  wordLength: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.letterColor,
  },
});

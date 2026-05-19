import { StyleSheet } from "react-native";
import colors from "./colors";

export const GRID_SIZE = 4;
export const BOARD_PADDING = 5;
export const BOARD_BORDER = 5;
export const GRID_PADDING = 5;
export const GRID_GAP = 5;
export const TOTAL_OVERHEAD = (BOARD_BORDER * 2) + (BOARD_PADDING * 2) + (GRID_PADDING * 2) + (GRID_GAP * (GRID_SIZE - 1));

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    zIndex: -1
  },
  // TIMER
  timerTopRight: {
    position: "absolute",
    right: 16,
    zIndex: 10,
  },
  timer: {
    color: colors.timerColor,
    fontSize: 55,
    fontWeight: "800",
  },
  addedTime: {
    top: -12,
    position: "absolute",
    color: colors.timerColor,
    fontSize: 35,
    fontWeight: "800",
  },
  // OPPONENT AREA
  opponentArea: {
    flex: 1,
    width: "60%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 5,
    zIndex: 0
  },
  opponentCharacterWindow: {
    width: "20%",
    aspectRatio: 0.7,
    backgroundColor: "white",
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    borderWidth: 2,
    borderColor: "#ffffff15",
    alignItems: "center",
    justifyContent: "center",
  },
  opponentCharacterWindowText: {
    color: "#ffffff30",
    fontSize: 14,
  },
  opponentBoard: {
    width: "80%",
    aspectRatio: 1,
    padding: 5,
    backgroundColor: colors.boardBackground,
    borderWidth: 5,
    borderColor: colors.border,
    borderRadius: 15,
    shadowColor: colors.letterColor,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  opponentBoardText: {
    color: "#ffffff30",
    fontSize: 14,
  },
  // PLAYER AREA
  playerArea: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
  },
  // CHARACTER WINDOW
  characterWindow: {
    width: "20%",
    aspectRatio: 0.7,
    backgroundColor: "#0b1522",
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    borderWidth: 1,
    borderColor: "#ffffff15",
    alignItems: "center",
    justifyContent: "center",
    
  },
  characterWindowText: {
    color: "#ffffff30",
    fontSize: 14,
  },
  // STRING BUILDING
  currentStringContainer: {
    width: 200,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginTop: -25,
  },
  currentString: {
    zIndex: 2,
    fontSize: 25,
    fontWeight: "800",
    padding: 4,
    borderRadius: 10,
    borderWidth: 2,
  },
  prevString: {
    position: "absolute",
    zIndex: 1,
    fontSize: 25,
    fontWeight: "800",
    padding: 4,
    borderRadius: 10,
    borderWidth: 2,
  },
  // BOARD
  gridBoard: {
    width: "80%",
    aspectRatio: 1,
    padding: BOARD_PADDING,
    backgroundColor: colors.boardBackground,
    borderWidth: BOARD_BORDER,
    borderColor: colors.border,
    borderRadius: 15,
    shadowColor: colors.letterColor,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  gridItems: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    height: "100%",
    padding: GRID_PADDING,
    gap: GRID_GAP,
  },
  gridItem: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.letterBackground,
    borderWidth: 3,
    borderColor: colors.letterColor,
    borderRadius: 10,
    shadowColor: colors.letterColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  // LETTER STYLES
  activeGridItemIncorrect: {
    backgroundColor: colors.invalid,
    borderColor: colors.invalidBorder,
  },
  activeGridItemCorrect: {
    backgroundColor: colors.valid,
    borderColor: colors.border,
  },
  alreadyFound: {
    backgroundColor: colors.alreadyFound,
    borderColor: colors.alreadyFoundBorder,
  },
  oneUse: {
    color: "orange",
  },
  twoUse: {
    color: "red",
  },
  letter: {
    fontWeight: "800",
    fontSize: 55,
    color: colors.letterColor,
  },
  // SPELLS
  spellsContainer: {
    width: "70%",
    aspectRatio: 8,
    backgroundColor: "brown",
    alignItems: "center",
    marginTop: 20,
  },
  resetButton: {
    width: "25%",
    height: 40,
    borderRadius: 12,
    backgroundColor: "#1a1a2e",
    overflow: "hidden",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    
    borderWidth: 1,
    borderColor: "#ffffff20",
  },
  resetButtonFill: {
    position: "absolute",
    left: 0,
    top: 0,
    height: "100%",
    backgroundColor: "#95d5b2",
    opacity: 0.4,
  },
  resetButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    zIndex: 1,
  },
  resetButtonLocked: {
    borderColor: "#ffffff10",
    opacity: 0.5,
  },
  resetButtonFillLocked: {
    backgroundColor: "#ffffff",
    opacity: 0.15,
  },
  resetButtonTextLocked: {
    color: "#ffffff60",
  },
});

import { StyleSheet, ViewStyle } from "react-native";
import colors from "./colors";

const baseContainer: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
};

const titleGrid: ViewStyle = {
    flexDirection: "row",
    padding: 5,
    backgroundColor: colors.boardBackground,
    borderWidth: 5,
    borderColor: colors.border,
    borderRadius: 15,
    gap: 2,
  };

const itemWidth = (210 - 23 - 10) / 4;

export default StyleSheet.create({
  index: {
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
    backgroundColor: colors.background,
  },
  titleContainer: {
    ...baseContainer,
    marginTop: "55%",
    marginBottom: "20%",
    position: "relative",
  },
  titleGridOne: {
    ...titleGrid,
    borderBottomWidth: 0,
    paddingBottom: 0,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    position: "absolute",
    zIndex: 2,
    top: -49,
  },
  titleGridTwo: {
    ...titleGrid,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: colors.letterColor,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    zIndex: 1,
  },
  titleLetter: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    width: itemWidth,
    height: itemWidth,
    backgroundColor: colors.letterBackground,
    borderWidth: 2,
    borderColor: colors.letterColor,
    borderRadius: 10,
    shadowColor: colors.letterColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    fontWeight: "800",
    fontSize: 33.7,
    color: colors.letterColor,
  },
});

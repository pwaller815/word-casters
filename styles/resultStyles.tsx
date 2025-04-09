import { StyleSheet, ViewStyle } from "react-native";
import colors from "./colors";

const baseContainer: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

export default StyleSheet.create({
  result: {
    ...baseContainer,
    backgroundColor: colors.background,
  },
  resultInfoContainer: {
    ...baseContainer,
    backgroundColor: colors.background,
  },
});

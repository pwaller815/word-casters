import { StyleSheet } from "react-native";
import colors from "./colors";

// (Gridboard width) - (Gridboard borderWidth * 2) - (gap * 3) - (padding * 2)
const itemWidth = (330 - 20 - 9 - 10) / 4;

export default StyleSheet.create({
    board: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background,
    },
    gridBoard: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 3,
        padding: 5,
        width: 330,
        height: 330,
        backgroundColor: colors.boardBackground,
        borderWidth: 10,
        borderColor: colors.border,
        borderRadius: 15,
    },
    gridItem: {
        alignItems: "center",
        justifyContent: "center",
        width: itemWidth,
        height: itemWidth,
        backgroundColor: colors.letterBackground,
        borderWidth: 3,
        borderColor: colors.border,
        borderRadius: 10,
    },
    letter: {
        fontSize: 55,
    }
});
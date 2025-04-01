import { StyleSheet } from "react-native";
import colors from "./colors";

const itemWidth = (330 - 23 - 10) / 4;

export default StyleSheet.create({
    board: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background,
    },
    timerContainer: {
        width: 200,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
    },
    timer: {
        color: "white",
        fontSize: 40,
    },
    currentStringContainer: {
        width: 200,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
    },
    currentString: {
        fontSize: 25,
    },
    gridBoard: {
        width: 334,
        height: 334,
        backgroundColor: colors.boardBackground,
        borderWidth: 5,
        borderColor: colors.border,
        borderRadius: 15,
    },
    gridItems: {
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        height: "100%",
        padding: 5,
        gap: 5,
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
    activeGridItemIncorrect: {
        backgroundColor: "red",
    },
    activeGridItemCorrect: {
        backgroundColor: "lime",
    },
    alreadyFound: {
        backgroundColor: "orange",
    },
    letter: {
        fontSize: 55,
    }
});
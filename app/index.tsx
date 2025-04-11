import { Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import indexstyles from "@/styles/indexstyles";
import resultStyles from "@/styles/resultStyles";

export default function Index() {
  const router = useRouter();
  return (
    <View style={indexstyles.index}>
      <View style={indexstyles.titleContainer}>
        <View style={indexstyles.titleGridOne}>
          <Text style={indexstyles.titleLetter}>W</Text>
          <Text style={indexstyles.titleLetter}>O</Text>
          <Text style={indexstyles.titleLetter}>R</Text>
          <Text style={indexstyles.titleLetter}>D</Text>
        </View>
        <View style={indexstyles.titleGridTwo}>
          <Text style={indexstyles.titleLetter}>S</Text>
          <Text style={indexstyles.titleLetter}>U</Text>
          <Text style={indexstyles.titleLetter}>R</Text>
          <Text style={indexstyles.titleLetter}>V</Text>
          <Text style={indexstyles.titleLetter}>I</Text>
          <Text style={indexstyles.titleLetter}>V</Text>
          <Text style={indexstyles.titleLetter}>A</Text>
          <Text style={indexstyles.titleLetter}>L</Text>
        </View>
      </View>
      <View style={resultStyles.resultBtnsContainer}>
      <TouchableOpacity
        onPress={() => router.push("/game")}
        style={resultStyles.resultBtn}
      ><Text style={[resultStyles.resultBtnText, { fontSize: 22 }]}>Start</Text></TouchableOpacity>
      </View>
    </View>
  );
}

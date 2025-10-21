import {
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import CustomHeader from "../components/CustomHeader";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Topbar */}
      <CustomHeader navigation={navigation} />

      {/* Baggrundsbillede og indhold */}
      <ImageBackground
        source={require("../assets/forsidebillede.png")}
        style={styles.backgroundImage}
        resizeMode="contain"
      >
        {/* 👇 Tilføjet “Fridgy”-titel */}
        <Text style={styles.logo}>Fridgy</Text>

        <View style={styles.bottomContent}>
          <Text style={styles.title}>Hvad er der i dit køleskab?</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Søgning")}
          >
            <Text style={styles.buttonText}>Gå til søgning</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F0E9" },
  backgroundImage: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  // 👇 Ny “Fridgy”-tekst
  logo: {
    fontFamily: "BelanosimaBold",
    fontSize: 48,
    color: "#49586B",
    position: "absolute",
    top: 140, // justér højden her hvis den skal længere ned
    textAlign: "center",
  },
  bottomContent: { alignItems: "center", marginBottom: 60 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#49586B",
    marginBottom: 20,
    fontFamily: "BelanosimaBold",
  },
  button: {
    backgroundColor: "#49586B",
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  buttonText: {
    color: "#F3F0E9",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "BelanosimaBold",
  },
});

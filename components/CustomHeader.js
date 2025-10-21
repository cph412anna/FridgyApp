import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

export default function CustomHeader({ navigation }) {
  return (
    <View style={styles.header}>
      {/* Logo (uden baggrund) */}
      <TouchableOpacity onPress={() => navigation.navigate("Hjem")}>
        <Image
          source={require("../assets/applogo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Burgermenu */}
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={32} color="#F3F0E9" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#49586B",
    height: 90,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  logo: {
    width: 35,
    height: 35,
  },
});

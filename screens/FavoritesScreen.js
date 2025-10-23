import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomHeader from "../components/CustomHeader";

export default function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);

  // 🔁 Indlæs favoritter når skærmen åbnes
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const data = await AsyncStorage.getItem("favorites");
        if (data) {
          setFavorites(JSON.parse(data));
        } else {
          setFavorites([]);
        }
      } catch (error) {
        console.error("Fejl ved indlæsning af favoritter:", error);
      }
    };

    const unsubscribe = navigation.addListener("focus", loadFavorites);
    return unsubscribe;
  }, [navigation]);

  // ❌ Fjern én favorit
  const removeFavorite = async (id) => {
    try {
      const updated = favorites.filter((item) => item.id !== id);
      setFavorites(updated);
      await AsyncStorage.setItem("favorites", JSON.stringify(updated));
    } catch (error) {
      console.error("Fejl ved fjernelse af favorit:", error);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <CustomHeader navigation={navigation} title="Favoritter" />

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Du har ingen favoritter endnu 💔</Text>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.listContent}
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {/* 🗑️ Individuelt slettekryds */}
              <TouchableOpacity
                style={styles.deleteIcon}
                onPress={() => removeFavorite(item.id)}
              >
                <Ionicons name="close-circle" size={28} color="#C0392B" />
              </TouchableOpacity>

              {/* 📸 Opskriftens billede og navigation */}
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("OpskrifterStack", {
  screen: "OpskriftDetaljer",
  params: { recipe: item, fromFavorites: true },
})

                }
              >
                <Image source={item.image} style={styles.image} />
                <View style={styles.cardContent}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.subText}>Tryk for at se opskriften</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

// 🎨 Styling
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#F3F0E9",
  },
  listContent: {
    padding: 20,
    paddingBottom: 100,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    textAlign: "center",
    fontFamily: "BelanosimaBold",
    fontSize: 18,
    color: "#49586B",
    marginTop: 50,
  },
  card: {
    backgroundColor: "#fff",
    marginBottom: 15,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
    position: "relative",
  },
  deleteIcon: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 2,
  },
  image: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardContent: {
    padding: 10,
  },
  name: {
    fontFamily: "BelanosimaBold",
    fontSize: 18,
    color: "#49586B",
    marginBottom: 4,
  },
  subText: {
    fontFamily: "Belanosima",
    fontSize: 14,
    color: "#6B7280",
  },
});

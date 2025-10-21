import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
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

    // Opdater hver gang skærmen åbnes
    const unsubscribe = navigation.addListener("focus", loadFavorites);
    return unsubscribe;
  }, [navigation]);

  const clearFavorites = async () => {
    await AsyncStorage.removeItem("favorites");
    setFavorites([]);
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
            <TouchableOpacity
              style={styles.card}
              // 👇 Sørger for at åbne den detaljerede opskrift
              onPress={() =>
                navigation.navigate("OpskriftDetaljer", { recipe: item })
              }
            >
              <Image source={item.image} style={styles.image} />
              <View style={styles.cardContent}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.subText}>Tryk for at se opskriften</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      {favorites.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={clearFavorites}>
          <Text style={styles.clearButtonText}>Ryd favoritter</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

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
  },
  image: {
    width: "100%",
    height: 150,
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
  clearButton: {
    backgroundColor: "#49586B",
    paddingVertical: 12,
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 20,
    width: "70%",
  },
  clearButtonText: {
    color: "#F3F0E9",
    textAlign: "center",
    fontFamily: "BelanosimaBold",
    fontSize: 16,
  },
});

import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
    Animated,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import CustomHeader from "../components/CustomHeader";

export default function RecipeDetailScreen({ navigation }) {
  const route = useRoute();
  const { recipe } = route.params;

  const [isFavorite, setIsFavorite] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(1));

  // Hent favoritstatus fra AsyncStorage (kør hver gang en ny opskrift åbnes)
useEffect(() => {
  const loadFavorite = async () => {
    const favorites = await AsyncStorage.getItem("favorites");
    const favList = favorites ? JSON.parse(favorites) : [];
    setIsFavorite(favList.some((fav) => fav.id === recipe.id));
  };
  loadFavorite();
}, [recipe]); // 👈 nu opdateres den når opskriften ændres


  // Håndter tryk på favorit-hjerte
  const toggleFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem("favorites");
      let favList = favorites ? JSON.parse(favorites) : [];

      if (isFavorite) {
        favList = favList.filter((fav) => fav.id !== recipe.id);
        setIsFavorite(false);
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
      } else {
        favList.push(recipe);
        setIsFavorite(true);
        Animated.spring(scaleAnim, {
          toValue: 1.3,
          friction: 3,
          tension: 100,
          useNativeDriver: true,
        }).start(() => {
          Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();
        });
      }

      await AsyncStorage.setItem("favorites", JSON.stringify(favList));
    } catch (error) {
      console.error("Fejl ved opdatering af favoritter:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F3F0E9" }}>
      {/* ✅ Topbar */}
      <CustomHeader navigation={navigation} title="Opskrift" />

      <ScrollView style={styles.container}>
        {/* 🖼️ Billede */}
        <Image source={recipe.image} style={styles.image} />

        {/* 🧾 Titel */}
        <Text style={styles.title}>{recipe.name}</Text>

        {/* 🍴 Ingredienser */}
        <Text style={styles.subtitle}>Ingredienser:</Text>
        {recipe.ingredients.map((ing, index) => (
          <Text key={index} style={styles.ingredientText}>• {ing}</Text>
        ))}

        {/* 👩‍🍳 Fremgangsmåde */}
        <Text style={styles.subtitle}>Sådan gør du:</Text>
        {recipe.steps.map((step, index) => (
          <Text key={index} style={styles.stepText}>
            {index + 1}. {step}
          </Text>
        ))}

        {/* ❤️ Favoritfunktion */}
        <View style={styles.favoriteContainer}>
          <Text style={styles.favoriteText}>
            {isFavorite ? "Gemt som favorit" : "Gem som favorit"}
          </Text>
          <TouchableOpacity onPress={toggleFavorite}>
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={32}
                color={isFavorite ? "#C0392B" : "#49586B"}
              />
            </Animated.View>
          </TouchableOpacity>
        </View>

        {/* 🔙 Tilbageknapper */}
        <View style={styles.buttonsContainer}>
        <TouchableOpacity
  style={styles.backButton}
  onPress={() => navigation.goBack()}
>
  <Text style={styles.backButtonText}>Tilbage til opskrifter</Text>
</TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

// 💅 Styling
const styles = StyleSheet.create({
  container: { padding: 20 },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginBottom: 20,
  },
  title: {
    fontFamily: "BelanosimaBold",
    fontSize: 26,
    color: "#49586B",
    marginBottom: 15,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "BelanosimaBold",
    fontSize: 18,
    marginTop: 20,
    color: "#49586B",
  },
  ingredientText: {
    fontFamily: "Belanosima",
    fontSize: 16,
    marginLeft: 10,
    marginTop: 5,
    lineHeight: 22,
  },
  stepText: {
    fontFamily: "Belanosima",
    fontSize: 16,
    marginVertical: 4,
    lineHeight: 22,
  },
  favoriteContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    gap: 10,
  },
  favoriteText: {
    fontFamily: "BelanosimaBold",
    color: "#49586B",
    fontSize: 16,
  },
  buttonsContainer: {
    marginTop: 35,
    marginBottom: 30,
    alignItems: "center",
  },
  backButton: {
    backgroundColor: "#49586B",
    paddingVertical: 14,
    paddingHorizontal: 35,
    borderRadius: 10,
    alignSelf: "center",
  },
  backButtonText: {
    color: "#F3F0E9",
    fontFamily: "BelanosimaBold",
    fontSize: 16,
    textAlign: "center",
  },
});

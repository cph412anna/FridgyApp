import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
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
  const { recipe, fromFavorites } = route.params || {};

  const [isFavorite, setIsFavorite] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(1));
  const [portions, setPortions] = useState(1);

  // 🔢 Håndter ændring af portioner
  const handleIncrease = () => {
    if (portions < 10) setPortions(portions + 1);
  };

  const handleDecrease = () => {
    if (portions > 1) setPortions(portions - 1);
  };

  // ⚖️ Funktion der ganger ingrediensmængder
  const scaleIngredient = (ingredient) => {
    const match = ingredient.match(/^(\d+(\.\d+)?)\s*(.*)$/);
    if (!match) return ingredient;
    const originalAmount = parseFloat(match[1]);
    const rest = match[3];
    const scaledAmount = (originalAmount * portions).toFixed(1);
    return `${scaledAmount} ${rest}`;
  };

  // 🔁 Tjek om opskriften er favorit
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const data = await AsyncStorage.getItem("favorites");
        const favorites = data ? JSON.parse(data) : [];
        setIsFavorite(favorites.some((fav) => fav.id === recipe.id));
      } catch (error) {
        console.error("Fejl ved indlæsning af favoritter:", error);
      }
    };
    loadFavorites();
  }, [recipe]);

  // ❤️ Tilføj/fjern favorit
  const toggleFavorite = async () => {
    try {
      const data = await AsyncStorage.getItem("favorites");
      let favorites = data ? JSON.parse(data) : [];

      if (isFavorite) {
        favorites = favorites.filter((fav) => fav.id !== recipe.id);
        setIsFavorite(false);
      } else {
        const recipeToSave = {
          ...recipe,
          imagePath: recipe.imagePath || "../assets/recipes/pasta_spinat_ost.jpg",
        };
        favorites.push(recipeToSave);
        setIsFavorite(true);
      }

      await AsyncStorage.setItem("favorites", JSON.stringify(favorites));

      Animated.spring(scaleAnim, {
        toValue: isFavorite ? 1 : 1.3,
        friction: 3,
        tension: 100,
        useNativeDriver: true,
      }).start(() => {
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
      });
    } catch (error) {
      console.error("Fejl ved opdatering af favoritter:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F3F0E9" }}>
      <CustomHeader navigation={navigation} title="Opskrift" />

      <ScrollView style={styles.container}>
        {/* 🖼️ Billede */}
        <Image source={recipe.image} style={styles.image} />

        {/* 🧾 Titel */}
        <Text style={styles.title}>{recipe.name}</Text>

        {/* ⏱️ Info */}
        <Text style={styles.infoText}>
          Tid: {recipe.time} • {portions} portion{portions > 1 ? "er" : ""}
        </Text>

        {/* 🧂 Ingredienser + portionskontrol */}
        <View style={styles.portionContainer}>
          <Text style={styles.subtitle}>
            Ingredienser (for {portions} portion{portions > 1 ? "er" : ""}):
          </Text>

          <View style={styles.portionButtons}>
            <TouchableOpacity
              onPress={handleDecrease}
              disabled={portions === 1}
              style={[
                styles.portionButton,
                portions === 1 && styles.disabledButton,
              ]}
            >
              <Text
                style={[
                  styles.portionButtonText,
                  portions === 1 && styles.disabledButtonText,
                ]}
              >
                -
              </Text>
            </TouchableOpacity>

            <Text style={styles.portionCount}>{portions}</Text>

            <TouchableOpacity
              onPress={handleIncrease}
              disabled={portions === 10}
              style={[
                styles.portionButton,
                portions === 10 && styles.disabledButton,
              ]}
            >
              <Text
                style={[
                  styles.portionButtonText,
                  portions === 10 && styles.disabledButtonText,
                ]}
              >
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {recipe.ingredients.map((ing, index) => (
          <Text key={index} style={styles.ingredientText}>
            • {scaleIngredient(ing)}
          </Text>
        ))}

        {/* 👩‍🍳 Fremgangsmåde */}
        <Text style={styles.subtitle}>Sådan gør du:</Text>
        {recipe.steps.map((step, index) => (
          <Text key={index} style={styles.stepText}>
            {index + 1}. {step}
          </Text>
        ))}

        {/* ❤️ Favorit-knap */}
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

        {/* 🔙 Tilbage-knap */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              if (fromFavorites) {
                navigation.navigate("Favoritter");
              } else {
                navigation.goBack();
              }
            }}
          >
            <Text style={styles.backButtonText}>
              ← {fromFavorites ? "Til favoritter" : "Tilbage"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

// 🎨 Styling
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
    marginBottom: 10,
    textAlign: "center",
  },
  infoText: {
    fontFamily: "Belanosima",
    color: "#49586B",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
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
  // 🧮 Portion styling
  portionContainer: {
    marginTop: 15,
    alignItems: "center",
  },
  portionButtons: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 12,
  },
  portionButton: {
    backgroundColor: "#49586B",
    borderRadius: 20,
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  portionButtonText: {
    color: "#F3F0E9",
    fontSize: 20,
    fontWeight: "bold",
  },
  portionCount: {
    fontFamily: "BelanosimaBold",
    fontSize: 20,
    color: "#49586B",
  },
  disabledButton: {
    backgroundColor: "#9CA3AF",
  },
  disabledButtonText: {
    color: "#E5E7EB",
  },
});

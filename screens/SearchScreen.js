import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CustomHeader from "../components/CustomHeader";

export default function SearchScreen({ navigation }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  // Dummy ingrediensliste (kan udvides senere)
  const allIngredients = [
    "Kyllingebryst",
    "Kyllingelår",
    "Hakket kylling",
    "Hakket oksekød",
    "Bøf",
    "Oksemørbrad",
    "Hakket svinekød",
    "Bacon",
    "Skinke",
    "Pølser",
    "Laks",
    "Torsk",
    "Tun",
    "Sild",
    "Fiskefrikadeller",
    "Æg",
    "Rejer",
    "Kalkun",
    "Spegepølse",
    "Mælk",
    "Fløde",
    "Madlavningsfløde",
    "Yoghurt",
    "Skyr",
    "Smør",
    "Plantesmør",
    "Skæreost",
    "Revet ost",
    "Hytteost",
    "Mozerella",
    "Parmesan",
    "Feta",
    "Flødeost",
    "Ricotta",
    "Marscarpone",
    "Creme fraiche",
    "Tomater",
    "Agurk",
    "Salat",
    "Spinat",
    "Rucola",
    "Gulerødder",
    "Kartofler",
    "Søde kartofler",
    "Løg",
    "Hvidløg",
    "Peberfrugt",
    "Broccoli",
    "Blomkål",
    "Zucchini",
    "Aubergine",
    "Champignon",
    "Majs",
    "Ærter",
    "Bønner",
    "Selleri",
    "Forårsløg",
    "Porrer",
    "Asparges",
    "Avocado",
    "Citron",
    "Lime",
    "Koriander",
    "Persille",
    "Basilikum",
    "Timian",
    "Rosmarin",
    "Oregano",
    "Dild",
    "Mynte",
    "Æbler",
    "Bananer",
    "Appelsiner",
    "Pærer",
    "Druer",
    "Jordbær",
    "Blåbær",
    "Hindbær",
    "Ananas",
    "Mango",
    "Kiwi",
    "Vandmelon",
    "Honningmelon",
    "Ferskner",
    "Nektariner",
    "Abrikoser",
    "Kirsebær",
    "Granatæble",
    "Ketchup",
    "Sennep",
    "Mayonnaise",
    "Soyasauce",
    "Remoulade",
    "Chilisauce",
    "Barbecuesauce",
    "Chili sauce",
    "Teriaki sauce",
    "Tabascosauce",
    "Sriracha sauce",
    "Pesto",
    "Marmelade",
    "Syltetøj",
    "Pickles",
    "Oliven",
    "Kapers",
    "Peberrod",
    "Syltede agurker",
    "Rødbeder",
    "Hummus",
    "Tzatziki",
    "Guacamole",
    "Peanutbutter",
    "Juice",
    "Kakaomælk",
    "Øl",
    "Vin",
    "Ingefær",
    "Creme Fraiche dressing",
    "Thousand Island dressing",
    "Italiensk dressing",
    "Balsamico dressing",
    "Ranch dressing",
    "Honning sennep dressing",
    "Caesar dressing",
    "Yoghurt dressing",
    "Ost",
    "Purløg",
    "Chili",
  ];

  const handleInputChange = (text) => {
    setInput(text);
    if (text.length > 0) {
      const filtered = allIngredients.filter((item) =>
        item.toLowerCase().startsWith(text.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectIngredient = (item) => {
    if (!ingredients.includes(item)) {
      setIngredients([...ingredients, item]);
    }
    setInput("");
    setSuggestions([]);
  };

  const handleRemoveIngredient = (item) => {
    setIngredients(ingredients.filter((i) => i !== item));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <CustomHeader navigation={navigation} title="Køleskab" />

      <View style={styles.content}>
        <Text style={styles.title}>Hvad er der i dit køleskab?</Text>

        {/* 🔍 Søgefelt og kamera */}
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={24} color="gray" style={{ marginRight: 8 }} />
            <TextInput
              placeholder="Indtast ingredienser..."
              placeholderTextColor="#666"
              style={styles.searchInput}
              value={input}
              onChangeText={handleInputChange}
            />
          </View>

          <TouchableOpacity
            style={styles.cameraButton}
            onPress={() => navigation.navigate("Kamera")}
          >
            <Ionicons name="camera" size={42} color="#F3F0E9" />
          </TouchableOpacity>
        </View>

        {/* 📍 Centreret hjælpetekst */}
        <Text style={styles.helperText}>
          *Indtast minimum tre produkter fra dit køleskab{"\n"}
          eller brug kameraet til at scanne dit køleskab!
        </Text>

        {/* Popdown-menu */}
        {suggestions.length > 0 && (
          <View style={styles.suggestionBox}>
            {suggestions.map((item) => (
              <TouchableOpacity key={item} onPress={() => handleSelectIngredient(item)}>
                <Text style={styles.suggestionText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Valgte ingredienser */}
        <FlatList
          data={ingredients}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={styles.ingredientBox}>
              <Text style={styles.ingredientText}>{item}</Text>
              <TouchableOpacity onPress={() => handleRemoveIngredient(item)}>
                <Ionicons name="close-circle" size={22} color="#49586B" />
              </TouchableOpacity>
            </View>
          )}
        />

        {/* Knap vises kun ved 3+ ingredienser */}
        {ingredients.length >= 3 && (
          <TouchableOpacity
            style={styles.recipeButton}
            onPress={() =>
              navigation.navigate("OpskrifterStack", {
                screen: "Opskrifter",
                params: {
                  ingredients: ingredients,
                  fromCamera: false,
                },
              })
            }
          >
            <Text style={styles.recipeButtonText}>Se opskrifter her</Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F0E9" },
  content: { flex: 1, alignItems: "center", padding: 20 },

  title: {
    fontSize: 24,
    fontFamily: "BelanosimaBold",
    color: "#49586B",
    marginVertical: 30,
    textAlign: "center",
  },

  // 🧠 Søgefelt + kamera
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    marginBottom: 10,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECECEC",
    borderColor: "#F4A0CE",
    borderWidth: 2,
    borderRadius: 40,
    paddingHorizontal: 15,
    height: 60,
    width: "70%",
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    color: "#333",
    fontFamily: "Belanosima",
  },
  cameraButton: {
    backgroundColor: "#F4A0CE",
    borderRadius: 12,
    padding: 12,
  },

  // 📍 Centreret hjælpetekst
  helperText: {
    fontFamily: "Belanosima",
    fontSize: 14,
    color: "#49586B",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 15,
    lineHeight: 20,
    width: "85%",
  },

  suggestionBox: {
    backgroundColor: "#E7E7E7",
    borderColor: "#49586B",
    borderWidth: 1,
    borderRadius: 8,
    width: "70%",
    marginTop: 5,
    alignSelf: "flex-start",
    marginLeft: "15%",
  },
  suggestionText: {
    padding: 10,
    fontFamily: "Belanosima",
    color: "#49586B",
  },
  ingredientBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "70%",
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
  },
  ingredientText: {
    fontFamily: "BelanosimaBold",
    color: "#49586B",
    fontSize: 16,
  },
  recipeButton: {
    marginTop: 20,
    backgroundColor: "#49586B",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  recipeButtonText: {
    color: "#F3F0E9",
    fontFamily: "BelanosimaBold",
    fontSize: 16,
  },
});

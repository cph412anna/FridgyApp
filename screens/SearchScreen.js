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
    "selleri",
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
      {/* Fælles topbar */}
      <CustomHeader navigation={navigation} title="Køleskab" />

      <View style={styles.content}>
        <Text style={styles.title}>Hvad er der i dit køleskab?</Text>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Indtast ingredienser..."
            placeholderTextColor="#49586B"
            value={input}
            onChangeText={handleInputChange}
          />

          <TouchableOpacity
            style={styles.cameraButton}
            onPress={() => navigation.navigate("Kamera")}
          >
            <Ionicons name="camera-outline" size={32} color="#F3F0E9" />
        </TouchableOpacity>

        </View>

        {/* Popdown-menu */}
        {suggestions.length > 0 && (
          <View style={styles.suggestionBox}>
            {suggestions.map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => handleSelectIngredient(item)}
              >
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
      fromCamera: false, // 👈 vigtigt — overskriver tidligere kameradata
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
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  input: {
    backgroundColor: "#E7E7E7",
    borderColor: "#49586B",
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    width: "70%",
    fontFamily: "Belanosima",
    fontSize: 16,
  },
  cameraButton: {
    backgroundColor: "#49586B",
    padding: 12,
    borderRadius: 8,
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

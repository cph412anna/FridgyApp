import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CustomHeader from "../components/CustomHeader";

// 🧾 Liste over alle opskrifter
 const allRecipes = [
  {
    id: 1,
    name: "Cremet kyllingepasta med spinat og flødeost",
    image: require("../assets/recipes/kyllingepasta_spinat_floedeost.jpg"),
    imagePath: "../assets/recipes/kyllingepasta_spinat_floedeost.jpg",
    time: "25 min",
    portion: "1 person",
    ingredients: [
      "120 g kyllingebryst",
      "50 g frisk spinat",
      "50 g flødeost",
      "0.5 dl madlavningsfløde",
      "0.5 løg",
      "1 fed hvidløg",
      "75 g pasta",
      "salt",
      "peber",
    ],
    steps: [
      "Kog pastaen al dente.",
      "Steg kyllingestykker i lidt olie.",
      "Tilsæt løg og hvidløg og svits til de er bløde.",
      "Rør flødeost og fløde i, lad det smelte sammen.",
      "Vend spinaten i, smag til med salt og peber, og tilsæt pastaen.",
    ],
  },
  {
    id: 2,
    name: "Ovnbagt laks med citron og asparges",
    image: require("../assets/recipes/laks_citron_asparges.jpg"),
    imagePath: "../assets/recipes/laks_citron_asparges.jpg",
    time: "20 min",
    portion: "1 person",
    ingredients: [
      "120 g laks",
      "0.5 citron",
      "100 g asparges",
      "1 tsk smør",
      "salt",
      "peber",
      "dild",
    ],
    steps: [
      "Forvarm ovnen til 200°C.",
      "Læg laksen i et fad, tilsæt asparges og smør.",
      "Pres citronsaft over og krydr med salt, peber og dild.",
      "Bag i ovnen i 15–20 minutter.",
    ],
  },
  {
    id: 3,
    name: "Krydret oksekødsgryde med bønner og chili",
    image: require("../assets/recipes/oksekodsgryde_boenner_chili.jpg"),
    imagePath: "../assets/recipes/oksekodsgryde_boenner_chili.jpg",
    time: "30 min",
    portion: "1 person",
    ingredients: [
      "100 g hakket oksekød",
      "0.5 løg",
      "1 fed hvidløg",
      "100 g bønner",
      "1 dl hakkede tomater",
      "0.5 tsk chili",
      "0.5 tsk paprika",
      "75 g ris",
    ],
    steps: [
      "Steg løg og hvidløg i olie.",
      "Tilsæt oksekød og brun det.",
      "Tilsæt tomater, bønner, chili og paprika.",
      "Lad det simre 15 minutter og servér med ris.",
    ],
  },
  {
    id: 4,
    name: "Kartoffelfrittata med bacon og ost",
    image: require("../assets/recipes/kartoffelfrittata_bacon_ost.jpg"),
    imagePath: "../assets/recipes/kartoffelfrittata_bacon_ost.jpg",
    time: "25 min",
    portion: "1 person",
    ingredients: [
      "150 g kartofler",
      "40 g bacon",
      "2 æg",
      "0.5 løg",
      "30 g revet ost",
      "1 tsk purløg",
      "salt",
      "peber",
    ],
    steps: [
      "Kog kartoflerne næsten møre og skær dem i skiver.",
      "Steg bacon sprødt og tilsæt løg.",
      "Pisk æg, ost og purløg sammen.",
      "Hæld over kartofler og bacon, steg ved lav varme.",
    ],
  },
  {
    id: 5,
    name: "Pasta med tun, majs og creme fraiche",
    image: require("../assets/recipes/pasta_tun_majs_cremefraiche.jpg"),
    imagePath: "../assets/recipes/pasta_tun_majs_cremefraiche.jpg",
    time: "15 min",
    portion: "1 person",
    ingredients: [
      "1 dåse tun",
      "50 g majs",
      "2 spsk creme fraiche",
      "0.5 løg",
      "1 tsk citronsaft",
      "75 g pasta",
      "salt",
      "peber",
    ],
    steps: [
      "Kog pastaen al dente.",
      "Bland tun, majs, creme fraiche og løg i en skål.",
      "Tilsæt citronsaft, salt og peber.",
      "Vend det sammen med den varme pasta.",
    ],
  },
  {
    id: 6,
    name: "Grøntsagstærte med porrer, broccoli og feta",
    image: require("../assets/recipes/groentsagstaerte_porrer_broccoli_feta.jpg"),
    imagePath: "../assets/recipes/groentsagstaerte_porrer_broccoli_feta.jpg",
    time: "35 min",
    portion: "1 person",
    ingredients: [
      "1 porre",
      "75 g broccoli",
      "2 æg",
      "0.5 dl fløde",
      "30 g feta",
      "1 tsk smør",
      "25 g mel",
      "salt",
    ],
    steps: [
      "Forvarm ovnen til 180°C.",
      "Rør mel, smør og lidt vand til en dej og forbag bunden.",
      "Pisk æg og fløde, tilsæt grøntsager og feta.",
      "Hæld massen i tærten og bag 25 minutter.",
    ],
  },
  {
    id: 7,
    name: "Kyllingelår i ovn med rodfrugter og timian",
    image: require("../assets/recipes/kyllingelaar_rodfrugter_timian.jpg"),
    imagePath: "../assets/recipes/kyllingelaar_rodfrugter_timian.jpg",
    time: "40 min",
    portion: "1 person",
    ingredients: [
      "1 kyllingelår",
      "1 gulerod",
      "100 g kartofler",
      "0.5 løg",
      "0.5 tsk timian",
      "1 spsk olivenolie",
      "salt",
      "peber",
    ],
    steps: [
      "Forvarm ovnen til 200°C.",
      "Læg kylling og grøntsager i et fad, dryp med olie.",
      "Krydr med salt, peber og timian.",
      "Bag i 35–40 minutter til gylden og gennemstegt.",
    ],
  },
  {
    id: 8,
    name: "Frisk pastasalat med skinke og rucola",
    image: require("../assets/recipes/pastasalat_skinke_rucola.jpg"),
    imagePath: "../assets/recipes/pastasalat_skinke_rucola.jpg",
    time: "15 min",
    portion: "1 person",
    ingredients: [
      "50 g skinke",
      "20 g rucola",
      "4 cherrytomater",
      "0.25 agurk",
      "75 g pasta",
      "2 spsk italiensk dressing",
      "1 spsk parmesan",
    ],
    steps: [
      "Kog pastaen og afkøl den.",
      "Skær grøntsagerne og skinken.",
      "Bland det hele og tilsæt dressing og parmesan.",
    ],
  },
  {
    id: 9,
    name: "Pasta carbonara med bacon og fløde",
    image: require("../assets/recipes/pasta_carbonara_bacon_floede.jpg"),
    imagePath: "../assets/recipes/pasta_carbonara_bacon_floede.jpg",
    time: "20 min",
    portion: "1 person",
    ingredients: [
      "75 g bacon",
      "1 æg",
      "0.5 dl fløde",
      "20 g parmesan",
      "1 fed hvidløg",
      "75 g pasta",
      "peber",
    ],
    steps: [
      "Steg bacon sprødt, tilsæt hvidløg.",
      "Pisk æg, fløde og parmesan sammen.",
      "Vend den varme pasta i baconen og tilsæt æggeblandingen.",
      "Rør hurtigt og servér med peber.",
    ],
  },
  {
    id: 10,
    name: "Lun salat med torsk, æg og sennepsdressing",
    image: require("../assets/recipes/lun_salat_torsk_aeg.jpg"),
    imagePath: "../assets/recipes/lun_salat_torsk_aeg.jpg",
    time: "25 min",
    portion: "1 person",
    ingredients: [
      "100 g torsk",
      "1 æg",
      "50 g salat",
      "0.5 citron",
      "1 spsk honning sennep dressing",
      "1 forårsløg",
    ],
    steps: [
      "Kog ægget hårdkogt og del det.",
      "Damp torsken i 10 min.",
      "Anret salat, æg og torsk, dryp dressing over.",
    ],
  },
  {
    id: 11,
    name: "Risotto med svampe, hytteost og persille",
    image: require("../assets/recipes/risotto_svamp_hytteost.jpg"),
    imagePath: "../assets/recipes/risotto_svamp_hytteost.jpg",
    time: "30 min",
    portion: "1 person",
    ingredients: [
      "75 g champignon",
      "0.5 løg",
      "80 g risottoris",
      "50 g hytteost",
      "1 tsk smør",
      "1 fed hvidløg",
      "1 spsk persille",
    ],
    steps: [
      "Svits løg og hvidløg i smør.",
      "Tilsæt ris og rør til de bliver blanke.",
      "Hæld bouillon i lidt ad gangen.",
      "Tilsæt svampe og vend i hytteost og persille til sidst.",
    ],
  },
  {
    id: 12,
    name: "Kalkun i cremet flødesauce med spinat",
    image: require("../assets/recipes/kalkun_floede_spinat.jpg"),
    imagePath: "../assets/recipes/kalkun_floede_spinat.jpg",
    time: "25 min",
    portion: "1 person",
    ingredients: [
      "120 g kalkun",
      "0.5 dl fløde",
      "50 g spinat",
      "0.5 løg",
      "1 fed hvidløg",
      "75 g ris",
      "salt",
      "peber",
    ],
    steps: [
      "Steg kalkun i smør, tilsæt løg og hvidløg.",
      "Hæld fløde over og lad det simre.",
      "Tilsæt spinat til sidst og servér med ris.",
    ],
  },
  {
    id: 13,
    name: "Rejesalat med avocado og lime",
    image: require("../assets/recipes/rejesalat_avocado_lime.jpg"),
    imagePath: "../assets/recipes/rejesalat_avocado_lime.jpg",
    time: "15 min",
    portion: "1 person",
    ingredients: [
      "100 g rejer",
      "0.5 avocado",
      "0.5 lime",
      "50 g salat",
      "1 spsk yoghurt dressing",
      "dild",
    ],
    steps: [
      "Skær avocado i tern.",
      "Bland rejer, salat og dressing.",
      "Tilsæt lime og dild.",
    ],
  },
  {
    id: 14,
    name: "Wraps med spegepølse, ost og grønt",
    image: require("../assets/recipes/wraps_spegepolse_ost.jpg"),
    imagePath: "../assets/recipes/wraps_spegepolse_ost.jpg",
    time: "10 min",
    portion: "1 person",
    ingredients: [
      "1 tortilla",
      "4 skiver spegepølse",
      "2 skiver ost",
      "2 skiver tomat",
      "1 spsk thousand island dressing",
    ],
    steps: [
      "Smør dressing på tortillaen.",
      "Læg spegepølse, ost og grønt ovenpå.",
      "Rul sammen, put den i paninigrill eller stegepande og del i halve.",
    ],
  },
  {
    id: 15,
    name: "Grøntsagswok med hakket kylling og soyasauce",
    image: require("../assets/recipes/groentsagswok_kylling_soya.jpg"),
    imagePath: "../assets/recipes/groentsagswok_kylling_soya.jpg",
    time: "20 min",
    portion: "1 person",
    ingredients: [
      "100 g hakket kylling",
      "0.5 peberfrugt",
      "1 gulerod",
      "1 forårsløg",
      "1 spsk soyasauce",
      "0.5 tsk frisk ingefær",
      "75 g ris",
    ],
    steps: [
      "Steg kylling og grøntsager i wok.",
      "Tilsæt soya og ingefær.",
      "Servér med kogte ris.",
    ],
  },
  {
    id: 16,
    name: "Cremet svinegryde med blomkål og fløde",
    image: require("../assets/recipes/svinegryde_blomkaal_floede.jpg"),
    imagePath: "../assets/recipes/svinegryde_blomkaal_floede.jpg",
    time: "25 min",
    portion: "1 person",
    ingredients: [
      "100 g hakket svinekød",
      "100 g blomkål",
      "0.5 løg",
      "0.5 dl fløde",
      "0.5 tsk rosmarin",
      "salt",
      "peber",
    ],
    steps: [
      "Steg løg og svinekød.",
      "Tilsæt blomkål og fløde.",
      "Smag til med rosmarin, salt og peber.",
    ],
  },
  {
    id: 17,
    name: "Frisk sommersalat med rejer, mango og avocado",
    image: require("../assets/recipes/sommersalat_rejer_mango.jpg"),
    imagePath: "../assets/recipes/sommersalat_rejer_mango.jpg",
    time: "10 min",
    portion: "1 person",
    ingredients: [
      "100 g rejer",
      "0.25 mango",
      "0.5 avocado",
      "20 g rucola",
      "1 tsk citron",
      "1 spsk yoghurt dressing",
      "Frisk Chili",
    ],
    steps: [
      "Skær mango og avocado i tern.",
      "Skær chili fint.",
      "Bland alt i en skål og tilsæt dressing.",
    ],
  },
  {
    id: 18,
    name: "Vaniljeskyr med hindbær, honning og nødder",
    image: require("../assets/recipes/vaniljeskyr_honning_noedder.jpg"),
    imagePath: "../assets/recipes/vaniljeskyr_honning_noedder.jpg",
    time: "5 min",
    portion: "1 person",
    ingredients: [
      "150 g vaniljeskyr",
      "50 g hindbær",
      "1 tsk honning",
      "10 g nødder",
    ],
    steps: [
      "Put skyr i en skål.",
      "Top med hindbær, honning og nødder.",
    ],
  },
  {
    id: 19,
    name: "Fersken trifli med mascarpone og blåbær",
    image: require("../assets/recipes/fersken_trifli_mascarpone.jpg"),
    imagePath: "../assets/recipes/fersken_trifli_mascarpone.jpg",
    time: "10 min",
    portion: "1 person",
    ingredients: [
      "1 fersken",
      "2 spsk mascarpone",
      "50 g blåbær",
      "2 spsk yoghurt",
      "1 tsk honning",
      "1 spsk havregryn",
    ],
    steps: [
      "Skær fersken i tern og bland med yoghurt og mascarpone.",
      "Tilsæt honning og top med blåbær og havregryn.",
    ],
  },
  {
    id: 20,
    name: "Bananpandekager med jordbær og peanutbutter",
    image: require("../assets/recipes/bananpandekager_jordbaer_peanutbutter.jpg"),
    imagePath: "../assets/recipes/bananpandekager_jordbaer_peanutbutter.jpg",
    time: "15 min",
    portion: "1 person",
    ingredients: [
      "1 banan",
      "1 æg",
      "20 g mel",
      "1 tsk smør",
      "50 g jordbær",
      "1 tsk peanutbutter",
    ],
    steps: [
      "Mos bananen og bland med æg og mel.",
      "Steg små pandekager i smør.",
      "Server med jordbær og peanutbutter.",
    ],
  },
];

export default function RecipeScreen({ navigation }) {
  const route = useRoute();
  const { ingredients = [], fromCamera = false } = route.params || {};
  const [extraIngredient, setExtraIngredient] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [currentIngredients, setCurrentIngredients] = useState(ingredients);

  useEffect(() => {
    if (ingredients.length > 0) setCurrentIngredients(ingredients);
  }, [ingredients]);

  // 🧠 Filtrering – kræver min. 2 match
  const filteredRecipes = allRecipes.filter((recipe) => {
    const matchCount = currentIngredients.filter((ing) =>
      recipe.ingredients.some((rIng) =>
        rIng.toLowerCase().includes(ing.toLowerCase())
      )
    ).length;
    return matchCount >= 2;
  });

  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} title="Opskrifter" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Opskrifter</Text>

        {fromCamera && (
          <View style={styles.addIngredientSection}>
            <Text style={styles.addIngredientTitle}>Tilføj flere ingredienser:</Text>

            {/* Søgefelt med samme stil som forsiden */}
            <View style={styles.inputContainer}>
              <Ionicons
                name="search"
                size={22}
                color="#49586B"
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.addIngredientInput}
                placeholder="Skriv ingrediens..."
                placeholderTextColor="#49586B"
                value={extraIngredient}
                onChangeText={(text) => {
                  setExtraIngredient(text);
                  if (text.length > 0) {
                    const filtered = allRecipes
                      .flatMap((r) => r.ingredients)
                      .filter((i) =>
                        i.toLowerCase().startsWith(text.toLowerCase())
                      );
                    setSuggestions(filtered);
                  } else setSuggestions([]);
                }}
              />
            </View>

            {suggestions.length > 0 && (
              <View style={styles.suggestionBox}>
                {suggestions.map((item, idx) => (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => {
                      if (!currentIngredients.includes(item)) {
                        setCurrentIngredients([...currentIngredients, item]);
                      }
                      setExtraIngredient("");
                      setSuggestions([]);
                    }}
                  >
                    <Text style={styles.suggestionText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )}

        <View style={styles.ingredientsContainer}>
          {currentIngredients.length > 0 ? (
            currentIngredients.map((item, i) => (
              <View key={i} style={styles.ingredientBox}>
                <Text style={styles.ingredientText}>{item}</Text>
                <TouchableOpacity
                  onPress={() =>
                    setCurrentIngredients(
                      currentIngredients.filter((x) => x !== item)
                    )
                  }
                >
                  <Text style={styles.removeText}>✕</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.noIngredients}>Ingen ingredienser valgt 🧺</Text>
          )}
        </View>

        <Text style={styles.recipeTitle}>🍳 Forslag baseret på dine ingredienser</Text>

        <View style={styles.recipeContainer}>
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <TouchableOpacity
                key={recipe.id}
                style={styles.recipeCard}
                onPress={() => navigation.navigate("OpskriftDetaljer", { recipe })}
              >
                <Image source={recipe.image} style={styles.recipeImage} />
                <Text style={styles.recipeName}>{recipe.name}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noMatchText}>
              Ingen opskrifter matcher dine ingredienser 😢
            </Text>
          )}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate("Søgning")}
          >
            <Text style={styles.backButtonText}>← Tilbage til søgning</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F0E9" },
  scroll: { alignItems: "center", padding: 20 },
  title: {
    fontFamily: "BelanosimaBold",
    fontSize: 28,
    color: "#49586B",
    marginBottom: 20,
  },

  // 👇 NYT søgefelt-design 👇
  addIngredientSection: { width: "90%", marginBottom: 20 },
  addIngredientTitle: {
    fontFamily: "BelanosimaBold",
    fontSize: 16,
    color: "#49586B",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E7E7E7",
    borderWidth: 3,
    borderColor: "#F4A0CE",
    borderRadius: 50,
    paddingHorizontal: 15,
    height: 55,
  },
  searchIcon: {
    marginRight: 10,
  },
  addIngredientInput: {
    flex: 1,
    fontFamily: "Belanosima",
    fontSize: 16,
    color: "#49586B",
  },
  suggestionBox: {
    backgroundColor: "#fff",
    borderColor: "#49586B",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 5,
  },
  suggestionText: { padding: 10, fontFamily: "Belanosima", color: "#49586B" },

  ingredientsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 25,
  },
  ingredientBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#49586B",
    borderWidth: 2,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    margin: 5,
  },
  ingredientText: {
    fontFamily: "BelanosimaBold",
    color: "#49586B",
    fontSize: 16,
    marginRight: 8,
  },
  removeText: { fontSize: 16, color: "#D9534F" },
  noIngredients: {
    fontFamily: "Belanosima",
    color: "#49586B",
    fontSize: 16,
    textAlign: "center",
  },

  recipeTitle: {
    fontFamily: "BelanosimaBold",
    color: "#49586B",
    fontSize: 18,
    marginBottom: 10,
  },
  recipeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 10,
  },
  recipeCard: {
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
    width: 150,
    elevation: 3,
  },
  recipeImage: { width: "100%", height: 100 },
  recipeName: {
    fontFamily: "BelanosimaBold",
    color: "#49586B",
    fontSize: 14,
    textAlign: "center",
    padding: 8,
  },
  noMatchText: {
    fontFamily: "BelanosimaBold",
    color: "#49586B",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  backButton: {
    backgroundColor: "#49586B",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignSelf: "center",
    marginVertical: 30,
    elevation: 3,
  },
  backButtonText: {
    color: "#F3F0E9",
    fontFamily: "BelanosimaBold",
    fontSize: 16,
    textAlign: "center",
  },
});
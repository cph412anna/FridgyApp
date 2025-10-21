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
  name: "Cremet pasta med spinat og ost",
  image: require("../assets/recipes/pasta_spinat_ost.jpg"),
  ingredients: ["spinat", "ost", "pasta", "fløde", "hvidløg", "salt", "peber"],
  steps: [
    "Kog pastaen al dente i saltet vand.",
    "Sautér finthakket hvidløg i lidt smør eller olie.",
    "Tilsæt fløde og revet ost, og lad det smelte sammen.",
    "Vend spinat i, lad den falde sammen, og smag til med salt og peber.",
    "Bland pastaen i saucen og servér med friskrevet ost."
  ],
},
{
  id: 2,
  name: "Æggekage med tomater og purløg",
  image: require("../assets/recipes/aeggekage_tomat_purloeg.jpg"),
  ingredients: ["æg", "tomater", "purløg", "smør", "salt", "peber"],
  steps: [
    "Pisk æggene sammen med lidt salt og peber.",
    "Smelt smør i en pande og hæld æggemassen i.",
    "Steg ved middel varme, indtil æggekagen er fast men stadig blød i midten.",
    "Top med friske tomater og finthakket purløg før servering."
  ],
},
{
  id: 3,
  name: "Stegte ris med grøntsager og soya",
  image: require("../assets/recipes/stegte_ris.jpg"),
  ingredients: ["ris", "soya", "æg", "grøntsager", "løg", "hvidløg", "ingefær", "peber"],
  steps: [
    "Kog risene og lad dem køle af.",
    "Svits løg, hvidløg og friskrevet ingefær i olie.",
    "Tilsæt grøntsager og steg dem sprøde.",
    "Tilsæt ris og soya, og steg det hele sammen.",
    "Lav plads på panden, hæld æg i, og rør det ud. Smag til med peber."
  ],
},
{
  id: 4,
  name: "Kartoffelfrittata med urter og ost",
  image: require("../assets/recipes/kartoffelfrittata.jpg"),
  ingredients: ["kartofler", "æg", "ost", "timian", "rosmarin", "salt", "peber"],
  steps: [
    "Kog kartoflerne næsten møre, og skær dem i skiver.",
    "Pisk æggene med ost, urter, salt og peber.",
    "Læg kartoflerne i en pande, og hæld æggemassen over.",
    "Steg ved lav varme, til den sætter sig, og bag evt. færdig i ovnen.",
    "Servér med frisk timian på toppen."
  ],
},
{
  id: 5,
  name: "Kylling i cremet flødesauce",
  image: require("../assets/recipes/kylling_floedesauce.jpg"),
  ingredients: ["kylling", "fløde", "løg", "hvidløg", "smør", "salt", "peber"],
  steps: [
    "Brun kyllingestykker i smør, til de får farve.",
    "Tilsæt løg og hvidløg, og svits til de er bløde.",
    "Hæld fløde over og lad det simre 10-15 minutter.",
    "Smag til med salt, peber og evt. lidt citronsaft.",
    "Servér med ris eller frisk pasta."
  ],
},
{
  id: 6,
  name: "Pasta med tun, citron og persille",
  image: require("../assets/recipes/pasta_tun_citron.jpg"),
  ingredients: ["tun", "citron", "persille", "pasta", "olivenolie", "hvidløg", "peber"],
  steps: [
    "Kog pastaen al dente.",
    "Rør drænet tun sammen med olivenolie, citronsaft og fintrevet skal.",
    "Tilsæt finthakket hvidløg og persille.",
    "Vend det hele sammen med den varme pasta og smag til med peber."
  ],
},
{
  id: 7,
  name: "Grøntsagssuppe med rodfrugter og urter",
  image: require("../assets/recipes/suppe_rodfrugter.jpg"),
  ingredients: ["gulerødder", "selleri", "urter", "løg", "hvidløg", "salt", "peber"],
  steps: [
    "Hak grøntsagerne groft og svits løg og hvidløg i olie.",
    "Tilsæt grøntsager, urter og vand eller bouillon.",
    "Kog suppen til grøntsagerne er møre.",
    "Blend halvdelen for cremet konsistens, og smag til med salt og peber."
  ],
},
{
  id: 8,
  name: "Røræg med skinke og cherrytomater",
  image: require("../assets/recipes/roeraeg_skinke.jpg"),
  ingredients: ["æg", "skinke", "tomater", "smør", "salt", "peber"],
  steps: [
    "Pisk æggene med lidt salt og peber.",
    "Smelt smør i panden og tilsæt æggemassen.",
    "Rør forsigtigt til æggene bliver bløde og cremede.",
    "Tilsæt skinke og halve cherrytomater, og varm kort igennem."
  ],
},
{
  id: 9,
  name: "Mild risotto med svampe og ost",
  image: require("../assets/recipes/risotto_svamp.jpg"),
  ingredients: ["ris", "svampe", "hvidløg", "ost", "smør", "bouillon", "peber"],
  steps: [
    "Svits ris i smør med hakket hvidløg, til de er blanke.",
    "Tilsæt bouillon lidt ad gangen under omrøring.",
    "Steg svampe separat, og vend dem i risottoen.",
    "Rør ost i til sidst og smag til med peber og lidt citronsaft."
  ],
},
{
  id: 10,
  name: "Pastasalat med kylling og grønne bønner",
  image: require("../assets/recipes/pastasalat_kylling.jpg"),
  ingredients: ["pasta", "kylling", "grønne bønner", "dressing", "salt", "peber"],
  steps: [
    "Kog pasta og bønner, og afkøl dem.",
    "Steg kyllingestykker med salt, peber og lidt olie.",
    "Bland pasta, bønner og kylling i en skål.",
    "Vend med dressing og servér med friskkværnet peber."
  ],
},
{
  id: 11,
  name: "Wraps med æg, salat og dressing",
  image: require("../assets/recipes/wraps_aeg.jpg"),
  ingredients: ["æg", "salat", "dressing", "wraps", "salt", "peber"],
  steps: [
    "Kog æggene hårde og skær dem i skiver.",
    "Smør dressing på tortillaerne.",
    "Læg salat og æg i midten.",
    "Krydr med salt og peber, rul sammen og skær over."
  ],
},
{
  id: 12,
  name: "Lun toast med ost og skinke",
  image: require("../assets/recipes/toast_ost_skinke.jpg"),
  ingredients: ["brød", "ost", "skinke", "smør", "sennep"],
  steps: [
    "Smør brødskiverne med smør og evt. lidt sennep.",
    "Læg ost og skinke imellem.",
    "Rist til gylden på begge sider.",
    "Skær diagonalt og servér med friskkværnet peber."
  ],
},
{
  id: 13,
  name: "Ovnbagte grøntsager med hvidløg og urter",
  image: require("../assets/recipes/ovnbagte_groentsager.jpg"),
  ingredients: ["grøntsager", "hvidløg", "urter", "olie", "salt", "peber"],
  steps: [
    "Skær grøntsager i mundrette stykker.",
    "Vend dem med olie, presset hvidløg, urter, salt og peber.",
    "Bag i ovnen ved 200°C i ca. 25-30 minutter, til de er gyldne."
  ],
},
{
  id: 14,
  name: "Pasta carbonara med bacon og æg",
  image: require("../assets/recipes/pasta_carbonara.jpg"),
  ingredients: ["pasta", "æg", "bacon", "ost", "peber"],
  steps: [
    "Kog pastaen al dente i saltet vand.",
    "Steg bacon sprødt og tag det af panden.",
    "Pisk æg med revet ost og friskkværnet peber.",
    "Vend pastaen med æggeblandingen og bacon – uden varme, så det ikke bliver røræg."
  ],
},
{
  id: 15,
  name: "Spansk tortilla med kartofler og løg",
  image: require("../assets/recipes/spansk_tortilla.jpg"),
  ingredients: ["æg", "kartofler", "løg", "olie", "salt", "peber"],
  steps: [
    "Skær kartofler og løg i skiver, steg i olie til bløde.",
    "Pisk æg med salt og peber, og hæld over.",
    "Steg ved lav varme, til den sætter sig, og vend forsigtigt.",
    "Servér med lidt ekstra olivenolie på toppen."
  ],
},
{
  id: 16,
  name: "Grøntsagswok med ingefær og æg",
  image: require("../assets/recipes/groentsagswok_aeg.jpg"),
  ingredients: ["grøntsager", "ingefær", "æg", "soya", "hvidløg", "olie"],
  steps: [
    "Varm olie i en wok, og tilsæt hvidløg og ingefær.",
    "Tilsæt grøntsager og steg hurtigt ved høj varme.",
    "Hæld lidt soya over og steg videre.",
    "Tilsæt æg til sidst, og lad det samle sig let under omrøring."
  ],
},
{
  id: 17,
  name: "Omelet med spinat og feta",
  image: require("../assets/recipes/omelet_spinat_feta.jpg"),
  ingredients: ["æg", "spinat", "feta", "olie", "salt", "peber"],
  steps: [
    "Pisk æg med salt og peber.",
    "Steg spinat i lidt olie til den falder sammen.",
    "Hæld æggemassen over og steg ved lav varme.",
    "Tilsæt smuldret feta og fold omeletten."
  ],
},
{
  id: 18,
  name: "Bagte æg i tomatsauce",
  image: require("../assets/recipes/bagte_aeg_tomat.jpg"),
  ingredients: ["æg", "tomatsauce", "løg", "hvidløg", "krydderier"],
  steps: [
    "Svits løg og hvidløg i olie.",
    "Tilsæt tomatsauce og krydderier som oregano og chili.",
    "Lav små fordybninger i saucen og slå æggene ud.",
    "Bag i ovnen ved 180°C til æggene er netop sat."
  ],
},
{
  id: 19,
  name: "Mini pizzaer på toastbrød",
  image: require("../assets/recipes/mini_pizzaer.jpg"),
  ingredients: ["toastbrød", "tomatsauce", "ost", "skinke", "oregano"],
  steps: [
    "Smør toastbrød med tomatsauce.",
    "Top med skinke, ost og et drys oregano.",
    "Bag i ovnen ved 200°C i 10-12 minutter, til gyldne og sprøde."
  ],
},
{
  id: 20,
  name: "Lun kartoffelsalat med æg og sennepsdressing",
  image: require("../assets/recipes/kartoffelsalat_aeg.jpg"),
  ingredients: ["kartofler", "æg", "sennep", "dressing", "purløg", "salt", "peber"],
  steps: [
    "Kog kartofler og skær dem i skiver.",
    "Kog æggene, pil dem og skær i både.",
    "Rør sennep i dressingen og smag til.",
    "Vend kartofler, æg og dressing sammen og drys med purløg."
  ],
}

];

export default function RecipeScreen({ navigation }) {
  const route = useRoute();
  const { ingredients = [], fromCamera = false } = route.params || {};

  const [extraIngredient, setExtraIngredient] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [currentIngredients, setCurrentIngredients] = useState(ingredients);

  useEffect(() => {
  if (ingredients.length > 0) {
    setCurrentIngredients(ingredients);
  }
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

  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} title="Opskrifter" />

      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Opskrifter</Text>

        {/* 👇 Kun vist, hvis man kommer fra kamera */}
        {fromCamera && (
          <View style={styles.addIngredientSection}>
            <Text style={styles.addIngredientTitle}>Tilføj flere ingredienser:</Text>
            <TextInput
              style={styles.addIngredientInput}
              placeholder="Skriv ingrediens..."
              placeholderTextColor="#49586B"
              value={extraIngredient}
              onChangeText={(text) => {
                setExtraIngredient(text);
                if (text.length > 0) {
                  const filtered = allIngredients.filter((item) =>
                    item.toLowerCase().startsWith(text.toLowerCase())
                  );
                  setSuggestions(filtered);
                } else {
                  setSuggestions([]);
                }
              }}
            />

            {suggestions.length > 0 && (
              <View style={styles.suggestionBox}>
                {suggestions.map((item) => (
                  <TouchableOpacity
                    key={item}
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

        {/* Valgte ingredienser */}
        <View style={styles.ingredientsContainer}>
          {currentIngredients.length > 0 ? (
            currentIngredients.map((item, index) => (
              <View key={index} style={styles.ingredientBox}>
                <Text style={styles.ingredientText}>{item}</Text>
                <TouchableOpacity
                  onPress={() =>
                    setCurrentIngredients(
                      currentIngredients.filter((i) => i !== item)
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

        <Text style={styles.recipeTitle}>
          🍳 Forslag baseret på dine ingredienser
        </Text>

        {/* Opskrifter */}
        <View style={styles.recipeContainer}>
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <TouchableOpacity
                key={recipe.id}
                style={styles.recipeCard}
                onPress={() =>
                  navigation.navigate("OpskriftDetaljer", { recipe })
                }
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

          {/* Tilbage-knap */}
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

// 💅 STYLING
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F0E9" },
  scroll: { alignItems: "center", padding: 20 },
  title: {
    fontFamily: "BelanosimaBold",
    fontSize: 28,
    color: "#49586B",
    marginBottom: 20,
  },
  addIngredientSection: {
    width: "80%",
    marginBottom: 20,
  },
  addIngredientTitle: {
    fontFamily: "BelanosimaBold",
    fontSize: 16,
    color: "#49586B",
    marginBottom: 8,
  },
  addIngredientInput: {
    backgroundColor: "#E7E7E7",
    borderColor: "#49586B",
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
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
  suggestionText: {
    padding: 10,
    fontFamily: "Belanosima",
    color: "#49586B",
  },
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
  removeText: {
    fontSize: 16,
    color: "#D9534F",
  },
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
  recipeImage: {
    width: "100%",
    height: 100,
  },
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  backButtonText: {
    color: "#F3F0E9",
    fontFamily: "BelanosimaBold",
    fontSize: 16,
    textAlign: "center",
  },
});
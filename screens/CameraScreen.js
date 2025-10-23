import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomHeader from "../components/CustomHeader";

export default function CameraScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isLoadingModel, setIsLoadingModel] = useState(true);
  const [analysisDone, setAnalysisDone] = useState(false);
  const [foundIngredients, setFoundIngredients] = useState([]);
  const cameraRef = useRef(null);

  // Simulerer model-load
  useEffect(() => {
    console.log("⏳ Simulerer indlæsning af model...");
    const timer = setTimeout(() => {
      setIsLoadingModel(false);
      console.log("✅ 'Model' klar (simuleret)");
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const takePhoto = async () => {
    if (!cameraRef.current) return;
    const picture = await cameraRef.current.takePictureAsync({ base64: true });
    setPhoto(picture.uri);
    setAnalysisDone(false);
  };

  const analyzePhoto = async () => {
    if (!photo) return;
    if (isLoadingModel) {
      alert("Vent et øjeblik – modellen er ikke klar endnu ⏳");
      return;
    }

    setIsAnalyzing(true);
    console.log("🔍 Simulerer analyse af billede...");

    // Simulerer “AI-tænkning”
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisDone(true);

      // Simuler mange ingredienser i stedet for kun 3
      const simulatedFindings = [
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

      // Vælg et tilfældigt antal (5-8 ingredienser)
      const found = simulatedFindings
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 3) + 5);

      setFoundIngredients(found);
      console.log("✅ Analyse færdig:", found);
    }, 2500);
  };

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>Ingen adgang til kameraet 😢</Text>
        <TouchableOpacity style={styles.backButton} onPress={requestPermission}>
          <Text style={styles.backButtonText}>Giv tilladelse</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (isLoadingModel) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#49586B" />
        <Text style={styles.loadingText}>
          Indlæser billedgenkendelsesmodel...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Søgning")}
      >
        <Text style={styles.backButtonText}>Tilbage</Text>
      </TouchableOpacity>

      {!photo ? (
        <CameraView ref={cameraRef} style={styles.camera} facing="back">
          <View style={styles.captureContainer}>
            <TouchableOpacity onPress={takePhoto} style={styles.captureButton} />
          </View>
        </CameraView>
      ) : (
        <View style={styles.preview}>
          <Image source={{ uri: photo }} style={styles.previewImage} />

          {!analysisDone ? (
            <>
              <TouchableOpacity
                style={[styles.analyzeBtn, isAnalyzing && { opacity: 0.6 }]}
                onPress={analyzePhoto}
                disabled={isAnalyzing}
              >
                <Text style={styles.analyzeText}>
                  {isAnalyzing ? "Analyserer billede..." : "Analyser billede"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.retakeBtn}
                onPress={() => setPhoto(null)}
              >
                <Text style={styles.retakeText}>Tag nyt billede</Text>
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.resultContainer}>
              <Text style={styles.resultTitle}>🔍 Analyse fuldført!</Text>

              <TouchableOpacity
                style={styles.recipeButton}
                onPress={() =>
                  navigation.navigate("OpskrifterStack", {
                    screen: "Opskrifter",
                    params: { ingredients: foundIngredients, fromCamera: true },
                  })
                }
              >
                <Text style={styles.recipeButtonText}>
                  Se opskrifter ud fra analyse
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.retakeBtn}
                onPress={() => setPhoto(null)}
              >
                <Text style={styles.retakeText}>Tag nyt billede</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

// 🎨 Styling
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F0E9" },
  camera: { flex: 1, justifyContent: "flex-end", alignItems: "center" },
  captureContainer: { marginBottom: 40 },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F3F0E9",
    borderWidth: 5,
    borderColor: "#49586B",
  },
  preview: { flex: 1, alignItems: "center", justifyContent: "center" },
  previewImage: {
    width: "90%",
    height: "60%",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#49586B",
  },
  analyzeBtn: {
    backgroundColor: "#49586B",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  analyzeText: { color: "#fff", fontFamily: "BelanosimaBold", fontSize: 16 },
  resultContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  resultTitle: {
    fontFamily: "BelanosimaBold",
    fontSize: 20,
    color: "#49586B",
    marginBottom: 15,
  },
  recipeButton: {
    backgroundColor: "#F3F0E9",
    borderWidth: 2,
    borderColor: "#49586B",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  recipeButtonText: {
    color: "#49586B",
    fontFamily: "BelanosimaBold",
    fontSize: 16,
  },
  retakeBtn: { marginTop: 20 },
  retakeText: {
    color: "#49586B",
    fontFamily: "BelanosimaBold",
    fontSize: 16,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F0E9",
  },
  permissionText: {
    color: "#49586B",
    fontSize: 18,
    fontFamily: "BelanosimaBold",
    textAlign: "center",
    marginBottom: 15,
  },
  backButton: {
    position: "absolute",
    top: 80,
    alignSelf: "center",
    backgroundColor: "#49586B",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
    zIndex: 10,
    elevation: 5,
  },
  backButtonText: {
    color: "#F3F0E9",
    fontFamily: "BelanosimaBold",
    fontSize: 16,
    textAlign: "center",
  },
  loadingText: {
    color: "#49586B",
    fontFamily: "BelanosimaBold",
    fontSize: 16,
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F0E9",
  },
});

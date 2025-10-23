import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";

// Screens
import CameraScreen from "./screens/CameraScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import HomeScreen from "./screens/HomeScreen";
import RecipeDetailScreen from "./screens/RecipeDetailScreen";
import RecipeScreen from "./screens/RecipeScreen";
import SearchScreen from "./screens/SearchScreen";
import SplashScreen from "./screens/SplashScreen";

// Navigators
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// 📚 Stack for opskrifter (bevarer state når man går tilbage)
function RecipeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Opskrifter" component={RecipeScreen} />
      <Stack.Screen name="OpskriftDetaljer" component={RecipeDetailScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Belanosima: require("./assets/fonts/Belanosima-Regular.ttf"),
    BelanosimaBold: require("./assets/fonts/Belanosima-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          drawerPosition: "right",
          drawerStyle: {
            backgroundColor: "#49586B",
            width: 250,
          },
          drawerActiveBackgroundColor: "#F3F0E9",
          drawerActiveTintColor: "#49586B",
          drawerInactiveTintColor: "#F3F0E9",
          drawerLabelStyle: {
            fontFamily: "BelanosimaBold",
            fontSize: 18,
          },
        }}
      >
        {/* 🌟 Splash vises kun én gang ved start */}
        <Drawer.Screen
          name="Splash"
          component={SplashScreen}
          options={{ drawerItemStyle: { display: "none" } }}
        />

        {/* 🏠 Hovedsider */}
        <Drawer.Screen name="Hjem" component={HomeScreen} />
        <Drawer.Screen name="Favoritter" component={FavoritesScreen} />
        <Drawer.Screen name="Søgning" component={SearchScreen} />
        

        {/* 📷 Kamera-siden skjules fra menuen */}
        <Drawer.Screen
          name="Kamera"
          component={CameraScreen}
          options={{ drawerItemStyle: { display: "none" } }}
        />

        {/* 🍝 Opskrifter + detaljer samlet i en stack */}
        <Drawer.Screen
          name="OpskrifterStack"
          component={RecipeStack}
          options={{ drawerItemStyle: { display: "none" } }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
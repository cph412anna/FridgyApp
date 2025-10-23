import { useFonts } from "expo-font";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

export default function SplashScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    Belanosima: require("../assets/fonts/Belanosima-Regular.ttf"),
    BelanosimaBold: require("../assets/fonts/Belanosima-Bold.ttf"),
  });

  // Animation setup
  const strokeAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (fontsLoaded) {
      // Sekventiel animation
      Animated.sequence([
        Animated.timing(strokeAnim, {
          toValue: 1,
          duration: 1300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Efter animation -> gå videre til "Hjem"
        setTimeout(() => {
        navigation.reset({
        index: 0,
        routes: [{ name: "Hjem" }],
  });
}, 800);
      });
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  // Streg-animation som "tegne-effekt"
  const animatedTextStyle = {
    opacity: opacityAnim,
    transform: [
      {
        scale: strokeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.9, 1],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.text, animatedTextStyle]}>
        FRIDGY
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#49586B",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 68,
    color: "#F4A0CE",
    fontFamily: "BelanosimaBold",
    letterSpacing: 4,
  },
});

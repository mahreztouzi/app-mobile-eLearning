// SplashScreen.js

import React, { useEffect } from "react";
import { Image, StyleSheet, View, ImageBackground } from "react-native";
import edu from "../assets/images/edu.png";
import etudiant from "../assets/images/etudiant.png";
import LottieView from "lottie-react-native"; // Importez <LottieView></LottieView>
import AsyncStorage from "@react-native-async-storage/async-storage";
const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Attendez 3 secondes puis passez à l'écran principal
    setTimeout(() => {
      navigation.navigate("Welcome");
    }, 2500);
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={etudiant}
        style={styles.imageBackground}
      ></ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(220,225,227,0.9)",
  },
  imageBackground: {
    width: "100%",
    height: "100%",

    resizeMode: "contain",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Couleur du dégradé et de l'opacité
  },
  imageContainer: {
    flex: 1,
    marginTop: "20%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  logo: {
    width: 300,
    height: 60,
    resizeMode: "contain",
    backgroundColor: "white",
    borderRadius: 15,
    marginBottom: "3%",
  },
  backgroundAnimation: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default SplashScreen;

import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  ImageBackground,
  Animated,
} from "react-native";
import edu from "../assets/images/edu.png";
import eduTech from "../assets/images/edutech.gif";
import etudiant from "../assets/images/etudiant.png";
import LottieView from "lottie-react-native"; // Importez <LottieView></LottieView>
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreenLogo = ({ navigation }) => {
  const logoAnimation = useRef(new Animated.Value(-200)).current;
  const [lottieVisible, setLottieVisible] = useState(false);

  useEffect(() => {
    const animateSplashScreen = async () => {
      // Attendez 3 secondes puis passez à l'écran principal
      setTimeout(() => {
        handelGetToken();
      }, 3500);

      // Animation du logo
      // Animated.timing(logoAnimation, {
      //   toValue: 0,
      //   duration: 1500,
      //   useNativeDriver: true,
      // }).start();

      // Affichage du Lottie
      setTimeout(() => {
        setLottieVisible(true);
      }, 2000); // Ajoutez un délai supplémentaire ici si nécessaire
    };

    animateSplashScreen();
  }, []);

  const handelGetToken = async () => {
    const dataToken = await AsyncStorage.getItem("token");
    if (!dataToken) {
      navigation.navigate("Splash");
    } else {
      navigation.navigate("Tabs");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {/* <Image source={edu} style={styles.logo} /> */}
        <Animated.Image source={eduTech} style={[styles.logo]} />
        <View style={{ width: "100%", height: "10%" }}>
          {lottieVisible && (
            <LottieView
              source={require("../assets/loading.json")}
              autoPlay
              loop
              style={styles.animation}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "rgba(229,227,227,0.34)",
  },

  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    marginTop: "50%",
    width: 440,
    height: 550,
    resizeMode: "contain",
    borderRadius: 50,
    marginLeft: 12,
    borderWidth: 5,
    // borderColor: "black",
  },
  animation: {
    width: 200,
    height: 150,
  },
});

export default SplashScreenLogo;

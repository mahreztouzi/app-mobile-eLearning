import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";

const { height } = Dimensions.get("window");
import etudiant from "../assets/images/etudiant.png";

const WelcomeScreen = ({ navigation: { navigate } }) => {
  return (
    <SafeAreaView>
      <View style={{ backgroundColor: "rgba(220,225,227,0.9)" }}>
        {/* <ImageBackground
          style={{
            height: height / 2.5,
          }}
          resizeMode="contain"
          source={require("../assets/images/welcome-img.png")}
        ></ImageBackground> */}
        <StatusBar backgroundColor={null} />
        <ImageBackground
          source={etudiant}
          style={styles.imageBackground}
          blurRadius={5}
        >
          <View style={styles.overlay} />

          <View
            style={{
              paddingHorizontal: Spacing * 1,
              paddingTop: Spacing * 40,
            }}
          >
            <Text
              style={{
                fontSize: FontSize.xxLarge,
                color: Colors.lightPrimary,
                fontFamily: Font["poppins-bold"],
                textAlign: "center",
              }}
            >
              Education Technologie Professionnel
            </Text>

            <Text
              style={{
                fontSize: FontSize.small,
                color: Colors.lightPrimary,
                fontFamily: Font["poppins-regular"],
                textAlign: "center",
                marginTop: Spacing * 2,
              }}
            >
              Explore all the existing job roles based or your interest and
              study major
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: Spacing * 6,
              paddingTop: Spacing * 6,
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              onPress={() => navigate("Login")}
              style={{
                backgroundColor: Colors.primary,
                paddingVertical: Spacing * 1.5,
                paddingHorizontal: Spacing * 2,
                width: "48%",
                borderRadius: Spacing,
                shadowColor: Colors.primary,
                shadowOffset: {
                  width: 0,
                  height: Spacing,
                },
                shadowOpacity: 0.3,
                shadowRadius: Spacing,
              }}
            >
              <Text
                style={{
                  fontFamily: Font["poppins-bold"],
                  color: Colors.onPrimary,
                  fontSize: FontSize.large,
                  textAlign: "center",
                }}
              >
                Connexion
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigate("Register")}
              style={{
                paddingVertical: Spacing * 1.5,
                paddingHorizontal: Spacing * 2,
                width: "48%",
                borderRadius: Spacing,
              }}
            >
              <Text
                style={{
                  fontFamily: Font["poppins-bold"],
                  color: Colors.lightPrimary,
                  fontSize: FontSize.large,
                  textAlign: "center",
                }}
              >
                Inscription
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  imageBackground: {
    width: "100%",
    height: "100%",

    resizeMode: "contain",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)", // Couleur du dégradé et de l'opacité
  },
});

import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";

import AppTextInput from "../components/AppTextInput";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://192.168.1.5:8080/apprenant/", {
        email: email,
        password: password,
      });
      await AsyncStorage.setItem("token", response.data.token);
      console.log("email pass", email, password);
      // Traitement de la réponse de l'API
      console.log(response.data); // Afficher la réponse de l'API

      // Redirection vers une autre page après la connexion réussie
      navigation.navigate("Tabs");
    } catch (error) {
      // Gestion des erreurs
      console.error(error);
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "rgba(220,225,227,0.9)",
        width: "100%",
        height: "100%",
      }}
    >
      <View
        style={{
          padding: Spacing * 2,
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: FontSize.xLarge,
              color: Colors.primary,
              fontFamily: Font["poppins-bold"],
              marginVertical: Spacing * 3,
              marginTop: Spacing * 10,
            }}
          >
            Connexion
          </Text>
          <Text
            style={{
              fontFamily: Font["poppins-semiBold"],
              fontSize: FontSize.large,
              maxWidth: "60%",
              textAlign: "center",
            }}
          >
            Content de vous revoir !
          </Text>
        </View>
        <View
          style={{
            marginVertical: Spacing * 3,
          }}
        >
          <AppTextInput
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
          />
          <AppTextInput
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
          />
        </View>

        <TouchableOpacity
          onPress={handleLogin}
          style={{
            padding: Spacing * 2,
            backgroundColor: Colors.primary,
            marginVertical: Spacing * 3,
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
              textAlign: "center",
              fontSize: FontSize.large,
            }}
          >
            Connexion
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: Font["poppins-semiBold"],
            color: Colors.text,
            textAlign: "center",
            fontSize: FontSize.small,
          }}
        >
          Vous êtes nouveau ?
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={{
            padding: Spacing,
          }}
        >
          <Text
            style={{
              fontFamily: Font["poppins-semiBold"],
              color: Colors.primary,
              textAlign: "center",
              fontSize: FontSize.small,
            }}
          >
            Inscription
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});

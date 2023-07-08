import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Avatar } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
const Profile = ({ navigation }) => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const getTokenAndDecode = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
        console.log("user", decodedToken);
      } catch (error) {
        console.error("Token decoding failed:", error);
      }
    };

    getTokenAndDecode();
  }, []);
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      console.log("Le token a été supprimé avec succès.");
      navigation.navigate("Welcome");
    } catch (error) {
      console.error("Erreur lors de la suppression du token:", error);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="rgba(220,225,227,0.6)" />
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Avatar
            rounded
            title={user && user.name ? user.name.charAt(0) : ""}
            size={150}
            containerStyle={styles.avatar}
          />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.title}>{user && user.name ? user.name : ""}</Text>
          <Text style={styles.subtitle}>
            {user && user.email ? user.email : ""}
          </Text>
          <Text style={styles.subtitle}>
            {user && user.role ? user.role : ""}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => handleLogout()}
        style={styles.buttonContainer}
      >
        <Text style={styles.buttonText}>Déconnexion</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "rgba(220,225,227,0.6)",
  },
  header: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    elevation: 2,
  },
  avatarContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  avatar: {
    backgroundColor: "#5883C9",
  },
  userInfo: {
    marginTop: 20,
    alignItems: "center",
  },
  title: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "bold",
    fontSize: 50,
  },
  subtitle: {
    marginBottom: 5,
    fontSize: 22,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginTop: 20,
  },
  buttonText: {
    width: "80%",
    height: 40,
    backgroundColor: "red",
    color: "white",
    borderRadius: 10,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 20,
  },
});

export default Profile;

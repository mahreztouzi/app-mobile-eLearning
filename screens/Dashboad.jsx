import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Linking,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { Header, Avatar, Card } from "react-native-elements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { StyleSheet } from "react-native";
import Font from "../constants/Font";
import { useFocusEffect } from "@react-navigation/native";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();
  const [allUsers, setAllUsers] = useState([]);
  const [cours, setCours] = useState([]);
  console.log("cours console log", cours);
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
    getAllUser();
    getAllCours();
  }, []);

  const getAllUser = async () => {
    try {
      const response = await axios.get("http://192.168.1.5:8080/user");
      setAllUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const getAllCours = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get("http://192.168.1.5:8080/cours", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCours(response.data);
      console.log("cours", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderAvatarItem = ({ item, navigation }) => {
    console.log("messageDetails item", item);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("messageDetails", { user: item })}
      >
        <View style={{ alignItems: "center", marginHorizontal: 10 }}>
          <Avatar
            rounded
            title={item.name.charAt(0)}
            size={60}
            containerStyle={
              item.role === "professeur"
                ? { backgroundColor: "#84BB62" }
                : { backgroundColor: "#5883C9" }
            }
          />
          <Text style={{ maxWidth: 50, maxHeight: 30, textAlign: "center" }}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBackgroundColor("#e91e63"); // Définir la couleur de fond de la StatusBar
      StatusBar.setBarStyle("light-content"); // Définir le style du contenu de la StatusBar (couleur du texte)
      return () => {
        // Réinitialiser la couleur de la StatusBar lorsque l'écran perd le focus
        StatusBar.setBackgroundColor("transparent");
        StatusBar.setBarStyle("dark-content");
      };
    }, [])
  );

  const renderCoursItem = ({ item }) => {
    console.log("render item cours", item);
    return (
      <TouchableOpacity
        onPress={() => {
          const pdfUrl = `http://192.168.1.4:8080/uploads/${item.namePdf}`;
          Linking.openURL(pdfUrl);
        }}
      >
        <Card containerStyle={styles.coursCard}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.coursTitle}>{item.title}</Text>
            <Text style={styles.coursCreator}>
              Crée par : {item.Enseignant.name}
            </Text>
          </View>
          <Text style={styles.coursDescription}> {item.description}</Text>
        </Card>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView
      style={{ backgroundColor: "rgba(220,225,227,0.6)", height: "100%" }}
    >
      <StatusBar barStyle="dark-content" translucent={true} />

      <Header
        backgroundColor="#e91e63"
        leftComponent={
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <MaterialCommunityIcons
              style={{ marginTop: "8%" }}
              name="menu"
              color="white"
              size={30}
            />
          </TouchableOpacity>
        }
        centerComponent={
          <Text style={{ color: "white", fontSize: 22, marginTop: "4%" }}>
            Dashboard
          </Text>
        }
        rightComponent={
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            {user && user.name ? (
              <Avatar
                rounded
                title={user.name.charAt(0)}
                size={40}
                containerStyle={
                  user.role === "professeur"
                    ? { backgroundColor: "#84BB62" }
                    : { backgroundColor: "#5883C9" }
                }
              />
            ) : null}
          </TouchableOpacity>
        }
      />
      {allUsers && allUsers.length > 0 ? (
        <View>
          {/* <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginVertical: 10,
              paddingHorizontal: 10,
            }}
          >
            Utilisateurs
          </Text> */}
          <View style={{ flexDirection: "row" }}>
            <FlatList
              data={allUsers}
              renderItem={({ item }) => renderAvatarItem({ item, navigation })}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 20 }}
            />
          </View>
        </View>
      ) : null}
      {cours && cours.length > 0 ? (
        <View>
          <Text
            style={{
              fontSize: 35,
              fontFamily: Font["poppins-regular"],
              marginVerticalTop: 5,
              paddingHorizontal: 10,
              color: "#555",
            }}
          >
            Tout les cours
          </Text>
          <FlatList
            data={cours}
            renderItem={({ item }) => renderCoursItem({ item })}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          />
        </View>
      ) : null}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  coursCard: {
    marginBottom: 10,
    borderRadius: 10,
    elevation: 6,
  },
  coursTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  coursCreator: {
    fontSize: 16,
    fontWeight: "semi-bold",
    color: "#737373",
    marginBottom: 5,
  },
  coursDescription: {
    fontSize: 14,
    color: "#737373",
  },
});
export default Dashboard;

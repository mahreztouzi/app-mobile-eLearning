import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fr";
const Messages = ({ item }) => {
  dayjs.extend(relativeTime);
  dayjs.locale("fr");

  const [user, setUser] = useState([]);
  console.log("test user", user);
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

  const isMine = () => {
    return item.idExpediteur === user.userId; // Remplacez "5" par l'ID de l'utilisateur actuel
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isMine() ? "#55f" : "white",
          alignSelf: isMine() ? "flex-end" : "flex-start",
          borderRadius: 20,
        },
      ]}
    >
      <Text
        style={{
          color: isMine() ? "white" : "black",
          marginBottom: 5,

          fontSize: 16,
        }}
      >
        {item.contenu}
      </Text>
      <Text style={{ color: isMine() ? "white" : "black", fontSize: 12 }}>
        {dayjs(item.createdAt).fromNow()}
      </Text>
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    margin: 10,
    maxWidth: "80%",
  },
});

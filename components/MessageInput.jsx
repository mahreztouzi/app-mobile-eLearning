import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState, useRef } from "react";
import { StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);

  const sendMessage = () => {
    if (message === "") {
      inputRef.current.focus();
      return;
    } else {
      onSendMessage(message);
      setMessage(""); // Réinitialiser le champ de message après l'envoi
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="Ecrivez ici ....."
        value={message}
        onChangeText={setMessage}
      />
      <TouchableOpacity onPress={sendMessage}>
        <MaterialCommunityIcons name="send" style={styles.send} size={30} />
      </TouchableOpacity>
    </View>
  );
};

export default MessageInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#eee",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    padding: 5,
    marginRight: 5,
    borderRadius: 50,
  },
  send: {
    padding: 5,
    color: "blue",
  },
});

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { View, FlatList, StatusBar } from "react-native";
import axios from "axios";
import Messages from "../components/Messages";
import MessageInput from "../components/MessageInput";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MessageDetails = ({ route, navigation }) => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(route.params.user);
  const id = user.id;
  const [token, setToken] = useState("");
  const [isTokenLoaded, setIsTokenLoaded] = useState(false);
  const [userName, setUserName] = useState("");
  const messageListRef = useRef(null);
  const scrollToEnd = () => {
    if (messageListRef.current && messages.length > 0) {
      messageListRef.current.scrollToEnd({ animated: true });
    }
  };

  useEffect(() => {
    setUserName(route.params.user.name);
    setUser(route.params.user);
    getToken();
  }, [route.params.user]);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: userName,
    });
  }, [userName, navigation]);

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      setToken(token);
      setIsTokenLoaded(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isTokenLoaded) {
      getAllMessages();
    }
  }, [isTokenLoaded, id]);

  const getAllMessages = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.5:8080/message/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessages(response.data.messages);

      console.log("messages", response.data.messages);
    } catch (error) {
      console.error(error);
    }
  };

  const sendMessage = async (content) => {
    try {
      const response = await axios.post(
        `http://192.168.1.5:8080/message/${id}`,
        { contenu: content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Faire quelque chose avec la réponse
      getAllMessages();
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (messageListRef.current && messages.length > 0) {
      messageListRef.current.scrollToEnd({ animated: true });
    }
  }, [id]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#eee",
      }}
    >
      <StatusBar backgroundColor="white" />
      <FlatList
        ref={messageListRef}
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return <Messages item={item} />;
        }}
        onContentSizeChange={() => {
          if (messageListRef.current && messages.length > 0) {
            messageListRef.current.scrollToEnd({ animated: true });
          }
        }}
      />

      <MessageInput onSendMessage={sendMessage} />
    </View>
  );
};

export default MessageDetails;

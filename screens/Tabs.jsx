import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Dashboard from "./Dashboad";
import Profile from "./Profile";

function Tabs() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="dash"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "blue",

        tabBarStyle: { height: 60 }, // Modifier l'arrière-plan des onglets
        tabBarLabelStyle: { fontSize: 18 }, // Modifier la taille du texte des étiquettes des onglets
      }}
    >
      <Tab.Screen
        name="dash"
        component={Dashboard}
        options={{
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={30} />
          ),
        }}
      />

      <Tab.Screen
        name="settings"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default Tabs;

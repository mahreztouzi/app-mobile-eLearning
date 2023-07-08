import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import * as React from "react";
import Colors from "../constants/Colors";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import Welcome from "../screens/WelcomeScreen";
import SplashScreen from "../screens/SplashScreen";
import SplashScreenLogo from "../screens/SplashScreenLogo";
import Tabs from "../screens/Tabs";
import MessageDetails from "../screens/MessageDetails";
import { Button } from "react-native";
import Profile from "../screens/Profile";
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.background,
  },
};

export default function Navigation() {
  return (
    <NavigationContainer theme={theme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="SplashLogo"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="SplashLogo"
        component={SplashScreenLogo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Tabs" component={Dashboard} />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="messageDetails"
        component={MessageDetails}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}

function Dashboard({ navigation }) {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Home" component={Tabs} />
    </Drawer.Navigator>
  );
}

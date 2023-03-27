import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./../screens/HomeScreen";
import ChatScreen from "./../screens/ChatScreen";
import LoginScreen from "./../screens/LoginScreen";
import useAuth from "../hooks/useAuth.js";
import ModalScreen from "./../screens/ModalScreen";
const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  const { user } = useAuth();
  if (user) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Group>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen name="Modal" component={ModalScreen} />
        </Stack.Group>
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    );
  }
};

export default StackNavigator;

import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  Text,
  View,
} from "react-native";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import useAuth from "./../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const {
    initializing,
    loading,
    user,
    setUser,
    setInitializing,
    onGoogleButtonPress,
  } = useAuth();

  const navigation = useNavigation();
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View className="flex-1">
        <ImageBackground
          className="flex-1"
          source={{ uri: "https://tinder.com/static/tinder.png" }}
        >
          {loading && <ActivityIndicator />}
          <GoogleSigninButton
            style={{
              width: 300,
              height: 60,
              position: "absolute",
              left: 55,
              bottom: 30,
            }}
            onPress={onGoogleButtonPress}
          />
        </ImageBackground>
      </View>
    );
  }
};

export default LoginScreen;

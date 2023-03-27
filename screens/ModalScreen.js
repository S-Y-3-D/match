import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import useAuth from "../hooks/useAuth.js";
import { collection, addDoc, serverTimestamp } from "@firebase/firestore";
import { db } from "../firebase";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const ModalScreen = () => {
  const { user } = useAuth();
  const [image, setImage] = useState("");
  const [age, setAge] = useState("");
  const [job, setJob] = useState("");

  const incompleteForm = !image || !age || !job;
  const navigation = useNavigation();

  const updateUserProfile = async () => {
    try {
      const docRef = await addDoc(collection(db, "todos"), {
        job: job,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <View className="flex-1 bg-white items-center pt-1">
      <TouchableOpacity className="absolute top-8 left-8 z-50 bg-red-400 rounded-full">
        <Entypo
          name="chevron-left"
          size={30}
          color="white"
          onPress={() => navigation.navigate("Home")}
        />
      </TouchableOpacity>
      <Image
        source={require("../assets/Modal-tinder.png")}
        className="w-full h-20"
        resizeMode="contain"
      />
      <Text className="font-semibold text-gray-600 text-xl">
        Welcome {user.displayName}
      </Text>
      <View className="mt-4  space-y-3">
        <Text className="text-red-400 text-center  font-bold p-4">
          Step 1: The profile Pic
        </Text>
        <TextInput
          name="image"
          className="text-center text-lg pb-2"
          placeholder="Enter a Profile Pic URL"
          onChangeText={(text) => setImage(text)}
        ></TextInput>
        <Text className="text-red-400 text-center font-bold p-4">
          Step 2: The Job
        </Text>
        <TextInput
          name="job"
          className="text-center text-lg pb-2"
          placeholder="Enter your occupation"
          onChangeText={(text) => setJob(text)}
        ></TextInput>
        <Text className="text-red-400 text-center font-bold p-4">
          Step 3: The Age
        </Text>
        <TextInput
          name="age"
          className="text-center text-lg pb-2"
          placeholder="Enter Your age"
          keyboardType="numeric"
          maxLength={2}
          onChangeText={(text) => setAge(text)}
        ></TextInput>
      </View>
      <TouchableOpacity
        onPress={() => updateUserProfile()}
        disabled={incompleteForm}
        className={`absolute bottom-10 rounded-xl  p-3 ${
          incompleteForm ? "bg-gray-400" : "bg-red-400"
        }`}
      >
        <Text className="text-white text-center text-lg">Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ModalScreen;

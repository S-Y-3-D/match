import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth.js";
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, signOut } = useAuth();
  const [cards, setCards] = useState({});
  const swipeRef = useRef(null);

  const DATA = [
    {
      id: "123",
      firstName: "Teenie",
      lastName: "Bachelor",
      occupation: "Drama",
      photoURL:
        "https://assets.teenvogue.com/photos/61bcfb146d5605d8a79a8dd4/3:2/w_3804,h_2536,c_limit/1193644057",
      age: 23,
    },
    {
      id: "456",
      firstName: "Amanda",
      lastName: "Cerny",
      occupation: "Actress",
      photoURL:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/jennifer-lopez-hair-ponytail-1645010827.jpg?crop=0.822xw:0.786xh;0.102xw,0.0661xh&resize=480:*",
      age: 26,
    },
    {
      id: "789",
      firstName: "George",
      lastName: "Cologne",
      occupation: "Software Engineer",
      photoURL:
        "https://stylecaster.com/wp-content/uploads/2020/12/Timothee-Chalamet.jpg?w=454",
      age: 23,
    },
  ];
  return (
    <View className="flex-1 bg-white">
      {/* header */}
      <View className="flex-row justify-between items-center p-3">
        <TouchableOpacity onPress={signOut}>
          <Image
            className="w-10 h-10 rounded-full"
            source={{
              uri: user.photoURL,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
          <Image
            source={require("../assets/tinder.png")}
            className="w-14 h-14"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons name="chatbubbles-sharp" size={30} color="#FF5864" />
        </TouchableOpacity>
      </View>
      <View className="flex-1">
        <Swiper
          ref={swipeRef}
          containerStyle={{ backgroundColor: "transparent" }}
          cards={DATA}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity={true}
          veritcalSwipe={false}
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "Match",
              style: {
                label: {
                  color: "#58B258",
                },
              },
            },
          }}
          renderCard={(card) => {
            return (
              <View
                key={card.id}
                className="relative bg-white h-3/4 rounded-xl"
              >
                <Image
                  className="w-full h-full rounded-xl"
                  source={{ uri: card.photoURL }}
                />
                <View className="flex-row absolute bg-white bottom-0 py-2 px-3 rounded-b-xl">
                  <View className="flex-1">
                    <Text className="font-bold text-lg">
                      {card.firstName} {card.lastName}
                    </Text>
                    <Text className="text-md">{card.occupation}</Text>
                  </View>

                  <Text className="font-bold text-xl">{card.age}</Text>
                </View>
              </View>
            );
          }}
        ></Swiper>
      </View>
      <View className="flex-row justify-evenly items-center pb-5">
        <TouchableOpacity
          className="bg-red-200 rounded-full p-5"
          onPress={() => swipeRef.current.swipeLeft()}
        >
          <Entypo name="cross" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-green-200 rounded-full p-5"
          onPress={() => swipeRef.current.swipeRight()}
        >
          <AntDesign name="heart" size={24} color="green" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;

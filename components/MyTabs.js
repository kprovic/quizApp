import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  MaterialIcons,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Game from "../screen/Game";
import Leaderboard from "../screen/Leaderboard";
import { Profile } from "../screen/Profile";

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      backBehavior="none"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarActiveBackgroundColor: "#009688",
        tabBarLabelStyle: {
          margin: 3,
        },
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "black",
          height: 55,
        },
      }}
    >
      <Tab.Screen
        name="Game"
        component={Game}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            return (
              <Entypo name="game-controller" size={size} color={color}></Entypo>
            );
          },
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialCommunityIcons
                name="account"
                size={size}
                color={color}
              ></MaterialCommunityIcons>
            );
          },
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Leaderboard"
        component={Leaderboard}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialIcons
                name="leaderboard"
                size={size}
                color={color}
              ></MaterialIcons>
            );
          },
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default MyTabs;

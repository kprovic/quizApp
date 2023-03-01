import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { ref, get, query, orderByValue, limitToLast } from "firebase/database";
import { db } from "../services/Firebase";

const EndGame = ({ route, navigation }) => {
  const { result } = route.params;
  //gesture disabled(android)
  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
    });
  }, [navigation]);

  return (
    <View style={style.main}>
      <ConfettiCannon count={300} origin={{ x: -10, y: 0 }} fallSpeed={4000} />
      <View style={style.container}>
        <Text style={style.title}>The end</Text>
        <Text style={style.text}>{`Score: ${JSON.stringify(result)}`}</Text>
        <View style={style.buttonsContainer}>
          <TouchableOpacity
            style={style.buttonContainer}
            onPress={() => navigation.navigate("Game")}
          >
            <Text style={style.buttonText}>Retry</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.buttonContainer}
            onPress={() => navigation.navigate("Leaderboard")}
          >
            <Text style={style.buttonText}>Exit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "70%",
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: { fontSize: 30 },
  title: { fontSize: 60 },
  buttonText: {
    fontSize: 18,
    color: "white",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  buttonContainer: {
    backgroundColor: "#009688",
    width: "40%",
    elevation: 10,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 15,
  },
  buttonsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
});

export default EndGame;

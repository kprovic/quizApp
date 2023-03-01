import React from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";

const Game = ({ navigation }) => {
  return (
    <View style={styles.view}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate("Questions")}
      >
        <Text style={styles.buttonText}>Start game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    backgroundColor: "#009688",
    height: 260,
    width: 260,
    borderRadius: 260,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { color: "white", fontSize: 40 },
});

export default Game;

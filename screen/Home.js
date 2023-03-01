import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const HomePage = ({ navigation }) => {
  return (
    <View style={styles.view}>
      <Text style={styles.text}>QuizApp</Text>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          navigation.navigate("SignIn");
        }}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          navigation.navigate("SignUp");
        }}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  view: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 50, marginBottom: 35 },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  buttonContainer: {
    width: "60%",
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 10,
  },
});

export default HomePage;

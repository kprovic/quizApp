import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { handleSignUp } from "../services/Firebase";
import Toast from "react-native-toast-message";
import { object, string } from "yup";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userSchema = object({
    userName: string().required(),
    email: string().email().required(),
    password: string().min(6).required(),
  });

  const showToast = (error) => {
    Toast.show({
      type: "error",
      text1: error.toString(),
    });
  };
  const handleSubmit = () => {
    let obj = { userName: userName, email: email, password: password };
    userSchema
      .validate(obj)
      .then(() => {
        handleSignUp(email, password, userName);
      })
      .catch((error) => {
        showToast(error);
      });
  };

  return (
    <View style={styles.view}>
      <Text style={styles.title}>Sign up</Text>
      <TextInput
        style={styles.input}
        placeholder="user name"
        onChangeText={(text) => setUserName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="e-mail"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
        <Text style={styles.buttonText}>SignUp</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 50,
    marginBottom: 35,
    color: "#009688",
    fontWeight: "bold",
  },
  view: { flex: 1, alignItems: "center", justifyContent: "center" },
  input: {
    width: "70%",
    borderRadius: 10,
    padding: 12,
    margin: 10,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  buttonContainer: {
    width: "70%",
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 30,
  },
});

export default SignUp;

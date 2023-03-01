import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { FontAwesome5, Entypo } from "@expo/vector-icons";
import { auth, handleSignout } from "../services/Firebase";
import {
  ref,
  onValue,
  query,
  orderByValue,
  limitToLast,
} from "firebase/database";
import { db } from "../services/Firebase";

export const Profile = () => {
  const [userName, setUserName] = useState("");
  const [score, setScore] = useState([]);

  const handlePress = () => {
    handleSignout();
  };
  useEffect(() => {
    onValue(
      query(
        ref(db, `users/${auth.currentUser.uid}/score`),
        orderByValue("$id")
        //limitToLast(5)
      ),
      (snapshot) => {
        if (snapshot.hasChildren()) {
          //setScore(Object.values(snapshot.val()).sort((a, b) => b - a));
          setScore([
            ...new Set(Object.values(snapshot.val()).sort((a, b) => b - a)),
          ]);
        }
      },
      (error) => {
        console.log(error);
      }
    );
    onValue(ref(db, `/users/${auth.currentUser.uid}`), (snapshot) => {
      if (snapshot.hasChild("username")) {
        setUserName(snapshot.val().username);
      }
    });
  }, []);

  return (
    <View style={style.view}>
      {userName == "" ? (
        <ActivityIndicator size="large" color="#009688" />
      ) : (
        <>
          <Text style={style.username}>{userName}</Text>
          <Text style={style.score}>Best score</Text>
          {score.length == 0 ? (
            <Text style={style.warning}>You haven't played yet</Text>
          ) : (
            score?.map((item, index) => (
              <View style={style.box} key={index}>
                <Text style={[style.text, style.num]}>
                  {index == 0 ? (
                    <FontAwesome5 name="medal" style={style.medalG} />
                  ) : index == 1 ? (
                    <FontAwesome5 name="medal" style={style.medalS} />
                  ) : index == 2 ? (
                    <FontAwesome5 name="medal" style={style.medalB} />
                  ) : (
                    index + 1 + "."
                  )}
                </Text>
                <Text style={[style.text, style.num]}>{item}</Text>
              </View>
            ))
          )}
          <TouchableOpacity style={style.icon} onPress={handlePress}>
            <Entypo name="log-out" size={45} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    borderColor: "black",
    borderWidth: 4,
    borderRadius: 100,
    padding: 20,
    marginTop: 55,
  },
  username: {
    fontSize: 50,
    textAlign: "center",
    width: "75%",
  },
  box: {
    width: "40%",
    borderBottomColor: "#009688",
    borderBottomWidth: 1,
    margin: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  title: {
    fontSize: 20,
    textTransform: "uppercase",
    margin: 15,
    color: "black",
  },
  medalG: {
    color: "#FFD700",
    fontSize: 20,
  },
  medalS: {
    color: "#c0c0c0",
    fontSize: 20,
  },
  medalB: {
    color: "#cd7f32",
    fontSize: 20,
  },
  text: {
    fontSize: 17,
    padding: 5,
    color: "black",
    padding: 7,
  },
  num: { fontSize: 17, fontWeight: "bold" },
  score: {
    fontSize: 30,
    marginTop: 30,
    borderBottomColor: "#009688",
    borderBottomWidth: 3,
    width: "70%",
    textAlign: "center",
  },
  warning: {
    fontSize: 25,
    color: "black",
    marginTop: 50,
  },
});

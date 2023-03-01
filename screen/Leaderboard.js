import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import {
  limitToLast,
  onValue,
  orderByValue,
  query,
  ref,
} from "firebase/database";
import { db } from "../services/Firebase";

const Leaderboard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    onValue(
      query(
        ref(db, "users/scores"),
        orderByValue("$username"),
        limitToLast(10)
      ),
      (snapshot) => {
        if (snapshot.hasChildren()) {
          setScores(Object.entries(snapshot.val()).sort((a, b) => b[1] - a[1]));
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <View style={style.view}>
      {scores.length == 0 ? (
        <Text style={style.warning}>No one has played yet</Text>
      ) : (
        <>
          <Entypo name="trophy" style={style.icon}></Entypo>
          <Text style={style.title}>Top 10</Text>
          {scores?.map((item, index) => (
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
              <Text style={[style.text, style.name]}>{item[0]}</Text>
              <Text style={[style.text, style.name, style.num]}>{item[1]}</Text>
            </View>
          ))}
        </>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  text: {
    fontSize: 17,
    padding: 5,
    color: "black",
    padding: 7,
  },
  num: { fontSize: 17, fontWeight: "bold" },
  name: { marginLeft: "25%" },
  icon: {
    fontSize: 100,
    marginTop: 70,
    color: "#FFD700",
  },
  box: {
    width: "75%",
    borderBottomColor: "#009688",
    borderBottomWidth: 1,
    margin: 8,
    alignItems: "center",
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
  warning: {
    fontSize: 25,
    color: "black",
    marginTop: "80%",
  },
});

export default Leaderboard;

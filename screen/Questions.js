import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import { db, auth } from "../services/Firebase";
import { ref, get, update, push, set } from "firebase/database";

const Questions = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedA, setSelectedA] = useState(null);
  const [disabledOptions, setDisabledOptions] = useState(false);
  const [score, setScore] = useState(0);
  const [shuffleArray, setShuffleArray] = useState([]);

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  //gesture disabled(android)
  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
      Alert.alert("Quit", "Are you sure you want to exit the game?", [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "Yes", onPress: () => navigation.navigate("Game") },
      ]);
    });
  }, [navigation]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://opentdb.com/api.php?amount=5&type=multiple"
      );
      setQuestions(response.data.results);
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const validateAnswer = (select) => {
    if (select == questions[currentIndex].correct_answer) {
      setScore(score + 1);
    } else {
      setScore(score - 1);
    }
    setSelectedA(select);
    setDisabledOptions(true);
    if (currentIndex != questions.length - 1) {
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 1000);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (currentIndex == questions.length - 1) {
        //save result to db
        get(ref(db, `users/${auth.currentUser.uid}`))
          .then((snapshot) => {
            let userResults = {};
            userResults[snapshot.val().username] = score;
            if (snapshot.val().score) {
              push(ref(db, `users/${auth.currentUser.uid}/score`), score);
              update(ref(db, "users/scores"), userResults);
              //save data if score is not in db
              // if (!Object.values(snapshot.val().score).includes(score)) {
              //   push(ref(db, `users/${auth.currentUser.uid}/score`), score);
              //   update(ref(db, "users/scores"), userResults);
              // }
            } else {
              //update db and save data
              const pushRef = push(ref(db));
              const pushID = pushRef.key;
              let obj = {};
              obj[pushID] = score;
              update(ref(db, `users/${auth.currentUser.uid}/score`), obj);
              get(ref(db, "users/scores")).then((snapshot) => {
                if (!snapshot.exists()) {
                  set(ref(db, "users/scores"), userResults);
                } else {
                  update(ref(db, "users/scores"), userResults);
                }
              });
            }
          })
          .catch((error) => {
            console.error(error);
          });
        navigation.navigate("EndGame", { result: score });
      }
    }, 1200);
  }, [score]);

  useEffect(() => {
    setDisabledOptions(false);
    setSelectedA(null);
    if (questions.length != 0) {
      let array = shuffle([
        ...questions[currentIndex].incorrect_answers,
        questions[currentIndex].correct_answer,
      ]);
      setShuffleArray(array);
    }
  }, [currentIndex, questions]);

  return loading ? (
    <View style={style.main}>
      <ActivityIndicator size="large" color="#009688" />
    </View>
  ) : (
    <View style={style.main}>
      <View style={style.info}>
        <Text style={style.infoText}>
          {currentIndex + 1 + "/" + questions.length}
        </Text>
        <Text style={style.infoText}>{"Score:" + score}</Text>
      </View>
      <Text style={style.question}>{questions[currentIndex].question}</Text>
      <View style={style.box}>
        {shuffleArray.map((item) => (
          <TouchableOpacity
            disabled={disabledOptions}
            key={item}
            style={[
              style.answerBox,
              {
                backgroundColor:
                  selectedA == item &&
                  selectedA == questions[currentIndex].correct_answer
                    ? "#056517"
                    : selectedA == item &&
                      selectedA != questions[currentIndex].correct_answer
                    ? "#bf1029"
                    : "white",
              },
            ]}
            onPress={() => validateAnswer(item)}
          >
            <Text
              style={[
                style.answer,
                {
                  color:
                    selectedA == item &&
                    selectedA == questions[currentIndex].correct_answer
                      ? "white"
                      : selectedA == item &&
                        selectedA != questions[currentIndex].correct_answer
                      ? "white"
                      : "black",
                },
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
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
  box: { minWidth: "70%" },
  question: {
    margin: 18,
    fontSize: 25,
    marginBottom: 60,
    fontWeight: "bold",
    textAlign: "center",
  },
  answerBox: {
    borderColor: "#009688",
    borderWidth: 2,
    margin: 15,
    borderRadius: 15,
  },
  answer: {
    fontSize: 20,
    padding: 10,
    textAlign: "center",
  },
  info: {
    borderBottomColor: "#009688",
    borderBottomWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 50,
  },
  infoText: {
    fontSize: 20,
    marginHorizontal: 50,
    marginVertical: 5,
  },
});

export default Questions;

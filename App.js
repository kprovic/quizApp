import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import MyTabs from "./components/MyTabs";
import HomePage from "./screen/Home";
import SignIn from "./screen/SignIn";
import SignUp from "./screen/SignUp";
import { auth } from "./services/Firebase";
import Questions from "./screen/Questions";
import EndGame from "./screen/EndGame";
import Toast, { ErrorToast } from "react-native-toast-message";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  const toastConfig = {
    error: (props) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 14,
        }}
        text2Style={{
          fontSize: 15,
        }}
        text1NumberOfLines={3}
      />
    ),
  };

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          {user ? (
            <>
              <Stack.Screen
                name="Tabs"
                component={MyTabs}
                options={{ headerShown: false }}
              ></Stack.Screen>
              <Stack.Screen
                name="Questions"
                component={Questions}
                options={{ headerShown: false, gestureEnabled: false }}
              ></Stack.Screen>
              <Stack.Screen
                name="EndGame"
                component={EndGame}
                options={{
                  headerShown: false,
                  gestureEnabled: false,
                }}
              ></Stack.Screen>
            </>
          ) : (
            <>
              <Stack.Screen
                name="Home"
                component={HomePage}
                options={{ headerShown: false }}
              ></Stack.Screen>
              <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{
                  title: "Home",
                  headerStyle: {
                    backgroundColor: "#009688",
                  },
                  headerTintColor: "white",
                }}
              ></Stack.Screen>
              <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{
                  title: "Home",
                  headerStyle: {
                    backgroundColor: "#009688",
                  },
                  headerTintColor: "white",
                }}
              ></Stack.Screen>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast
        position="bottom"
        autoHide={true}
        visibilityTime={3000}
        config={toastConfig}
      />
    </>
  );
}

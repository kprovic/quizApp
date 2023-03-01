import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { get, getDatabase, ref, set } from "firebase/database";
import Toast from "react-native-toast-message";
import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  DATABASE_URL,
} from "@env";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  databaseURL: DATABASE_URL,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export const db = getDatabase(app);

export { auth };

const showToast = (error) => {
  Toast.show({
    type: "error",
    text1: error.toString(),
  });
};

// signup function
export const handleSignUp = (email, password, name) => {
  get(ref(db, "users"))
    .then((snapshot) => {
      snapshot.forEach((userData) => {
        if (userData.val().username == name) {
          throw Error;
        }
      });
    })
    .then(() => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          //write to db
          set(ref(db, "users/" + user.uid), {
            username: name,
            email: user.email,
          });
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            showToast("Email already in use");
          }
          // ..
        });
    })
    .catch(() => {
      showToast("Username already in use");
    });
};

// sign in function
export const handleSignIn = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      showToast("Invalid credentials");
    });
};

//sign out function
export const handleSignout = () => {
  signOut(auth)
    .then(() => {
      console.log("signout");
    })
    .catch((error) => {
      console.log("error");
    });
};

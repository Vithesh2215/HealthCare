// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-BXwlkqdBGdSDYn7ZYu6F7r2U5b0Nf2k",
  authDomain: "edpproject-78f3c.firebaseapp.com",
  databaseURL: "https://edpproject-78f3c.firebaseio.com/",
  projectId: "edpproject-78f3c",
  storageBucket: "edpproject-78f3c.firebasestorage.app",
  messagingSenderId: "1079273093401",
  appId: "1:1079273093401:web:9e294370ed8d84c4bb6d88",
  measurementId: "G-CQF3TTVJ37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

// Export Firebase services
export { auth, db };
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
  apiKey: "AIzaSyDLi3dNbiMB6wadEMPm58ks9Y4T4n7WmPw",
  authDomain: "suicide-detection-ff25b.firebaseapp.com",
  projectId: "suicide-detection-ff25b",
  storageBucket: "suicide-detection-ff25b.firebasestorage.app",
  messagingSenderId: "302440720550",
  appId: "1:302440720550:web:2bbd7545d1aaa548d8ec67",
  measurementId: "G-D7593REKVD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

// Export Firebase services
export { auth, db };
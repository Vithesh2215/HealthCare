import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../constant/Colors";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./../../config/FirebaseConfig";

export default function SignIn() {
  const router = useRouter();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const OnSignInClick = () => {
    if (!email || !password) {
      Alert.alert("Please enter your email & password");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);

        router.replace('(tabs)');
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode=='auth/invalid-credential'){
          Alert.alert('Invalid email or password');
        }
      });
  };

  return (
    <View
      style={{
        padding: 25,
      }}
    >
      <Text style={styles.textHeader}>Let's Sign You In</Text>
      <Text style={styles.subText}>Welcome Back</Text>
      <Text style={styles.subText}>You've been missed!!</Text>

      <View
        style={{
          marginTop: 25,
        }}
      >
        <Text>Email</Text>
        <TextInput
          placeholder="Email"
          style={styles.textInput}
          onChangeText={(value) => setEmail(value)}
        />
      </View>

      <View
        style={{
          marginTop: 25,
        }}
      >
        <Text>Password</Text>
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={styles.textInput}
          onChangeText={(value) => setPassword(value)}
        />
      </View>

      <TouchableOpacity style={styles.button}
        onPress={OnSignInClick}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontSize: 17,
          }}
        >
          Login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonCreate}
        onPress={() => router.push("login/signUp")}
      >
        <Text
          style={{
            textAlign: "center",
            color: Colors.PRIMARY,
            fontSize: 17,
          }}
        >
          Create Account
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 15,
  },
  subText: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
    color: Colors.GRAY,
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
    fontSize: 17,
    borderRadius: 10,
    marginTop: 5,
    backgroundColor: "white",
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    marginTop: 35,
  },
  buttonCreate: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },
});

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import Colors from "../../constant/Colors";
import { auth } from "./../../config/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUp() {
  const router = useRouter();

  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [userName,setUserName] = useState();

  const OnCreateAccount = () => {
    if(!email || !password || !userName) {
      ToastAndroid.show('Please fill all details', ToastAndroid.BOTTOM);
      Alert.alert('Please fill all details');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async(userCredential) => {
        // Signed up
        const user = userCredential.user;

        await updateProfile(user, {
          displayName: userName,
        })

        router.push('(tabs)');
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        if(errorCode=='auth/email-already-in-use'){
          ToastAndroid.show('Emial alredy exist', ToastAndroid.BOTTOM);
          Alert.alert('Emial alredy exist');
        }
        // ..
      });
  };
  return (
    <View
      style={{
        padding: 25,
      }}
    >
      <Text style={styles.textHeader}>Create New Account</Text>

      <View
        style={{
          marginTop: 25,
        }}
      >
        <Text>Full Name</Text>
        <TextInput placeholder="Full Name" style={styles.textInput} 
          onChange={(value)=>setUserName(value)}
        />
      </View>
      <View
        style={{
          marginTop: 25,
        }}
      >
        <Text>Email</Text>
        <TextInput placeholder="Email" style={styles.textInput} 
          onChangeText={(value)=>setEmail(value)}
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
          onChangeText={(value)=>setPassword(value)}
        />
      </View>

      <TouchableOpacity style={styles.button}
        onPress={OnCreateAccount}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontSize: 17,
          }}
        >
          Create Account
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonCreate}
        onPress={() => router.push("login/signIn")}
      >
        <Text
          style={{
            textAlign: "center",
            color: Colors.PRIMARY,
            fontSize: 17,
          }}
        >
          Already account? Sign In
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

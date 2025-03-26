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
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function AddNew() {
  // const [instagram, setInstagram] = useState("");
  const [socialmediahandle, setHandle] = useState("");

  const db = getFirestore(); // Firestore instance
  const auth = getAuth(); // Firebase Authentication instance

  const OnClickAdd = async (mediahandle) => {
    const user = auth.currentUser; // Get the currently logged-in user

    if (!user) {
      Alert.alert("User not logged in");
      return;
    }

    try {
      // const userRef = doc(db, "users", user.uid); // Reference to the Firestore document

      // await setDoc(
      //   userRef,
      //   {
      //     socialMedia: {
      //       socialmediahandle: twitterHandle,
      //       instagram: instagramHandle,
      //     },
      //   },
      //   { merge: true } // Ensures existing data isn't overwritten
      // );

      await setDoc(doc(db, "Social Media Handle", user.uid), {
        id: user.uid,
        Handle: mediahandle,
      }, {merge: true});

      Alert.alert("Social media handle added successfully!");
      // setInstagram(""); // Clear input fields
      setHandle("");
    } catch (error) {
      console.error("Error updating document: ", error);
      Alert.alert("Failed to add social media handles");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>Add / Update</Text>
      <Text style={styles.textHeader}>Your Social Media</Text>
      <Text style={styles.textHeader}>Handle Here</Text>

      <View style={styles.inputContainer}>
        <Text>Socail Media Handle</Text>
        <TextInput
          placeholder="Enter your Social Media Handle"
          style={styles.textInput}
          onChangeText={setHandle}
          value={socialmediahandle}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => OnClickAdd(socialmediahandle)}
      >
        <Text style={styles.buttonText}>Add / Update Social Media Handle</Text>
      </TouchableOpacity>

      <Text style={styles.note}>
        Note: Enter the social media handle only if it is present.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
  },
  textHeader: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 8,
    textAlign: "center",
  },
  inputContainer: {
    marginTop: 25,
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
    fontSize: 17,
    borderRadius: 10,
    marginTop: 8,
    backgroundColor: "white",
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    marginTop: 35,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 17,
  },
  note: {
    color: "blue",
    marginTop: 20,
    textAlign: "center",
  },
});

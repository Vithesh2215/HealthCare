import React, { useEffect, useState } from "react";
import {
  AppState,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function App() {
  const router = useRouter();
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = async (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        // App has come to the foreground
        const lastClosedTime = await AsyncStorage.getItem("lastClosedTime");
        if (lastClosedTime) {
          const timeDifference =
            Date.now() - parseInt(lastClosedTime, 10); // Difference in milliseconds
          if (timeDifference > 5 * 60 * 1000) {
            // If more than 5 minutes
            await AsyncStorage.removeItem("user"); // Clear user session
            Alert.alert("Session Expired", "Please log in again.");
            router.replace("login/signIn"); // Navigate to login screen
          }
        }
      } else if (nextAppState.match(/inactive|background/)) {
        // App is going to the background or being closed
        await AsyncStorage.setItem("lastClosedTime", Date.now().toString());
      }
      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener("change", handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, [appState]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the App!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          await AsyncStorage.removeItem("user");
          router.replace("login/signIn");
        }}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    padding: 15,
    backgroundColor: "red",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
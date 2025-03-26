import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Main App Tabs */}
      <Stack.Screen name="(tabs)" />
      
      {/* Authentication Screens */}
      <Stack.Screen name="verify-email/verifyEmail" />
      <Stack.Screen name="login/signIn" />
      <Stack.Screen name="login/signUp" />
    </Stack>
  );
} 

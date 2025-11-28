import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { getMessaging } from "firebase/messaging";
import { initializeApp } from "firebase/app";

import RootNavigator from "@/navigation/RootNavigator";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import {
  initializeNotifications,
  setupNotificationListeners,
} from "@/services/notificationService";

export default function App() {
  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hideAsync().catch(() => {});
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    initializeNotifications();
    const unsubscribe = setupNotificationListeners();
    
    // Subscribe to all_users topic for NotifyHound notifications
    try {
      const firebaseConfig = {
        apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      };
      
      const app = initializeApp(firebaseConfig);
      const messaging = getMessaging(app);
      
      messaging.subscribeToTopic("all_users").then(() => {
        console.log("✅ App subscribed to all_users topic - Ready for NotifyHound!");
      }).catch((err) => {
        console.log("Topic subscription:", err);
      });
    } catch (error) {
      console.log("Firebase setup:", error);
    }
    
    return unsubscribe;
  }, []);

  return (
  <ErrorBoundary>
    <SafeAreaProvider>
        <GestureHandlerRootView style={styles.root}>
          <KeyboardProvider>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
            <StatusBar style="light" />
          </KeyboardProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
  </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

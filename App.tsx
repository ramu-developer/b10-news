import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as Sentry from "sentry-expo";

import RootNavigator from "@/navigation/RootNavigator";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Initialize Sentry for crash reporting
Sentry.init({
  dsn: "https://c8f8e8f8e8f8e8f8e8f8e8f8e8f8e8f8@o1234567.ingest.sentry.io/1234567",
  enableInAppFrameLabeling: true,
});

export default function App() {
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

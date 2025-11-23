import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useNavigation } from "@react-navigation/native";

export default function Frame04Screen() {
  const navigation = useNavigation();

  useEffect(() => {
    const openWebsite = async () => {
      try {
        await WebBrowser.openBrowserAsync("https://www.b10vartha.in/");
      } catch (error) {
        console.error("Error opening website:", error);
      }
      navigation.goBack();
    };

    openWebsite();
  }, [navigation]);

  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});

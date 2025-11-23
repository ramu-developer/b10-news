import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "@/navigation/RootNavigator";

type Frame04RouteProp = RouteProp<RootStackParamList, "Frame04">;

export default function Frame04Screen() {
  const navigation = useNavigation();
  const route = useRoute<Frame04RouteProp>();
  const category = route.params?.category;

  useEffect(() => {
    const openWebsite = async () => {
      try {
        const url = category
          ? `https://www.b10vartha.in/${category}`
          : "https://www.b10vartha.in/";
        await WebBrowser.openBrowserAsync(url);
      } catch (error) {
        console.error("Error opening website:", error);
      }
      navigation.goBack();
    };

    openWebsite();
  }, [navigation, category]);

  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});

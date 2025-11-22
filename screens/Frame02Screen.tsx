import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";
import { Spacing } from "@/constants/theme";

const logoSource = require("@/assets/images/b10news_logo.png");

export default function Frame02Screen() {
  const insets = useSafeAreaInsets();

  const handleMenuPress = () => {
    // Menu action will be added later
  };

  const handleSearchPress = () => {
    // Search action will be added later
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top + 4,
            paddingLeft: Spacing.lg,
            paddingRight: Spacing.lg,
          },
        ]}
      >
        <View style={styles.leftSection}>
          <Pressable onPress={handleMenuPress} style={styles.menuButton}>
            <Feather name="menu" size={28} color="#000000" />
          </Pressable>
          <Image source={logoSource} style={styles.logo} contentFit="contain" />
        </View>

        <View style={styles.rightSection}>
          <Pressable onPress={handleSearchPress} style={styles.searchButton}>
            <Feather name="search" size={24} color="#000000" />
          </Pressable>
          <Text style={styles.liveText}>Live</Text>
        </View>
      </View>

      <View style={styles.content}>
        {/* Content will be added here */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 4,
    backgroundColor: "#FFFFFF",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuButton: {
    padding: Spacing.sm,
    marginRight: -8,
  },
  logo: {
    width: 80,
    height: 32,
    marginLeft: 0,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchButton: {
    padding: Spacing.sm,
    marginRight: Spacing.sm,
  },
  liveText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF0000",
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
});

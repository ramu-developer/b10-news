import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
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

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top + Spacing.md,
            paddingLeft: Spacing.lg,
            paddingRight: Spacing.lg,
          },
        ]}
      >
        <Pressable onPress={handleMenuPress} style={styles.menuButton}>
          <Feather name="menu" size={28} color="#000000" />
        </Pressable>
        <Image source={logoSource} style={styles.logo} contentFit="contain" />
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
    paddingBottom: Spacing.md,
    backgroundColor: "#FFFFFF",
  },
  menuButton: {
    padding: Spacing.sm,
    marginRight: Spacing.md,
  },
  logo: {
    width: 100,
    height: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
});

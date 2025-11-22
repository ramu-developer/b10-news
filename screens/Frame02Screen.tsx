import React, { useState } from "react";
import { View, StyleSheet, Pressable, Text, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";
import { Spacing } from "@/constants/theme";

const logoSource = require("@/assets/images/b10news_logo.png");

const categories = [
  { id: "national", label: "జాతీయం" },
  { id: "international", label: "అంతర్జాతీయం" },
  { id: "politics", label: "రాజకీయాలు" },
  { id: "health", label: "ఆరోగ్యం" },
  { id: "sports", label: "ఆటలు" },
  { id: "environment", label: "వాతావరణం" },
];

export default function Frame02Screen() {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState("national");

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

      <View style={styles.categoriesContainer}>
        <Pressable style={styles.homeButton}>
          <Feather name="home" size={24} color="#000000" />
        </Pressable>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <Pressable
              key={category.id}
              onPress={() => setSelectedCategory(category.id)}
              style={styles.categoryItem}
            >
              <Text style={styles.categoryText}>{category.label}</Text>
              {selectedCategory === category.id && (
                <View style={styles.categoryUnderline} />
              )}
            </Pressable>
          ))}
        </ScrollView>
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
  categoriesContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  homeButton: {
    padding: Spacing.sm,
    marginRight: Spacing.sm,
  },
  categoriesScroll: {
    flex: 1,
  },
  categoriesContent: {
    alignItems: "center",
  },
  categoryItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 12,
    alignItems: "center",
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000000",
  },
  categoryUnderline: {
    width: "100%",
    height: 3,
    backgroundColor: "#2196F3",
    marginTop: 4,
    borderRadius: 0.2,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
});

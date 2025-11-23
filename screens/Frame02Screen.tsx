import React, { useState } from "react";
import { View, StyleSheet, Pressable, Text, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import * as Linking from "expo-linking";
import { Spacing } from "@/constants/theme";
import VideosSection from "@/components/VideosSection";

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

  const handleSearchPress = async () => {
    try {
      const searchUrl = "https://www.youtube.com/@B10newsAp/videos";
      await Linking.openURL(searchUrl);
    } catch (error) {
      console.error("Error opening search:", error);
    }
  };

  const handleLogoPress = async () => {
    try {
      const channelUrl = "https://www.youtube.com/@B10newsAp/videos";
      await Linking.openURL(channelUrl);
    } catch (error) {
      console.error("Error opening channel:", error);
    }
  };

  const handleLivePress = async () => {
    try {
      const streamsUrl = "https://www.youtube.com/@B10newsAp/streams";
      await Linking.openURL(streamsUrl);
    } catch (error) {
      console.error("Error opening streams:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top + 4,
            paddingLeft: 4,
            paddingRight: Spacing.lg,
          },
        ]}
      >
        <View style={styles.leftSection}>
          <Pressable onPress={handleMenuPress} style={styles.menuButton}>
            <Text style={styles.menuIcon}>☰</Text>
          </Pressable>
          <Pressable onPress={handleLogoPress}>
            <Image source={logoSource} style={styles.logo} contentFit="contain" />
          </Pressable>
        </View>

        <View style={styles.rightSection}>
          <Pressable onPress={handleSearchPress} style={styles.searchButton}>
            <Text style={styles.searchIcon}>🔍</Text>
          </Pressable>
          <Pressable onPress={handleLivePress}>
            <Text style={styles.liveText}>Live</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.categoriesContainer}>
        <Pressable style={styles.homeButton}>
          <Text style={styles.homeEmoji}>🏠</Text>
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
              style={[
                styles.categoryItem,
                selectedCategory === category.id && styles.categoryItemSelected,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category.id && styles.categoryTextSelected,
                ]}
              >
                {category.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <View style={styles.content}>
        <VideosSection />
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
  menuIcon: {
    fontSize: 28,
    color: "#000000",
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
  searchIcon: {
    fontSize: 24,
    color: "#000000",
  },
  liveText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF0000",
  },
  categoriesContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 4,
    paddingRight: Spacing.lg,
    paddingTop: 8,
    paddingBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  homeButton: {
    padding: 0,
    marginRight: Spacing.sm,
  },
  homeEmoji: {
    fontSize: 24,
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
    justifyContent: "center",
  },
  categoryItemSelected: {
    backgroundColor: "#2196F3",
    borderRadius: 4,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000000",
  },
  categoryTextSelected: {
    color: "#FFFFFF",
  },
  content: {
    flex: 1,
    paddingHorizontal: 0,
  },
});

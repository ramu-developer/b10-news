import React from "react";
import { View, StyleSheet, Pressable, Text, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Linking from "expo-linking";
import { Spacing } from "@/constants/theme";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/navigation/RootNavigator";
import { Feather } from "@expo/vector-icons";

const categories = [
  { id: "home", label: "Home", emoji: "🏠" },
  { id: "national", label: "జాతీయం", emoji: "🏛️" },
  { id: "international", label: "అంతర్జాతీయం", emoji: "🌍" },
  { id: "politics", label: "రాజకీయాలు", emoji: "🥇" },
  { id: "health", label: "ఆరోగ్యం", emoji: "⚕️" },
  { id: "sports", label: "ఆటలు", emoji: "⚽" },
  { id: "environment", label: "వాతావరణం", emoji: "🌱" },
];

export default function Frame03Screen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  const handleSharePress = async () => {
    try {
      const channelUrl = "https://www.youtube.com/@B10newsAp/videos";
      await Linking.openURL(channelUrl);
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleYouTubePress = async () => {
    try {
      const channelUrl = "https://www.youtube.com/@B10newsAp/videos";
      await Linking.openURL(channelUrl);
    } catch (error) {
      console.error("Error opening YouTube:", error);
    }
  };

  const handleWebsitePress = async () => {
    try {
      const websiteUrl = "https://www.b10news.in";
      await Linking.openURL(websiteUrl);
    } catch (error) {
      console.error("Error opening website:", error);
    }
  };

  const handleCategoryPress = (categoryId: string) => {
    if (categoryId === "home") {
      navigation.navigate("Frame02");
    } else {
      setSelectedCategory(categoryId);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top + Spacing.lg,
            paddingLeft: Spacing.lg,
            paddingRight: Spacing.lg,
          },
        ]}
      >
        <Text style={styles.greetingText}>Hi Bro,</Text>
        <Pressable onPress={handleSharePress} style={styles.shareButton}>
          <Text style={styles.shareText}>Share</Text>
        </Pressable>
      </View>

      <View style={styles.iconsContainer}>
        <Pressable onPress={handleYouTubePress} style={styles.youtubeButton}>
          <View style={styles.youtubeIconContainer}>
            <Text style={styles.youtubePlayIcon}>▶</Text>
          </View>
        </Pressable>
        <Pressable onPress={handleWebsitePress} style={styles.iconButton}>
          <Text style={styles.websiteIcon}>🌐</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.categoriesContainer} contentContainerStyle={styles.categoriesContent}>
        {categories.map((category) => (
          <Pressable
            key={category.id}
            onPress={() => handleCategoryPress(category.id)}
            style={[
              styles.categoryItem,
              selectedCategory === category.id && styles.categoryItemSelected,
            ]}
          >
            <Text style={styles.categoryEmoji}>{category.emoji}</Text>
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
    paddingBottom: Spacing.lg,
    minHeight: 40,
  },
  greetingText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
  },
  shareButton: {
    backgroundColor: "#5e17eb",
    paddingHorizontal: Spacing.md,
    paddingVertical: 2,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  shareText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.lg,
  },
  youtubeButton: {
    padding: 0,
  },
  youtubeIconContainer: {
    backgroundColor: "#FF0000",
    borderRadius: 2,
    width: 40,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  youtubePlayIcon: {
    fontSize: 14,
    color: "#FFFFFF",
    marginLeft: 2,
  },
  iconButton: {
    padding: Spacing.sm,
  },
  websiteIcon: {
    fontSize: 32,
  },
  categoriesContainer: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  categoriesContent: {
    paddingTop: Spacing.md,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    gap: Spacing.md,
  },
  categoryItemSelected: {
    backgroundColor: "#2196F3",
    borderRadius: 2,
    marginHorizontal: 0,
    alignSelf: "flex-start",
    width: "auto",
    paddingVertical: 2,
  },
  categoryEmoji: {
    fontSize: 24,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000000",
  },
  categoryTextSelected: {
    color: "#FFFFFF",
  },
});

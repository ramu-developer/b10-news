import React from "react";
import { View, StyleSheet, Pressable, Text, ScrollView, Share } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Linking from "expo-linking";
import { Spacing } from "@/constants/theme";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/navigation/RootNavigator";
import { Feather } from "@expo/vector-icons";

const categories = [
  { id: "home", label: "Home", emoji: "🏠", url: "" },
  { id: "national", label: "జాతీయం", emoji: "🏛️", url: "https://www.b10vartha.in/search/label/%E0%B0%9C%E0%B0%BE%E0%B0%A4%E0%B1%80%E0%B0%AF%E0%B0%82" },
  { id: "international", label: "అంతర్జాతీయం", emoji: "🌍", url: "https://www.b10vartha.in/search/label/%E0%B0%85%E0%B0%82%E0%B0%A4%E0%B0%B0%E0%B1%8D%E0%B0%9C%E0%B0%BE%E0%B0%A4%E0%B1%80%E0%B0%AF%E0%B0%82" },
  { id: "politics", label: "రాజకీయాలు", emoji: "⚡", url: "https://www.b10vartha.in/search/label/%E0%B0%B0%E0%B0%BE%E0%B0%9C%E0%B0%95%E0%B1%80%E0%B0%AF%E0%B0%BE%E0%B0%B2%E0%B1%81" },
  { id: "health", label: "ఆరోగ్యం", emoji: "⚕️", url: "https://www.b10vartha.in/search/label/%E0%B0%86%E0%B0%B0%E0%B1%8B%E0%B0%97%E0%B1%8D%E0%B0%AF%E0%B0%82" },
  { id: "sports", label: "ఆటలు", emoji: "⚽", url: "https://www.b10vartha.in/search/label/%E0%B0%86%E0%B0%9F%E0%B0%B2%E0%B1%81" },
  { id: "environment", label: "వాతావరణం", emoji: "🌱", url: "https://www.b10vartha.in/search/label/%E0%B0%B5%E0%B0%BE%E0%B0%A4%E0%B0%BE%E0%B0%B5%E0%B0%B0%E0%B0%A3%E0%B0%82" },
];

export default function Frame03Screen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  const handleSharePress = async () => {
    try {
      const shareUrl = "https://www.b10vartha.in/";
      await Share.share({
        message: shareUrl,
        url: shareUrl,
      });
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

  const handleWebsitePress = () => {
    navigation.navigate("Frame04", { url: "https://www.b10vartha.in/" });
  };

  const handleCategoryPress = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (categoryId === "home") {
      navigation.goBack();
    } else if (category && category.url) {
      navigation.navigate("Frame04", { url: category.url });
    }
  };

  const handleClosePress = () => {
    navigation.goBack();
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
        <View style={styles.headerLeft}>
          <Pressable onPress={handleClosePress} style={styles.closeButton}>
            <Text style={styles.closeIcon}>✕</Text>
          </Pressable>
          <Text style={styles.greetingText}>Hi Bro,</Text>
        </View>
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

      <View style={[styles.footer, { paddingBottom: insets.bottom + Spacing.md }]}>
        <Text style={styles.copyrightText}>©b10vartha.in</Text>
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
    paddingBottom: Spacing.lg,
    minHeight: 40,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  closeButton: {
    padding: Spacing.xs,
  },
  closeIcon: {
    fontSize: 24,
    fontWeight: "400",
    color: "#000000",
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
  footer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  copyrightText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#999999",
  },
});

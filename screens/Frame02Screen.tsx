import React, { useState, useEffect } from "react";
import { View, StyleSheet, Pressable, Text, ScrollView, TextInput, Modal, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import * as Linking from "expo-linking";
import { Spacing } from "@/constants/theme";
import { fetchYouTubeVideos, YouTubeVideo } from "@/utils/youtubeAPI";
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
  const [allVideos, setAllVideos] = useState<YouTubeVideo[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadVideos = async () => {
      setLoading(true);
      const videosData = await fetchYouTubeVideos(200);
      setAllVideos(videosData);
      setFilteredVideos(videosData);
      setLoading(false);
    };

    loadVideos();
  }, []);

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const filtered = allVideos.filter((video) =>
        video.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredVideos(filtered);
    } else {
      setFilteredVideos(allVideos);
    }
  };

  const handleSearchPress = () => {
    setSearchVisible(true);
  };

  const handleMenuPress = () => {
    // Menu action will be added later
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

  const handleBellPress = async () => {
    try {
      const channelUrl = "https://www.youtube.com/@B10newsAp/videos";
      await Linking.openURL(channelUrl);
    } catch (error) {
      console.error("Error opening channel:", error);
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
          <Pressable onPress={handleBellPress} style={styles.bellButton}>
            <Text style={styles.bellIcon}>🔔</Text>
          </Pressable>
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
        <VideosSection videos={filteredVideos} loading={loading} />
      </View>

      <Modal
        visible={searchVisible}
        transparent={false}
        animationType="fade"
        onRequestClose={() => {
          setSearchVisible(false);
          setSearchQuery("");
          setFilteredVideos(allVideos);
        }}
      >
        <View style={styles.searchOverlay}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search videos..."
              placeholderTextColor="#999999"
              value={searchQuery}
              onChangeText={handleSearchSubmit}
              autoFocus={true}
            />
            <Pressable
              style={styles.closeButton}
              onPress={() => {
                setSearchVisible(false);
                setSearchQuery("");
                setFilteredVideos(allVideos);
              }}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </Pressable>
          </View>
          <View style={styles.modalContent}>
            <VideosSection videos={filteredVideos} loading={loading} />
          </View>
        </View>
      </Modal>
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
  bellButton: {
    padding: Spacing.sm,
    marginRight: Spacing.sm,
  },
  bellIcon: {
    fontSize: 24,
    color: "#FF0000",
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
    paddingBottom: 2,
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
    marginBottom: 2,
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
    paddingTop: 2,
  },
  searchOverlay: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "flex-start",
  },
  searchContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#2196F3",
    borderRadius: 8,
    paddingHorizontal: Spacing.md,
    fontSize: 16,
    color: "#000000",
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 24,
    color: "#000000",
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 0,
  },
});

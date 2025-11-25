import React from "react";
import { View, StyleSheet, Text, FlatList, ActivityIndicator, Dimensions, Pressable } from "react-native";
import { Image } from "expo-image";
import * as Linking from "expo-linking";
import { YouTubeVideo } from "@/utils/youtubeAPI";
import { Spacing } from "@/constants/theme";

const screenWidth = Dimensions.get("window").width;
const itemWidth = (screenWidth - 20) / 2; // 2 columns with 8px padding each side and 4px gap
const featuredWidth = screenWidth; // Full width for featured video

interface VideosSectionProps {
  videos: YouTubeVideo[];
  loading: boolean;
}

export default function VideosSection({ videos, loading }: VideosSectionProps) {
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  if (videos.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No videos available</Text>
      </View>
    );
  }

  const handleVideoPress = async (videoId: string) => {
    try {
      // Try to open in YouTube app first
      const youtubeAppUrl = `youtube://v/${videoId}`;
      const canOpenYouTubeApp = await Linking.canOpenURL(youtubeAppUrl);
      
      if (canOpenYouTubeApp) {
        await Linking.openURL(youtubeAppUrl);
      } else {
        // Fallback to web browser
        const youtubeWebUrl = `https://www.youtube.com/watch?v=${videoId}`;
        await Linking.openURL(youtubeWebUrl);
      }
    } catch (error) {
      console.error("Error opening video:", error);
    }
  };

  const renderVideoItem = ({ item }: { item: YouTubeVideo }) => (
    <Pressable 
      style={styles.videoItem}
      onPress={() => handleVideoPress(item.id)}
    >
      <Image
        source={{ uri: item.thumbnail }}
        style={styles.thumbnail}
        contentFit="cover"
      />
      <Text style={styles.title} numberOfLines={2}>
        {item.title}
      </Text>
    </Pressable>
  );

  const renderFeaturedVideo = () => (
    <Pressable 
      style={styles.featuredContainer}
      onPress={() => handleVideoPress(videos[0].id)}
    >
      <Image
        source={{ uri: videos[0].thumbnail }}
        style={styles.featuredThumbnail}
        contentFit="cover"
      />
      <Text style={styles.featuredTitle} numberOfLines={3}>
        {videos[0].title}
      </Text>
    </Pressable>
  );

  return (
    <FlatList
      data={videos.slice(1)}
      renderItem={renderVideoItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={styles.row}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
      contentContainerStyle={styles.listContent}
      ListHeaderComponent={renderFeaturedVideo}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  row: {
    gap: 4,
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  videoItem: {
    width: itemWidth,
    marginBottom: Spacing.lg,
  },
  thumbnail: {
    width: itemWidth,
    height: itemWidth * (9 / 16),
    borderRadius: 4,
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: 15,
    fontWeight: "500",
    color: "#000000",
    fontFamily: "Mandali-Regular",
    paddingHorizontal: 2,
  },
  featuredContainer: {
    width: screenWidth,
    marginBottom: Spacing.lg,
  },
  featuredThumbnail: {
    width: screenWidth,
    height: screenWidth * (9 / 16),
    marginBottom: Spacing.sm,
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    fontFamily: "Mandali-Regular",
    paddingHorizontal: Spacing.lg,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666666",
  },
});

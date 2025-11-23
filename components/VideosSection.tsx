import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView, ActivityIndicator, Dimensions } from "react-native";
import { Image } from "expo-image";
import { fetchYouTubeVideos, YouTubeVideo } from "@/utils/youtubeAPI";
import { Spacing } from "@/constants/theme";

const screenWidth = Dimensions.get("window").width;

export default function VideosSection() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVideos = async () => {
      setLoading(true);
      const videosData = await fetchYouTubeVideos(10);
      setVideos(videosData);
      setLoading(false);
    };

    loadVideos();
  }, []);

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

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {videos.map((video) => (
        <View key={video.id} style={styles.videoItem}>
          <Image
            source={{ uri: video.thumbnail }}
            style={styles.thumbnail}
            contentFit="cover"
          />
          <Text style={styles.title} numberOfLines={2}>
            {video.title}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
  },
  videoItem: {
    marginBottom: Spacing.lg,
    paddingLeft: 4,
    paddingRight: Spacing.lg,
  },
  thumbnail: {
    width: screenWidth - 4 - Spacing.lg,
    height: (screenWidth - 4 - Spacing.lg) * (9 / 16),
    borderRadius: 4,
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: 15,
    fontWeight: "500",
    color: "#000000",
    fontFamily: "Mandali-Regular",
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

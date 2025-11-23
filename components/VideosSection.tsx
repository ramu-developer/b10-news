import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList, ActivityIndicator, Dimensions } from "react-native";
import { Image } from "expo-image";
import { fetchYouTubeVideos, YouTubeVideo } from "@/utils/youtubeAPI";
import { Spacing } from "@/constants/theme";

const screenWidth = Dimensions.get("window").width;
const itemWidth = (screenWidth - 20) / 2; // 2 columns with 8px padding each side and 4px gap

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

  const renderVideoItem = ({ item }: { item: YouTubeVideo }) => (
    <View style={styles.videoItem}>
      <Image
        source={{ uri: item.thumbnail }}
        style={styles.thumbnail}
        contentFit="cover"
      />
      <Text style={styles.title} numberOfLines={2}>
        {item.title}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={videos}
      renderItem={renderVideoItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={styles.row}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 8,
    paddingTop: Spacing.sm,
  },
  row: {
    gap: 4,
    justifyContent: "space-between",
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

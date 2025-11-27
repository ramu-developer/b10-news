import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Spacing } from "@/constants/theme";
import { RootStackParamList } from "@/navigation/RootNavigator";

const videoSource = require("@/intro/b10_intro.mp4");

type VideoIntroScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "VideoIntro"
>;

export default function VideoIntroScreen() {
  const navigation = useNavigation<VideoIntroScreenNavigationProp>();
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(true);
  const [hasEnded, setHasEnded] = useState(false);

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = false;
    player.play();
  });

  useEffect(() => {
    const subscription = player.addListener("statusChange", (status) => {
      if (status.status === "readyToPlay") {
        setIsLoading(false);
      }
      if (status.status === "idle" && status.oldStatus === "readyToPlay") {
        setHasEnded(true);
        navigation.replace("Frame02");
      }
    });

    return () => {
      subscription.remove();
    };
  }, [player, navigation]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (player.duration > 0 && player.currentTime >= player.duration - 0.1) {
        navigation.replace("Frame02");
      }
    }, 100);

    return () => clearInterval(interval);
  }, [player, navigation]);

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: 0,
          paddingBottom: 0,
        },
      ]}
    >
      <View style={styles.videoContainer}>
        <VideoView
          player={player}
          style={styles.video}
          contentFit="cover"
          nativeControls={false}
        />

        {isLoading ? (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#FFFFFF" />
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    padding: 0,
    margin: 0,
  },
  videoContainer: {
    width: "80%",
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    padding: 0,
    margin: 0,
    borderWidth: 0,
  },
  video: {
    width: "100%",
    height: "100%",
    padding: 0,
    margin: 0,
    borderWidth: 0,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(33, 150, 243, 0.5)",
  },
});

import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, Pressable } from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { Spacing } from "@/constants/theme";

const videoSource = require("@/intro/b10_intro.mp4");

export default function VideoIntroScreen() {
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
      }
    });

    return () => {
      subscription.remove();
    };
  }, [player]);

  const handleReplay = () => {
    player.replay();
    setHasEnded(false);
  };

  const handleTogglePlayPause = () => {
    if (player.playing) {
      player.pause();
    } else {
      player.play();
    }
  };

  const handleSkip = () => {
    player.pause();
    setHasEnded(true);
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + Spacing.xl,
          paddingBottom: insets.bottom + Spacing.xl,
        },
      ]}
    >
      <View style={styles.videoContainer}>
        <VideoView
          player={player}
          style={styles.video}
          contentFit="contain"
          nativeControls={false}
        />

        {isLoading ? (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#FFFFFF" />
          </View>
        ) : null}

        {hasEnded ? (
          <Pressable style={styles.replayButton} onPress={handleReplay}>
            <View style={styles.replayButtonInner}>
              <Feather name="rotate-cw" size={64} color="#FFFFFF" />
            </View>
          </Pressable>
        ) : null}

        {!isLoading && !hasEnded ? (
          <>
            <Pressable
              style={styles.playPauseOverlay}
              onPress={handleTogglePlayPause}
            >
              <View style={styles.playPauseButton}>
                <Feather
                  name={player.playing ? "pause" : "play"}
                  size={64}
                  color="#FFFFFF"
                />
              </View>
            </Pressable>
            <Pressable
              style={[styles.skipButton, { top: insets.top + Spacing.md }]}
              onPress={handleSkip}
            >
              <View style={styles.skipButtonInner}>
                <Feather name="skip-forward" size={20} color="#FFFFFF" />
              </View>
            </Pressable>
          </>
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
  },
  videoContainer: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  video: {
    width: "100%",
    height: "100%",
    transform: [{ scale: 2 }, { translateX: 0 }],
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(33, 150, 243, 0.5)",
  },
  playPauseOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  playPauseButton: {
    width: 512,
    height: 512,
    borderRadius: 256,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  replayButton: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  replayButtonInner: {
    width: 512,
    height: 512,
    borderRadius: 256,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  skipButton: {
    position: "absolute",
    right: 16,
    zIndex: 10,
  },
  skipButtonInner: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

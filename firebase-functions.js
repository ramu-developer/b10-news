/**
 * FIREBASE CLOUD FUNCTIONS - Auto Notifications
 * Deploy this using Firebase CLI: firebase deploy --only functions
 * 
 * Requirements:
 * - Firebase Project with Realtime Database
 * - YouTube API Key (already have)
 * - Device tokens stored in Firebase
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");

admin.initializeApp();
const db = admin.database();
const messaging = admin.messaging();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = "UCff6g5U72C10-bqm_M1a-lw"; // Your channel ID

/**
 * Cloud Function: Check for new videos every hour
 * Trigger: Cloud Scheduler
 */
exports.checkNewVideos = functions.pubsub
  .schedule("every 1 hours")
  .timeZone("UTC")
  .onRun(async (context) => {
    try {
      console.log("Checking for new videos...");

      // Get latest videos from YouTube
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            key: YOUTUBE_API_KEY,
            channelId: CHANNEL_ID,
            part: "snippet",
            order: "date",
            maxResults: 5,
            type: "video",
          },
        }
      );

      const videos = response.data.items;

      if (!videos || videos.length === 0) {
        console.log("No videos found");
        return;
      }

      // Check if video already notified
      const notifiedRef = db.ref("notifiedVideos");
      const notifiedVideos = await notifiedRef.once("value");
      const notified = notifiedVideos.val() || {};

      // Find new videos
      const newVideos = videos.filter((v) => !notified[v.id.videoId]);

      if (newVideos.length === 0) {
        console.log("No new videos");
        return;
      }

      // Send notification for each new video
      for (const video of newVideos) {
        await sendNotification({
          title: video.snippet.title,
          body: "New video uploaded!",
          videoId: video.id.videoId,
        });

        // Mark as notified
        notified[video.id.videoId] = true;
      }

      // Save notified videos
      await notifiedRef.set(notified);

      console.log(`Sent ${newVideos.length} notifications`);
      return;
    } catch (error) {
      console.error("Error checking videos:", error);
    }
  });

/**
 * Cloud Function: Send notification to all users
 */
async function sendNotification(data) {
  try {
    // Get all device tokens
    const tokensRef = db.ref("deviceTokens");
    const snapshot = await tokensRef.once("value");
    const tokensData = snapshot.val();

    if (!tokensData) {
      console.log("No device tokens found");
      return;
    }

    // Extract tokens from the object
    const tokens = Object.values(tokensData)
      .map((item) => item.token)
      .filter((token) => token);

    if (tokens.length === 0) {
      console.log("No valid tokens");
      return;
    }

    // Send multicast message
    const message = {
      notification: {
        title: data.title,
        body: data.body,
      },
      data: {
        videoId: data.videoId || "",
      },
    };

    const response = await messaging.sendMulticast({
      ...message,
      tokens: tokens,
    });

    console.log(`Sent to ${response.successCount} devices`);
    console.log(`Failed: ${response.failureCount} devices`);

    // Remove invalid tokens
    const invalidTokens = [];
    response.responses.forEach((resp, index) => {
      if (!resp.success) {
        invalidTokens.push(tokens[index]);
      }
    });

    if (invalidTokens.length > 0) {
      console.log("Removing invalid tokens...");
      for (const token of invalidTokens) {
        await tokensRef
          .orderByChild("token")
          .equalTo(token)
          .once("value", (snapshot) => {
            snapshot.ref.remove();
          });
      }
    }
  } catch (error) {
    console.error("Error sending notification:", error);
  }
}

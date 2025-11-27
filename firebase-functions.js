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
const Parser = require("rss-parser");

admin.initializeApp();
const db = admin.database();
const messaging = admin.messaging();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = "UCff6g5U72C10-bqm_M1a-lw"; // Your channel ID
const BLOG_RSS_URL = "https://www.b10vartha.in/feed/"; // Blog RSS feed

/**
 * Cloud Function: Check for new content (YouTube & Blog) every 5 minutes
 * Trigger: Cloud Scheduler
 */
exports.checkNewContent = functions.pubsub
  .schedule("every 5 minutes")
  .timeZone("UTC")
  .onRun(async (context) => {
    try {
      console.log("🔍 Checking for new content (YouTube & Blog)...");

      // Check YouTube videos
      await checkYouTubeVideos();

      // Check Blog posts
      await checkBlogPosts();

      return;
    } catch (error) {
      console.error("❌ Error checking content:", error);
    }
  });

/**
 * Check YouTube for new videos
 */
async function checkYouTubeVideos() {
  try {
    console.log("📺 Checking YouTube videos...");

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
      console.log("No YouTube videos found");
      return;
    }

    // Check if video already notified
    const notifiedRef = db.ref("notifiedVideos");
    const notifiedVideos = await notifiedRef.once("value");
    const notified = notifiedVideos.val() || {};

    // Find new videos
    const newVideos = videos.filter((v) => !notified[v.id.videoId]);

    if (newVideos.length === 0) {
      console.log("No new YouTube videos");
      return;
    }

    // Send notification for each new video
    for (const video of newVideos) {
      await sendNotification({
        title: `▶️ ${video.snippet.title}`,
        body: "New YouTube video uploaded!",
        type: "youtube",
        videoId: video.id.videoId,
        url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
      });

      // Mark as notified
      notified[video.id.videoId] = true;
    }

    // Save notified videos
    await notifiedRef.set(notified);

    console.log(`✅ Sent ${newVideos.length} YouTube notifications`);
  } catch (error) {
    console.error("❌ Error checking YouTube:", error);
  }
}

/**
 * Check Blog for new posts
 */
async function checkBlogPosts() {
  try {
    console.log("📝 Checking blog posts...");

    const parser = new Parser();
    const feed = await parser.parseURL(BLOG_RSS_URL);

    if (!feed.items || feed.items.length === 0) {
      console.log("No blog posts found");
      return;
    }

    // Check if post already notified
    const notifiedRef = db.ref("notifiedBlogPosts");
    const notifiedPosts = await notifiedRef.once("value");
    const notified = notifiedPosts.val() || {};

    // Find new posts
    const newPosts = feed.items.filter((item) => !notified[item.link]);

    if (newPosts.length === 0) {
      console.log("No new blog posts");
      return;
    }

    // Send notification for each new post
    for (const post of newPosts) {
      await sendNotification({
        title: `📰 ${post.title}`,
        body: "New blog post published!",
        type: "blog",
        url: post.link,
        pubDate: post.pubDate,
      });

      // Mark as notified
      notified[post.link] = true;
    }

    // Save notified posts
    await notifiedRef.set(notified);

    console.log(`✅ Sent ${newPosts.length} blog notifications`);
  } catch (error) {
    console.error("❌ Error checking blog:", error);
  }
}

/**
 * Cloud Function: Send notification to all users via Firebase Cloud Messaging topic
 */
async function sendNotification(data) {
  try {
    console.log(`📢 Sending notification: ${data.title}`);

    // Send to all_users topic for instant delivery
    const message = {
      notification: {
        title: data.title,
        body: data.body,
      },
      data: {
        type: data.type || "update",
        url: data.url || "",
        videoId: data.videoId || "",
      },
      topic: "all_users",
    };

    const response = await messaging.send(message);

    console.log(`✅ Notification sent successfully to topic 'all_users':`, response);
  } catch (error) {
    console.error("❌ Error sending notification:", error);
  }
}

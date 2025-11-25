#!/bin/bash

# ============================================================
# B10 News - Automatic Notifications Deployment Script
# Copy-paste this entire script and run it on your computer
# ============================================================

echo "🚀 Starting B10 News Automatic Notifications Setup..."
echo ""

# Get Firebase Project ID
read -p "Enter your Firebase Project ID (from Firebase Console): " PROJECT_ID

# Get YouTube API Key
read -p "Enter your YouTube API Key: " YOUTUBE_API_KEY

# Get Channel ID
read -p "Enter your YouTube Channel ID (default: UCff6g5U72C10-bqm_M1a-lw): " CHANNEL_ID
CHANNEL_ID=${CHANNEL_ID:-UCff6g5U72C10-bqm_M1a-lw}

echo ""
echo "📦 Setting up Firebase Functions..."

# Initialize Firebase if not already done
if [ ! -d "functions" ]; then
    echo "Installing Firebase..."
    npm install -g firebase-tools
    firebase login
    firebase init functions --project=$PROJECT_ID
fi

# Create functions directory if it doesn't exist
mkdir -p functions

# Write package.json for functions
cat > functions/package.json << 'EOF'
{
  "name": "b10-news-functions",
  "description": "B10 News automatic notifications",
  "version": "1.0.0",
  "private": true,
  "engines": {
    "node": "18"
  },
  "dependencies": {
    "firebase-admin": "^11.0.0",
    "firebase-functions": "^4.0.0",
    "axios": "^1.4.0"
  }
}
EOF

# Write the Cloud Function
cat > functions/index.js << 'EOF'
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");

admin.initializeApp();
const db = admin.database();
const messaging = admin.messaging();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.CHANNEL_ID;

// Check for new videos every hour
exports.checkNewVideos = functions.pubsub
  .schedule("every 1 hours")
  .timeZone("UTC")
  .onRun(async (context) => {
    try {
      console.log("🔍 Checking for new videos...");

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

      const videos = response.data.items || [];

      if (videos.length === 0) {
        console.log("❌ No videos found");
        return;
      }

      const notifiedRef = db.ref("notifiedVideos");
      const notifiedSnapshot = await notifiedRef.once("value");
      const notified = notifiedSnapshot.val() || {};

      const newVideos = videos.filter((v) => !notified[v.id.videoId]);

      if (newVideos.length === 0) {
        console.log("✅ No new videos to notify");
        return;
      }

      for (const video of newVideos) {
        await sendNotification({
          title: video.snippet.title,
          body: "New video uploaded!",
          videoId: video.id.videoId,
        });

        notified[video.id.videoId] = true;
      }

      await notifiedRef.set(notified);
      console.log(`✅ Sent ${newVideos.length} notifications`);
    } catch (error) {
      console.error("❌ Error checking videos:", error);
    }
  });

// Send notification to all users
async function sendNotification(data) {
  try {
    const tokensRef = db.ref("deviceTokens");
    const snapshot = await tokensRef.once("value");
    const tokensData = snapshot.val();

    if (!tokensData) {
      console.log("❌ No device tokens found");
      return;
    }

    const tokens = Object.values(tokensData)
      .map((item) => item.token)
      .filter((token) => token);

    if (tokens.length === 0) {
      console.log("❌ No valid tokens");
      return;
    }

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

    console.log(`✅ Sent to ${response.successCount} devices`);

    // Remove invalid tokens
    const invalidTokens = [];
    response.responses.forEach((resp, index) => {
      if (!resp.success) {
        invalidTokens.push(tokens[index]);
      }
    });

    if (invalidTokens.length > 0) {
      for (const token of invalidTokens) {
        const ref = db.ref("deviceTokens");
        const snapshot = await ref
          .orderByChild("token")
          .equalTo(token)
          .once("value");
        if (snapshot.exists()) {
          snapshot.ref.remove();
        }
      }
    }
  } catch (error) {
    console.error("❌ Error sending notification:", error);
  }
}
EOF

echo "✅ Functions created"
echo ""
echo "🔐 Setting environment variables..."

firebase functions:config:set \
  youtube.api_key="$YOUTUBE_API_KEY" \
  youtube.channel_id="$CHANNEL_ID" \
  --project=$PROJECT_ID

echo "✅ Environment variables set"
echo ""
echo "📤 Deploying functions..."

firebase deploy --only functions --project=$PROJECT_ID

echo ""
echo "✅ Functions deployed successfully!"
echo ""
echo "🎯 Next Step: Set up Cloud Scheduler"
echo "1. Go to: https://console.cloud.google.com"
echo "2. Search for 'Cloud Scheduler'"
echo "3. Create a new job:"
echo "   - Name: check-new-videos"
echo "   - Frequency: 0 * * * * (every hour)"
echo "   - HTTP method: POST"
echo "   - URL: Find it in Firebase Console > Functions > checkNewVideos"
echo "   - Add OIDC token with default service account"
echo ""
echo "4. Click Create"
echo ""
echo "✅ Done! Your automatic notifications are now LIVE!"

@echo off
REM ============================================================
REM B10 News - Automatic Notifications Deployment Script (Windows)
REM Simply run this file on Windows
REM ============================================================

setlocal enabledelayedexpansion

echo.
echo 🚀 Starting B10 News Automatic Notifications Setup...
echo.

REM Get Firebase Project ID
set /p PROJECT_ID="Enter your Firebase Project ID (from Firebase Console): "

REM Get YouTube API Key
set /p YOUTUBE_API_KEY="Enter your YouTube API Key: "

REM Get Channel ID
set /p CHANNEL_ID="Enter your YouTube Channel ID (default: UCff6g5U72C10-bqm_M1a-lw): "
if "!CHANNEL_ID!"=="" set CHANNEL_ID=UCff6g5U72C10-bqm_M1a-lw

echo.
echo 📦 Setting up Firebase Functions...
echo.

REM Check if functions directory exists
if not exist "functions" (
    echo Installing Firebase...
    npm install -g firebase-tools
    call firebase login
    call firebase init functions --project=!PROJECT_ID!
)

REM Create functions directory if it doesn't exist
if not exist "functions" mkdir functions

REM Write package.json for functions
(
echo {
echo   "name": "b10-news-functions",
echo   "description": "B10 News automatic notifications",
echo   "version": "1.0.0",
echo   "private": true,
echo   "engines": {
echo     "node": "18"
echo   },
echo   "dependencies": {
echo     "firebase-admin": "^11.0.0",
echo     "firebase-functions": "^4.0.0",
echo     "axios": "^1.4.0"
echo   }
echo }
) > functions\package.json

echo ✅ Created package.json

REM Write the Cloud Function
(
echo const functions = require("firebase-functions");
echo const admin = require("firebase-admin");
echo const axios = require("axios");
echo.
echo admin.initializeApp();
echo const db = admin.database();
echo const messaging = admin.messaging();
echo.
echo const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
echo const CHANNEL_ID = process.env.CHANNEL_ID;
echo.
echo exports.checkNewVideos = functions.pubsub
echo   .schedule("every 1 hours"^)
echo   .timeZone("UTC"^)
echo   .onRun(async (context^) =^> {
echo     try {
echo       console.log("🔍 Checking for new videos..."^);
echo.
echo       const response = await axios.get(
echo         "https://www.googleapis.com/youtube/v3/search",
echo         {
echo           params: {
echo             key: YOUTUBE_API_KEY,
echo             channelId: CHANNEL_ID,
echo             part: "snippet",
echo             order: "date",
echo             maxResults: 5,
echo             type: "video",
echo           },
echo         }
echo       ^);
echo.
echo       const videos = response.data.items ^|^| [];
echo.
echo       if (videos.length === 0^) {
echo         console.log("❌ No videos found"^);
echo         return;
echo       }
echo.
echo       const notifiedRef = db.ref("notifiedVideos"^);
echo       const notifiedSnapshot = await notifiedRef.once("value"^);
echo       const notified = notifiedSnapshot.val() ^|^| {};
echo.
echo       const newVideos = videos.filter((v^) =^> !notified[v.id.videoId]^);
echo.
echo       if (newVideos.length === 0^) {
echo         console.log("✅ No new videos to notify"^);
echo         return;
echo       }
echo.
echo       for (const video of newVideos^) {
echo         await sendNotification({
echo           title: video.snippet.title,
echo           body: "New video uploaded!",
echo           videoId: video.id.videoId,
echo         }^);
echo.
echo         notified[video.id.videoId] = true;
echo       }
echo.
echo       await notifiedRef.set(notified^);
echo       console.log(`✅ Sent $^{newVideos.length} notifications`^);
echo     } catch (error^) {
echo       console.error("❌ Error checking videos:", error^);
echo     }
echo   }^);
echo.
echo async function sendNotification(data^) {
echo   try {
echo     const tokensRef = db.ref("deviceTokens"^);
echo     const snapshot = await tokensRef.once("value"^);
echo     const tokensData = snapshot.val();
echo.
echo     if (!tokensData^) {
echo       console.log("❌ No device tokens found"^);
echo       return;
echo     }
echo.
echo     const tokens = Object.values(tokensData^)
echo       .map((item^) =^> item.token^)
echo       .filter((token^) =^> token^);
echo.
echo     if (tokens.length === 0^) {
echo       console.log("❌ No valid tokens"^);
echo       return;
echo     }
echo.
echo     const message = {
echo       notification: {
echo         title: data.title,
echo         body: data.body,
echo       },
echo       data: {
echo         videoId: data.videoId ^|^| "",
echo       },
echo     };
echo.
echo     const response = await messaging.sendMulticast({
echo       ...message,
echo       tokens: tokens,
echo     }^);
echo.
echo     console.log(`✅ Sent to $^{response.successCount} devices`^);
echo.
echo     const invalidTokens = [];
echo     response.responses.forEach((resp, index^) =^> {
echo       if (!resp.success^) {
echo         invalidTokens.push(tokens[index]^);
echo       }
echo     }^);
echo.
echo     if (invalidTokens.length ^> 0^) {
echo       for (const token of invalidTokens^) {
echo         const ref = db.ref("deviceTokens"^);
echo         const snapshot = await ref
echo           .orderByChild("token"^)
echo           .equalTo(token^)
echo           .once("value"^);
echo         if (snapshot.exists(^)) {
echo           snapshot.ref.remove();
echo         }
echo       }
echo     }
echo   } catch (error^) {
echo     console.error("❌ Error sending notification:", error^);
echo   }
echo }
) > functions\index.js

echo ✅ Cloud Function created

echo.
echo 🔐 Setting environment variables...
echo.

call firebase functions:config:set youtube.api_key="!YOUTUBE_API_KEY!" youtube.channel_id="!CHANNEL_ID!" --project=!PROJECT_ID!

echo ✅ Environment variables set

echo.
echo 📤 Deploying functions...
echo.

call firebase deploy --only functions --project=!PROJECT_ID!

echo.
echo ✅ Functions deployed successfully!
echo.
echo 🎯 Next Step: Set up Cloud Scheduler
echo 1. Go to: https://console.cloud.google.com
echo 2. Search for 'Cloud Scheduler'
echo 3. Create a new job:
echo    - Name: check-new-videos
echo    - Frequency: 0 * * * * (every hour^)
echo    - HTTP method: POST
echo    - URL: Find it in Firebase Console ^> Functions ^> checkNewVideos
echo    - Add OIDC token with default service account
echo.
echo 4. Click Create
echo.
echo ✅ Done! Your automatic notifications are now LIVE!
echo.
pause

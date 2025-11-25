@echo off
REM ============================================================
REM B10 News - Simple Deployment (No Firebase Init Needed)
REM Use this after you've already logged in once
REM ============================================================

setlocal enabledelayedexpansion

set LOG_FILE=deployment-log.txt
echo. > %LOG_FILE%

echo 🚀 B10 News Deployment (Simple Mode)
echo 🚀 B10 News Deployment (Simple Mode) >> %LOG_FILE%
echo.

REM Get Firebase Project ID
set /p PROJECT_ID="Enter your Firebase Project ID: "
echo Project ID: %PROJECT_ID% >> %LOG_FILE%

REM Get YouTube API Key
set /p YOUTUBE_API_KEY="Enter your YouTube API Key: "
echo YouTube API Key: [PROVIDED] >> %LOG_FILE%

REM Get Channel ID
set /p CHANNEL_ID="Enter your YouTube Channel ID (default: UCff6g5U72C10-bqm_M1a-lw): "
if "!CHANNEL_ID!"=="" set CHANNEL_ID=UCff6g5U72C10-bqm_M1a-lw
echo Channel ID: %CHANNEL_ID% >> %LOG_FILE%

echo.
echo 📦 Creating Cloud Functions...
echo.

REM Create functions directory
if not exist "functions" mkdir functions

REM Write package.json
(
echo {
echo   "name": "b10-news-functions",
echo   "description": "B10 News automatic notifications",
echo   "version": "1.0.0",
echo   "private": true,
echo   "engines": { "node": "18" },
echo   "dependencies": {
echo     "firebase-admin": "^11.0.0",
echo     "firebase-functions": "^4.0.0",
echo     "axios": "^1.4.0"
echo   }
echo }
) > functions\package.json

echo ✅ Created package.json

REM Write index.js
(
echo const functions = require("firebase-functions");
echo const admin = require("firebase-admin");
echo const axios = require("axios");
echo admin.initializeApp();
echo const db = admin.database();
echo const messaging = admin.messaging();
echo const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
echo const CHANNEL_ID = process.env.CHANNEL_ID;
echo exports.checkNewVideos = functions.pubsub.schedule("every 1 hours").timeZone("UTC").onRun(async (context^) =^> {
echo   try {
echo     console.log("🔍 Checking YouTube...");
echo     const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
echo       params: { key: YOUTUBE_API_KEY, channelId: CHANNEL_ID, part: "snippet", order: "date", maxResults: 5, type: "video" }
echo     });
echo     const videos = response.data.items ^|^| [];
echo     if (videos.length === 0^) { console.log("No videos"); return; }
echo     const notifiedRef = db.ref("notifiedVideos");
echo     const notifiedSnapshot = await notifiedRef.once("value");
echo     const notified = notifiedSnapshot.val() ^|^| {};
echo     const newVideos = videos.filter((v^) =^> !notified[v.id.videoId]^);
echo     if (newVideos.length === 0^) { console.log("No new videos"); return; }
echo     for (const video of newVideos^) {
echo       const tokens = Object.values((await db.ref("deviceTokens").once("value")).val() ^|^| {}).map(t =^> t.token).filter(t =^> t);
echo       if (tokens.length ^> 0^) {
echo         await messaging.sendMulticast({ notification: { title: video.snippet.title, body: "New video!" }, tokens });
echo       }
echo       notified[video.id.videoId] = true;
echo     }
echo     await notifiedRef.set(notified);
echo     console.log("✅ Notifications sent!");
echo   } catch (error^) { console.error(error); }
echo });
) > functions\index.js

echo ✅ Created Cloud Function

echo.
echo 🔐 Setting Firebase Config...
echo Setting Firebase config... >> %LOG_FILE%

call firebase functions:config:set youtube.api_key="!YOUTUBE_API_KEY!" youtube.channel_id="!CHANNEL_ID!" --project=!PROJECT_ID! >> %LOG_FILE% 2>&1

echo ✅ Firebase Config Set

echo.
echo 📤 Deploying to Firebase...
echo Deploying... >> %LOG_FILE%

call firebase deploy --only functions --project=!PROJECT_ID! >> %LOG_FILE% 2>&1

echo.
echo ✅✅✅ DEPLOYMENT COMPLETE! ✅✅✅
echo ✅✅✅ DEPLOYMENT COMPLETE! ✅✅✅ >> %LOG_FILE%
echo.
echo 🎯 NEXT STEPS (5 minutes):
echo.
echo 1. Open Google Cloud Console:
echo    https://console.cloud.google.com
echo.
echo 2. Search: "Cloud Scheduler"
echo.
echo 3. Click "CREATE JOB" and fill:
echo    Name: check-new-videos
echo    Frequency: 0 * * * * 
echo    Timezone: UTC
echo.
echo 4. Click "CONTINUE"
echo.
echo 5. Under "Execution settings":
echo    HTTP method: POST
echo    URL: (copy from Firebase Console > Functions > checkNewVideos)
echo    Add OIDC token: Default service account
echo.
echo 6. Click "CREATE"
echo.
echo ✅ DONE! Notifications will work automatically!
echo.
echo 📝 Log file: %LOG_FILE%
echo.
pause

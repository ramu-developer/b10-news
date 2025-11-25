@echo off
REM B10 News - FIXED Deployment Script
REM This version fixes the variable substitution issue

setlocal enabledelayedexpansion

set LOG_FILE=deployment-log.txt
echo. > %LOG_FILE%
echo Deployment started at %date% %time% >> %LOG_FILE%

cls
echo.
echo =========================================
echo  B10 NEWS - DEPLOYMENT FIXED
echo =========================================
echo.

REM Get Firebase Project ID
set /p PROJECT_ID="Enter Firebase Project ID: "
echo Project ID: %PROJECT_ID% >> %LOG_FILE%

REM Get YouTube API Key
set /p YOUTUBE_API_KEY="Enter YouTube API Key: "
echo YouTube Key: Provided >> %LOG_FILE%

REM Get Channel ID
set /p CHANNEL_ID="Enter Channel ID (or press Enter): "
if "!CHANNEL_ID!"=="" set CHANNEL_ID=UCff6g5U72C10-bqm_M1a-lw
echo Channel ID: %CHANNEL_ID% >> %LOG_FILE%

echo.
echo Creating functions directory...
if not exist "functions" mkdir functions

echo Creating package.json...
(
echo {
echo   "name": "b10-news-functions",
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

echo ✅ package.json created

echo Creating index.js...
(
echo const functions = require("firebase-functions");
echo const admin = require("firebase-admin");
echo const axios = require("axios");
echo admin.initializeApp();
echo const db = admin.database();
echo const messaging = admin.messaging();
echo exports.checkNewVideos = functions.pubsub.schedule("every 1 hours").timeZone("UTC").onRun(async (context^) =^> {
echo   try {
echo     console.log("Checking YouTube...");
echo     const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
echo       params: {
echo         key: process.env.YOUTUBE_API_KEY,
echo         channelId: process.env.CHANNEL_ID,
echo         part: "snippet",
echo         order: "date",
echo         maxResults: 5,
echo         type: "video"
echo       }
echo     });
echo     const videos = response.data.items ^|^| [];
echo     if (videos.length === 0^) return;
echo     const notifiedRef = db.ref("notifiedVideos");
echo     const snapshot = await notifiedRef.once("value");
echo     const notified = snapshot.val() ^|^| {};
echo     const newVideos = videos.filter(v =^> !notified[v.id.videoId]^);
echo     if (newVideos.length === 0^) return;
echo     for (const video of newVideos^) {
echo       const tokensSnapshot = await db.ref("deviceTokens").once("value");
echo       const tokensData = tokensSnapshot.val() ^|^| {};
echo       const tokens = Object.values(tokensData^).map(t =^> t.token).filter(t =^> t);
echo       if (tokens.length ^> 0^) {
echo         await messaging.sendMulticast({
echo           notification: { title: video.snippet.title, body: "New video!" },
echo           tokens
echo         });
echo       }
echo       notified[video.id.videoId] = true;
echo     }
echo     await notifiedRef.set(notified);
echo     console.log("Success!");
echo   } catch (error^) { console.error(error); }
echo });
) > functions\index.js

echo ✅ index.js created

echo.
echo Installing dependencies...
cd functions
call npm install >> ..\%LOG_FILE% 2>&1
cd ..
echo ✅ Dependencies installed

echo.
echo Setting Firebase configuration...

REM THIS IS THE FIX - Use proper variable expansion
firebase functions:config:set youtube.api_key="%YOUTUBE_API_KEY%" youtube.channel_id="%CHANNEL_ID%" --project=%PROJECT_ID% >> %LOG_FILE% 2>&1

if errorlevel 1 (
    echo ❌ Config Failed - Check log >> %LOG_FILE%
    echo ❌ Config Failed
    goto ERROR
)
echo ✅ Configuration set

echo.
echo Deploying Cloud Functions...
firebase deploy --only functions --project=%PROJECT_ID% >> %LOG_FILE% 2>&1

if errorlevel 1 (
    echo ❌ Deployment Failed >> %LOG_FILE%
    echo ❌ Deployment Failed
    goto ERROR
)

echo.
echo ✅✅✅ DEPLOYMENT SUCCESSFUL! ✅✅✅
echo ✅✅✅ DEPLOYMENT SUCCESSFUL! ✅✅✅ >> %LOG_FILE%
echo.
echo NEXT: Set up Cloud Scheduler
echo 1. Go to: https://console.cloud.google.com
echo 2. Search: Cloud Scheduler
echo 3. Click: CREATE JOB
echo 4. Name: check-new-videos
echo 5. Frequency: 0 * * * *
echo 6. HTTP method: POST
echo 7. URL: Get from Firebase Console > Functions > checkNewVideos
echo.
echo Press any key to close...
pause > nul
exit /b 0

:ERROR
echo ❌ DEPLOYMENT FAILED >> %LOG_FILE%
echo Check log file: %LOG_FILE%
echo.
echo Press any key to close...
pause > nul
exit /b 1

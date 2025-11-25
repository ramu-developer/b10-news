@echo off
REM ============================================================
REM B10 News - FINAL Deployment (With Error Handling)
REM This version will NOT close until you press a key
REM ============================================================

setlocal enabledelayedexpansion

set LOG_FILE=deployment-log.txt
echo. > %LOG_FILE%
echo Deployment started at %date% %time% >> %LOG_FILE%
echo. >> %LOG_FILE%

cls
echo.
echo =========================================
echo  B10 NEWS - AUTOMATIC NOTIFICATIONS
echo =========================================
echo.
echo This window will STAY OPEN until deployment finishes!
echo All messages will be saved to: %LOG_FILE%
echo.

REM Get Firebase Project ID
set /p PROJECT_ID="Enter Firebase Project ID: "
echo Project ID: %PROJECT_ID% >> %LOG_FILE%

REM Get YouTube API Key
set /p YOUTUBE_API_KEY="Enter YouTube API Key: "
echo YouTube Key: Provided >> %LOG_FILE%

REM Get Channel ID (default)
set /p CHANNEL_ID="Enter Channel ID (or press Enter for default): "
if "!CHANNEL_ID!"=="" set CHANNEL_ID=UCff6g5U72C10-bqm_M1a-lw
echo Channel ID: %CHANNEL_ID% >> %LOG_FILE%

echo.
echo Creating Cloud Functions...
echo Creating Cloud Functions... >> %LOG_FILE%
echo.

REM Create functions directory
if not exist "functions" (
    mkdir functions
    echo Created functions directory >> %LOG_FILE%
)

REM Create package.json
(
echo {
echo   "name": "b10-news-functions",
echo   "version": "1.0.0",
echo   "description": "B10 News notifications",
echo   "private": true,
echo   "engines": { "node": "18" },
echo   "dependencies": {
echo     "firebase-admin": "^11.0.0",
echo     "firebase-functions": "^4.0.0",
echo     "axios": "^1.4.0"
echo   }
echo }
) > functions\package.json

echo ✅ package.json created >> %LOG_FILE%
echo ✅ package.json created

REM Create index.js (compressed for CMD compatibility)
echo Creating index.js... >> %LOG_FILE%
echo Creating index.js...

(
echo const functions = require("firebase-functions");
echo const admin = require("firebase-admin");
echo const axios = require("axios");
echo.
echo admin.initializeApp();
echo const db = admin.database();
echo const messaging = admin.messaging();
echo.
echo exports.checkNewVideos = functions.pubsub.schedule("every 1 hours").timeZone("UTC").onRun(async (context^) =^> {
echo   try {
echo     console.log("Checking YouTube channel for new videos...");
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
echo.
echo     const videos = response.data.items ^|^| [];
echo     if (videos.length === 0^) { console.log("No videos found"); return; }
echo.
echo     const notifiedRef = db.ref("notifiedVideos");
echo     const snapshot = await notifiedRef.once("value");
echo     const notified = snapshot.val() ^|^| {};
echo.
echo     const newVideos = videos.filter(v =^> !notified[v.id.videoId]^);
echo     if (newVideos.length === 0^) { console.log("No new videos"); return; }
echo.
echo     for (const video of newVideos^) {
echo       try {
echo         const tokensSnapshot = await db.ref("deviceTokens").once("value");
echo         const tokensData = tokensSnapshot.val() ^|^| {};
echo         const tokens = Object.values(tokensData^).map(t =^> t.token).filter(t =^> t);
echo.
echo         if (tokens.length ^> 0^) {
echo           await messaging.sendMulticast({
echo             notification: {
echo               title: video.snippet.title,
echo               body: "New video uploaded!"
echo             },
echo             tokens: tokens
echo           });
echo           console.log(`Sent notification for: ${video.snippet.title}`);
echo         }
echo       } catch (err^) {
echo         console.error("Error sending notification:", err);
echo       }
echo       notified[video.id.videoId] = true;
echo     }
echo.
echo     await notifiedRef.set(notified);
echo     console.log(`Success! Processed ${newVideos.length} new videos`);
echo   } catch (error^) {
echo     console.error("Fatal error:", error.message);
echo   }
echo });
) > functions\index.js

echo ✅ index.js created >> %LOG_FILE%
echo ✅ index.js created

echo.
echo Installing dependencies... >> %LOG_FILE%
echo Installing dependencies...
echo.

cd functions
call npm install >> ..\%LOG_FILE% 2>&1
if errorlevel 1 (
    echo ❌ NPM Install Failed >> ..\%LOG_FILE%
    echo ❌ NPM Install Failed
    cd ..
    goto ERROR
)
echo ✅ Dependencies installed >> ..\%LOG_FILE%
echo ✅ Dependencies installed
cd ..

echo.
echo Setting Firebase configuration... >> %LOG_FILE%
echo Setting Firebase configuration...
echo.

call firebase functions:config:set youtube.api_key="!YOUTUBE_API_KEY!" youtube.channel_id="!CHANNEL_ID!" --project=!PROJECT_ID! >> %LOG_FILE% 2>&1
if errorlevel 1 (
    echo ❌ Config Set Failed >> %LOG_FILE%
    echo ❌ Config Set Failed
    goto ERROR
)
echo ✅ Configuration set >> %LOG_FILE%
echo ✅ Configuration set

echo.
echo Deploying Cloud Functions... >> %LOG_FILE%
echo Deploying Cloud Functions...
echo This may take 2-3 minutes...
echo.

call firebase deploy --only functions --project=!PROJECT_ID! >> %LOG_FILE% 2>&1
if errorlevel 1 (
    echo ❌ Deployment Failed >> %LOG_FILE%
    echo ❌ Deployment Failed
    goto ERROR
)

echo.
echo ✅✅✅ DEPLOYMENT SUCCESSFUL! ✅✅✅
echo ✅✅✅ DEPLOYMENT SUCCESSFUL! ✅✅✅ >> %LOG_FILE%
echo.
echo ===============================================
echo  NEXT: Set up Cloud Scheduler (5 minutes)
echo ===============================================
echo.
echo 1. Go to: https://console.cloud.google.com
echo 2. Search: Cloud Scheduler
echo 3. Click: CREATE JOB
echo 4. Fill in:
echo    - Name: check-new-videos
echo    - Frequency: 0 * * * * 
echo    - Timezone: UTC
echo.
echo 5. Click: CONTINUE
echo.
echo 6. Under Execution settings:
echo    - HTTP method: POST
echo    - URL: (from Firebase Console > Functions > checkNewVideos)
echo    - Add OIDC token with default service account
echo.
echo 7. Click: CREATE
echo.
echo ✅ DONE! Your notifications are now LIVE!
echo.
echo Log file: %LOG_FILE%
echo.
goto END

:ERROR
echo.
echo ===============================================
echo  ❌ DEPLOYMENT FAILED
echo ===============================================
echo.
echo Check the log file: %LOG_FILE%
echo.
echo Send this log to support if you need help!
echo.

:END
echo Press any key to close this window...
pause > nul

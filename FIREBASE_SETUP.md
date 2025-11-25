# 🚀 Firebase Automatic Notifications Setup

## What This Does
- Automatically checks your YouTube channel every 1 hour for new videos
- When new video found → sends notification to ALL users automatically
- Users click notification → opens app
- No manual work needed!

---

## Step 1: Set Up Firebase Project

1. Go to: https://console.firebase.google.com
2. Select your **B10 News** project
3. Click **"Realtime Database"** in left sidebar
4. Create database if not exists (Start in test mode)
5. Enable **Cloud Messaging** (already enabled)
6. Enable **Cloud Functions** (left sidebar)

---

## Step 2: Install Firebase CLI

```bash
npm install -g firebase-tools
firebase login
firebase init functions
```

---

## Step 3: Copy Cloud Function Code

1. Navigate to `firebase/functions/` directory
2. Replace `index.js` with code from `/firebase-functions.js` in this project
3. Update `package.json` in functions folder to include:

```json
{
  "dependencies": {
    "firebase-admin": "^11.0.0",
    "firebase-functions": "^4.0.0",
    "axios": "^1.4.0"
  }
}
```

---

## Step 4: Set Environment Variables

```bash
firebase functions:config:set youtube.api_key="YOUR_YOUTUBE_API_KEY"
```

Or in `.env.yaml`:
```yaml
youtube:
  api_key: YOUR_YOUTUBE_API_KEY
```

---

## Step 5: Deploy Functions

```bash
firebase deploy --only functions
```

---

## Step 6: Set Up Cloud Scheduler

1. Go to Google Cloud Console: https://console.cloud.google.com
2. Search for "Cloud Scheduler"
3. Click **"Create Job"**
4. Name: `check-new-videos`
5. Frequency: `0 * * * *` (every hour)
6. Timezone: Your timezone
7. HTTP method: POST
8. URL: `https://REGION-PROJECT_ID.cloudfunctions.net/checkNewVideos`
   - Find this URL in Firebase Console → Functions
9. Authentication: Add OIDC token
10. Service account: Default App Engine service account
11. Click **Create**

---

## Step 7: Test Setup

1. Upload new video to YouTube
2. Wait 1 hour (or manually trigger function from Firebase Console)
3. Users with app installed should get notification! ✅

---

## Database Structure

Your Firebase should have:

```
root/
├── deviceTokens/
│   ├── token_1: { token: "ExponentPushToken[...]", timestamp: ... }
│   ├── token_2: { token: "ExponentPushToken[...]", timestamp: ... }
├── notifiedVideos/
│   ├── videoId_1: true
│   ├── videoId_2: true
```

---

## Troubleshooting

**Notifications not sending?**
- Check Cloud Function logs in Firebase Console
- Verify device tokens are stored in Database
- Check YouTube API quota

**Videos not detected?**
- Verify YouTube API Key is correct
- Check Channel ID: `UCff6g5U72C10-bqm_M1a-lw`
- Manually trigger function and check logs

---

## Cost

- ✅ First 2M invocations/month: FREE
- ✅ Cloud Scheduler: FREE (3 jobs)
- ✅ Cloud Messaging: FREE (unlimited)

**Total: ZERO COST** 🎉

---

## Next Steps

1. Install Firebase CLI on your computer
2. Deploy the Cloud Function
3. Set up Cloud Scheduler
4. Test by uploading a video
5. Get automatic notifications!

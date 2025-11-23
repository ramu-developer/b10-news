# Firebase Web SDK Setup for B10 News App

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"**
3. Project name: `B10News`
4. Select a location (closest to your users)
5. Click **"Create project"**
6. Wait for the project to be created

## Step 2: Register Web App

1. In Firebase Console, click the **Web icon** (</> symbol)
2. App nickname: `B10News Web`
3. Check **"Also set up Firebase Hosting for this app"** (optional)
4. Click **"Register app"**
5. You'll see your Firebase config - **COPY THIS ENTIRE BLOCK**

The config looks like:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "b10news-xxxxx.firebaseapp.com",
  projectId: "b10news-xxxxx",
  storageBucket: "b10news-xxxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456",
  measurementId: "G-XXXXXX"
};
```

## Step 3: Add Firebase Credentials to Replit

1. Open the **"Secrets"** tab in Replit (right sidebar)
2. Add these environment variables:
   - `EXPO_PUBLIC_FIREBASE_API_KEY` = `AIzaSy...` (from apiKey)
   - `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN` = `b10news-xxxxx.firebaseapp.com` (from authDomain)
   - `EXPO_PUBLIC_FIREBASE_PROJECT_ID` = `b10news-xxxxx` (from projectId)
   - `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET` = `b10news-xxxxx.appspot.com` (from storageBucket)
   - `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` = `123456789` (from messagingSenderId)
   - `EXPO_PUBLIC_FIREBASE_APP_ID` = `1:123456789:web:abcdef123456` (from appId)
   - `EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID` = `G-XXXXXX` (from measurementId)

## Step 4: Enable Firebase Services

1. In Firebase Console, go to **"Build"** section
2. Enable:
   - **Analytics** (required for crash reporting)
   - **Performance Monitoring** (recommended)
   - **Crashlytics** (optional but recommended)

## Step 5: Verify Setup

Once you've added the environment variables:
1. The app will restart automatically
2. Firebase will initialize on app launch
3. You should see console logs:
   - "Firebase Analytics initialized"
   - "Firebase Performance Monitoring initialized"

## Step 6: Monitor Crashes and Analytics

1. Go to Firebase Console → **Analytics**
2. View real-time user events
3. Go to **Crashlytics** to see crash reports (if enabled)
4. Go to **Performance** to see app performance metrics

## Troubleshooting

**Issue**: Firebase not initializing
- Check that all 7 environment variables are set correctly
- Verify there are no typos in the variable names
- Make sure they all start with `EXPO_PUBLIC_`

**Issue**: Environment variables not showing in app
- Restart the app after adding secrets
- Clear browser cache if testing on web

**Issue**: Analytics not showing data
- Wait 5-10 minutes for first events to appear
- Make sure Analytics is enabled in Firebase Console

## What This Enables

✅ **Crash Reporting** - Automatically detects and reports app crashes  
✅ **Analytics** - Tracks user engagement and behavior  
✅ **Performance Monitoring** - Monitors app performance metrics  
✅ **Play Store Requirement** - Meets Google's pre-launch testing requirements  

## Environment Variables Reference

```bash
# Copy these from your Firebase Console config
EXPO_PUBLIC_FIREBASE_API_KEY=<your-api-key>
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=<your-auth-domain>
EXPO_PUBLIC_FIREBASE_PROJECT_ID=<your-project-id>
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=<your-storage-bucket>
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<your-messaging-sender-id>
EXPO_PUBLIC_FIREBASE_APP_ID=<your-app-id>
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=<your-measurement-id>
```

## Firebase Files in Your App

- `src/config/firebaseConfig.ts` - Firebase initialization (handles secure environment variable loading)
- Firebase will automatically track crashes, analytics, and performance

No additional code needed - Firebase runs in the background!

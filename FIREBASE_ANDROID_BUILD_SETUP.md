# Firebase Android Setup for Expo Build

## Step 1: You Already Have google-services.json

The file you downloaded contains all Firebase credentials for your Android app:
- Package name: `com.b10news.app`
- Project ID: `b10-news`
- API Key: Already stored in Replit Secrets

## Step 2: Configure Expo to Use google-services.json

### Option A: Using EAS Build (Recommended for Play Store)

1. Create `eas.json` in your project root:

```json
{
  "build": {
    "production": {
      "android": {
        "buildType": "apk"
      },
      "ios": {
        "buildType": "archive"
      }
    }
  },
  "cli": {
    "version": ">= 5.0.0"
  }
}
```

2. Create `android/app/google-services.json`:
   - Copy the `google-services.json` file you downloaded from Firebase
   - Place it exactly at: `android/app/google-services.json`
   - This file contains your Firebase credentials

3. Update `app.json` to reference Firebase plugin:

Add this to the `"plugins"` array in app.json:
```json
[
  "react-native-firebase/analytics",
  "react-native-firebase/app"
]
```

4. Build command:
```bash
eas build --platform android --release
```

### Option B: Store google-services.json in Replit Secrets (Safer)

If you don't want to commit the file to git:

1. Go to Replit Secrets tab
2. Create a new secret: `GOOGLE_SERVICES_JSON`
3. Paste the **entire contents** of your google-services.json file
4. Create `app.json.js` preprocessor (for Expo config):

```javascript
const fs = require('fs');
const path = require('path');

// Create google-services.json from environment variable if needed
if (process.env.GOOGLE_SERVICES_JSON && !fs.existsSync(path.join(__dirname, 'android/app/google-services.json'))) {
  fs.mkdirSync(path.join(__dirname, 'android'), { recursive: true });
  fs.mkdirSync(path.join(__dirname, 'android/app'), { recursive: true });
  fs.writeFileSync(
    path.join(__dirname, 'android/app/google-services.json'),
    process.env.GOOGLE_SERVICES_JSON
  );
}

module.exports = require('./app.json');
```

## Step 3: Firebase Plugin Configuration

Your `app.json` should have:

```json
{
  "expo": {
    "plugins": [
      ["expo-build-properties", {
        "android": {
          "compileSdkVersion": 35,
          "targetSdkVersion": 35,
          "minSdkVersion": 21
        }
      }],
      "@react-native-firebase/app",
      "@react-native-firebase/analytics"
    ]
  }
}
```

## Step 4: Before You Build

✅ Verify these are in place:
- `android/app/google-services.json` exists (with your Firebase credentials)
- Firebase packages installed: `npm list | grep firebase`
- Environment variables set: All 5 Firebase secrets in Replit Secrets
- `app.json` has Firebase plugins configured

## Step 5: Build for Android

### Local Development (Expo Go):
```bash
npm run dev
# Scan QR code with Expo Go app
```

### Production Build (Google Play Store):
```bash
eas build --platform android --release
```

This will:
1. Use your google-services.json for Firebase config
2. Build a signed APK/AAB for Play Store
3. Enable Crashlytics for crash reporting
4. Enable Analytics for user tracking

## Troubleshooting

**Issue**: "google-services.json not found"
- Make sure file is at: `android/app/google-services.json` (exact path)
- Not at: `android/google-services.json` or `google-services.json`

**Issue**: Firebase not initializing
- Verify all 5 Firebase secrets are set in Replit
- Run `npm run dev` to test locally first

**Issue**: Crashlytics not reporting
- Wait 5+ minutes after app crash
- Go to Firebase Console → Crashlytics to see reports

## Files You Need

1. **google-services.json** - From Firebase Console (you already have this)
2. **eas.json** - Configuration for Expo Build Service
3. **app.json** - Already configured with Firebase plugins
4. **Environment variables** - Already set in Replit Secrets

**That's it!** Your Android app is configured for Firebase integration.

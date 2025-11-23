# Firebase Setup Guide for B10News App - Play Store Submission

## Overview
Firebase is compulsory for Play Store submission. This guide will walk you through adding Firebase to your B10News app.

## Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" → Name it "B10News"
3. Enable Google Analytics (optional but recommended)
4. Click "Create project"

## Step 2: Register Android App
1. In Firebase Console, click the Android icon
2. Package name: `com.b10news.app`
3. App nickname: "B10News Android"
4. Click "Register app"
5. **Download `google-services.json` file**
6. Place it in: `android/app/google-services.json`

## Step 3: Register iOS App
1. In Firebase Console, click the iOS icon
2. Bundle ID: `com.b10news.app`
3. App nickname: "B10News iOS"
4. Click "Register app"
5. **Download `GoogleService-Info.plist` file**
6. Place it in: `ios/GoogleService-Info.plist`

## Step 4: Add Firebase to app.json

```json
{
  "expo": {
    "plugins": [
      [
        "expo-build-properties",
        {
          "android": {
            "compileSdkVersion": 34,
            "targetSdkVersion": 34,
            "minSdkVersion": 21
          },
          "ios": {
            "deploymentTarget": "13.0"
          }
        }
      ],
      [
        "react-native-firebase",
        {
          "crashlyticsCollectionEnabled": true,
          "analyticsCollectionEnabled": true
        }
      ]
    ]
  }
}
```

## Step 5: Install Firebase Packages

```bash
npm install @react-native-firebase/app @react-native-firebase/crashlytics @react-native-firebase/analytics
```

## Step 6: Initialize Firebase in App.tsx

```typescript
import { initializeApp } from '@react-native-firebase/app';
import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';

// Initialize Firebase
initializeApp();

// Enable crash reporting
crashlytics().setCrashlyticsCollectionEnabled(true);

// Enable analytics
analytics().setAnalyticsCollectionEnabled(true);
```

## Step 7: Enable Firebase Services in Console
1. Go to Firebase Console
2. Left sidebar → "Crashlytics" → Enable it
3. Left sidebar → "Analytics" → Enable it
4. Configure your privacy policy to mention Firebase data collection

## What You Get
✅ **Crash Reporting** - Automatically tracks and reports app crashes
✅ **Analytics** - Understand user behavior and engagement
✅ **Play Store Requirement** - Meets mandatory Firebase requirement
✅ **Pre-launch Reports** - Use Firebase Crashlytics in Play Console's pre-launch testing

## Play Store Submission Checklist
- ✅ SDK 34 configured (already done in app.json)
- ⬜ Firebase Crashlytics initialized
- ⬜ Privacy Policy added (mentioning Firebase data collection)
- ⬜ Data Safety Form filled in Play Console
- ⬜ Screenshots don't contain metadata spam
- ⬜ App description avoids banned keywords ("Best", "Top", "Trending", etc.)

## Important Notes
- Firebase requires real `google-services.json` and `GoogleService-Info.plist` from your Firebase project
- These files contain your project credentials - never commit them to git
- Add these files to `.gitignore`:
  ```
  android/app/google-services.json
  ios/GoogleService-Info.plist
  ```

## Common Issues
**Issue**: Firebase package not found
**Solution**: Make sure packages are installed and rebuild the app

**Issue**: App crashes on startup
**Solution**: Check that google-services.json is in the correct location

**Issue**: Crashlytics not showing crashes
**Solution**: Wait 5-10 minutes for first crash report to appear in Firebase Console

## Next Steps After Firebase Setup
1. Test app thoroughly with real devices
2. Use Firebase Console to verify crash reporting works
3. Fill Data Safety form in Play Console mentioning Firebase
4. Submit app for review

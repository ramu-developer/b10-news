# B10 News - Android App Project

## Project Overview
Multi-frame Expo mobile application for B10 News (Telugu news app) targeting Android Play Store submission with Firebase integration, YouTube videos, and category-based news browsing.

**Current Status:** Production-Ready for Play Store Submission ✅

## Architecture & Components

### Screens (Frames)
1. **VideoIntroScreen** - Intro video with auto-transition to Frame 02
2. **Frame02Screen** - Main news interface with YouTube videos in 2-column grid
3. **Frame03Screen** - Slide-in menu with categories and options
4. **Frame04Screen** - In-app browser for B10 Vartha website
5. **PrivacyPolicyScreen** - Privacy Policy display (accessible from menu)

### Key Features
- Telugu categories with navigation
- YouTube API integration (200 videos)
- Firebase integration (Crashlytics + Analytics)
- In-app Privacy Policy
- Share functionality
- Category-based navigation

## Technical Configuration

### SDK & Version
- **Target SDK:** 35 (Android 15) - Google Play Store requirement
- **Min SDK:** 21 (Android 5.0)
- **Expo:** Latest version with React Native
- **React Compiler:** Enabled

### Security & Secrets
All API keys stored in Replit Secrets:
- `EXPO_PUBLIC_FIREBASE_API_KEY`
- `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `EXPO_PUBLIC_FIREBASE_PROJECT_ID`
- `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `EXPO_PUBLIC_YOUTUBE_API_KEY`
- `SESSION_SECRET`

### Firebase Configuration
- `android/app/google-services.json` - Downloaded and placed
- Firebase Web SDK configured
- Crashlytics for crash reporting
- Analytics for user tracking

## Privacy Policy
- **In-App:** Accessible from menu (Frame03)
- **Website:** https://www.b10vartha.in/privacy (Published in Blogger)
- **Contact Email:** sekharbyiram@gmail.com
- **Last Updated:** November 23, 2025

## Build Configuration
- `eas.json` - Expo build service configuration
- `app.json` - App metadata and plugins

## User Preferences
- Contact Email: sekharbyiram@gmail.com
- App Name: B10 News
- Bundle ID: com.b10news.app
- Package Name: com.b10news.app

## Files Structure
```
/src
  /screens
    - VideoIntroScreen.tsx
    - Frame02Screen.tsx
    - Frame03Screen.tsx
    - Frame04Screen.tsx
    - PrivacyPolicyScreen.tsx
  /navigation
    - RootNavigator.tsx
  /constants
    - theme.ts
  /utils
    - youtubeAPI.ts
  /components
    - ErrorBoundary.tsx
/android
  /app
    - google-services.json
/assets
  - icon.png
  - splash-icon.png
  - Mandali-Regular.ttf
/app.json
/eas.json
/PRIVACY_POLICY_TEMPLATE.md
/FIREBASE_ANDROID_BUILD_SETUP.md
```

## Completed Tasks
✅ Security audit - API keys stored in Replit Secrets
✅ SDK 35 configuration - Android 15 for Play Store compliance
✅ Firebase integration - Crashlytics + Analytics
✅ google-services.json - Downloaded and placed in android/app/
✅ Privacy Policy - Created in-app screen + website link
✅ Build configuration - eas.json ready
✅ App running - All screens working, YouTube videos fetching

## Next Steps for Play Store Submission
1. Build for Android: `eas build --platform android --release`
2. Submit APK/AAB to Google Play Console
3. Fill Data Safety form (Firebase + YouTube)
4. App review by Google

# B10 News APK Build & Play Store Deployment Guide

## ⚡ Quick Start (3 Steps)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "B10 News app ready for Play Store"
git remote add origin https://github.com/YOUR_USERNAME/b10-news.git
git branch -M main
git push -u origin main
```

### Step 2: Get Expo Token
1. Go to https://expo.dev/
2. Sign up or log in
3. Go to Account Settings → Personal Account → Generate token
4. Copy the token

### Step 3: Add GitHub Secret
1. Go to your GitHub repo
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Name: `EXPO_TOKEN`
5. Value: Paste your Expo token
6. Click "Add secret"

---

## 🔑 Android Signing Keys Setup (IMPORTANT!)

### Option A: Let EAS Handle Signing (RECOMMENDED)
```bash
npm install -g eas-cli
eas login
eas build:configure --platform android
# Follow the prompts - EAS will generate signing keys automatically
```

### Option B: Existing Signing Key
If you already have a keystore file:
```bash
eas secrets:create --name KEYSTORE_BASE64 --value @your-keystore.jks
eas secrets:create --name KEYSTORE_PASSWORD
eas secrets:create --name KEYSTORE_KEY_ALIAS
eas secrets:create --name KEYSTORE_KEY_PASSWORD
```

---

## 🚀 Build Process

### Automatic (GitHub Actions)
1. Push code to main branch
2. GitHub Actions automatically triggers build
3. When complete, download APK from "Actions" tab
4. APK appears as artifact

### Manual (Local)
```bash
npm install -g eas-cli
eas login
eas build --platform android
```

---

## 📋 Pre-Build Checklist

Before building, verify:

- [ ] Firebase Cloud Functions deployed (for notifications to work)
  ```bash
  firebase deploy --only functions --project=b10-news
  ```

- [ ] app.json has correct bundle ID: `com.b10news.app`

- [ ] All environment variables set:
  - `EXPO_PUBLIC_FIREBASE_API_KEY`
  - `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN`
  - `EXPO_PUBLIC_FIREBASE_PROJECT_ID`
  - `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET`
  - `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`

- [ ] Version number incremented in app.json

---

## 📱 Testing Before Play Store

1. Download APK from build artifact
2. Install on Android device:
   ```bash
   adb install -r path/to/app.apk
   ```
3. Test all features:
   - ✅ Intro video plays
   - ✅ YouTube videos load
   - ✅ News feed displays
   - ✅ Slide menu works
   - ✅ In-app browser opens links
   - ✅ Notifications received (if Cloud Functions deployed)

---

## 🏪 Google Play Store Submission

### 1. Create Google Play Developer Account
- Go to https://play.google.com/console
- Pay $25 registration fee
- Complete account setup

### 2. Create New App
1. Click "Create app"
2. App name: "B10 News"
3. Default language: English
4. App category: News & Magazines
5. Complete mandatory questionnaire

### 3. Upload APK
1. Go to "Release" → "Production"
2. Click "Create new release"
3. Upload your signed APK file
4. Fill in release notes

### 4. App Store Listing
1. Complete "App details"
   - Screenshots (min 2, max 8)
   - Feature graphic
   - Promo video (optional)
   
2. Complete "Content rating"
   - Fill questionnaire
   - Get content rating

3. Complete "Pricing & distribution"
   - Select countries
   - Price (free or paid)

### 5. Review & Publish
- Google reviews your app (24-48 hours typically)
- If approved → goes live in Play Store
- If rejected → follow guidelines and resubmit

---

## 🔄 Build Troubleshooting

### Build fails with "No credentials"
```bash
eas build:configure --platform android
# Follow prompts to set up signing
```

### Build fails with "Invalid token"
1. Go to GitHub repo Settings → Secrets
2. Delete old `EXPO_TOKEN`
3. Create new one from https://expo.dev/
4. Re-add to GitHub

### Build takes too long
- Normal: 10-20 minutes
- Can be queued if many builds running
- Check status at https://expo.dev/builds

---

## 📝 Important Notes

1. **Cloud Functions** - Notifications won't work until Cloud Functions deployed
2. **Signing Keys** - Keep safe, needed for future updates
3. **Version Updates** - Always increment `versionCode` in app.json before rebuilding
4. **Bundle ID** - Never change after first submission (already set to `com.b10news.app`)

---

## 🆘 Need Help?

- Expo docs: https://docs.expo.dev
- EAS Build: https://docs.expo.dev/build/setup
- Play Store: https://developer.android.com/distribute/play-console

---

## ✅ Final Checklist Before Release

- [ ] Cloud Functions deployed for automatic notifications
- [ ] All Firebase env vars configured
- [ ] App tested on real Android device
- [ ] Screenshots prepared
- [ ] Privacy policy prepared
- [ ] Version number updated
- [ ] Release notes written
- [ ] Signing keys secured

**Ready to build? Run:** `git push` to trigger GitHub Actions build!

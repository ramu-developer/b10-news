# Build APK on GitHub (No Expo Quota Used)

This workflow builds your APK directly on GitHub servers without using Expo's cloud builds. **You only needed Expo token for EAS - now you don't need it!**

---

## ⚡ 4-Step Setup

### Step 1: Create Android Signing Keystore
Run this command on your computer (Windows/Mac/Linux):

```bash
keytool -genkey -v -keystore b10-news.keystore -alias b10newskey -keyalg RSA -keysize 2048 -validity 10000
```

When prompted:
- **Keystore password:** (create a strong password, remember it)
- **Key password:** (same or different, remember it)
- **First/Last name:** Your name
- **Organization:** B10 News
- **State/Province:** Your state
- **Country Code:** Your country code (US, IN, etc.)

This creates a file: `b10-news.keystore` (keep it safe!)

---

### Step 2: Convert Keystore to Base64
Run this command:

**On Mac/Linux:**
```bash
base64 -i b10-news.keystore
```

**On Windows (PowerShell):**
```powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes('b10-news.keystore'))
```

**Copy the entire output** - you'll need it next.

---

### Step 3: Add Secrets to GitHub
1. Go to: Your GitHub repo → Settings → Secrets and variables → Actions
2. Create **4 new secrets:**

| Secret Name | Value |
|-------------|-------|
| `ANDROID_KEYSTORE_BASE64` | Paste the base64 output from Step 2 |
| `ANDROID_KEY_ALIAS` | `b10newskey` |
| `ANDROID_KEY_PASSWORD` | The password you created in Step 1 |
| `ANDROID_KEYSTORE_PASSWORD` | The keystore password from Step 1 |

**Example screenshot:**
```
Name: ANDROID_KEYSTORE_BASE64
Value: MIIFMzCCBBugAwIBAgIJA... (very long string)
```

---

### Step 4: Push to GitHub
```bash
git init
git add .
git commit -m "B10 News - Ready for APK build on GitHub"
git remote add origin https://github.com/YOUR_USERNAME/b10-news.git
git branch -M main
git push -u origin main
```

**Done!** Your APK will automatically build on GitHub. Check progress here: Your repo → Actions tab

---

## 📥 Download Your APK

1. Go to your GitHub repo
2. Click on **"Actions"** tab
3. Find the latest build (green checkmark = success)
4. Click on it → Scroll down to "Artifacts"
5. Download **B10-News-signed.apk**

**That's your Play Store APK!** ✅

---

## 🔄 Build Again (Next Month/New Version)

1. Update version in `app.json`:
   ```json
   "version": "1.0.1"
   ```

2. Push to GitHub:
   ```bash
   git add .
   git commit -m "v1.0.1"
   git push
   ```

3. GitHub automatically builds again (no Expo quota used!)

---

## 🆘 Troubleshooting

### Build fails with "Invalid signature"
- Check your keystore password matches exactly
- Base64 encoding may have extra spaces - copy cleanly

### Build fails with "Java/Android SDK"
- Workflow automatically installs them - try again

### APK not in Artifacts
- Check build logs for errors
- Most common: wrong keystore password

---

## 📱 Before Play Store Submission

1. **Test the APK:**
   - Download APK from GitHub
   - Install: `adb install B10-News-signed.apk`
   - Test all features

2. **Deploy Cloud Functions** (for notifications):
   ```bash
   firebase deploy --only functions --project=b10-news
   ```

3. **Screenshot preparation:**
   - 3+ screenshots of your app
   - 1 feature graphic (1024x500px)

4. **Update app.json with version:**
   ```json
   "version": "1.0.0"
   ```

---

## ✅ You're All Set!

No Expo quota needed. GitHub builds your APK for free every time you push.

**Current Status:**
- ✅ Expo Android builds: USED UP (15/15)
- ✅ GitHub APK builds: UNLIMITED & FREE
- ✅ Play Store ready: YES

**Next: Push to GitHub and watch it build!** 🚀

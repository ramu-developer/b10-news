# Complete APK Build Instructions - B10 News

## Prerequisites (One-Time Setup)

### 1. Install Java
- Download from: https://www.oracle.com/java/technologies/downloads/#java21
- Install and restart computer
- Verify: Open PowerShell and run `java -version`

### 2. Create Android Keystore (One-Time)
Open PowerShell and run:
```bash
& "C:\Program Files\Java\jdk-21\bin\keytool.exe" -genkey -v -keystore b10-news.keystore -alias b10newskey -keyalg RSA -keysize 2048 -validity 10000 -keypass B10News@2025 -storepass B10News@2025 -dname "CN=ramu, OU=B10 News, L=Allagadda, ST=Andhra Pradesh, C=IN"
```

Result: `b10-news.keystore` file created in `C:\WINDOWS\system32\`

### 3. Convert Keystore to Base64 Code (One-Time)
Open PowerShell and run:
```powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("C:\WINDOWS\system32\b10-news.keystore")) | Set-Clipboard
```

### 4. Add GitHub Secrets (One-Time)
Go to: https://github.com/ramu-developer/b10-news/settings/secrets/actions

Add these 4 secrets:

| Name | Value |
|------|-------|
| `ANDROID_KEYSTORE_BASE64` | Paste from Clipboard (Ctrl+V) |
| `ANDROID_KEY_ALIAS` | `b10newskey` |
| `ANDROID_KEY_PASSWORD` | `B10News@2025` |
| `ANDROID_KEYSTORE_PASSWORD` | `B10News@2025` |

---

## BUILD APK (Every Time You Make Changes)

### Step 1: Make Changes in Replit
1. Open Replit → Your B10 News project
2. Make your code changes (add features, fix bugs, etc.)
3. Test in the app

### Step 2: Copy Project Files to GitHub
1. Open Replit
2. Right-click your project name
3. Click **"Download as ZIP"**
4. Extract the ZIP to a temporary folder

### Step 3: Upload to Local GitHub Folder
1. Navigate to: `C:\Users\Windows\OneDrive\Documents\GitHub\b10-news`
2. Delete ALL files in this folder
3. Copy ALL extracted files and paste into `b10-news` folder
4. When asked "Replace files?", click **"Replace the files in the destination"**

### Step 4: Commit to GitHub
Open PowerShell and run:
```powershell
cd "C:\Users\Windows\OneDrive\Documents\GitHub\b10-news"
git add .
git commit -m "Update B10 News - [describe your changes]"
git push origin main
```

Example: `git commit -m "Update B10 News - Add dark mode feature"`

### Step 5: Trigger Build on GitHub Actions
1. Go to: https://github.com/ramu-developer/b10-news/actions
2. You'll see new workflows appear
3. Click on ANY failed build (red one)
4. Click **"Re-run jobs"** button
5. **Wait 15-20 minutes** for build to complete

### Step 6: Wait for Green Checkmark
- 🟡 Orange = Building (wait)
- 🟢 Green = Done ✅
- 🔴 Red = Failed (something wrong)

### Step 7: Download APK
1. When you see 🟢 **GREEN checkmark**, click on that build
2. Scroll down to **"Artifacts"** section
3. Click **"B10-News-signed.apk"** to download
4. Save to your computer

**Your APK is ready!** 📱

---

## If Build Fails ❌

### Check Error Message
1. Click the failed build
2. Scroll down to **"Annotations"** section
3. Read the error message

### Common Solutions
1. **Yarn error**: Make sure files are properly uploaded
2. **Java error**: Java not installed (run `java -version` to check)
3. **Gradle error**: Try re-running the build again
4. **Keystore error**: Check if GitHub secrets are correct

### Retry Build
1. Click the failed build
2. Click **"Re-run jobs"**
3. Wait 15-20 minutes again

---

## Quick Reference

### File Upload Command
```powershell
cd "C:\Users\Windows\OneDrive\Documents\GitHub\b10-news"
git add .
git commit -m "Your message here"
git push origin main
```

### Build Link
https://github.com/ramu-developer/b10-news/actions

### GitHub Secrets Link
https://github.com/ramu-developer/b10-news/settings/secrets/actions

### Download Folder
`C:\Users\Windows\Downloads\` (or wherever you save downloads)

---

## Summary (Quick Checklist)

- [ ] Make changes in Replit
- [ ] Download ZIP from Replit
- [ ] Extract ZIP
- [ ] Copy files to `C:\Users\Windows\OneDrive\Documents\GitHub\b10-news`
- [ ] Replace existing files
- [ ] Open PowerShell in that folder
- [ ] Run: `git add .`
- [ ] Run: `git commit -m "Your message"`
- [ ] Run: `git push origin main`
- [ ] Go to GitHub Actions
- [ ] Click failed build
- [ ] Click "Re-run jobs"
- [ ] Wait 15-20 minutes
- [ ] Download APK when 🟢 Green

---

## Important Notes

✅ **Always use the same GitHub username:** `ramu-developer`
✅ **Always push to:** `main` branch
✅ **Keystore password:** `B10News@2025`
✅ **Alias:** `b10newskey`
✅ **Build time:** 15-20 minutes typically
✅ **APK location:** In Artifacts section on GitHub Actions

---

**You're all set!** 🎉 Save this file for future reference!

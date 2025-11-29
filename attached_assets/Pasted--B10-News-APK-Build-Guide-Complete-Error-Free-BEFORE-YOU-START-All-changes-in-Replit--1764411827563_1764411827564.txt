# B10 News - APK Build Guide (Complete & Error-Free)

## BEFORE YOU START
- ✅ All changes in Replit are DONE
- ✅ App is working fine in Replit
- ✅ You have Java 21 installed
- ✅ GitHub secrets are already set (NO NEED TO SET AGAIN)

---

## STEP 1: Download Project from Replit
**Location:** https://replit.com

1. Open your **B10 News project** in Replit
2. Look at top-right corner of Replit
3. Click the **3-dot menu** (⋯)
4. Click **"Download as ZIP"**
5. **Wait** until download completes
6. The file will be named: `b10-news.zip`
7. Save it in your **Downloads** folder

---

## STEP 2: Extract the ZIP File
1. Open **File Explorer**
2. Go to **Downloads** folder
3. Right-click on **`b10-news.zip`**
4. Click **"Extract All..."**
5. Click **"Extract"**
6. **Wait** for extraction to finish
7. You'll see a new folder: **`b10-news`** (or similar name)

---

## STEP 3: Copy ALL Files to GitHub Folder
**IMPORTANT: Do this EXACTLY!**

1. Open **File Explorer**
2. Navigate to: `C:\Users\Windows\OneDrive\Documents\GitHub\b10-news`
3. **DELETE ALL FILES** in this folder:
   - Select ALL (Ctrl+A)
   - Delete (Delete key)
   - Click "Yes" to confirm
   - The folder should be **EMPTY**

4. Go back to **Downloads** folder
5. Open the extracted **`b10-news`** folder
6. Select **ALL FILES** inside (Ctrl+A)
7. **Copy** them (Ctrl+C)
8. Go to: `C:\Users\Windows\OneDrive\Documents\GitHub\b10-news`
9. **Paste** them (Ctrl+V)
10. When asked **"Replace?"**, click **"Replace the files in the destination"**
11. **Wait** for all files to copy

---

## STEP 4: Open PowerShell in GitHub Folder
1. Open **File Explorer**
2. Navigate to: `C:\Users\Windows\OneDrive\Documents\GitHub\b10-news`
3. **Right-click** in empty space (NOT on files)
4. Click **"Open PowerShell here"**
5. PowerShell window will open

---

## STEP 5: Commit Changes to GitHub
**In PowerShell, copy-paste EACH line one by one:**

### Line 1: Add all files
```
git add .
```
Press **Enter**, wait for it to finish

### Line 2: Commit with message
```
git commit -m "B10 News Update - Removed play button, updated app icon, fixed splash timing"
```
Press **Enter**, wait for it to finish

### Line 3: Push to GitHub
```
git push origin main
```
Press **Enter**, **wait** (this may take 1-2 minutes)

**If successful**, you'll see messages in green ✅

---

## STEP 6: Go to GitHub Actions
1. Open Browser
2. Go to: **https://github.com/ramu-developer/b10-news/actions**
3. Look at the list of builds

---

## STEP 7: Wait for Build to Appear
1. You should see a **NEW build** at the top
2. Look at the status:
   - 🟡 **ORANGE** = Building (WAIT 15-20 minutes)
   - 🟢 **GREEN** = Done ✅
   - 🔴 **RED** = Failed (contact me)

---

## STEP 8: Wait for GREEN Checkmark
**Do NOT do anything!** 
- **Build takes 15-20 minutes**
- You can check back in 15 minutes
- When you see 🟢 **GREEN**, continue to next step

---

## STEP 9: Download APK When Build is Done
1. Go to: **https://github.com/ramu-developer/b10-news/actions**
2. Click on the build with **GREEN checkmark** ✅
3. Scroll down to bottom
4. Look for **"Artifacts"** section
5. Click **"B10-News-signed.apk"**
6. APK will download
7. Save it in **Downloads** folder

---

## STEP 10: Test APK on Your Phone
1. Connect Android phone to computer (USB cable)
2. Enable **Developer Mode** on phone (if not already done)
3. Transfer APK to phone
4. On phone: Open **Settings** → **Apps**
5. Enable **"Unknown Sources"** (if asked)
6. Open **File Manager** on phone
7. Find and tap the APK
8. Click **"Install"**
9. Done! App is installed

---

## SUMMARY CHECKLIST
- [ ] Downloaded ZIP from Replit
- [ ] Extracted ZIP
- [ ] Deleted old files in GitHub folder
- [ ] Copied new files to GitHub folder
- [ ] Opened PowerShell in GitHub folder
- [ ] Ran: `git add .`
- [ ] Ran: `git commit -m "..."`
- [ ] Ran: `git push origin main`
- [ ] Went to GitHub Actions
- [ ] Waited 15-20 minutes for GREEN checkmark
- [ ] Clicked GREEN build
- [ ] Downloaded APK from Artifacts
- [ ] Tested on phone

---

## COMMON MISTAKES TO AVOID

❌ **WRONG**: Forgetting to delete old files before copying
✅ **RIGHT**: Delete all files first, then copy new ones

❌ **WRONG**: Not waiting for build to finish
✅ **RIGHT**: Wait for GREEN checkmark (15-20 minutes)

❌ **WRONG**: Downloading APK before build is done
✅ **RIGHT**: Only download when you see GREEN checkmark

❌ **WRONG**: Copying files to wrong folder
✅ **RIGHT**: Always use: `C:\Users\Windows\OneDrive\Documents\GitHub\b10-news`

---

## IF BUILD FAILS (🔴 RED)

1. Go to the failed build
2. Scroll down to **"Annotations"** section
3. Read the error message
4. Copy the error and send it to me
5. Do NOT re-run yet

---

## YOUR APK IS NOW READY! 🎉

Next time you need to rebuild:
1. Just follow **STEP 1 to STEP 10** again
2. That's it!

---

## NEED HELP?
- If anything is confusing, ask me BEFORE you start
- If build fails, show me the error message
- If APK doesn't work, let me know what happens

**Good luck! You got this!** 🚀

import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

let deviceToken: string | null = null;
let notificationListener: any = null;
let responseListener: any = null;

// Initialize Firebase (safe to call multiple times)
let firebaseApp: any = null;
let database: any = null;

function initializeFirebase() {
  try {
    if (!firebaseApp) {
      const firebaseConfig = {
        apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      };
      
      firebaseApp = initializeApp(firebaseConfig);
      database = getDatabase(firebaseApp);
    }
    return { firebaseApp, database };
  } catch (error) {
    console.log("Firebase init (expected on web):", error);
    return { firebaseApp: null, database: null };
  }
}

export async function initializeNotifications() {
  try {
    // Get push token
    const token = await Notifications.getExpoPushTokenAsync({
      projectId: "da9193a0-9f66-4f74-a545-bf4649c23bca",
    });

    if (token?.data) {
      deviceToken = token.data;
      console.log("✅ Device token obtained:", token.data);

      // Initialize Firebase
      const { database: db } = initializeFirebase();

      // Store token in Firebase Database automatically
      if (db) {
        try {
          const tokensRef = ref(db, "deviceTokens");
          await push(tokensRef, {
            token: token.data,
            timestamp: Date.now(),
            platform: "expo",
          });
          console.log("✅ Token stored in Firebase Database");
        } catch (dbError) {
          console.log("Could not store token (Firebase may be limited):", dbError);
        }
      }
    }

    // Request notification permissions
    try {
      await Notifications.requestPermissionsAsync();
    } catch (permError) {
      console.log("Permission request:", permError);
    }
  } catch (error) {
    console.error("Notification init error:", error);
  }
}

export function setupNotificationListeners() {
  try {
    // Handle notification received while app is running
    if (typeof Notifications.addNotificationReceivedListener === "function") {
      notificationListener = Notifications.addNotificationReceivedListener(
        (notification) => {
          console.log("✅ Notification received:", notification.request.content.title);
        }
      );
    }

    // Handle notification tap
    if (typeof Notifications.addNotificationResponseReceivedListener === "function") {
      responseListener = Notifications.addNotificationResponseReceivedListener(
        (response) => {
          console.log("👆 Notification tapped!");
        }
      );
    }
  } catch (error) {
    console.log("Setting up listeners:", error);
  }

  return () => {
    try {
      if (notificationListener?.remove) {
        notificationListener.remove();
      }
      if (responseListener?.remove) {
        responseListener.remove();
      }
    } catch (error) {
      console.log("Error cleaning up:", error);
    }
  };
}

export function getDeviceToken(): string | null {
  return deviceToken;
}

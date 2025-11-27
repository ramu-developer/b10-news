import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";
import { getMessaging, onMessage } from "firebase/messaging";

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
let messaging: any = null;

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
      
      // Initialize Firebase Cloud Messaging for notifications from NotifyHound
      try {
        messaging = getMessaging(firebaseApp);
        console.log("✅ Firebase Cloud Messaging initialized");
      } catch (messagingError) {
        console.log("FCM init (expected on web/Expo):", messagingError);
      }
    }
    return { firebaseApp, database, messaging };
  } catch (error) {
    console.log("Firebase init (expected on web):", error);
    return { firebaseApp: null, database: null, messaging: null };
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
      const { database: db, messaging: msg } = initializeFirebase();

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

      // Subscribe to all_users topic to receive NotifyHound notifications
      if (msg) {
        try {
          await msg.subscribeToTopic("all_users");
          console.log("✅ Subscribed to 'all_users' topic - Ready for NotifyHound notifications!");
        } catch (topicError) {
          console.log("Could not subscribe to topic (expected on some platforms):", topicError);
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
    // Handle Firebase Cloud Messaging notifications from NotifyHound
    const { messaging: msg } = initializeFirebase();
    if (msg && typeof onMessage === "function") {
      try {
        onMessage(msg, (payload) => {
          console.log("🔔 FCM Message received from NotifyHound:", payload);
          const { title, body } = payload.notification || {};
          const { type, url, source } = payload.data || {};
          
          console.log("📢 Notification details:", {
            title,
            body,
            type,
            url,
            source,
          });
        });
      } catch (fcmError) {
        console.log("FCM listener setup (expected on some platforms):", fcmError);
      }
    }

    // Handle notification received while app is running
    if (typeof Notifications.addNotificationReceivedListener === "function") {
      notificationListener = Notifications.addNotificationReceivedListener(
        (notification) => {
          const { title, body, data } = notification.request.content;
          console.log("✅ Notification received:", {
            title,
            body,
            data,
          });
          
          // Process notification data from NotifyHound service
          if (data) {
            console.log("📰 Content detected:", {
              type: data.type,
              url: data.url,
              source: data.source,
            });
          }
        }
      );
    }

    // Handle notification tap/response
    if (typeof Notifications.addNotificationResponseReceivedListener === "function") {
      responseListener = Notifications.addNotificationResponseReceivedListener(
        (response) => {
          const { data, body } = response.notification.request.content;
          console.log("👆 Notification tapped!", {
            body,
            data,
          });
          
          // Handle action based on notification data from NotifyHound service
          if (data?.url) {
            console.log("🔗 Opening URL:", data.url);
            // Navigation will be handled by app routing
          }
          if (data?.type === "youtube") {
            console.log("▶️ YouTube video detected");
          }
          if (data?.type === "blog") {
            console.log("📝 Blog post detected");
          }
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

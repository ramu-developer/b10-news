import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

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

export async function initializeNotifications() {
  try {
    // Try to get push token (works on Android/iOS)
    try {
      const token = await Notifications.getExpoPushTokenAsync({
        projectId: "da9193a0-9f66-4f74-a545-bf4649c23bca",
      });

      if (token?.data) {
        deviceToken = token.data;
        console.warn("================================================");
        console.warn("✅ FIREBASE NOTIFICATION TOKEN READY!");
        console.warn("================================================");
        console.warn(token.data);
        console.warn("================================================");
        console.warn("Copy the token above and use it to send test notifications from Firebase Console");
        console.warn("================================================");
      }
    } catch (tokenError) {
      console.log("Token generation (expected on web):", tokenError);
    }

    // Request notification permissions for Android
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      console.log("Notification permission status:", status);
    } catch (permError) {
      console.log("Permission request error (expected on web):", permError);
    }
  } catch (error) {
    console.error("Error in notification setup:", error);
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
    console.log("Setting up listeners (expected limitation on web):", error);
  }

  return () => {
    try {
      if (notificationListener && typeof notificationListener.remove === "function") {
        notificationListener.remove();
      }
      if (responseListener && typeof responseListener.remove === "function") {
        responseListener.remove();
      }
    } catch (error) {
      console.log("Error removing listeners:", error);
    }
  };
}

export function getDeviceToken(): string | null {
  return deviceToken;
}

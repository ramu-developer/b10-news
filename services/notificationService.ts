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

export async function initializeNotifications() {
  try {
    // Get device push token (works on Android/iOS, limited on web)
    const token = await Notifications.getExpoPushTokenAsync({
      projectId: "da9193a0-9f66-4f74-a545-bf4649c23bca",
    });

    if (token.data) {
      deviceToken = token.data;
      
      // Show token in console - copy this for Firebase!
      console.warn("======================================");
      console.warn("📱 YOUR FCM TOKEN (Copy this!):");
      console.warn(token.data);
      console.warn("======================================");
      
      // Also try to request notification permissions
      try {
        await Notifications.requestPermissionsAsync();
      } catch (e) {
        console.log("Notification permission request:", e);
      }
    }
  } catch (error) {
    console.error("Error getting token:", error);
  }
}

export function setupNotificationListeners() {
  // Handle notification received while app is running
  const notificationListener = Notifications.addNotificationReceivedListener(
    (notification) => {
      console.log("✅ Notification received:", notification);
    }
  );

  // Handle notification tap
  const responseListener =
    Notifications.addNotificationResponseReceivedListener((response) => {
      console.log("👆 Notification tapped:", response);
    });

  return () => {
    Notifications.removeNotificationSubscription(notificationListener);
    Notifications.removeNotificationSubscription(responseListener);
  };
}

export function getDeviceToken(): string | null {
  return deviceToken;
}

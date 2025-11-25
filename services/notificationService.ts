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
    // Request notification permissions
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      console.log("Notification permissions not granted");
      return;
    }

    // Get device push token
    const token = await Notifications.getExpoPushTokenAsync({
      projectId: "da9193a0-9f66-4f74-a545-bf4649c23bca",
    });

    if (token.data) {
      deviceToken = token.data;
      console.log("FCM Token registered:", token.data);
      
      // Log to console for user to copy
      if (typeof window !== "undefined") {
        console.warn(
          "📱 COPY THIS TOKEN FOR FIREBASE: " + token.data
        );
      }
    }
  } catch (error) {
    console.error("Error initializing notifications:", error);
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

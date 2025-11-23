import { initializeApp, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getPerformance } from "firebase/performance";

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let app: any;
let analytics: any;
let performance: any;

try {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);

  // Initialize Analytics (if supported on this platform)
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
      console.log("Firebase Analytics initialized");
    }
  });

  // Initialize Performance Monitoring
  performance = getPerformance(app);
  console.log("Firebase Performance Monitoring initialized");
} catch (error) {
  console.warn("Firebase initialization warning:", error);
}

export { app, analytics, performance };

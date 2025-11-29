import React from "react";
import { View, StyleSheet, ScrollView, Pressable, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/navigation/RootNavigator";
import { Colors, Spacing, Typography } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";

export default function PrivacyPolicyScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: Colors.background }]}>
      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top + Spacing.lg,
            paddingLeft: Spacing.lg,
            paddingRight: Spacing.lg,
            paddingBottom: Spacing.lg,
          },
        ]}
      >
        <Pressable onPress={handleBackPress}>
          <Feather name="arrow-left" size={24} color={Colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{
          paddingHorizontal: Spacing.lg,
          paddingBottom: insets.bottom + Spacing.lg,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Privacy Policy for B10 News</Text>
        <Text style={styles.lastUpdated}>Last Updated: November 29, 2025</Text>

        <Section title="1. Introduction">
          <Text style={styles.text}>
            B10 News ("we," "us," "our," or "Company") operates the B10 News mobile application (the "App"). This Privacy Policy explains our practices regarding the collection, use, and disclosure of information through the App and how we safeguard your privacy.
          </Text>
        </Section>

        <Section title="2. Information We Collect">
          <Subsection title="2.1 Information You Provide">
            <Bullet text="Search history: When you search for news or categories" />
            <Bullet text="View history: Which news articles and videos you view" />
            <Bullet text="Preferences: Your selected news categories and preferences" />
          </Subsection>

          <Subsection title="2.2 Automatically Collected Information">
            <Bullet text="Device information: Device type, operating system, unique identifiers" />
            <Bullet text="Usage data: How you interact with the App (features used, time spent)" />
            <Bullet text="Location data: General location based on IP address (not precise location)" />
            <Bullet text="Analytics data: App performance, crashes, and user behavior" />
            <Bullet text="Push notification token: A unique identifier used to send you news alerts" />
          </Subsection>

          <Subsection title="2.3 Third-Party Services">
            <Text style={[styles.text, { fontWeight: "600", marginTop: Spacing.md }]}>
              Firebase Analytics & Crashlytics:
            </Text>
            <Bullet text="Google Firebase collects usage data and crash reports" />
            <Bullet text="Data includes: app interactions, performance metrics, device info" />

            <Text style={[styles.text, { fontWeight: "600", marginTop: Spacing.md }]}>
              YouTube API:
            </Text>
            <Bullet text="When you view YouTube videos in the App" />
            <Bullet text="YouTube collects viewing data per their privacy policy" />

            <Text style={[styles.text, { fontWeight: "600", marginTop: Spacing.md }]}>
              Push Notifications & NotifyHound:
            </Text>
            <Bullet text="We send push notifications to notify you about new content" />
            <Bullet text="Your device token is registered with our notification service" />
            <Bullet text="NotifyHound service monitors RSS feeds for new YouTube videos and blog posts" />
            <Bullet text="Notifications are sent through Expo Push Notification service" />
          </Subsection>

          <Subsection title="2.4 Push Notifications">
            <Text style={[styles.text, { fontWeight: "600", marginTop: Spacing.md }]}>
              Push Notification Service:
            </Text>
            <Bullet text="We collect your device's push notification token (Expo Push Token)" />
            <Bullet text="This token is used solely to send you news alerts about new content" />
            <Bullet text="Your token is stored on our secure notification server" />
            <Bullet text="You can disable notifications anytime in your device settings" />

            <Text style={[styles.text, { fontWeight: "600", marginTop: Spacing.md }]}>
              Data Collected:
            </Text>
            <Bullet text="Device push token (anonymous identifier)" />
            <Bullet text="Device ID (for token management)" />
            <Bullet text="No personal information is linked to your notification token" />
          </Subsection>
        </Section>

        <Section title="3. How We Use Your Information">
          <Bullet text="Provide and improve the App's functionality" />
          <Bullet text="Understand user behavior and preferences" />
          <Bullet text="Fix technical issues and app crashes (via Firebase Crashlytics)" />
          <Bullet text="Comply with legal obligations" />
          <Bullet text="Send important updates about the App" />
          <Bullet text="Send push notifications for new news articles and videos" />
        </Section>

        <Section title="4. Data Sharing">
          <Bullet text="Firebase: Your data is shared with Google Firebase for analytics and crash reporting" />
          <Bullet text="YouTube: Your viewing data is shared with YouTube when you access videos" />
          <Bullet text="Expo: Your push notification token is shared with Expo for notification delivery" />
          <Bullet text="Expo Push Service: Your push token is sent through Expo's push notification service to deliver alerts" />
          <Bullet text="NotifyHound: RSS feed data is processed through NotifyHound service for content monitoring" />
          <Bullet text="Third-party service providers: Only as necessary for app functionality" />
          <Bullet text="Legal requirements: We may share data if required by law" />
        </Section>

        <Section title="5. Data Security">
          <Bullet text="We use industry-standard security measures to protect your information" />
          <Bullet text="Your data is encrypted in transit using HTTPS/TLS" />
          <Bullet text="Firebase provides security measures per Google's security standards" />
          <Bullet text="Push notification tokens are stored securely on our servers" />
          <Bullet text="No method of transmission over the internet is 100% secure" />
        </Section>

        <Section title="6. Data Retention">
          <Bullet text="Usage analytics: Retained for 14 months (Firebase default)" />
          <Bullet text="Crash reports: Retained for troubleshooting purposes" />
          <Bullet text="Search history: Stored locally on your device" />
          <Bullet text="Push notification tokens: Retained until you uninstall the app or disable notifications" />
          <Bullet text="You can clear app data anytime from device settings" />
        </Section>

        <Section title="7. Your Rights">
          <Text style={styles.text}>You have the right to:</Text>
          <Bullet text="Access your personal information" />
          <Bullet text="Request correction of inaccurate data" />
          <Bullet text="Request deletion of your data" />
          <Bullet text="Opt out of analytics collection" />
          <Bullet text="Disable push notifications in device settings" />
          <Text style={[styles.text, { marginTop: Spacing.md, fontWeight: "600" }]}>
            To exercise these rights or for data deletion requests, contact: sekharbyiram@gmail.com
          </Text>
        </Section>

        <Section title="8. Children's Privacy">
          <Text style={styles.text}>
            The App is not intended for children under 13. We do not knowingly collect information from children under 13. If we become aware of such collection, we will delete the data immediately.
          </Text>
        </Section>

        <Section title="9. Contact Information">
          <Text style={styles.text}>
            Email: sekharbyiram@gmail.com{"\n"}
            Website: https://www.b10vartha.in
          </Text>
        </Section>

        <Section title="10. Policy Changes">
          <Text style={styles.text}>
            We may update this Privacy Policy periodically. Changes will be effective upon posting to the App. Your continued use of the App constitutes acceptance of the updated Privacy Policy.
          </Text>
        </Section>

        <View style={{ height: Spacing.lg }} />
      </ScrollView>
    </View>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={{ marginBottom: Spacing.lg }}>
      <Text style={styles.subheading}>{title}</Text>
      {children}
    </View>
  );
}

function Subsection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={{ marginBottom: Spacing.md }}>
      <Text style={styles.subsubheading}>{title}</Text>
      {children}
    </View>
  );
}

function Bullet({ text }: { text: string }) {
  return (
    <View style={styles.bulletContainer}>
      <Text style={styles.bulletPoint}>•</Text>
      <Text style={styles.bulletText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
  },
  content: {
    flex: 1,
    paddingTop: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  lastUpdated: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
  subheading: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  subsubheading: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  bulletContainer: {
    flexDirection: "row",
    marginBottom: Spacing.sm,
  },
  bulletPoint: {
    fontSize: 14,
    color: Colors.text,
    marginRight: Spacing.sm,
    marginTop: 3,
  },
  bulletText: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.text,
    flex: 1,
  },
});

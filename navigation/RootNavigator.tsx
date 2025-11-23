import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VideoIntroScreen from "@/screens/VideoIntroScreen";
import Frame02Screen from "@/screens/Frame02Screen";
import Frame03Screen from "@/screens/Frame03Screen";
import Frame04Screen from "@/screens/Frame04Screen";
import PrivacyPolicyScreen from "@/screens/PrivacyPolicyScreen";

export type RootStackParamList = {
  VideoIntro: undefined;
  Frame02: undefined;
  Frame03: undefined;
  Frame04: { url?: string };
  PrivacyPolicy: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="VideoIntro" component={VideoIntroScreen} />
      <Stack.Screen name="Frame02" component={Frame02Screen} />
      <Stack.Screen 
        name="Frame03" 
        component={Frame03Screen}
        options={{
          presentation: "transparentModal",
          animation: "slide_from_left",
        }}
      />
      <Stack.Screen name="Frame04" component={Frame04Screen} />
      <Stack.Screen 
        name="PrivacyPolicy" 
        component={PrivacyPolicyScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

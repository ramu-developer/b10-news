import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VideoIntroScreen from "@/screens/VideoIntroScreen";
import Frame02Screen from "@/screens/Frame02Screen";

export type RootStackParamList = {
  VideoIntro: undefined;
  Frame02: undefined;
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
    </Stack.Navigator>
  );
}

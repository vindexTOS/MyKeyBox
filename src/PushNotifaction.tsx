import React, { useState, useEffect } from "react";
import { Button, Platform } from "react-native";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  return (
    <Button
      title="Press to Send Notification"
      onPress={async () => {
        await sendPushNotification();
      }}
    />
  );
}

async function sendPushNotification() {
  const message = {
    sound: "default",
    title: "Demo Notification",
    body: "This is a test notification",
    data: { someData: "goes here" },
  };

  await Notifications.scheduleNotificationAsync({
    content: message,
    trigger: null, // trigger immediately
  });
}

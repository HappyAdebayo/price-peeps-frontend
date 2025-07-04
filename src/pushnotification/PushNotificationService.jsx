// pushNotificationService.js
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { useApi } from './hooks/useApi'; // If you're using your custom hook

const { request } = useApi();

export async function registerForPushNotificationsAsync() {
  let token;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus.status;

  if (finalStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    alert('Failed to get push token for notifications!');
    return;
  }

  token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log('Expo Push Token:', token);

  const { status, data } = await request('/save-device-token', 'POST', { token });

  if (status === 200) {
    console.log('Token saved successfully:', data);
  } else {
    console.error('Error saving token:', data);
  }

  return token;
}

// Function to set up notification listeners
export function setupNotificationListeners(setNotification, setNotificationData) {
  // Foreground notification listener
  const foregroundSubscription = Notifications.addNotificationReceivedListener(notification => {
    setNotification(true);
    setNotificationData(notification.request.content);
    console.log("Foreground Notification:", notification);
  });

  // Background notification listener
  const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(response => {
    setNotification(true);
    setNotificationData(response.notification.request.content);
    console.log("Background Notification Response:", response);
  });

  // Cleanup function for listeners
  return () => {
    foregroundSubscription.remove();
    backgroundSubscription.remove();
  };
}

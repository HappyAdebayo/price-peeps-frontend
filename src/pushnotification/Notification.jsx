import * as Notifications from 'expo-notifications';
import { useApi } from '../hooks/useApi';

const { request } = useApi();

export async function RegisterForPushNotificationsAsync() {
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

  // Send token to your backend
  const { status, data } = await request('/save-device-token', 'POST', { token });

  if (status === 200) {
    console.log('Token saved successfully:', data);
  } else {
    console.error('Error saving token:', data);
  }

  return token;
}
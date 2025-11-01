import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

async function ensureAndroidChannel() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.HIGH,
    });
  }
}

export async function initNotifications() {
  await ensureAndroidChannel();
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    await Notifications.requestPermissionsAsync();
  }
}

export async function notifyRegisterSuccess() {
  return Notifications.scheduleNotificationAsync({
    content: {
      title: 'Cadastro realizado',
      body: 'Sua conta foi criada.',
    },
    trigger: null,
  });
}

export async function notifyLoginSuccess() {
  return Notifications.scheduleNotificationAsync({
    content: {
      title: 'Login realizado',
      body: 'Você entrou com sucesso.',
    },
    trigger: null,
  });
}

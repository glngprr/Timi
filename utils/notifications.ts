import { useSettingsStore } from '@/store/useSettingsStore';

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'denied';
  }

  if (Notification.permission === 'default') {
    return await Notification.requestPermission();
  }

  return Notification.permission;
}

export function showNotification(title: string, body?: string) {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return;
  }

  const { notificationsEnabled } = useSettingsStore.getState();

  if (!notificationsEnabled) return;

  if (Notification.permission === 'granted') {
    try {
      new Notification(title, {
        body,
        icon: '/assets/logo/logo-icon-light.svg',
        silent: true,
      });
    } catch (err) {
      console.error('Failed to show notification:', err);
    }
  } else if (Notification.permission === 'default') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        try {
          new Notification(title, {
            body,
            icon: '/assets/logo/logo-icon-light.svg',
            silent: true,
          });
        } catch (err) {
          console.error('Failed to show notification after permission grant:', err);
        }
      }
    });
  }
}

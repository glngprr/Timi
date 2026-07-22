import { useSettingsStore } from '@/store/useSettingsStore';

export type SoundType = 'timer' | 'pomodoro' | 'notification' | 'click';

const soundPaths: Record<SoundType, string> = {
  timer: '/assets/sounds/bell.mp3',
  pomodoro: '/assets/sounds/ding.mp3',
  notification: '/assets/sounds/notification.mp3',
  click: '/assets/sounds/ping.mp3',
};

export function playSound(type: SoundType) {
  if (typeof window === 'undefined') return;

  const { soundEnabled, soundVolume } = useSettingsStore.getState();

  if (!soundEnabled || type === 'click') return; // Temporarily disable click sounds

  try {
    const audio = new Audio(soundPaths[type]);
    audio.volume = soundVolume;
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        // Autoplay restrictions blocked the sound.
        console.warn('Audio playback was blocked by the browser. Interaction required first.', error);
      });
    }
  } catch (err) {
    console.error('Failed to play audio:', err);
  }
}

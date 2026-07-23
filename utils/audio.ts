import { useSettingsStore } from '@/store/useSettingsStore';

export type SoundType = 'timer' | 'pomodoro' | 'button';

const soundPaths: Record<SoundType, string> = {
  timer: '/assets/sounds/alarm.mp3',
  pomodoro: '/assets/sounds/alarm.mp3',
  button: '/assets/sounds/button.mp3',
};

// Web Audio API global context & decoded PCM memory buffers
let audioCtx: AudioContext | null = null;
let keepAliveSource: AudioBufferSourceNode | null = null;
const bufferCache: Partial<Record<SoundType, AudioBuffer>> = {};

// Silent keep-alive loop to prevent browser AudioContext suspension and OS audio driver sleep (D3 state)
function startSilentKeepAlive(ctx: AudioContext) {
  if (keepAliveSource) return;

  try {
    const silentBuffer = ctx.createBuffer(1, ctx.sampleRate * 1, ctx.sampleRate);
    const source = ctx.createBufferSource();
    source.buffer = silentBuffer;
    source.loop = true;

    const gainNode = ctx.createGain();
    gainNode.gain.value = 0.00001; // Ultra-low near-zero signal keeps audio channel hardware warm

    source.connect(gainNode);
    gainNode.connect(ctx.destination);
    source.start(0);

    keepAliveSource = source;
  } catch (err) {
    console.warn('Failed to start silent keep-alive audio:', err);
  }
}

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;

  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }

  if (audioCtx) {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume().then(() => {
        if (audioCtx) startSilentKeepAlive(audioCtx);
      }).catch(() => {});
    } else if (audioCtx.state === 'running') {
      startSilentKeepAlive(audioCtx);
    }
  }

  return audioCtx;
}

// Fetch sound file and decode raw PCM data into AudioBuffer in RAM
async function loadAndDecodeSound(type: SoundType) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const response = await fetch(soundPaths[type]);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
    bufferCache[type] = audioBuffer;
  } catch (err) {
    console.warn(`Failed to preload sound: ${type}`, err);
  }
}

// Preload all sounds into memory as soon as browser is interactive
if (typeof window !== 'undefined') {
  const initPreload = () => {
    Object.keys(soundPaths).forEach((key) => {
      loadAndDecodeSound(key as SoundType);
    });
  };

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initPreload();
  } else {
    window.addEventListener('DOMContentLoaded', initPreload, { once: true });
  }

  // Active listeners to unlock and keep audio hardware warm
  const unlockAudio = () => {
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().then(() => {
        startSilentKeepAlive(ctx);
      });
    }
  };

  window.addEventListener('pointerdown', unlockAudio, { capture: true });
  window.addEventListener('keydown', unlockAudio, { capture: true });
  window.addEventListener('focus', unlockAudio);
}

// Active playing sources tracking for long-running sounds like alarm.mp3
let activeAlarmSources: AudioBufferSourceNode[] = [];

export function stopSound() {
  if (activeAlarmSources.length > 0) {
    activeAlarmSources.forEach((source) => {
      try {
        source.stop();
      } catch (err) {
        // Ignore if already stopped
      }
    });
    activeAlarmSources = [];
  }
}

export function playSound(type: SoundType) {
  if (typeof window === 'undefined') return;

  const { soundEnabled, soundVolume } = useSettingsStore.getState();
  if (!soundEnabled) return;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // Stop existing alarms before playing a new alarm sound
    if (type === 'timer' || type === 'pomodoro') {
      stopSound();
    }

    const buffer = bufferCache[type];
    if (!buffer) {
      loadAndDecodeSound(type).then(() => {
        if (bufferCache[type]) {
          playSound(type);
        }
      });
      return;
    }

    // Create an AudioBufferSourceNode (plays raw PCM data with zero decoding/buffering delay)
    const source = ctx.createBufferSource();
    source.buffer = buffer;

    // Create GainNode for precise volume control
    const gainNode = ctx.createGain();
    gainNode.gain.value = soundVolume;

    source.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Fire immediately at time 0
    source.start(0);

    // Track active alarm sources to allow immediate cancellation via stopSound()
    if (type === 'timer' || type === 'pomodoro') {
      activeAlarmSources.push(source);
      source.onended = () => {
        activeAlarmSources = activeAlarmSources.filter((s) => s !== source);
      };
    }
  } catch (err) {
    console.error('Failed to play sound via Web Audio API:', err);
  }
}

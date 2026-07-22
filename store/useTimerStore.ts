import { create } from 'zustand';
import { useSettingsStore } from './useSettingsStore';
import { playSound } from '@/utils/audio';
import { showNotification } from '@/utils/notifications';
import toast from 'react-hot-toast';

export type PomodoroMode = 'focus' | 'shortBreak' | 'longBreak';

interface TimerStore {
  // Global fullscreen state for each page
  fullscreenMode: 'timer' | 'stopwatch' | 'pomodoro' | null;
  setFullscreenMode: (mode: 'timer' | 'stopwatch' | 'pomodoro' | null) => void;

  // ----------------------------------------------------
  // Countdown Timer State
  // ----------------------------------------------------
  timerRunning: boolean;
  timerPaused: boolean;
  timerCompleted: boolean;
  timerTimeLeft: number; // seconds remaining
  timerDuration: number; // total duration selected
  timerEndTime: number | null; // target timestamp (ms)

  setTimerDuration: (seconds: number) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  tickTimer: () => void;

  // ----------------------------------------------------
  // Stopwatch State
  // ----------------------------------------------------
  stopwatchRunning: boolean;
  stopwatchTime: number; // accumulated time in ms
  stopwatchLaps: number[]; // array of lap times in ms
  stopwatchStartTime: number | null; // start anchor timestamp (ms)
  stopwatchElapsedBeforePause: number; // ms accumulated prior to current resume

  startStopwatch: () => void;
  pauseStopwatch: () => void;
  resetStopwatch: () => void;
  recordStopwatchLap: () => void;
  tickStopwatch: () => void;

  // ----------------------------------------------------
  // Pomodoro State
  // ----------------------------------------------------
  pomoRunning: boolean;
  pomoMode: PomodoroMode;
  pomoSessionCount: number; // tracks completed study focus sessions (1-4)
  pomoTimeLeft: number; // seconds remaining
  pomoDuration: number; // current mode's duration in seconds
  pomoEndTime: number | null; // target timestamp (ms)

  startPomodoro: () => void;
  pausePomodoro: () => void;
  resetPomodoro: () => void;
  setPomoMode: (mode: PomodoroMode) => void;
  tickPomodoro: () => void;
  syncPomoDurations: () => void;
}

export const useTimerStore = create<TimerStore>((set, get) => ({
  // Fullscreen State
  fullscreenMode: null,
  setFullscreenMode: (mode) => set({ fullscreenMode: mode }),

  // ----------------------------------------------------
  // Countdown Timer
  // ----------------------------------------------------
  timerRunning: false,
  timerPaused: false,
  timerCompleted: false,
  timerTimeLeft: 1500, // 25 min default
  timerDuration: 1500,
  timerEndTime: null,

  setTimerDuration: (seconds) => {
    set({
      timerDuration: seconds,
      timerTimeLeft: seconds,
      timerRunning: false,
      timerPaused: false,
      timerCompleted: false,
      timerEndTime: null,
    });
  },

  startTimer: () => {
    const { timerRunning, timerTimeLeft } = get();
    if (timerRunning || timerTimeLeft <= 0) return;

    playSound('click');
    const newEndTime = Date.now() + timerTimeLeft * 1000;
    set({
      timerRunning: true,
      timerPaused: false,
      timerCompleted: false,
      timerEndTime: newEndTime,
    });
  },

  pauseTimer: () => {
    const { timerRunning, timerEndTime } = get();
    if (!timerRunning || !timerEndTime) return;

    playSound('click');
    const now = Date.now();
    const remaining = Math.max(0, Math.ceil((timerEndTime - now) / 1000));
    set({
      timerRunning: false,
      timerPaused: true,
      timerTimeLeft: remaining,
      timerEndTime: null,
    });
  },

  resetTimer: () => {
    playSound('click');
    const { timerDuration } = get();
    set({
      timerRunning: false,
      timerPaused: false,
      timerCompleted: false,
      timerTimeLeft: timerDuration,
      timerEndTime: null,
    });
  },

  tickTimer: () => {
    const { timerRunning, timerEndTime } = get();
    if (!timerRunning || !timerEndTime) return;

    const now = Date.now();
    const remaining = Math.max(0, Math.ceil((timerEndTime - now) / 1000));

    if (remaining <= 0) {
      playSound('timer');
      
      // Calculate display length
      const mins = Math.floor(get().timerDuration / 60);
      const secs = get().timerDuration % 60;
      const lengthStr = mins > 0 ? `${mins}m` : `${secs}s`;
      showNotification('Timer Ended', `Your countdown for ${lengthStr} has finished.`);
      toast.success('Timer Completed!');

      set({
        timerRunning: false,
        timerPaused: false,
        timerCompleted: true,
        timerTimeLeft: 0,
        timerEndTime: null,
      });
    } else {
      set({ timerTimeLeft: remaining });
    }
  },

  // ----------------------------------------------------
  // Stopwatch
  // ----------------------------------------------------
  stopwatchRunning: false,
  stopwatchTime: 0,
  stopwatchLaps: [],
  stopwatchStartTime: null,
  stopwatchElapsedBeforePause: 0,

  startStopwatch: () => {
    const { stopwatchRunning } = get();
    if (stopwatchRunning) return;

    playSound('click');
    set({
      stopwatchRunning: true,
      stopwatchStartTime: Date.now(),
    });
  },

  pauseStopwatch: () => {
    const { stopwatchRunning, stopwatchStartTime, stopwatchElapsedBeforePause } = get();
    if (!stopwatchRunning || !stopwatchStartTime) return;

    playSound('click');
    const elapsed = Date.now() - stopwatchStartTime;
    const totalTime = stopwatchElapsedBeforePause + elapsed;
    set({
      stopwatchRunning: false,
      stopwatchTime: totalTime,
      stopwatchElapsedBeforePause: totalTime,
      stopwatchStartTime: null,
    });
  },

  resetStopwatch: () => {
    playSound('click');
    set({
      stopwatchRunning: false,
      stopwatchTime: 0,
      stopwatchLaps: [],
      stopwatchStartTime: null,
      stopwatchElapsedBeforePause: 0,
    });
  },

  recordStopwatchLap: () => {
    const { stopwatchRunning, stopwatchStartTime, stopwatchElapsedBeforePause, stopwatchTime } = get();
    let currentTotal = stopwatchTime;
    if (stopwatchRunning && stopwatchStartTime) {
      currentTotal = stopwatchElapsedBeforePause + (Date.now() - stopwatchStartTime);
    }
    
    if (currentTotal === 0) return;

    playSound('click');
    set((state) => ({
      stopwatchLaps: [currentTotal, ...state.stopwatchLaps],
    }));
    toast.success(`Lap #${get().stopwatchLaps.length} recorded`);
  },

  tickStopwatch: () => {
    const { stopwatchRunning, stopwatchStartTime, stopwatchElapsedBeforePause } = get();
    if (!stopwatchRunning || !stopwatchStartTime) return;

    const elapsed = Date.now() - stopwatchStartTime;
    set({ stopwatchTime: stopwatchElapsedBeforePause + elapsed });
  },

  // ----------------------------------------------------
  // Pomodoro
  // ----------------------------------------------------
  pomoRunning: false,
  pomoMode: 'focus',
  pomoSessionCount: 0,
  pomoTimeLeft: 1500, // 25 mins in seconds
  pomoDuration: 1500,
  pomoEndTime: null,

  startPomodoro: () => {
    const { pomoRunning, pomoTimeLeft } = get();
    if (pomoRunning || pomoTimeLeft <= 0) return;

    playSound('click');
    const newEndTime = Date.now() + pomoTimeLeft * 1000;
    set({
      pomoRunning: true,
      pomoEndTime: newEndTime,
    });
  },

  pausePomodoro: () => {
    const { pomoRunning, pomoEndTime } = get();
    if (!pomoRunning || !pomoEndTime) return;

    playSound('click');
    const now = Date.now();
    const remaining = Math.max(0, Math.ceil((pomoEndTime - now) / 1000));
    set({
      pomoRunning: false,
      pomoTimeLeft: remaining,
      pomoEndTime: null,
    });
  },

  resetPomodoro: () => {
    playSound('click');
    const settings = useSettingsStore.getState().pomodoroSettings;
    const { pomoMode } = get();
    let seconds = settings.focusDuration * 60;
    if (pomoMode === 'shortBreak') seconds = settings.shortBreakDuration * 60;
    else if (pomoMode === 'longBreak') seconds = settings.longBreakDuration * 60;

    set({
      pomoRunning: false,
      pomoTimeLeft: seconds,
      pomoDuration: seconds,
      pomoEndTime: null,
    });
  },

  setPomoMode: (mode) => {
    playSound('click');
    const settings = useSettingsStore.getState().pomodoroSettings;
    let seconds = settings.focusDuration * 60;
    if (mode === 'shortBreak') seconds = settings.shortBreakDuration * 60;
    else if (mode === 'longBreak') seconds = settings.longBreakDuration * 60;

    set({
      pomoMode: mode,
      pomoRunning: false,
      pomoTimeLeft: seconds,
      pomoDuration: seconds,
      pomoEndTime: null,
    });
  },

  tickPomodoro: () => {
    const { pomoRunning, pomoEndTime, pomoMode } = get();
    if (!pomoRunning || !pomoEndTime) return;

    const now = Date.now();
    const remaining = Math.max(0, Math.ceil((pomoEndTime - now) / 1000));

    if (remaining <= 0) {
      playSound('pomodoro');
      
      const settings = useSettingsStore.getState().pomodoroSettings;
      let nextMode: PomodoroMode = 'focus';
      let nextSessionCount = get().pomoSessionCount;
      
      if (pomoMode === 'focus') {
        nextSessionCount = nextSessionCount + 1;
        toast.success('Focus session completed!');
        showNotification('Focus Done!', 'Time for a break.');
        
        // After every 4 focus sessions, take a long break
        if (nextSessionCount > 0 && nextSessionCount % 4 === 0) {
          nextMode = 'longBreak';
        } else {
          nextMode = 'shortBreak';
        }
      } else {
        toast.success('Break completed!');
        showNotification('Break Done!', 'Time to focus.');
        nextMode = 'focus';
      }

      let nextDuration = settings.focusDuration * 60;
      if (nextMode === 'shortBreak') nextDuration = settings.shortBreakDuration * 60;
      else if (nextMode === 'longBreak') nextDuration = settings.longBreakDuration * 60;

      // Auto start break or focus check
      const shouldAutoStart = pomoMode === 'focus' ? settings.autoStartBreak : settings.autoStartFocus;
      
      if (shouldAutoStart) {
        const autoEndTime = Date.now() + nextDuration * 1000;
        set({
          pomoMode: nextMode,
          pomoSessionCount: nextSessionCount,
          pomoTimeLeft: nextDuration,
          pomoDuration: nextDuration,
          pomoEndTime: autoEndTime,
          pomoRunning: true,
        });
      } else {
        set({
          pomoMode: nextMode,
          pomoSessionCount: nextSessionCount,
          pomoTimeLeft: nextDuration,
          pomoDuration: nextDuration,
          pomoEndTime: null,
          pomoRunning: false,
        });
      }
    } else {
      set({ pomoTimeLeft: remaining });
    }
  },

  syncPomoDurations: () => {
    const { pomoRunning, pomoMode } = get();
    if (pomoRunning) return; // Do not interrupt active sessions
    
    const settings = useSettingsStore.getState().pomodoroSettings;
    let seconds = settings.focusDuration * 60;
    if (pomoMode === 'shortBreak') seconds = settings.shortBreakDuration * 60;
    else if (pomoMode === 'longBreak') seconds = settings.longBreakDuration * 60;

    set({
      pomoTimeLeft: seconds,
      pomoDuration: seconds,
    });
  },
}));

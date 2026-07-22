import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeType = 'light' | 'dark' | 'system';
export type TimeFormatType = '12h' | '24h';
export type ToolType = 'clock' | 'timer' | 'stopwatch' | 'pomodoro';

export interface PomodoroSettings {
  focusDuration: number; // in minutes
  shortBreakDuration: number; // in minutes
  longBreakDuration: number; // in minutes
  autoStartBreak: boolean;
  autoStartFocus: boolean;
}

interface SettingsState {
  theme: ThemeType;
  timeFormat: TimeFormatType;
  soundEnabled: boolean;
  soundVolume: number; // 0.0 to 1.0
  notificationsEnabled: boolean;
  pomodoroSettings: PomodoroSettings;
  lastActiveTool: ToolType;
  defaultLandingPage: 'landing' | 'dashboard';
  
  setTheme: (theme: ThemeType) => void;
  setTimeFormat: (format: TimeFormatType) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setSoundVolume: (volume: number) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  setPomodoroSettings: (settings: Partial<PomodoroSettings>) => void;
  setLastActiveTool: (tool: ToolType) => void;
  setDefaultLandingPage: (page: 'landing' | 'dashboard') => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'system',
      timeFormat: '12h', // Default 12 hour format
      soundEnabled: true,
      soundVolume: 0.5,
      notificationsEnabled: true,
      pomodoroSettings: {
        focusDuration: 25,
        shortBreakDuration: 5,
        longBreakDuration: 15,
        autoStartBreak: false,
        autoStartFocus: false,
      },
      lastActiveTool: 'clock',
      defaultLandingPage: 'landing',
      
      setTheme: (theme) => set({ theme }),
      setTimeFormat: (timeFormat) => set({ timeFormat }),
      setSoundEnabled: (soundEnabled) => set({ soundEnabled }),
      setSoundVolume: (soundVolume) => set({ soundVolume }),
      setNotificationsEnabled: (notificationsEnabled) => set({ notificationsEnabled }),
      setPomodoroSettings: (settings) =>
        set((state) => ({
          pomodoroSettings: { ...state.pomodoroSettings, ...settings },
        })),
      setLastActiveTool: (lastActiveTool) => set({ lastActiveTool }),
      setDefaultLandingPage: (defaultLandingPage) => set({ defaultLandingPage }),
    }),
    {
      name: 'timi-settings-storage',
    }
  )
);

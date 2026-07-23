'use client';

import { useTheme } from 'next-themes';
import { useSettingsStore, ThemeType, TimeFormatType } from '@/store/useSettingsStore';
import { useTimerStore } from '@/store/useTimerStore';
import { requestNotificationPermission } from '@/utils/notifications';
import { Sun, Moon, Monitor, Volume2, Bell, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

export default function SettingsPage() {
  const { setTheme: setNextTheme } = useTheme();

  const {
    theme,
    timeFormat,
    soundEnabled,
    soundVolume,
    notificationsEnabled,
    pomodoroSettings,
    setTheme,
    setTimeFormat,
    setSoundEnabled,
    setSoundVolume,
    setNotificationsEnabled,
    setPomodoroSettings,
  } = useSettingsStore();

  const syncPomoDurations = useTimerStore((state) => state.syncPomoDurations);

  // Mount state to avoid hydration errors
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const handle = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(handle);
  }, []);

  if (!mounted) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center min-h-[400px]">
        <div className="h-96 w-full max-w-2xl bg-card-hover rounded-2xl animate-pulse" />
      </div>
    );
  }

  // Handle Theme Change
  const handleThemeChange = (newTheme: ThemeType) => {
    setTheme(newTheme);
    setNextTheme(newTheme);
    toast.success(`Theme set to ${newTheme}`);
  };

  // Handle Time Format Change
  const handleTimeFormatChange = (format: TimeFormatType) => {
    setTimeFormat(format);
    toast.success(`Time format set to ${format === '12h' ? '12-hour' : '24-hour'}`);
  };

  // Handle Notification Toggle
  const handleNotificationToggle = async (checked: boolean) => {
    if (checked) {
      const permission = await requestNotificationPermission();
      if (permission === 'granted') {
        setNotificationsEnabled(true);
        toast.success('Notifications enabled');
      } else {
        setNotificationsEnabled(false);
        toast.error('Notification permission denied by browser');
      }
    } else {
      setNotificationsEnabled(false);
      toast.success('Notifications disabled');
    }
  };

  // Handle Sound Toggle
  const handleSoundToggle = (checked: boolean) => {
    setSoundEnabled(checked);
    toast.success(checked ? 'Alert sounds enabled' : 'Alert sounds muted');
  };

  // Handle Volume Change
  const handleVolumeChange = (volume: number) => {
    setSoundVolume(volume);
  };

  // Handle Pomodoro Duration Input changes
  const handlePomoDurationChange = (key: 'focusDuration' | 'shortBreakDuration' | 'longBreakDuration', valString: string) => {
    const val = parseInt(valString || '0', 10);
    if (isNaN(val) || val <= 0) return;

    setPomodoroSettings({ [key]: val });

    // Sync store timeLeft immediately if timer is reset
    setTimeout(() => {
      syncPomoDurations();
    }, 50);
  };

  // Handle Pomodoro Checkbox changes
  const handlePomoCheckboxChange = (key: 'autoStartBreak' | 'autoStartFocus', checked: boolean) => {
    setPomodoroSettings({ [key]: checked });
    toast.success(`${key === 'autoStartBreak' ? 'Auto-start breaks' : 'Auto-start focus'} updated`);
  };

  return (
    <div className="flex-1 w-full max-w-2xl mx-auto py-6 sm:py-10 select-none font-sans space-y-6">

      {/* Title */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-1.5">Settings</h2>
        <p className="text-text-secondary text-sm">Customize application themes, notifications, and timer durations.</p>
      </div>

      {/* 1. Appearance / Theme Section */}
      <div className="bg-card border border-border-default p-6 rounded-2xl shadow-light-sm dark:shadow-none space-y-4">
        <h3 className="text-sm font-semibold text-text-secondary border-b border-border-default/50 pb-2">Appearance</h3>
        <div className="grid grid-cols-3 gap-3">
          {(['light', 'dark', 'system'] as ThemeType[]).map((t) => {
            const Icon = t === 'light' ? Sun : t === 'dark' ? Moon : Monitor;
            const isSelected = theme === t;
            return (
              <button
                key={t}
                onClick={() => handleThemeChange(t)}
                className={`h-20 rounded-xl flex flex-col items-center justify-center border text-xs font-semibold capitalize cursor-pointer transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary ${isSelected
                    ? 'border-primary bg-primary-light/10 text-primary font-bold'
                    : 'border-border-default bg-bg-secondary hover:bg-card-hover text-text-secondary hover:text-text-primary'
                  }`}
              >
                <Icon className="w-5 h-5 mb-2 stroke-[2px]" />
                <span>{t}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Time Format Section */}
      <div className="bg-card border border-border-default p-6 rounded-2xl shadow-light-sm dark:shadow-none space-y-4">
        <h3 className="text-sm font-semibold text-text-secondary border-b border-border-default/50 pb-2">Time Format</h3>
        <div className="flex gap-4">
          {(['12h', '24h'] as TimeFormatType[]).map((f) => {
            const isSelected = timeFormat === f;
            return (
              <button
                key={f}
                onClick={() => handleTimeFormatChange(f)}
                className={`flex-1 h-12 rounded-xl flex items-center justify-center border text-xs font-semibold cursor-pointer transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary ${isSelected
                    ? 'border-primary bg-primary-light/10 text-primary font-bold'
                    : 'border-border-default bg-bg-secondary hover:bg-card-hover text-text-secondary hover:text-text-primary'
                  }`}
              >
                {f === '12h' ? '12-Hour Format (AM/PM)' : '24-Hour Format'}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Notifications & Sounds Section */}
      <div className="bg-card border border-border-default p-6 rounded-2xl shadow-light-sm dark:shadow-none space-y-6">
        <h3 className="text-sm font-semibold text-text-secondary border-b border-border-default/50 pb-2">Notifications & Sound</h3>

        {/* Browser Notifications Checkbox */}
        <label className="flex items-center justify-between min-h-[44px] cursor-pointer group">
          <div className="flex items-center space-x-3">
            <Bell className="w-5 h-5 text-text-secondary group-hover:text-text-primary transition-colors" />
            <div className="flex flex-col text-left">
              <span className="text-sm font-semibold text-text-primary">Enable Desktop Notifications</span>
              <span className="text-2xs text-text-muted">Receive alerts on timer completions</span>
            </div>
          </div>
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={(e) => handleNotificationToggle(e.target.checked)}
            className="w-5 h-5 rounded border-border-default text-primary focus:ring-primary focus:ring-offset-2 transition-all cursor-pointer"
          />
        </label>

        {/* Audio Alerts Checkbox */}
        <label className="flex items-center justify-between min-h-[44px] cursor-pointer group">
          <div className="flex items-center space-x-3">
            <Volume2 className="w-5 h-5 text-text-secondary group-hover:text-text-primary transition-colors" />
            <div className="flex flex-col text-left">
              <span className="text-sm font-semibold text-text-primary">Enable Sound Effects</span>
              <span className="text-2xs text-text-muted">Play soft chimes on status triggers</span>
            </div>
          </div>
          <input
            type="checkbox"
            checked={soundEnabled}
            onChange={(e) => handleSoundToggle(e.target.checked)}
            className="w-5 h-5 rounded border-border-default text-primary focus:ring-primary focus:ring-offset-2 transition-all cursor-pointer"
          />
        </label>

        {/* Volume Slider */}
        {soundEnabled && (
          <div className="space-y-2 pt-2 border-t border-border-default/30">
            <div className="flex justify-between items-center text-xs font-semibold text-text-secondary">
              <span>Alert Volume</span>
              <span className="font-mono text-2xs">{Math.round(soundVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={Math.round(soundVolume * 100)}
              onChange={(e) => handleVolumeChange(parseInt(e.target.value, 10) / 100)}
              className="w-full h-1.5 bg-bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
        )}
      </div>

      {/* 4. Pomodoro Durations Section */}
      <div className="bg-card border border-border-default p-6 rounded-2xl shadow-light-sm dark:shadow-none space-y-6">
        <h3 className="text-sm font-semibold text-text-secondary border-b border-border-default/50 pb-2">Pomodoro Intervals</h3>

        {/* Durations inputs grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col">
            <label htmlFor="focus-dur" className="text-xs text-text-muted font-semibold uppercase mb-1.5 ml-1 whitespace-nowrap">Focus (min)</label>
            <input
              id="focus-dur"
              type="number"
              min="1"
              max="180"
              value={pomodoroSettings.focusDuration}
              onChange={(e) => handlePomoDurationChange('focusDuration', e.target.value)}
              className="h-12 bg-bg-secondary text-text-primary rounded-xl border border-border-default px-4 text-center font-mono font-medium outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="short-dur" className="text-xs text-text-muted font-semibold uppercase mb-1.5 ml-1 whitespace-nowrap">Short Break</label>
            <input
              id="short-dur"
              type="number"
              min="1"
              max="60"
              value={pomodoroSettings.shortBreakDuration}
              onChange={(e) => handlePomoDurationChange('shortBreakDuration', e.target.value)}
              className="h-12 bg-bg-secondary text-text-primary rounded-xl border border-border-default px-4 text-center font-mono font-medium outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="long-dur" className="text-xs text-text-muted font-semibold uppercase mb-1.5 ml-1 whitespace-nowrap">Long Break</label>
            <input
              id="long-dur"
              type="number"
              min="1"
              max="120"
              value={pomodoroSettings.longBreakDuration}
              onChange={(e) => handlePomoDurationChange('longBreakDuration', e.target.value)}
              className="h-12 bg-bg-secondary text-text-primary rounded-xl border border-border-default px-4 text-center font-mono font-medium outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-border-default/30">
          {/* Auto Start Break Checkbox */}
          <label className="flex items-center justify-between min-h-[44px] cursor-pointer">
            <div className="flex flex-col text-left">
              <span className="text-sm font-semibold text-text-primary">Auto-start Breaks</span>
              <span className="text-2xs text-text-muted">Commence break timer automatically when study session ends</span>
            </div>
            <input
              type="checkbox"
              checked={pomodoroSettings.autoStartBreak}
              onChange={(e) => handlePomoCheckboxChange('autoStartBreak', e.target.checked)}
              className="w-5 h-5 rounded border-border-default text-primary focus:ring-primary focus:ring-offset-2 transition-all cursor-pointer"
            />
          </label>

          {/* Auto Start Focus Checkbox */}
          <label className="flex items-center justify-between min-h-[44px] cursor-pointer">
            <div className="flex flex-col text-left">
              <span className="text-sm font-semibold text-text-primary">Auto-start Focus Sessions</span>
              <span className="text-2xs text-text-muted">Commence study session automatically when break ends</span>
            </div>
            <input
              type="checkbox"
              checked={pomodoroSettings.autoStartFocus}
              onChange={(e) => handlePomoCheckboxChange('autoStartFocus', e.target.checked)}
              className="w-5 h-5 rounded border-border-default text-primary focus:ring-primary focus:ring-offset-2 transition-all cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* 5. About / Branding Section */}
      <div className="bg-card border border-border-default p-6 rounded-2xl shadow-light-sm dark:shadow-none space-y-4">
        <h3 className="text-sm font-semibold text-text-secondary border-b border-border-default/50 pb-2">About Timi</h3>
        <div className="flex items-start space-x-3.5">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 select-none">
            <Sparkles className="w-5 h-5 stroke-[2px]" />
          </div>
          <div className="space-y-1.5">
            <p className="text-sm font-semibold text-text-primary">Every Second Counts</p>
            <p className="text-xs text-text-secondary leading-relaxed">
              Timi is a minimal, premium productivity web application built for students, professionals, and developers who seek a beautiful, fast, and distraction-free timing toolkit.
            </p>
            <p className="text-2xs text-text-muted pt-2 font-mono">Build v1.0.0 &bull; Licensed under MIT</p>
          </div>
        </div>
      </div>

    </div>
  );
}

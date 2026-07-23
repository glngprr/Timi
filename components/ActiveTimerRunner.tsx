'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTimerStore } from '@/store/useTimerStore';

export function ActiveTimerRunner() {
  const pathname = usePathname();
  const {
    timerRunning,
    timerTimeLeft,
    stopwatchRunning,
    pomoRunning,
    pomoTimeLeft,
    tickTimer,
    tickStopwatch,
    tickPomodoro,
  } = useTimerStore();

  // 1. requestAnimationFrame loop for smooth UI updates while page is visible
  useEffect(() => {
    let rafId: number;

    const loop = () => {
      if (timerRunning) {
        tickTimer();
      }
      if (stopwatchRunning) {
        tickStopwatch();
      }
      if (pomoRunning) {
        tickPomodoro();
      }

      if (timerRunning || stopwatchRunning || pomoRunning) {
        rafId = requestAnimationFrame(loop);
      }
    };

    if (timerRunning || stopwatchRunning || pomoRunning) {
      rafId = requestAnimationFrame(loop);
    }

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [timerRunning, stopwatchRunning, pomoRunning, tickTimer, tickStopwatch, tickPomodoro]);

  // 2. Dedicated 1s setInterval for background ticks, tab title updates, and timely completion handling
  useEffect(() => {
    if (!timerRunning && !stopwatchRunning && !pomoRunning) return;

    const intervalId = setInterval(() => {
      if (timerRunning) {
        tickTimer();
      }
      if (stopwatchRunning) {
        tickStopwatch();
      }
      if (pomoRunning) {
        tickPomodoro();
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timerRunning, stopwatchRunning, pomoRunning, tickTimer, tickStopwatch, tickPomodoro]);

  // 3. Page Visibility API listener to immediately synchronize state when returning to tab
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        if (timerRunning) tickTimer();
        if (stopwatchRunning) tickStopwatch();
        if (pomoRunning) tickPomodoro();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [timerRunning, stopwatchRunning, pomoRunning, tickTimer, tickStopwatch, tickPomodoro]);

  // Format remaining time for countdown timer display (e.g. 24:34 or 01:24:34)
  const formatTimerTime = (totalSecs: number) => {
    const h = Math.floor(totalSecs / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;
    const pad = (n: number) => n.toString().padStart(2, '0');
    if (h > 0) {
      return `${pad(h)}:${pad(m)}:${pad(s)}`;
    }
    return `${pad(m)}:${pad(s)}`;
  };

  // Update browser tab title dynamically on ticks
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (pathname === '/timer') {
      if (timerRunning) {
        document.title = `${formatTimerTime(timerTimeLeft)} Timi Timer`;
      } else {
        document.title = 'Timi';
      }
    } else if (pathname === '/pomodoro') {
      if (pomoRunning) {
        const mins = Math.floor(pomoTimeLeft / 60);
        const secs = pomoTimeLeft % 60;
        const timeStr = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        document.title = `${timeStr} - Timi`;
      } else {
        document.title = 'Timi';
      }
    } else if (pathname === '/stopwatch') {
      if (stopwatchRunning) {
        document.title = `[Running] Timi Stopwatch`;
      } else {
        document.title = 'Timi';
      }
    } else {
      document.title = 'Timi';
    }
  }, [pathname, timerRunning, timerTimeLeft, pomoRunning, pomoTimeLeft, stopwatchRunning]);

  return null;
}

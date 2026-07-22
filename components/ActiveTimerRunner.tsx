'use client';

import { useEffect } from 'react';
import { useTimerStore } from '@/store/useTimerStore';

export function ActiveTimerRunner() {
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

  // Update browser tab title dynamically on ticks
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (timerRunning) {
      const mins = Math.floor(timerTimeLeft / 60);
      const secs = timerTimeLeft % 60;
      const timeStr = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      document.title = `[${timeStr}] Timi`;
    } else if (pomoRunning) {
      const mins = Math.floor(pomoTimeLeft / 60);
      const secs = pomoTimeLeft % 60;
      const timeStr = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      document.title = `${timeStr} - Timi`;
    } else if (stopwatchRunning) {
      document.title = `[Running] Timi Stopwatch`;
    } else {
      document.title = 'Timi';
    }
  }, [timerRunning, timerTimeLeft, pomoRunning, pomoTimeLeft, stopwatchRunning]);

  return null;
}

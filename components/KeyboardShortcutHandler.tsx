'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTimerStore } from '@/store/useTimerStore';

export function KeyboardShortcutHandler() {
  const router = useRouter();
  const pathname = usePathname();

  const {
    timerRunning,
    startTimer,
    pauseTimer,
    resetTimer,

    stopwatchRunning,
    startStopwatch,
    pauseStopwatch,
    resetStopwatch,

    pomoRunning,
    startPomodoro,
    pausePomodoro,
    resetPomodoro,

    fullscreenMode,
    setFullscreenMode,
  } = useTimerStore();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore shortcuts if the user is typing in an input/textarea/select
      const activeElement = document.activeElement;
      if (
        activeElement &&
        (activeElement.tagName === 'INPUT' ||
          activeElement.tagName === 'TEXTAREA' ||
          activeElement.tagName === 'SELECT' ||
          activeElement.getAttribute('contenteditable') === 'true')
      ) {
        return;
      }

      const key = event.key.toLowerCase();

      // Escape key to exit fullscreen (can be pressed on any page)
      if (event.key === 'Escape') {
        if (fullscreenMode) {
          event.preventDefault();
          setFullscreenMode(null);
        }
        return;
      }

      // Space key for Start/Pause
      if (event.code === 'Space') {
        event.preventDefault();
        if (pathname === '/timer') {
          if (timerRunning) pauseTimer();
          else startTimer();
        } else if (pathname === '/stopwatch') {
          if (stopwatchRunning) pauseStopwatch();
          else startStopwatch();
        } else if (pathname === '/pomodoro') {
          if (pomoRunning) pausePomodoro();
          else startPomodoro();
        }
        return;
      }

      // 'r' key for Reset
      if (key === 'r') {
        event.preventDefault();
        if (pathname === '/timer') {
          resetTimer();
        } else if (pathname === '/stopwatch') {
          resetStopwatch();
        } else if (pathname === '/pomodoro') {
          resetPomodoro();
        }
        return;
      }

      // 'f' key for Fullscreen Toggle
      if (key === 'f') {
        event.preventDefault();
        if (pathname === '/timer') {
          setFullscreenMode(fullscreenMode === 'timer' ? null : 'timer');
        } else if (pathname === '/stopwatch') {
          setFullscreenMode(fullscreenMode === 'stopwatch' ? null : 'stopwatch');
        } else if (pathname === '/pomodoro') {
          setFullscreenMode(fullscreenMode === 'pomodoro' ? null : 'pomodoro');
        }
        return;
      }

      // Page navigation shortcuts
      if (key === 't') {
        event.preventDefault();
        router.push('/timer');
        return;
      }
      if (key === 's') {
        event.preventDefault();
        router.push('/stopwatch');
        return;
      }
      if (key === 'p') {
        event.preventDefault();
        router.push('/pomodoro');
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    pathname,
    router,
    timerRunning,
    startTimer,
    pauseTimer,
    resetTimer,
    stopwatchRunning,
    startStopwatch,
    pauseStopwatch,
    resetStopwatch,
    pomoRunning,
    startPomodoro,
    pausePomodoro,
    resetPomodoro,
    fullscreenMode,
    setFullscreenMode,
  ]);

  return null;
}

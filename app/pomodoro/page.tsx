'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useTimerStore, PomodoroMode } from '@/store/useTimerStore';
import { Button } from '@/components/Button';
import { IconButton } from '@/components/IconButton';
import { ProgressRing } from '@/components/ProgressRing';
import { Maximize2, Minimize2, Play, Pause, RotateCcw, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PomodoroPage() {
  const {
    pomoRunning,
    pomoMode,
    pomoSessionCount,
    pomoTimeLeft,
    pomoDuration,
    startPomodoro,
    pausePomodoro,
    resetPomodoro,
    setPomoMode,
    syncPomoDurations,
    fullscreenMode,
    setFullscreenMode,
  } = useTimerStore();

  // Sync settings when component mounts (in case settings were updated)
  useEffect(() => {
    syncPomoDurations();
  }, [syncPomoDurations]);

  // Helper to format remaining time
  const formatTime = (totalSecs: number) => {
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progress = pomoDuration > 0 ? pomoTimeLeft / pomoDuration : 0;
  const isFullscreen = fullscreenMode === 'pomodoro';

  // Get color and labels based on active Pomodoro mode
  const getModeDetails = (mode: PomodoroMode) => {
    switch (mode) {
      case 'focus':
        return {
          colorClass: 'text-primary',
          label: 'Focus Session',
          bgColorClass: 'bg-primary/10 text-primary border-primary/20',
        };
      case 'shortBreak':
        return {
          colorClass: 'text-success',
          label: 'Short Break',
          bgColorClass: 'bg-success/10 text-success border-success/20',
        };
      case 'longBreak':
        return {
          colorClass: 'text-pomo-long',
          label: 'Long Break',
          bgColorClass: 'bg-pomo-long/10 text-pomo-long border-pomo-long/20',
        };
    }
  };

  const currentModeDetails = getModeDetails(pomoMode);

  // Calculate current session index (1-4)
  const currentSessionNumber = (pomoSessionCount % 4) + 1;

  return (
    <div className="flex-grow flex flex-col items-center justify-center py-4 select-none font-sans">

      <AnimatePresence mode="wait">
        {/* Fullscreen Focus Mode */}
        {isFullscreen ? (
          <motion.div
            key="fullscreen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center px-6"
          >
            <div className="flex flex-col items-center justify-center space-y-12">
              {/* Floating Live Digital Clock in top corner */}
              <div className="text-sm font-semibold tracking-wide text-text-muted select-none absolute top-8 font-mono">
                {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
              </div>

              {/* Progress Ring with mode-dependent color */}
              <ProgressRing progress={progress} size={320} colorClass={currentModeDetails.colorClass}>
                <div className="text-5xl sm:text-6xl font-bold font-mono tracking-tight text-text-primary">
                  {formatTime(pomoTimeLeft)}
                </div>
                <span className="text-xs sm:text-sm text-text-secondary font-medium font-sans mt-2 text-center">
                  {pomoMode === 'focus' ? `Time to focus! #${currentSessionNumber}` : pomoMode === 'shortBreak' ? 'Short Break' : 'Long Break'}
                </span>
              </ProgressRing>

              {/* Minimal Controls */}
              <div className="flex items-center space-x-4">
                {pomoRunning ? (
                  <Button variant="secondary" onClick={pausePomodoro} className="px-8">
                    <Pause className="w-4 h-4 mr-2" /> Pause
                  </Button>
                ) : (
                  <Button variant="primary" onClick={startPomodoro} className="px-8" disabled={pomoTimeLeft <= 0}>
                    <Play className="w-4 h-4 mr-2" /> Start
                  </Button>
                )}
                <Button variant="secondary" onClick={() => setFullscreenMode(null)} className="px-8">
                  <Minimize2 className="w-4 h-4 mr-2" /> Exit Focus
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Standard View */
          <motion.div
            key="standard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-lg flex flex-col items-center"
          >
            {/* Header Control Row (Settings & Fullscreen shortcuts) */}
            <div className="w-full flex justify-between items-center mb-8">
              <Link
                href="/settings"
                className="flex items-center justify-center rounded-xl transition-all duration-150 cursor-pointer select-none active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 w-11 h-11 bg-transparent hover:bg-card-hover border-none text-text-secondary hover:text-text-primary"
                aria-label="Pomodoro Settings"
              >
                <Settings className="w-5 h-5 text-text-primary" />
              </Link>
              <IconButton
                variant="ghost"
                ariaLabel="Enter Fullscreen Focus Mode"
                onClick={() => setFullscreenMode('pomodoro')}
                title="Fullscreen Focus Mode (F)"
              >
                <Maximize2 className="w-5 h-5 text-text-primary" />
              </IconButton>
            </div>

            {/* Mode Switcher Segmented Control */}
            <div className="bg-bg-secondary p-1 rounded-xl flex items-center border border-border-default/50 mb-8 shadow-light-sm dark:shadow-none w-full">
              {(['focus', 'shortBreak', 'longBreak'] as PomodoroMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setPomoMode(mode)}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg capitalize transition-all duration-150 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary ${pomoMode === mode
                    ? 'bg-card text-primary font-bold shadow-light-sm dark:shadow-dark-default border border-border-default/20'
                    : 'text-text-secondary hover:text-text-primary border border-transparent'
                    }`}
                >
                  {mode === 'focus' ? 'Focus' : mode === 'shortBreak' ? 'Short Break' : 'Long Break'}
                </button>
              ))}
            </div>

            {/* Display Card */}
            <div className="bg-card border border-border-default rounded-2xl p-8 shadow-light-md dark:shadow-dark-default w-full flex flex-col items-center mb-6">
              <ProgressRing progress={progress} size={280} colorClass={currentModeDetails.colorClass}>
                <div className="text-4xl sm:text-5xl font-bold font-mono tracking-tight text-text-primary">
                  {formatTime(pomoTimeLeft)}
                </div>
                <span className="text-2xs text-text-secondary font-medium mt-1 font-sans">
                  {currentModeDetails.label}
                </span>
              </ProgressRing>

              {/* Controls */}
              <div className="flex items-center space-x-3 mt-8">
                {pomoRunning ? (
                  <Button variant="secondary" onClick={pausePomodoro} className="w-28">
                    <Pause className="w-4 h-4 mr-2" /> Pause
                  </Button>
                ) : (
                  <Button variant="primary" onClick={startPomodoro} className="w-28" disabled={pomoTimeLeft <= 0}>
                    <Play className="w-4 h-4 mr-2" /> Start
                  </Button>
                )}

                <Button variant="secondary" onClick={resetPomodoro} className="w-28" disabled={pomoTimeLeft === pomoDuration}>
                  <RotateCcw className="w-4 h-4 mr-2" /> Reset
                </Button>
              </div>
            </div>

            {/* Session tracking indicator */}
            <div className="bg-card border border-border-default rounded-2xl py-4 px-6 shadow-light-sm dark:shadow-none w-full flex justify-between items-center text-sm font-medium">
              <span className="text-text-secondary">Current Session Round</span>
              <span className="text-primary font-bold font-mono">
                {currentSessionNumber} / 4
              </span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

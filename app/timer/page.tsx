'use client';

import { useState, useEffect } from 'react';
import { useTimerStore } from '@/store/useTimerStore';
import { Button } from '@/components/Button';
import { IconButton } from '@/components/IconButton';
import { ProgressRing } from '@/components/ProgressRing';
import { Maximize2, Minimize2, Play, Pause, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TimerPage() {
  const {
    timerRunning,
    timerPaused,
    timerCompleted,
    timerTimeLeft,
    timerDuration,
    setTimerDuration,
    startTimer,
    pauseTimer,
    resetTimer,
    fullscreenMode,
    setFullscreenMode,
  } = useTimerStore();

  // Local state for custom duration inputs
  const [hours, setHours] = useState('0');
  const [minutes, setMinutes] = useState('25');
  const [seconds, setSeconds] = useState('0');
  const [validationError, setValidationError] = useState('');

  // Auto-sync local custom inputs if preset is clicked (and timer is not running)
  useEffect(() => {
    if (!timerRunning && !timerPaused && !timerCompleted) {
      const h = Math.floor(timerDuration / 3600);
      const m = Math.floor((timerDuration % 3600) / 60);
      const s = timerDuration % 60;
      const handle = setTimeout(() => {
        setHours(h.toString());
        setMinutes(m.toString());
        setSeconds(s.toString());
      }, 0);
      return () => clearTimeout(handle);
    }
  }, [timerDuration, timerRunning, timerPaused, timerCompleted]);

  // Handle Preset Clicks
  const handlePresetClick = (mins: number) => {
    setTimerDuration(mins * 60);
    // Automatically start the timer on preset click for faster UX
    setTimeout(() => {
      startTimer();
    }, 50);
  };

  // Handle custom input submission
  const handleStartCustom = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    const h = parseInt(hours || '0', 10);
    const m = parseInt(minutes || '0', 10);
    const s = parseInt(seconds || '0', 10);

    if (isNaN(h) || isNaN(m) || isNaN(s) || h < 0 || m < 0 || s < 0) {
      setValidationError('Please enter positive numbers.');
      return;
    }

    const totalSeconds = h * 3600 + m * 60 + s;
    if (totalSeconds <= 0) {
      setValidationError('Duration must be greater than 0.');
      return;
    }

    setTimerDuration(totalSeconds);
    setTimeout(() => {
      startTimer();
    }, 50);
  };

  // Helper to format remaining time
  const formatTime = (totalSecs: number) => {
    const h = Math.floor(totalSecs / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;

    const pad = (n: number) => n.toString().padStart(2, '0');

    if (h > 0) {
      return `${pad(h)}:${pad(m)}:${pad(s)}`;
    }
    return `${pad(m)}:${pad(s)}`;
  };

  const progress = timerDuration > 0 ? timerTimeLeft / timerDuration : 0;
  const isFullscreen = fullscreenMode === 'timer';

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

              {/* Central Progress Ring */}
              <ProgressRing progress={progress} size={320} colorClass="text-primary">
                <div className="text-5xl sm:text-6xl font-bold font-mono tracking-tight text-text-primary">
                  {formatTime(timerTimeLeft)}
                </div>
                {timerCompleted && (
                  <span className="text-xs text-success font-semibold tracking-wider uppercase mt-1">Completed</span>
                )}
              </ProgressRing>

              {/* Minimal Controls */}
              <div className="flex items-center space-x-4">
                {timerRunning ? (
                  <Button variant="secondary" onClick={pauseTimer} className="px-8">
                    <Pause className="w-4 h-4 mr-2" /> Pause
                  </Button>
                ) : (
                  <Button variant="primary" onClick={startTimer} className="px-8" disabled={timerTimeLeft <= 0}>
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
          /* Standard Dashboard/Route View */
          <motion.div
            key="standard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-lg flex flex-col items-center"
          >
            
            {/* Header Control Row */}
            <div className="w-full flex justify-end mb-8">
              <IconButton
                variant="ghost"
                ariaLabel="Enter Fullscreen Focus Mode"
                onClick={() => setFullscreenMode('timer')}
                title="Fullscreen Focus Mode (F)"
              >
                <Maximize2 className="w-5 h-5 text-text-primary" />
              </IconButton>
            </div>

            {/* Central Progress Display Card */}
            <div className="bg-card border border-border-default rounded-2xl p-8 shadow-light-md dark:shadow-dark-default w-full flex flex-col items-center mb-8">
              <ProgressRing progress={progress} size={280} colorClass="text-primary">
                <div className="text-4xl sm:text-5xl font-bold font-mono tracking-tight text-text-primary">
                  {formatTime(timerTimeLeft)}
                </div>
                {timerCompleted && (
                  <span className="text-xs text-success font-semibold tracking-wider uppercase mt-1">Completed</span>
                )}
              </ProgressRing>

              {/* Essential Controls */}
              <div className="flex items-center space-x-3 mt-8">
                {timerRunning ? (
                  <Button variant="secondary" onClick={pauseTimer} className="w-28">
                    <Pause className="w-4 h-4 mr-2" /> Pause
                  </Button>
                ) : (
                  <Button variant="primary" onClick={startTimer} className="w-28" disabled={timerTimeLeft <= 0}>
                    <Play className="w-4 h-4 mr-2" /> Start
                  </Button>
                )}
                
                <Button variant="secondary" onClick={resetTimer} className="w-28" disabled={timerTimeLeft === timerDuration && !timerCompleted}>
                  <RotateCcw className="w-4 h-4 mr-2" /> Reset
                </Button>
              </div>
            </div>

            {/* Presets Grid */}
            <div className="bg-card border border-border-default rounded-2xl p-6 shadow-light-sm dark:shadow-none w-full mb-6">
              <h3 className="text-sm font-semibold text-text-secondary mb-4">Presets</h3>
              <div className="grid grid-cols-5 gap-2">
                {[5, 10, 15, 25, 60].map((mins) => (
                  <button
                    key={mins}
                    onClick={() => handlePresetClick(mins)}
                    className="h-10 bg-bg-secondary hover:bg-card-hover border border-border-default/50 hover:border-border-strong text-text-primary text-xs font-semibold rounded-lg transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {mins}m
                  </button>
                ))}
              </div>
            </div>

            {/* Custom duration setup form */}
            <div className="bg-card border border-border-default rounded-2xl p-6 shadow-light-sm dark:shadow-none w-full">
              <h3 className="text-sm font-semibold text-text-secondary mb-4">Custom Duration</h3>
              <form onSubmit={handleStartCustom} className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col">
                    <label htmlFor="hours-input" className="text-2xs text-text-muted font-medium uppercase mb-1.5 ml-1">Hours</label>
                    <input
                      id="hours-input"
                      type="number"
                      min="0"
                      max="23"
                      value={hours}
                      onChange={(e) => setHours(e.target.value)}
                      placeholder="0"
                      className="h-12 bg-bg-secondary text-text-primary rounded-xl border border-border-default px-4 text-center font-mono font-medium outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="mins-input" className="text-2xs text-text-muted font-medium uppercase mb-1.5 ml-1">Minutes</label>
                    <input
                      id="mins-input"
                      type="number"
                      min="0"
                      max="59"
                      value={minutes}
                      onChange={(e) => setMinutes(e.target.value)}
                      placeholder="25"
                      className="h-12 bg-bg-secondary text-text-primary rounded-xl border border-border-default px-4 text-center font-mono font-medium outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="secs-input" className="text-2xs text-text-muted font-medium uppercase mb-1.5 ml-1">Seconds</label>
                    <input
                      id="secs-input"
                      type="number"
                      min="0"
                      max="59"
                      value={seconds}
                      onChange={(e) => setSeconds(e.target.value)}
                      placeholder="0"
                      className="h-12 bg-bg-secondary text-text-primary rounded-xl border border-border-default px-4 text-center font-mono font-medium outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {validationError && (
                  <p className="text-xs text-error font-medium pl-1">{validationError}</p>
                )}

                <Button type="submit" variant="secondary" className="w-full">
                  Apply & Start
                </Button>
              </form>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

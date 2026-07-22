'use client';

import { useTimerStore } from '@/store/useTimerStore';
import { Button } from '@/components/Button';
import { IconButton } from '@/components/IconButton';
import { Maximize2, Minimize2, Play, Pause, RotateCcw, Flag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StopwatchPage() {
  const {
    stopwatchRunning,
    stopwatchTime,
    stopwatchLaps,
    startStopwatch,
    pauseStopwatch,
    resetStopwatch,
    recordStopwatchLap,
    fullscreenMode,
    setFullscreenMode,
  } = useTimerStore();

  // Helper to format ms into HH:MM:SS.hh
  const formatTime = (msTotal: number) => {
    const h = Math.floor(msTotal / 3600000);
    const m = Math.floor((msTotal % 3600000) / 60000);
    const s = Math.floor((msTotal % 60000) / 1000);
    const ms = Math.floor((msTotal % 1000) / 10); // hundredths of a second

    const pad = (n: number) => n.toString().padStart(2, '0');

    return `${pad(h)}:${pad(m)}:${pad(s)}.${pad(ms)}`;
  };

  const isFullscreen = fullscreenMode === 'stopwatch';

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

              {/* Stopwatch display */}
              <div className="text-6xl sm:text-8xl font-bold font-mono tracking-tight text-text-primary tabular-nums">
                {formatTime(stopwatchTime)}
              </div>

              {/* Minimal Controls */}
              <div className="flex items-center space-x-4">
                {stopwatchRunning ? (
                  <>
                    <Button variant="secondary" onClick={pauseStopwatch} className="px-8">
                      <Pause className="w-4 h-4 mr-2" /> Pause
                    </Button>
                    <Button variant="secondary" onClick={recordStopwatchLap} className="px-8">
                      <Flag className="w-4 h-4 mr-2" /> Lap
                    </Button>
                  </>
                ) : (
                  <Button variant="primary" onClick={startStopwatch} className="px-8">
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
          /* Standard Route View */
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
                onClick={() => setFullscreenMode('stopwatch')}
                title="Fullscreen Focus Mode (F)"
              >
                <Maximize2 className="w-5 h-5 text-text-primary" />
              </IconButton>
            </div>

            {/* Main Timer Display Card */}
            <div className="bg-card border border-border-default rounded-2xl p-8 shadow-light-md dark:shadow-dark-default w-full flex flex-col items-center mb-8">
              <div className="text-4xl sm:text-6xl font-bold font-mono tracking-tight text-text-primary mb-8 tabular-nums">
                {formatTime(stopwatchTime)}
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-3 w-full sm:w-auto">
                {stopwatchRunning ? (
                  <>
                    <Button variant="secondary" onClick={pauseStopwatch} className="flex-1 sm:w-28 sm:flex-initial">
                      <Pause className="w-4 h-4 mr-2" /> Pause
                    </Button>
                    <Button variant="secondary" onClick={recordStopwatchLap} className="flex-1 sm:w-28 sm:flex-initial">
                      <Flag className="w-4 h-4 mr-2" /> Lap
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="primary" onClick={startStopwatch} className="flex-1 sm:w-28 sm:flex-initial">
                      <Play className="w-4 h-4 mr-2" /> Start
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={resetStopwatch}
                      className="flex-1 sm:w-28 sm:flex-initial"
                      disabled={stopwatchTime === 0}
                    >
                      <RotateCcw className="w-4 h-4 mr-2" /> Reset
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Lap Log History */}
            {stopwatchLaps.length > 0 && (
              <div className="bg-card border border-border-default rounded-2xl p-6 shadow-light-sm dark:shadow-none w-full">
                <h3 className="text-sm font-semibold text-text-secondary mb-4">Lap History</h3>
                <div className="max-h-60 overflow-y-auto pr-1">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-text-muted border-b border-border-default/50 pb-2 text-2xs font-semibold uppercase tracking-wider text-left">
                        <th className="pb-2 font-semibold">Lap</th>
                        <th className="pb-2 font-semibold">Split (Lap time)</th>
                        <th className="pb-2 font-semibold text-right">Total Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-default/30">
                      {stopwatchLaps.map((lapTotal, index) => {
                        const nextLapTotal = stopwatchLaps[index + 1] || 0;
                        const splitTime = lapTotal - nextLapTotal;
                        const lapNumber = stopwatchLaps.length - index;

                        return (
                          <tr key={lapNumber} className="text-text-primary font-medium hover:bg-bg-secondary/40">
                            <td className="py-2.5 font-mono text-xs">#{lapNumber}</td>
                            <td className="py-2.5 font-mono text-xs text-text-secondary">{formatTime(splitTime)}</td>
                            <td className="py-2.5 font-mono text-xs text-right">{formatTime(lapTotal)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

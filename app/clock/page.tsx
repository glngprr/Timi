'use client';

import { useState, useEffect } from 'react';
import { useSettingsStore } from '@/store/useSettingsStore';
import { AnalogClock } from '@/components/AnalogClock';
import { motion } from 'framer-motion';

type ViewMode = 'digital' | 'analog' | 'both';

export default function ClockPage() {
  const { timeFormat } = useSettingsStore();
  const [viewMode, setViewMode] = useState<ViewMode>('both');
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  // Time ticker effect for the digital clock display
  useEffect(() => {
    const handle = setTimeout(() => setCurrentTime(new Date()), 0);
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => {
      clearTimeout(handle);
      clearInterval(interval);
    };
  }, []);

  if (!currentTime) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[300px] select-none font-sans">
        <div className="h-8 w-60 bg-card-hover rounded-xl animate-pulse mb-6" />
        <div className="h-64 w-64 bg-card-hover rounded-full animate-pulse" />
      </div>
    );
  }

  // Time values for Digital display
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  // Digital Time formatting
  let digitalTimeString = '';
  let ampmString = '';

  if (timeFormat === '12h') {
    const isAm = hours < 12;
    const formattedHours = hours % 12 || 12;
    digitalTimeString = `${formattedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    ampmString = isAm ? ' AM' : ' PM';
  } else {
    digitalTimeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };
  const dateString = currentTime.toLocaleDateString('en-US', dateOptions);

  return (
    <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full font-sans py-4 select-none">
      
      {/* Segmented Control Toggle */}
      <div className="bg-bg-secondary p-1 rounded-xl flex items-center border border-border-default/50 mb-12 shadow-light-sm dark:shadow-none">
        {(['digital', 'analog', 'both'] as ViewMode[]).map((mode) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`px-5 py-2 text-xs font-semibold rounded-lg capitalize transition-all duration-150 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              viewMode === mode
                ? 'bg-card text-primary font-bold shadow-light-sm dark:shadow-dark-default border border-border-default/20'
                : 'text-text-secondary hover:text-text-primary border border-transparent'
            }`}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* Main Clock Displays */}
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16">
        
        {/* Digital Clock */}
        {(viewMode === 'digital' || viewMode === 'both') && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.15 }}
            className={`flex flex-col items-center justify-center bg-card border border-border-default rounded-2xl p-8 shadow-light-md dark:shadow-dark-default w-full max-w-sm h-72 ${
              viewMode === 'both' ? 'md:max-w-md' : 'max-w-md'
            }`}
          >
            <div className="text-4xl sm:text-5xl font-bold font-mono tracking-tight text-text-primary mb-2">
              {digitalTimeString}
              {ampmString && <span className="text-lg font-sans font-normal text-text-secondary align-middle ml-1">{ampmString}</span>}
            </div>
            <div className="text-sm sm:text-base text-text-secondary font-medium text-center">
              {dateString}
            </div>
          </motion.div>
        )}

        {/* Analog Clock */}
        {(viewMode === 'analog' || viewMode === 'both') && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.15 }}
            className={`flex flex-col items-center justify-center bg-card border border-border-default rounded-2xl p-8 shadow-light-md dark:shadow-dark-default w-full max-w-sm h-72`}
          >
            <div className="w-48 h-48 sm:w-52 sm:h-52">
              <AnalogClock />
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}

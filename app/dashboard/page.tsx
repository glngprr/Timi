'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSettingsStore } from '@/store/useSettingsStore';
import { Clock, Hourglass, Timer, Target, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const { timeFormat } = useSettingsStore();
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    const handle = setTimeout(() => setTime(new Date()), 0);
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => {
      clearTimeout(handle);
      clearInterval(interval);
    };
  }, []);

  if (!time) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[300px] select-none font-sans">
        <div className="h-16 w-72 bg-card-hover rounded-2xl animate-pulse mb-3" />
        <div className="h-6 w-48 bg-card-hover rounded-xl animate-pulse" />
      </div>
    );
  }

  // Format Time
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  
  let timeString = '';
  let ampmString = '';
  
  if (timeFormat === '12h') {
    const isAm = hours < 12;
    const formattedHours = hours % 12 || 12;
    timeString = `${formattedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    ampmString = isAm ? ' AM' : ' PM';
  } else {
    timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  // Format Date
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };
  const dateString = time.toLocaleDateString('en-US', dateOptions);

  const tools = [
    {
      title: 'Clock',
      description: 'View digital & analog local time',
      href: '/clock',
      icon: Clock,
      color: 'text-primary bg-primary/10',
    },
    {
      title: 'Timer',
      description: 'Countdown timer with presets',
      href: '/timer',
      icon: Hourglass,
      color: 'text-success bg-success/10',
    },
    {
      title: 'Stopwatch',
      description: 'Log laps with millisecond accuracy',
      href: '/stopwatch',
      icon: Timer,
      color: 'text-warning bg-warning/10',
    },
    {
      title: 'Pomodoro',
      description: 'Focus blocks with session tracking',
      href: '/pomodoro',
      icon: Target,
      color: 'text-pomo-long bg-pomo-long/10',
    },
  ];

  return (
    <div className="flex-1 flex flex-col justify-center py-6 sm:py-12 max-w-4xl mx-auto w-full font-sans select-none">
      {/* Dynamic Digital Clock Display */}
      <div className="text-center mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="text-5xl sm:text-7xl font-bold tracking-tight font-mono text-text-primary mb-3"
        >
          {timeString}
          {ampmString && <span className="text-xl sm:text-2xl font-sans font-normal text-text-secondary align-middle ml-1">{ampmString}</span>}
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.05 }}
          className="text-base sm:text-lg text-text-secondary font-medium"
        >
          {dateString}
        </motion.p>
      </div>

      {/* Tools Quick Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tools.map((tool, index) => {
          const Icon = tool.icon;
          return (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.1 + index * 0.05 }}
            >
              <Link
                href={tool.href}
                className="flex items-center justify-between p-6 bg-card border border-border-default/60 hover:border-border-default hover:bg-card-hover rounded-2xl transition-all duration-200 shadow-light-md dark:shadow-none hover:shadow-light-lg hover:-translate-y-0.5 outline-none focus-visible:ring-2 focus-visible:ring-primary group"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${tool.color} transition-transform duration-200 group-hover:scale-105`}>
                    <Icon className="w-6 h-6 stroke-[2px]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary text-base sm:text-lg mb-0.5">{tool.title}</h3>
                    <p className="text-text-secondary text-2xs sm:text-xs leading-relaxed">{tool.description}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-text-secondary transition-colors duration-150 transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

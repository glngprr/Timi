'use client';

import { useState, useEffect, useRef } from 'react';

export function AnalogClock() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    const tick = () => {
      setCurrentTime(new Date());
      requestRef.current = requestAnimationFrame(tick);
    };
    requestRef.current = requestAnimationFrame(tick);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  if (!currentTime) {
    return (
      <div className="w-full h-full rounded-full bg-bg-secondary/40 animate-pulse transition-colors" />
    );
  }

  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  const ms = currentTime.getMilliseconds();

  // Angle calculations for smooth sweep (mechanical sweeper hand)
  const secondAngle = (seconds + ms / 1000) * 6; // 6 degrees per second
  const minuteAngle = (minutes + seconds / 60) * 6; // 6 degrees per minute
  const hourAngle = ((hours % 12) + minutes / 60 + seconds / 3600) * 30; // 30 degrees per hour

  return (
    <div className="relative w-full h-full select-none">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Clock Face Outer Ring */}
        <circle
          cx="100"
          cy="100"
          r="98"
          className="fill-bg-secondary stroke-border-default transition-colors duration-150"
          strokeWidth="1.5"
        />

        {/* Minimal Hour Tick Markings (every 30 degrees) */}
        {[...Array(12)].map((_, i) => {
          const angle = i * 30 * (Math.PI / 180);
          const isMajor = i % 3 === 0;
          const length = isMajor ? 8 : 4;
          const x1 = 100 + Math.sin(angle) * 88;
          const y1 = 100 - Math.cos(angle) * 88;
          const x2 = 100 + Math.sin(angle) * (88 - length);
          const y2 = 100 - Math.cos(angle) * (88 - length);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              className="stroke-text-muted transition-colors duration-150"
              strokeWidth={isMajor ? 2.5 : 1.5}
              strokeLinecap="round"
            />
          );
        })}

        {/* Hour Hand */}
        <line
          x1="100"
          y1="100"
          x2={100 + Math.sin(hourAngle * (Math.PI / 180)) * 52}
          y2={100 - Math.cos(hourAngle * (Math.PI / 180)) * 52}
          className="stroke-text-primary transition-colors duration-150"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Minute Hand */}
        <line
          x1="100"
          y1="100"
          x2={100 + Math.sin(minuteAngle * (Math.PI / 180)) * 74}
          y2={100 - Math.cos(minuteAngle * (Math.PI / 180)) * 74}
          className="stroke-text-secondary transition-colors duration-150"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Smooth Sweeping Second Hand (Accent Primary Blue #2F80ED) */}
        <line
          x1="100"
          y1="100"
          x2={100 + Math.sin(secondAngle * (Math.PI / 180)) * 84}
          y2={100 - Math.cos(secondAngle * (Math.PI / 180)) * 84}
          className="stroke-primary"
          strokeWidth="1.75"
          strokeLinecap="round"
        />

        {/* Center Pivot Pin Cover */}
        <circle
          cx="100"
          cy="100"
          r="4.5"
          className="fill-background stroke-primary"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}

import React from 'react';

interface ProgressRingProps {
  progress: number; // 0 to 1
  size?: number; // diameter in pixels
  strokeWidth?: number;
  colorClass?: string; // e.g., 'text-primary'
  children?: React.ReactNode; // text content centered inside
}

export function ProgressRing({
  progress,
  size = 280,
  strokeWidth = 12,
  colorClass = 'text-primary',
  children,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  // Ensure strokeDashoffset is bounded between 0 and circumference
  const safeProgress = Math.max(0, Math.min(1, progress));
  const strokeDashoffset = circumference - safeProgress * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className="-rotate-90 select-none"
      >
        {/* Background circle */}
        <circle
          className="text-remaining-ring transition-colors duration-150"
          stroke="currentColor"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Foreground (progress) circle */}
        <circle
          className={`${colorClass} transition-all duration-300 ease-out`}
          stroke="currentColor"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      {children && (
        <div className="absolute flex flex-col items-center justify-center text-center">
          {children}
        </div>
      )}
    </div>
  );
}

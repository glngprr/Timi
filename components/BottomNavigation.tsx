'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Clock, Hourglass, Timer, Target } from 'lucide-react';
import { useTimerStore } from '@/store/useTimerStore';

export function BottomNavigation() {
  const pathname = usePathname();
  const fullscreenMode = useTimerStore((state) => state.fullscreenMode);

  // Hide in fullscreen focus mode
  if (fullscreenMode) return null;

  const navLinks = [
    { label: 'Clock', href: '/clock', icon: Clock },
    { label: 'Timer', href: '/timer', icon: Hourglass },
    { label: 'Stopwatch', href: '/stopwatch', icon: Timer },
    { label: 'Pomodoro', href: '/pomodoro', icon: Target },
  ];

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 h-16 bg-background border-t border-border-default flex items-center justify-around px-2 shadow-light-sm dark:shadow-none">
      {navLinks.map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-col items-center justify-center flex-1 h-full py-1 text-2xs transition-all duration-150 outline-none ${
              isActive 
                ? 'text-primary font-bold' 
                : 'text-text-secondary hover:text-text-primary font-medium'
            }`}
          >
            <Icon className={`w-5 h-5 mb-1 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
            <span>{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Settings } from 'lucide-react';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { useTimerStore } from '@/store/useTimerStore';

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const fullscreenMode = useTimerStore((state) => state.fullscreenMode);

  useEffect(() => {
    if (pathname !== '/') return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // Hide completely in fullscreen focus mode
  if (fullscreenMode) return null;

  const isLanding = pathname === '/';
  
  // Header behavior: transparent on Landing, solid on scroll. Solid on other pages.
  const navbarBg = isLanding 
    ? (isScrolled ? 'bg-background/95 border-b border-border-default backdrop-blur-xs' : 'bg-transparent border-b border-transparent')
    : 'bg-background border-b border-border-default';

  const navLinks = [
    { label: 'Clock', href: '/clock' },
    { label: 'Timer', href: '/timer' },
    { label: 'Stopwatch', href: '/stopwatch' },
    { label: 'Pomodoro', href: '/pomodoro' },
  ];

  return (
    <header className={`sticky top-0 z-40 w-full h-[72px] flex items-center justify-between px-6 md:px-12 transition-all duration-200 ${navbarBg}`}>
      {/* Logo */}
      <Link href="/dashboard" className="flex items-center outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg">
        <Logo type="icon" />
      </Link>

      {/* Nav Links - hidden on mobile, shown on desktop */}
      <nav className="hidden sm:flex items-center space-x-8">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-sm transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-2 py-1 ${
                isActive 
                  ? 'text-primary font-bold font-sans' 
                  : 'text-text-secondary hover:text-text-primary font-medium font-sans'
              }`}
            >
              {link.label}
              {isActive && (
                <span className="absolute left-2 right-2 bottom-[-8px] h-[2px] bg-primary rounded-full animate-fade-in" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Settings & Theme */}
      <div className="flex items-center space-x-2">
        <ThemeToggle />
        <Link
          href="/settings"
          className="flex items-center justify-center rounded-xl transition-all duration-150 cursor-pointer select-none active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 w-11 h-11 bg-transparent hover:bg-card-hover border-none text-text-secondary hover:text-text-primary"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5 text-text-primary" />
        </Link>
      </div>
    </header>
  );
}

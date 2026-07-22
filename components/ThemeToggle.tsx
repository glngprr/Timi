'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { IconButton } from './IconButton';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handle = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(handle);
  }, []);

  if (!mounted) {
    return <div className="w-11 h-11" />; 
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <IconButton
      variant="ghost"
      ariaLabel="Toggle theme"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? (
        <Sun className="w-5 h-5 transition-transform duration-200" />
      ) : (
        <Moon className="w-5 h-5 transition-transform duration-200" />
      )}
    </IconButton>
  );
}

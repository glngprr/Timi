'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface LogoProps {
  type?: 'horizontal' | 'icon' | 'stacked';
  width?: number;
  height?: number;
}

export function Logo({ type = 'horizontal', width, height }: LogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handle = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(handle);
  }, []);

  // Standard sizes
  const defaultWidth = type === 'horizontal' ? 120 : type === 'stacked' ? 140 : 32;
  const defaultHeight = type === 'stacked' ? 80 : 32;

  if (!mounted) {
    // Return a placeholder structure during server side rendering to prevent layout shift
    return <div style={{ width: width || defaultWidth, height: height || defaultHeight }} />;
  }

  const isDark = resolvedTheme === 'dark';
  
  let src = '';
  if (type === 'horizontal') {
    src = isDark ? '/assets/logo/logo-horizontal-dark.svg' : '/assets/logo/logo-horizontal-light.svg';
  } else if (type === 'stacked') {
    src = isDark ? '/assets/logo/logo-stacked-dark.svg' : '/assets/logo/logo-stacked-light.svg';
  } else {
    src = isDark ? '/assets/logo/logo-icon-dark.svg' : '/assets/logo/logo-icon-light.svg';
  }

  return (
    <Image
      src={src}
      alt="Timi"
      width={width || defaultWidth}
      height={height || defaultHeight}
      priority
      className="object-contain"
    />
  );
}

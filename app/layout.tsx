import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ActiveTimerRunner } from '@/components/ActiveTimerRunner';
import { KeyboardShortcutHandler } from '@/components/KeyboardShortcutHandler';
import { Navbar } from '@/components/Navbar';
import { BottomNavigation } from '@/components/BottomNavigation';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Timi',
  description: 'A minimal, distraction-free productivity toolkit combining clock, timer, stopwatch, and Pomodoro.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body 
        className="min-h-full flex flex-col bg-background text-text-primary antialiased"
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ActiveTimerRunner />
          <KeyboardShortcutHandler />

          <Navbar />

          {/* Main content wrapper with padding matching bottom-nav on mobile, centered max-width 1280px */}
          <main className="flex-1 w-full max-w-[1280px] mx-auto px-6 md:px-12 pt-4 pb-24 sm:pb-12 flex flex-col">
            {children}
          </main>

          <BottomNavigation />

          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3000,
              className: '!bg-card !border !border-border-default !text-text-primary !rounded-xl !shadow-md font-sans text-sm',
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}

'use client';

import Link from 'next/link';
import { ArrowRight, Clock, Hourglass, Timer, Target } from 'lucide-react';
import { Button } from '@/components/Button';
import { Logo } from '@/components/Logo';
import { AnalogClock } from '@/components/AnalogClock';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const features = [
    {
      icon: Clock,
      title: 'Digital & Analog Clock',
      description: 'Accurate local time in elegant 12/24 hour format alongside a responsive, smooth-sweeping analog clock face.',
    },
    {
      icon: Hourglass,
      title: 'Countdown Timer',
      description: 'Quick presets and custom duration inputs. Tracks progress visually with responsive rings, notifications, and soft sound alerts.',
    },
    {
      icon: Timer,
      title: 'Stopwatch',
      description: 'Measure elapsed time with millisecond precision, and log scrollable lap intervals to monitor splits.',
    },
    {
      icon: Target,
      title: 'Pomodoro Timer',
      description: 'Implement structured study or work focus blocks. Custom interval durations, auto-breaks, and session counters.',
    },
  ];

  const handleExploreClick = () => {
    document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col items-center justify-between w-full min-h-[calc(100vh-72px)] pt-3 sm:pt-4 pb-8 font-sans">
      
      {/* Hero Section: Two columns on desktop, stacked on mobile */}
      <section className="w-full pt-0 pb-12 md:pb-20 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8 flex-1">
        
        {/* Left Column (45% on desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="w-full lg:w-[45%] flex flex-col items-center lg:items-start text-center lg:text-left space-y-6"
        >
          {/* Brand Heading & Headline */}
          <div className="space-y-3 flex flex-col items-center lg:items-start">
            <span className="text-5xl sm:text-[64px] lg:text-[80px] font-bold text-text-primary select-none tracking-tight leading-none">
              Timi
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-primary select-none tracking-wide">
              Every Second Counts
            </h1>
          </div>

          <p className="text-sm md:text-base text-text-secondary max-w-md leading-relaxed select-none">
            Clock, Timer, Stopwatch, and Pomodoro in one fast, elegant, distraction-free workspace.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/pomodoro" className="w-full sm:w-auto">
              <Button variant="primary" className="w-full sm:w-auto group">
                Start Focus Session
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-150 group-hover:translate-x-1" />
              </Button>
            </Link>
            <Button variant="secondary" onClick={handleExploreClick} className="w-full sm:w-auto">
              Explore Features
            </Button>
          </div>
        </motion.div>

        {/* Right Column (55% on desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.1, ease: 'easeOut' }}
          className="w-full lg:w-[55%] flex items-center justify-center"
        >
          {/* Large Live Analog Clock (420px to 520px on desktop) */}
          <div className="w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[420px] md:h-[420px] lg:w-[480px] lg:h-[480px] aspect-square transition-all duration-200">
            <AnalogClock />
          </div>
        </motion.div>

      </section>

      {/* Feature Cards Grid Section */}
      <section id="features-section" className="w-full py-16 border-t border-border-default/50">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">Timing Toolkit</h2>
          <p className="text-text-secondary text-sm md:text-base">Everything you need to master your schedule in a single dashboard.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: i * 0.05, ease: 'easeOut' }}
                className="bg-card border border-border-default/60 p-6 rounded-xl hover:border-border-default hover:bg-card-hover transition-all duration-200 shadow-light-md dark:shadow-none hover:shadow-light-lg hover:-translate-y-0.5 group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 transition-transform duration-200 group-hover:scale-105">
                  <Icon className="w-5 h-5 stroke-[2px]" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">{feature.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="w-full pt-12 pb-4 border-t border-border-default/50 flex flex-col items-center justify-center text-center">
        <div className="mb-4">
          <Logo type="horizontal" width={140} height={40} />
        </div>
        <p className="text-text-muted text-xs mb-1 font-sans">
          Copyright &copy; {new Date().getFullYear()} Timi. All rights reserved.
        </p>
        <p className="text-text-muted text-2xs font-mono">
          Version 1.0
        </p>
      </footer>

    </div>
  );
}

'use client';

import Link from 'next/link';
import { Button } from '@/components/Button';
import { Logo } from '@/components/Logo';
import { HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center font-sans py-12 px-6 select-none max-w-md mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="space-y-8 flex flex-col items-center"
      >
        {/* Logo */}
        <Logo type="horizontal" width={110} height={30} />

        {/* Big icon */}
        <div className="w-16 h-16 rounded-2xl bg-warning/10 flex items-center justify-center text-warning animate-pulse">
          <HelpCircle className="w-8 h-8 stroke-[2px]" />
        </div>

        {/* Text descriptions */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-text-primary">Page Not Found</h2>
          <p className="text-xs text-text-secondary leading-relaxed">
            The page you are looking for doesn&apos;t exist, is temporarily unavailable, or has been moved.
          </p>
        </div>

        {/* CTA Redirect Button */}
        <Link href="/dashboard" className="w-full">
          <Button variant="primary" className="w-full">
            Back to Dashboard
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}

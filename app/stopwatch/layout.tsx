import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Timi - Stopwatch',
};

export default function StopwatchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

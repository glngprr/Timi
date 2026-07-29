import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Timi - Timer',
};

export default function TimerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

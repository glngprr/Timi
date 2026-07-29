import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Time to focus!',
};

export default function PomodoroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

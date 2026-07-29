import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Timi - Clock',
};

export default function ClockLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

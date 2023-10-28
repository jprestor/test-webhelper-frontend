import type { Metadata } from 'next';

import { Header } from './Header';
import { cn } from '@/lib';
import { roboto } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'WBHelper frontend test',
  description: 'WBHelper frontend test app by Dmitriy Miroshnichenko',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={cn('flex flex-col min-h-screen', roboto.className)}>
        <Header />
        <main className="grow">{children}</main>
      </body>
    </html>
  );
}

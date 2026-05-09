import { DM_Sans, DM_Serif_Display } from 'next/font/google';
import Providers from './providers';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-dm-serif',
  display: 'swap',
});

export const metadata = {
  title: 'Avio: Your Guide for 1st month',
  description: 'Your daily companion for the first month with your newborn.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Avio',
  },
  icons: {
    icon: '/icon-512.png',
    apple: '/icon-192.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <body className="bg-cream font-sans text-avio-text">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

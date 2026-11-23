import type { Metadata } from 'next';
import { DM_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ToastProvider } from '@/components/ToastProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'BLAZE CALCULATOR — Numbers with a Touch of Love',
    template: '%s | BLAZE CALCULATOR',
  },
  description:
    'Discover your exact age, explore your connections, and uncover your compatibility — all in one elegant Rose Edition calculator platform.',
  openGraph: {
    title: 'BLAZE CALCULATOR — Numbers with a Touch of Love',
    description:
      'Discover your exact age, explore your connections, and uncover your compatibility — all in one elegant Rose Edition calculator platform.',
    type: 'website',
    siteName: 'BLAZE CALCULATOR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BLAZE CALCULATOR — Numbers with a Touch of Love',
    description:
      'Discover your exact age, explore your connections, and uncover your compatibility — all in one elegant Rose Edition calculator platform.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${playfairDisplay.variable}`}
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
        className="flex min-h-screen flex-col bg-[#FFF8FB] text-[#542B3C] antialiased transition-colors duration-200 dark:bg-[#160B10] dark:text-[#F7E8EF]"
      >
        <ThemeProvider>
          <ToastProvider>
            <Navbar />
            <main className="flex flex-1 flex-col">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

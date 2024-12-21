import './globals.css';
import { Inter } from 'next/font/google';
import { RootLayoutClient } from '@/components/layout/RootLayoutClient';
import { LoadingProvider } from '@/components/providers/LoadingProvider';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Wizardry Exam Platform',
  description: 'Test your magical knowledge and skills',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LoadingProvider>
            <RootLayoutClient>
              {children}
            </RootLayoutClient>
            <Toaster />
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

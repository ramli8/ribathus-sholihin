import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Outfit } from 'next/font/google';
import './globals.css';

const sans = Plus_Jakarta_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
});

const outfit = Outfit({
  variable: '--font-heading',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Pondok Pesantren Ribathus Sholihin',
  description: 'Website Profil Pondok Pesantren Ribathus Sholihin',
};

import { ThemeProvider } from '@/components/ThemeProvider';
import { SidebarProvider } from '@/context/SidebarContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${sans.variable} ${outfit.variable} antialiased min-h-screen bg-zinc-50 font-sans text-zinc-800`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SidebarProvider>{children}</SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

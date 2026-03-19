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

import { getProfil } from '@/services/profilService';

export async function generateMetadata(): Promise<Metadata> {
  let profil = null;
  try {
    profil = await getProfil();
  } catch (error) {
    console.error('Failed to fetch profil for metadata:', error);
  }

  const nama = profil?.nama || 'Pondok Pesantren Ribathus Sholihin';
  const deskripsi =
    profil?.deskripsi || 'Website Profil Pondok Pesantren Ribathus Sholihin';
  const logoUrl = profil?.logoUrl || '/favicon.ico';

  return {
    title: {
      default: nama,
      template: `%s | ${nama}`,
    },
    description: deskripsi,
    icons: {
      icon: logoUrl,
      apple: logoUrl,
    },
    openGraph: {
      title: nama,
      description: deskripsi,
      siteName: nama,
      images: [
        {
          url: logoUrl,
          width: 800,
          height: 600,
          alt: `Logo ${nama}`,
        },
      ],
      locale: 'id_ID',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: nama,
      description: deskripsi,
      images: [logoUrl],
    },
  };
}

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

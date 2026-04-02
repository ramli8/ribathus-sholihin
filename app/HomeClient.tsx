'use client';

import Navigasi from '@/components/Navigasi';
import Beranda from '@/components/Beranda';
import Profil from '@/components/Profil';
import Pendidikan from '@/components/Pendidikan';
import Pendaftaran from '@/components/Pendaftaran';
import Fasilitas from '@/components/Fasilitas';
import Kegiatan from '@/components/Kegiatan';
import Berita from '@/components/Berita';
import Donasi from '@/components/Donasi';
import Kontak from '@/components/Kontak';

interface HomeClientProps {
  profil: any;
  beritaList: any[];
}

export default function HomeClient({ profil, beritaList }: HomeClientProps) {
  return (
    <main className="min-h-screen bg-white dark:bg-black font-sans scroll-smooth">
      <Navigasi />
      <Beranda />
      <Profil />
      <Pendidikan />
      <Pendaftaran />
      <Fasilitas />
      <Kegiatan />
      <Donasi />
      <Berita />
      <Kontak />
    </main>
  );
}

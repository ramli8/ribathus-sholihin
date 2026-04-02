'use client';

import { useProfil } from '@/hooks/useProfil';
import LoadingScreen from '@/components/common/LoadingScreen';
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

export default function Home() {
  const { loading } = useProfil();

  return (
    <>
      <LoadingScreen isLoading={loading} />
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
    </>
  );
}

'use client';

import type { ProfilData } from '@/hooks/useProfil';
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

interface BeritaItem {
  id: number;
  judul: string;
  slug: string;
  isi: string;
  coverUrl?: string | null;
  kategori?: string | null;
  penulis?: string | null;
  viewed: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

interface HomeContentProps {
  profile: ProfilData | null;
  beritaList: BeritaItem[];
}

export default function HomeContent({ profile, beritaList }: HomeContentProps) {
  return (
    <main className="min-h-screen bg-white dark:bg-black font-sans scroll-smooth">
      <Navigasi profile={profile} />
      <Beranda profile={profile} />
      <Profil profile={profile} />
      <Pendidikan profile={profile} />
      <Pendaftaran profile={profile} />
      <Fasilitas profile={profile} />
      <Kegiatan profile={profile} />
      <Donasi profile={profile} />
      <Berita profile={profile} beritaList={beritaList} />
      <Kontak profile={profile} />
    </main>
  );
}

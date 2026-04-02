import { getProfil } from '@/services/profilService';
import db from '@/lib/db';
import HomeClient from './HomeClient';

export const revalidate = 60; // Revalidate setiap 60 detik

export default async function Home() {
  // Fetch semua data di server — 0 loading di client
  const [profil, beritaList, fasilitasList, ekstraList] = await Promise.all([
    getProfil(),
    db.berita.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 6,
    }),
    // Fasilitas & Ekstrakurikuler data is in profil, no extra fetch needed
    Promise.resolve(null),
    Promise.resolve(null),
  ]);

  return <HomeClient profil={profil} beritaList={beritaList} />;
}

import { getCachedProfil, getCachedBeritaPublished } from '@/lib/cache';
import HomeContent from '@/components/HomeContent';

export default async function Home() {
  // Fetch ALL data once on the server, cached for 60s via ISR
  const [profil, beritaList] = await Promise.all([
    getCachedProfil(),
    getCachedBeritaPublished(),
  ]);

  // Serialize dates for client components
  const serializedProfil = profil ? JSON.parse(JSON.stringify(profil)) : null;
  const serializedBerita = beritaList.map((b) => JSON.parse(JSON.stringify(b)));

  return <HomeContent profile={serializedProfil} beritaList={serializedBerita} />;
}

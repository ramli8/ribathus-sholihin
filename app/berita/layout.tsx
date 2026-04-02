import { getCachedProfil } from '@/lib/cache';
import Navigasi from '@/components/Navigasi';
import Kontak from '@/components/Kontak';

export default async function BeritaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profil = await getCachedProfil();
  const profile = profil ? JSON.parse(JSON.stringify(profil)) : null;

  return (
    <div className="flex flex-col min-h-screen">
      <Navigasi profile={profile} />
      <main className="flex-1">{children}</main>
      <Kontak profile={profile} />
    </div>
  );
}

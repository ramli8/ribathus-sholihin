import { unstable_cache } from 'next/cache';
import { findProfil } from '@/repositories/profilRepository';
import { findManyBerita } from '@/repositories/beritaRepository';

/**
 * Cached version of findProfil — revalidates every 60 seconds.
 * Uses Next.js Data Cache so serverless cold starts only hit DB
 * once per 60s instead of every request.
 */
export const getCachedProfil = unstable_cache(
  async () => {
    const profil = await findProfil();
    return profil;
  },
  ['profil-data'],
  { revalidate: 60, tags: ['profil'] }
);

/**
 * Cached version of published berita list.
 */
export const getCachedBeritaPublished = unstable_cache(
  async () => {
    const berita = await findManyBerita({ published: true });
    return berita;
  },
  ['berita-published'],
  { revalidate: 60, tags: ['berita'] }
);

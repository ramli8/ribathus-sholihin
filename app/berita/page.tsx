import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowRight, Newspaper } from 'lucide-react';
import db from '@/lib/db';

export const metadata = {
  title: 'Semua Berita | Ribathus Sholihin',
  description:
    'Daftar semua berita, artikel, dan warta kegiatan santri di Pondok Pesantren Ribathus Sholihin.',
};

export default async function SemuaBeritaPage() {
  const beritaList = await db.berita.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 font-heading tracking-tight">
            Semua{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">
              Berita & Artikel
            </span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Kumpulan informasi, warta kegiatan santri, dan artikel inspiratif
            dari Pondok Pesantren Ribathus Sholihin.
          </p>
        </div>

        {beritaList.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Newspaper className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Belum Ada Berita
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Silakan kembali lagi nanti untuk membaca berita terbaru.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beritaList.map((berita) => (
              <Link
                href={`/berita/${berita.slug}`}
                key={berita.id}
                className="group block"
              >
                <article className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1 h-full flex flex-col">
                  {/* Image */}
                  <div className="relative w-full aspect-[16/10] bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    {berita.coverUrl ? (
                      <Image
                        src={berita.coverUrl}
                        alt={berita.judul}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                        <Newspaper className="w-12 h-12 opacity-50" />
                      </div>
                    )}
                    {berita.kategori && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm text-emerald-700 dark:text-emerald-400 text-xs font-semibold rounded-full shadow-sm">
                          {berita.kategori}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 mb-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(berita.createdAt).toLocaleDateString(
                            'id-ID',
                            {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            }
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User className="w-4 h-4" />
                        <span>{berita.penulis || 'Admin'}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                      {berita.judul}
                    </h3>

                    <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-6 flex-grow">
                      {berita.isi
                        .replace(/<[^>]*>?/g, '')
                        .replace(/&nbsp;/g, ' ')
                        .substring(0, 150)}
                      ...
                    </p>

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-auto flex items-center justify-between text-sm font-medium text-emerald-600 dark:text-emerald-400">
                      <span>Baca detail</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

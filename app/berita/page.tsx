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
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 pt-32 pb-24 font-sans">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 md:mb-24">
          <h1 className="text-3xl md:text-5xl lg:text-[4rem] font-bold text-stone-900 dark:text-stone-100 mb-6 font-heading tracking-tight leading-[1.1] text-balance">
            Semua{' '}
            <span className="text-emerald-900 dark:text-emerald-500 block sm:inline">
              Berita & Artikel
            </span>
          </h1>
          <p className="text-stone-600 dark:text-stone-400 text-lg md:text-xl font-normal leading-relaxed mt-6 max-w-2xl mx-auto">
            Kumpulan informasi, warta kegiatan santri, dan artikel inspiratif
            dari perjalanan Pondok Pesantren Ribathus Sholihin.
          </p>
        </div>

        {beritaList.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-stone-900 rounded-[2rem] border border-stone-200/60 dark:border-stone-800 shadow-sm">
            <div className="w-16 h-16 bg-stone-100 dark:bg-stone-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Newspaper className="w-8 h-8 text-stone-400" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-2 font-heading">
              Belum Ada Berita
            </h3>
            <p className="text-stone-500 dark:text-stone-400 font-light">
              Silakan kembali lagi nanti untuk membaca volume terbaru.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {beritaList.map((berita) => (
              <Link
                href={`/berita/${berita.slug}`}
                key={berita.id}
                className="group block relative rounded-[2rem] overflow-hidden bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800 shadow-sm hover:shadow-md transition-all duration-300 h-full min-h-[28rem] hover:-translate-y-1 flex flex-col"
              >
                <article className="h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-56 bg-stone-100 dark:bg-stone-800 overflow-hidden shrink-0 border-b border-stone-100 dark:border-stone-800">
                    {berita.coverUrl ? (
                      <Image
                        src={berita.coverUrl}
                        alt={berita.judul}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-stone-300 dark:text-stone-700">
                        <Newspaper className="w-12 h-12" />
                      </div>
                    )}
                    {/* Dark subtle overlay for editorial feeling */}
                    <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />

                    {/* Category Badge Floating on Image */}
                    {berita.kategori && (
                      <div className="absolute top-4 left-4 z-20">
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 font-bold text-[10px] tracking-widest shadow-sm uppercase">
                          {berita.kategori}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8 flex flex-col flex-grow relative z-10">
                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-stone-500 dark:text-stone-400 mb-5 font-medium">
                      <div className="flex items-center gap-1.5 bg-stone-50 dark:bg-stone-800 border border-stone-200/50 dark:border-stone-700 px-2 py-1 rounded-md">
                        <Calendar className="w-3 h-3 text-stone-400" />
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
                        <User className="w-3 h-3 text-stone-400" />
                        <span>{berita.penulis || 'Admin'}</span>
                      </div>
                    </div>

                    <h3 className="block font-bold text-stone-900 dark:text-stone-100 mb-4 group-hover:text-emerald-900 dark:group-hover:text-emerald-400 transition-colors font-heading line-clamp-3 md:line-clamp-2 text-xl md:text-2xl min-h-[3.5rem]">
                      {berita.judul}
                    </h3>

                    <p className="text-stone-600 dark:text-stone-400 text-[15px] mb-8 line-clamp-2 md:line-clamp-3 leading-relaxed font-normal">
                      {berita.isi
                        .replace(/<[^>]*>?/g, '')
                        .replace(/&nbsp;/g, ' ')
                        .substring(0, 150)}
                      ...
                    </p>

                    {/* Read More Link */}
                    <div className="pt-5 border-t border-stone-100 dark:border-stone-800 mt-auto flex items-center justify-between text-sm">
                      <span className="font-bold tracking-wide uppercase text-[11px] text-stone-400 group-hover:text-stone-900 dark:group-hover:text-stone-200 transition-colors">
                        Baca Selengkapnya
                      </span>
                      <div className="w-8 h-8 rounded-full border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 flex items-center justify-center text-stone-400 group-hover:bg-stone-900 group-hover:border-stone-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-stone-900 transition-all">
                        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                      </div>
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

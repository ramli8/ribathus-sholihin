import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, Clock, ChevronRight } from 'lucide-react';
import db from '@/lib/db';
import DOMPurify from 'isomorphic-dompurify';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const berita = await db.berita.findUnique({
    where: { slug: slug },
  });

  if (!berita) return { title: 'Berita Tidak Ditemukan' };

  return {
    title: `${berita.judul} | Berita Ribathus Sholihin`,
    description: berita.isi
      .substring(0, 160)
      .replace(/<[^>]*>?/g, '')
      .replace(/&nbsp;/g, ' '),
  };
}

export default async function BeritaDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const berita = await db.berita.findUnique({
    where: { slug: slug },
  });

  if (!berita || !berita.published) {
    notFound();
  }

  // Increment view asynchronously
  await db.berita.update({
    where: { id: berita.id },
    data: { viewed: { increment: 1 } },
  });

  // Fetch recommended articles
  const recommendedBerita = await db.berita.findMany({
    where: {
      published: true,
      NOT: { id: berita.id },
    },
    orderBy: { createdAt: 'desc' },
    take: 4,
  });

  const formattedDate = new Date(berita.createdAt).toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const sanitizedContent = DOMPurify.sanitize(berita.isi);

  return (
    <article className="min-h-screen bg-stone-50 dark:bg-stone-950 pt-32 pb-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/berita"
          className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 mb-8 transition-colors bg-white dark:bg-stone-900 px-5 py-2.5 rounded-full border border-stone-200 dark:border-stone-800 shadow-sm hover:bg-stone-50 dark:hover:bg-stone-800"
        >
          <ArrowLeft size={14} strokeWidth={2.5} />
          Kembali ke Arsip
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-start">
          {/* Main Content Column */}
          <div className="lg:col-span-2 bg-white dark:bg-stone-900 rounded-[2rem] p-8 md:p-12 border border-stone-200/60 dark:border-stone-800 shadow-sm">
            {berita.kategori && (
              <div className="mb-8 block">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-500 dark:text-stone-400 font-bold text-[10px] tracking-widest shadow-sm uppercase">
                  {berita.kategori}
                </span>
              </div>
            )}

            <h1 className="text-3xl md:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-6 leading-[1.2] tracking-tight font-heading">
              {berita.judul}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-[13px] font-medium text-stone-500 dark:text-stone-400 mb-10 pb-6 border-b border-stone-100 dark:border-stone-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center justify-center">
                  <User className="w-3 h-3 text-stone-400" />
                </div>
                <span className="text-stone-700 dark:text-stone-300">
                  {berita.penulis || 'Admin'}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-1.5 rounded-lg">
                <Calendar className="w-3 h-3 text-stone-400" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-1.5 rounded-lg">
                <Clock className="w-3 h-3 text-stone-400" />
                <span>{berita.viewed} kali tayang</span>
              </div>
            </div>

            {berita.coverUrl && (
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden mb-12 bg-stone-100 dark:bg-stone-800 border border-stone-100 dark:border-stone-800 shadow-sm filter sepia-[0.3]">
                <Image
                  src={berita.coverUrl}
                  alt={berita.judul}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority
                />
              </div>
            )}

            <div
              className="prose prose-stone lg:prose-lg dark:prose-invert max-w-none 
                prose-headings:font-bold prose-headings:tracking-tight prose-headings:font-heading
                prose-a:text-emerald-700 dark:prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-[1.5rem] prose-img:shadow-sm prose-img:border prose-img:border-stone-200 dark:prose-img:border-stone-800
                prose-hr:border-stone-200 dark:prose-hr:border-stone-800
                prose-p:leading-relaxed prose-p:text-stone-600 dark:prose-p:text-stone-300 prose-p:font-normal
                break-words whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
          </div>

          {/* Sidebar Recommendations Column */}
          <div className="lg:col-span-1 lg:sticky lg:top-32 space-y-8">
            <div className="bg-white dark:bg-stone-900 rounded-[2rem] p-8 border border-stone-200/60 dark:border-stone-800 shadow-sm">
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 mb-8 flex items-center gap-3 uppercase tracking-widest">
                <span className="w-6 h-px bg-emerald-700 rounded-full inline-block"></span>
                Rekomendasi
              </h3>

              {recommendedBerita.length > 0 ? (
                <div className="space-y-6">
                  {recommendedBerita.map((rec) => (
                    <Link
                      key={rec.id}
                      href={`/berita/${rec.slug}`}
                      className="group flex gap-4 items-start"
                    >
                      <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 bg-stone-100 dark:bg-stone-800 border border-stone-100 dark:border-stone-800">
                        {rec.coverUrl ? (
                          <Image
                            src={rec.coverUrl}
                            alt={rec.judul}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700 filter sepia-[0.2]"
                            sizes="96px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-stone-400 bg-stone-50 dark:bg-stone-800">
                            <Clock className="w-5 h-5 opacity-50" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-stone-900/5 group-hover:bg-transparent transition-colors duration-500" />
                      </div>
                      <div className="flex-1 min-w-0 py-1">
                        <span className="text-[9px] font-bold tracking-widest text-stone-400 dark:text-stone-500 uppercase mb-2 block">
                          {rec.kategori || 'Warta'}
                        </span>
                        <h4 className="text-[15px] font-bold text-stone-800 dark:text-stone-200 line-clamp-2 leading-snug group-hover:text-emerald-800 dark:group-hover:text-emerald-500 transition-colors mb-3 font-heading">
                          {rec.judul}
                        </h4>
                        <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-stone-400">
                          <Calendar size={10} />
                          <span>
                            {new Date(rec.createdAt).toLocaleDateString(
                              'id-ID',
                              {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              }
                            )}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-[13px] font-light text-stone-500 dark:text-stone-400 italic">
                  Belum ada rekomendasi.
                </p>
              )}

              <div className="mt-8 pt-6 border-t border-stone-100 dark:border-stone-800">
                <Link
                  href="/berita"
                  className="flex items-center justify-between group py-2"
                >
                  <span className="text-[11px] font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400 group-hover:text-stone-900 dark:group-hover:text-stone-100 transition-colors">
                    Lihat Arsip
                  </span>
                  <div className="w-8 h-8 rounded-full border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 flex items-center justify-center text-stone-400 group-hover:bg-stone-900 group-hover:border-stone-900 group-hover:text-white transition-all">
                    <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

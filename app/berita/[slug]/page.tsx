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
    <article className="min-h-screen bg-slate-50 dark:bg-zinc-950 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/berita"
          className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 font-medium mb-8 transition-colors bg-white dark:bg-zinc-900 px-4 py-2 rounded-full border border-slate-200 dark:border-zinc-800 shadow-sm hover:shadow"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Berita
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Main Content Column */}
          <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-10 border border-slate-200 dark:border-zinc-800 shadow-sm">
            {berita.kategori && (
              <span className="inline-block px-4 py-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-semibold rounded-full mb-6">
                {berita.kategori}
              </span>
            )}

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-[1.2] tracking-tight">
              {berita.judul}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 dark:text-slate-400 mb-10 pb-6 border-b border-slate-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center">
                  <User className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                </div>
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {berita.penulis || 'Admin'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{berita.viewed} kali tayang</span>
              </div>
            </div>

            {berita.coverUrl && (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12 bg-slate-100 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-800 shadow-sm">
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
              className="prose prose-slate lg:prose-lg dark:prose-invert max-w-none prose-emerald
                prose-headings:font-bold prose-headings:tracking-tight 
                prose-a:text-emerald-600 dark:prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-2xl prose-img:shadow-md
                prose-p:leading-relaxed prose-p:text-slate-600 dark:prose-p:text-slate-300
                break-words whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
          </div>

          {/* Sidebar Recommendations Column */}
          <div className="lg:col-span-1 lg:sticky lg:top-32 space-y-8">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-slate-200 dark:border-zinc-800 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-emerald-500 rounded-full inline-block"></span>
                Rekomendasi Artikel
              </h3>

              {recommendedBerita.length > 0 ? (
                <div className="space-y-6">
                  {recommendedBerita.map((rec) => (
                    <Link
                      key={rec.id}
                      href={`/berita/${rec.slug}`}
                      className="group flex gap-4 items-start"
                    >
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-800">
                        {rec.coverUrl ? (
                          <Image
                            src={rec.coverUrl}
                            alt={rec.judul}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                            sizes="96px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400">
                            <Clock className="w-6 h-6 opacity-30" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-semibold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase mb-1 block">
                          {rec.kategori || 'Berita'}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-2">
                          {rec.judul}
                        </h4>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                          <Calendar className="w-3 h-3" />
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
                <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                  Belum ada rekomendasi berita lain.
                </p>
              )}

              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-zinc-800">
                <Link
                  href="/berita"
                  className="flex items-center justify-between group p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors"
                >
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Lihat Semua Berita
                  </span>
                  <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <ChevronRight className="w-4 h-4" />
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

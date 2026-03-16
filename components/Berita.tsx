'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User, BookOpen, Clock } from 'lucide-react';

interface Berita {
  id: number;
  judul: string;
  slug: string;
  isi: string;
  coverUrl?: string;
  kategori?: string;
  penulis?: string;
  viewed: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Berita() {
  const [beritaList, setBeritaList] = useState<Berita[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/berita?published=true')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBeritaList(data.data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getReadTime = (text: string) => {
    const words = text.split(' ').length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min`;
  };

  if (loading) {
    return (
      <section id="berita" className="py-24 md:py-32 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse text-slate-400">Memuat berita...</div>
        </div>
      </section>
    );
  }
  return (
    <section
      id="berita"
      className="py-24 md:py-32 bg-slate-50 dark:bg-slate-950 relative overflow-hidden"
    >
      {/* Soft Minimalist Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-white via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 opacity-90 z-0" />

      {/* Animated Glassmorphism Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex justify-center items-center">
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-[20%] left-[5%] w-[500px] h-[500px] bg-emerald-300/15 dark:bg-emerald-800/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-[10%] right-[5%] w-[400px] h-[400px] bg-teal-300/15 dark:bg-teal-900/20 rounded-full blur-[100px]"
        />
      </div>

      <div className="container px-4 sm:px-6 mx-auto max-w-7xl relative z-10">
        {/* Header - Minimalist Glass */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          variants={fadeUp}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 text-emerald-700 dark:text-emerald-300 text-sm font-medium shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none mb-6">
              <BookOpen size={16} className="text-emerald-500" />
              <span className="uppercase tracking-wider">Kabar & Literasi</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 font-heading tracking-tight">
              Warta{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">
                Terkini
              </span>
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl font-light leading-relaxed">
              Ikuti perkembangan pondok, warta kegiatan santri, hingga goresan
              pena inspiratif dari jajaran asatidz.
            </p>
          </div>

          <Link
            href="#"
            className="group inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors shrink-0"
          >
            Lihat Semua Berita
            <div className="w-8 h-8 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/40 dark:border-slate-700/50 flex items-center justify-center group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/30 transition-colors">
              <ArrowRight
                size={14}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </div>
          </Link>
        </motion.div>

        {/* News Bento Grid - Modern Minimalist Glass Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {beritaList.slice(0, 3).map((berita, idx) => {
            const isFeatured = idx === 0;
            const colSpan = idx === 0 ? 'md:col-span-2 lg:col-span-2' : 'col-span-1';

            return (
              <motion.article
                key={berita.id}
                variants={fadeUp}
                className={`group relative rounded-3xl overflow-hidden bg-white/40 dark:bg-slate-800/40 backdrop-blur-2xl border border-white/60 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_8px_30px_rgba(16,185,129,0.1)] hover:-translate-y-1 flex flex-col ${colSpan}`}
              >
                {/* Thumbnail Image Container */}
                <div
                  className={`relative ${isFeatured ? 'h-64 md:h-80 lg:h-[400px]' : 'h-48 md:h-56'} w-full overflow-hidden shrink-0`}
                >
                  <Image
                    src={berita.coverUrl || 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800&auto=format&fit=crop'}
                    alt={berita.judul}
                    fill
                    className="object-cover transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
                    sizes={
                      isFeatured
                        ? '(max-width: 768px) 100vw, 66vw'
                        : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    }
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                  {/* Category Badge Floating on Image */}
                  <div className="absolute top-6 left-6 inline-flex items-center px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-medium tracking-wider shadow-lg">
                    {berita.kategori || 'Umum'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col flex-grow relative z-10">
                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 dark:text-slate-400 mb-4">
                    <span className="flex items-center gap-1.5 bg-slate-100/50 dark:bg-slate-800/50 px-2 py-1 rounded-md">
                      <Calendar size={12} className="text-emerald-500" />{' '}
                      {formatDate(berita.createdAt)}
                    </span>
                    {berita.penulis && (
                      <span className="flex items-center gap-1.5">
                        <User size={12} className="text-emerald-500" />{' '}
                        {berita.penulis}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} className="text-emerald-500" />{' '}
                      {getReadTime(berita.isi)}
                    </span>
                  </div>

                  {/* Title */}
                  <Link
                    href={`/berita/${berita.slug}`}
                    className={`block font-bold text-slate-900 dark:text-white mb-3 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-heading ${isFeatured ? 'text-2xl md:text-3xl' : 'text-xl'}`}
                  >
                    {berita.judul}
                  </Link>

                  {/* Excerpt */}
                  <p
                    className={`text-slate-600 dark:text-slate-400 font-light leading-relaxed mb-6 flex-grow ${isFeatured ? 'text-base md:text-lg line-clamp-3' : 'text-sm line-clamp-3'}`}
                  >
                    {berita.isi.substring(0, 200)}...
                  </p>

                  {/* Read More Link */}
                  <div className="mt-auto pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
                    <Link
                      href={`/berita/${berita.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors"
                    >
                      Baca Selengkapnya
                      <ArrowRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

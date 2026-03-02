'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User, BookOpen, Clock } from 'lucide-react';

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

const news = [
  {
    title: 'Kunjungan Silaturahim Ulama Timur Tengah ke Ribathus Sholihin',
    category: 'Berita Utama',
    date: '12 Oct 2025',
    author: 'Admin',
    readTime: '5 min',
    thumbnail:
      'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800&auto=format&fit=crop',
    excerpt:
      'Alhamdulillah, hari ini pesantren kedatangan tamu mulia dari hadramaut untuk memberikan ijazah kubro dan pengarahan kurikulum kepada segenap jajaran asatidz dan santri senior...',
    colSpan: 'md:col-span-2 lg:col-span-2', // Large featured post
  },
  {
    title: 'Adab Sebelum Ilmu: Pesan Kiai untuk Santri Baru',
    category: 'Kolom Opini',
    date: '05 Oct 2025',
    author: 'Ust. Fahrur Rozi',
    readTime: '8 min',
    thumbnail:
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=400&auto=format&fit=crop',
    excerpt:
      'Dalam tradisi salaf, mempelajari adab memakan waktu lebih lama daripada mempelajari ilmu itu sendiri. Hal ini mengajarkan kita pentingnya membersihkan wadah...',
    colSpan: 'col-span-1',
  },
  {
    title: 'Juara 1 Lomba Baca Kitab Kuning (MQK) Tingkat Provinsi',
    category: 'Prestasi',
    date: '28 Sep 2025',
    author: 'Humas',
    readTime: '3 min',
    thumbnail:
      'https://images.unsplash.com/photo-1507643179173-617d654551a3?q=80&w=400&auto=format&fit=crop',
    excerpt:
      "Selamat kepada Ananda M. Hafidzul Qur'an yang berhasil meraih juara pertama pada perlombaan bergengsi tahunan Kemenag. Semoga ilmu yang didapat barokah...",
    colSpan: 'col-span-1',
  },
];

export default function Berita() {
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
          {news.map((item, idx) => {
            const isFeatured = idx === 0;

            return (
              <motion.article
                key={idx}
                variants={fadeUp}
                className={`group relative rounded-3xl overflow-hidden bg-white/40 dark:bg-slate-800/40 backdrop-blur-2xl border border-white/60 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_8px_30px_rgba(16,185,129,0.1)] hover:-translate-y-1 flex flex-col ${item.colSpan}`}
              >
                {/* Thumbnail Image Container */}
                <div
                  className={`relative ${isFeatured ? 'h-64 md:h-80 lg:h-[400px]' : 'h-48 md:h-56'} w-full overflow-hidden shrink-0`}
                >
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
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
                    {item.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col flex-grow relative z-10">
                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 dark:text-slate-400 mb-4">
                    <span className="flex items-center gap-1.5 bg-slate-100/50 dark:bg-slate-800/50 px-2 py-1 rounded-md">
                      <Calendar size={12} className="text-emerald-500" />{' '}
                      {item.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User size={12} className="text-emerald-500" />{' '}
                      {item.author}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} className="text-emerald-500" />{' '}
                      {item.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <Link
                    href="#"
                    className={`block font-bold text-slate-900 dark:text-white mb-3 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-heading ${isFeatured ? 'text-2xl md:text-3xl' : 'text-xl'}`}
                  >
                    {item.title}
                  </Link>

                  {/* Excerpt */}
                  <p
                    className={`text-slate-600 dark:text-slate-400 font-light leading-relaxed mb-6 flex-grow ${isFeatured ? 'text-base md:text-lg line-clamp-3' : 'text-sm line-clamp-3'}`}
                  >
                    {item.excerpt}
                  </p>

                  {/* Read More Link */}
                  <div className="mt-auto pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
                    <Link
                      href="#"
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

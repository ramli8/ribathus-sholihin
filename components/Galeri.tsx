'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Camera, Star } from 'lucide-react';
import Link from 'next/link';

interface Galeri {
  id: number;
  judul: string;
  deskripsi?: string;
  imageUrl: string;
  kategori?: string;
  featured: boolean;
  viewed: number;
  createdAt: string;
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

export default function Galeri() {
  const [galeriList, setGaleriList] = useState<Galeri[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/galeri?published=true')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setGaleriList(data.data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section
        id="galeri"
        className="py-24 md:py-32 bg-white dark:bg-slate-900"
      >
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse text-slate-400">Memuat galeri...</div>
        </div>
      </section>
    );
  }

  // Get featured galeri or first 6 if no featured
  const featuredGaleri = galeriList.filter(g => g.featured).slice(0, 6);
  const displayGaleri = featuredGaleri.length > 0 ? featuredGaleri : galeriList.slice(0, 6);

  return (
    <section
      id="galeri"
      className="py-24 md:py-32 bg-white dark:bg-slate-900 relative overflow-hidden"
    >
      {/* Soft Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-50/50 via-white to-white dark:from-slate-800/50 dark:via-slate-900 dark:to-slate-900 opacity-90 z-0" />

      {/* Animated Blur Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex justify-center items-center">
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-emerald-200/15 dark:bg-emerald-800/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] bg-teal-200/15 dark:bg-teal-900/10 rounded-full blur-[120px]"
        />
      </div>

      <div className="container px-4 sm:px-6 mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          variants={fadeUp}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-50 dark:bg-slate-800/60 backdrop-blur-xl border border-emerald-100 dark:border-slate-700/50 text-emerald-700 dark:text-emerald-300 text-sm font-medium shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none mb-6">
              <Camera size={16} className="text-emerald-500" />
              <span className="uppercase tracking-wider">Galeri Kegiatan</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 font-heading tracking-tight">
              Dokumentasi{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">
                & Momen
              </span>
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl font-light leading-relaxed">
              Saksikan berbagai momen berharga dan kegiatan inspiratif para santri dalam menuntut ilmu dan mengembangkan potensi diri.
            </p>
          </div>

          <Link
            href="#"
            className="group inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors shrink-0"
          >
            Lihat Semua Galeri
            <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-slate-800/60 backdrop-blur-sm border border-emerald-100 dark:border-slate-700/50 flex items-center justify-center group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/30 transition-colors">
              <ArrowRight
                size={14}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </div>
          </Link>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {displayGaleri.map((galeri, idx) => {
            const isFeatured = idx === 0;
            const colSpan = isFeatured ? 'md:col-span-2 lg:col-span-2' : 'col-span-1';

            return (
              <motion.article
                key={galeri.id}
                variants={fadeUp}
                className={`group relative rounded-3xl overflow-hidden bg-slate-50 dark:bg-slate-800/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_8px_30px_rgba(16,185,129,0.15)] hover:-translate-y-1 flex flex-col ${colSpan}`}
              >
                {/* Image Container */}
                <div
                  className={`relative ${isFeatured ? 'h-64 md:h-80' : 'h-56 md:h-64'} w-full overflow-hidden shrink-0`}
                >
                  <Image
                    src={galeri.imageUrl || '/images/placeholder.jpg'}
                    alt={galeri.judul}
                    fill
                    className="object-cover transform scale-100 group-hover:scale-110 transition-transform duration-1000 ease-out"
                    sizes={
                      isFeatured
                        ? '(max-width: 768px) 100vw, 66vw'
                        : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    }
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                  {/* Featured Badge */}
                  {galeri.featured && (
                    <div className="absolute top-4 right-4 p-2 bg-yellow-500 text-white rounded-full shadow-lg">
                      <Star size={16} fill="currentColor" />
                    </div>
                  )}

                  {/* Category Badge */}
                  {galeri.kategori && (
                    <div className="absolute top-4 left-4 inline-flex items-center px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-medium tracking-wider shadow-lg">
                      {galeri.kategori}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 md:p-6 flex flex-col flex-grow relative z-10">
                  <h4
                    className={`font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors font-heading ${isFeatured ? 'text-xl md:text-2xl' : 'text-lg'}`}
                  >
                    {galeri.judul}
                  </h4>
                  
                  {galeri.deskripsi && (
                    <p
                      className={`text-slate-600 dark:text-slate-400 font-light leading-relaxed mb-4 flex-grow ${isFeatured ? 'text-base line-clamp-2' : 'text-sm line-clamp-2'}`}
                    >
                      {galeri.deskripsi}
                    </p>
                  )}

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
                    <span className="flex items-center gap-1">
                      <Camera size={12} className="text-emerald-500" />
                      {galeri.viewed} views
                    </span>
                    <span>
                      {new Date(galeri.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {displayGaleri.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera size={40} className="text-slate-400" />
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              Belum ada galeri yang tersedia
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

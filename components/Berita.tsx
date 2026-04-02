'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Calendar,
  User,
  BookOpen,
  Clock,
  Newspaper,
} from 'lucide-react';
import { useProfil } from '@/hooks/useProfil';

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
  const { data: profile } = useProfil();

  const beritaTitle = profile?.beritaTitle || 'Warta';
  const beritaTitleHighlight = profile?.beritaTitleHighlight || 'Terkini';
  const beritaDesc =
    profile?.beritaDesc ||
    'Ikuti perkembangan pondok, warta kegiatan santri, hingga goresan pena inspiratif dari jajaran asatidz.';

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
      <section
        id="berita"
        className="py-16 md:py-24 bg-stone-50 dark:bg-stone-950"
      >
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse text-stone-400 font-medium">Memuat berita...</div>
        </div>
      </section>
    );
  }
  return (
    <section
      id="berita"
      className="py-16 md:py-24 bg-stone-50 dark:bg-stone-950 relative overflow-hidden"
    >
      <div className="container px-4 sm:px-6 mx-auto max-w-7xl relative z-10">
        
        {/* Editorial Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          variants={fadeUp}
          className="text-center mb-16 md:mb-24 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400 text-[11px] font-bold tracking-[0.2em] uppercase mb-8">
            Kabar & Literasi
          </div>
          <h3 className="text-3xl md:text-5xl lg:text-[4rem] font-bold text-stone-900 dark:text-stone-100 mb-6 font-heading tracking-tight leading-[1.1] text-balance">
            {beritaTitle}{' '}
            <span className="text-emerald-900 dark:text-emerald-500 block sm:inline">
              {beritaTitleHighlight}
            </span>
          </h3>
          <p className="text-stone-600 dark:text-stone-400 text-lg md:text-xl font-normal leading-relaxed mt-6 whitespace-pre-line">
            {beritaDesc}
          </p>
        </motion.div>

        {/* News Bento Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto"
        >
          {beritaList.slice(0, 3).map((berita, idx) => {
            return (
              <motion.div
                key={berita.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Link
                  href={`/berita/${berita.slug}`}
                  className="group block relative rounded-[2rem] overflow-hidden bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800 shadow-sm hover:shadow-md transition-all duration-300 h-full min-h-[28rem] hover:-translate-y-1 flex flex-col"
                >
                  <div className="relative h-48 sm:h-56 bg-stone-100 dark:bg-stone-800 overflow-hidden shrink-0 border-b border-stone-100 dark:border-stone-800">
                    {berita.coverUrl ? (
                      <Image
                        src={berita.coverUrl}
                        alt={berita.judul}
                        fill
                        className="object-cover transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-stone-300 dark:text-stone-700">
                        <Newspaper className="w-12 h-12" />
                      </div>
                    )}
                    {/* Dark subtle overlay for editorial feeling */}
                    <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />

                    {/* Category Badge Floating on Image */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 font-bold text-[10px] tracking-widest shadow-sm uppercase">
                        {berita.kategori || 'Umum'}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8 flex flex-col flex-grow relative z-10">
                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-stone-500 dark:text-stone-400 mb-5 font-medium">
                      <span className="flex items-center gap-1.5 bg-stone-50 dark:bg-stone-800 border border-stone-200/50 dark:border-stone-700 px-2 py-1 rounded-md">
                        <Calendar size={12} className="text-stone-400" />{' '}
                        {formatDate(berita.createdAt)}
                      </span>
                      {berita.penulis && (
                        <span className="flex items-center gap-1.5">
                          <User size={12} className="text-stone-400" />{' '}
                          {berita.penulis}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} className="text-stone-400" />{' '}
                        {getReadTime(berita.isi)}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="block font-bold text-stone-900 dark:text-stone-100 mb-4 group-hover:text-emerald-900 dark:group-hover:text-emerald-400 transition-colors font-heading line-clamp-2 text-xl md:text-2xl min-h-[3.5rem]">
                      {berita.judul}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-stone-600 dark:text-stone-400 text-[15px] mb-8 line-clamp-2 md:line-clamp-3 leading-relaxed font-normal">
                      {berita.isi
                        .replace(/<[^>]*>?/g, '')
                        .replace(/&nbsp;/g, ' ')
                        .substring(0, 150)}
                      ...
                    </p>

                    {/* Read More Link */}
                    <div className="mt-auto flex items-center justify-between text-sm pt-5 border-t border-stone-100 dark:border-stone-800">
                      <span className="font-bold tracking-wide uppercase text-[11px] text-stone-400 group-hover:text-stone-900 dark:group-hover:text-stone-200 transition-colors">
                        Baca Selengkapnya
                      </span>
                      <div className="w-8 h-8 rounded-full border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 flex items-center justify-center text-stone-400 group-hover:bg-stone-900 group-hover:border-stone-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-stone-900 transition-all">
                        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Button */}
        {beritaList.length > 0 && (
          <div className="mt-16 md:mt-24 text-center">
            <Link
              href="/berita"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 font-bold uppercase tracking-widest text-xs rounded-full hover:bg-stone-50 dark:hover:bg-stone-800 transition-all duration-300 shadow-sm"
            >
              Indeks Berita
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

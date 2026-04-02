'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { BookOpen, Target, Compass, Users } from 'lucide-react';
import { useProfil } from '@/hooks/useProfil';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function Profil() {
  const { data, loading } = useProfil();

  if (loading) {
    return (
      <section id="profil" className="py-24 text-center bg-stone-50 dark:bg-stone-950">
        <div className="animate-pulse text-stone-400 text-lg">
          Memuat profil pesantren...
        </div>
      </section>
    );
  }

  const profile = data || {
    nama: '',
    alamat: 'Alamat tidak tersedia',
    deskripsi:
      'Kami berkomitmen mencetak generasi santri yang mandiri, berprestasi, dan berakhlakul karimah.',
    visi: 'Menjadi lembaga rujukan yang mencetak kader ulama dan umara.',
    misi: 'Menyelenggarakan pendidikan Islam terpadu yang responsif terhadap dinamika zaman.',
    profilHeaderTitle: 'Membangun Karakter dari',
    profilHeaderTitleHighlight: 'Tradisi & Inovasi',
    pengasuh: 'Pengasuh Pondok',
    pengasuhFotoUrl: '',
    pengasuhDeskripsi: '',
    sejarahDeskripsi: '',
  };

  return (
    <section
      id="profil"
      className="py-16 md:py-24 bg-stone-50 dark:bg-stone-950 relative overflow-hidden"
    >
      {/* 
        Zero Ornaments Background
        Murni Kanvas Stone-50 yang menyambung dengan struktur Beranda
      */}

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
          <div className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full border border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400 text-[11px] font-bold tracking-[0.2em] uppercase mb-8">
            Tentang Kami
          </div>
          <h3 className="text-3xl md:text-5xl lg:text-[3.5rem] font-bold text-stone-900 dark:text-stone-100 mb-6 font-heading tracking-tight leading-[1.1] text-balance">
            {profile?.profilHeaderTitle || 'Membangun Karakter dari'}{' '}
            <span className="text-emerald-900 dark:text-emerald-500 block sm:inline">
              {profile?.profilHeaderTitleHighlight || 'Tradisi & Inovasi'}
            </span>
          </h3>
          <p className="text-stone-600 dark:text-stone-400 text-lg md:text-xl font-normal leading-relaxed mt-6">
            {profile.deskripsi}
          </p>
        </motion.div>

        {/* Content - Pure Editorial Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          
          {/* Sejarah - Spans 2 columns */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            variants={fadeUp}
            className="lg:col-span-2 md:col-span-2 bg-white dark:bg-stone-900 rounded-[2rem] p-8 md:p-12 border border-stone-200/60 dark:border-stone-800 shadow-sm flex flex-col justify-start group hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="w-12 h-12 rounded-full border border-stone-200 dark:border-stone-700 flex items-center justify-center mb-8 bg-stone-50 dark:bg-stone-800">
              <BookOpen className="w-5 h-5 text-emerald-800 dark:text-emerald-500" />
            </div>
            <h4 className="text-2xl md:text-3xl font-bold text-stone-900 dark:text-stone-100 mb-4 font-heading group-hover:text-emerald-900 dark:group-hover:text-emerald-400 transition-colors">
              Jejak Langkah & Sejarah
            </h4>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed font-normal text-base md:text-lg max-w-2xl">
              {profile.sejarahDeskripsi ? (
                profile.sejarahDeskripsi
              ) : (
                <>
                  Didirikan dengan niat tulus menyebarkan agama Islam. Berawal
                  dari langgar kecil yang sederhana, berbekal keikhlasan dan
                  istiqomah, pesantren kami kini bertransformasi menjadi pusat
                  pendidikan yang komprehensif tanpa meninggalkan nilai-nilai salaf.
                </>
              )}
            </p>
          </motion.div>

          {/* Visi - Spans 1 column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            variants={fadeUp}
            className="lg:col-span-1 md:col-span-1 bg-white dark:bg-stone-900 rounded-[2rem] p-8 md:p-10 border border-stone-200/60 dark:border-stone-800 shadow-sm flex flex-col group hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="w-12 h-12 rounded-full border border-stone-200 dark:border-stone-700 flex items-center justify-center mb-8 bg-stone-50 dark:bg-stone-800">
              <Target className="w-5 h-5 text-emerald-800 dark:text-emerald-500" />
            </div>
            <h4 className="text-xl md:text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4 font-heading group-hover:text-emerald-900 dark:group-hover:text-emerald-400 transition-colors">
              Visi Kami
            </h4>
            <p className="text-stone-600 dark:text-stone-400 font-normal leading-relaxed text-base">
              {profile.visi}
            </p>
          </motion.div>

          {/* Misi - Spans 1 column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            variants={fadeUp}
            className="lg:col-span-1 md:col-span-1 bg-emerald-900 dark:bg-emerald-950 rounded-[2rem] p-8 md:p-10 border border-emerald-800 shadow-sm flex flex-col group hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="w-12 h-12 rounded-full border border-emerald-800/50 flex items-center justify-center mb-8 bg-emerald-950/20">
              <Compass className="w-5 h-5 text-emerald-200" />
            </div>
            <h4 className="text-xl md:text-2xl font-bold text-white mb-4 font-heading">
              Misi Kami
            </h4>
            <p className="text-emerald-100/90 font-normal leading-relaxed text-base">
              {profile.misi}
            </p>
          </motion.div>

          {/* Profil Pengasuh - Spans 2 columns */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            variants={fadeUp}
            className="lg:col-span-2 md:col-span-2 bg-white dark:bg-stone-900 rounded-[2rem] p-8 md:p-12 border border-stone-200/60 dark:border-stone-800 shadow-sm flex flex-col lg:flex-row gap-10 items-center lg:items-start group hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="relative z-10 flex-1 w-full text-center lg:text-left">
              <div className="inline-flex items-center justify-center lg:justify-start gap-2 text-stone-500 dark:text-stone-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
                <Users className="w-4 h-4 text-emerald-800 dark:text-emerald-500" />
                Pengasuh Pondok
              </div>
              <h4 className="text-2xl md:text-3xl font-bold text-stone-900 dark:text-stone-100 mb-4 font-heading group-hover:text-emerald-900 dark:group-hover:text-emerald-400 transition-colors">
                {profile.pengasuh}
              </h4>
              <p className="text-stone-600 dark:text-stone-400 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
                {profile.pengasuhDeskripsi ||
                  "Melanjutkan tongkat estafet perjuangan muassis dengan metode pendidikan modern yang berbasis teguh pada tradisi salafus shalih untuk mencetak generasi Qur'ani yang berwawasan luas."}
              </p>
            </div>

            {/* Pengasuh Photo Frame */}
            <div className="shrink-0 w-48 h-48 sm:w-56 sm:h-56 relative rounded-[2rem] overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 flex items-center justify-center group-hover:shadow-md transition-shadow duration-500">
              {profile.pengasuhFotoUrl ? (
                <Image
                  src={profile.pengasuhFotoUrl}
                  alt={profile.pengasuh || 'Pengasuh'}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-stone-300 dark:text-stone-700">
                  <Users className="w-12 h-12 mb-3" />
                  <span className="text-xs font-semibold uppercase tracking-widest">Foto</span>
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

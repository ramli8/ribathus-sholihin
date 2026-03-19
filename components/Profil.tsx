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
      <section id="profil" className="py-24 text-center">
        <div className="animate-pulse text-slate-400 text-lg">
          Memuat profil pesantren...
        </div>
      </section>
    );
  }

  const profile = data || {
    nama: 'Ribathus Sholihin',
    alamat: 'Alamat tidak tersedia',
    deskripsi:
      'Kami berkomitmen mencetak generasi santri yang mandiri, berprestasi, dan berakhlakul karimah.',
    visi: 'Menjadi lembaga rujukan yang mencetak kader ulama dan umara.',
    misi: 'Menyelenggarakan pendidikan Islam terpadu yang responsif terhadap dinamika zaman.',
    profilHeaderTitle: 'Membangun Karakter dari Tradisi & Inovasi',
    pengasuh: 'Pengasuh Pondok',
    pengasuhFotoUrl: '',
    pengasuhDeskripsi: '',
    sejarahDeskripsi: '',
    profilHeaderTitleHighlight: 'Tradisi & Inovasi',
  };

  return (
    <section
      id="profil"
      className="py-24 md:py-32 bg-linear-to-b from-emerald-50/50 via-white to-white dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 relative overflow-hidden"
    >
      {/* Light Blur Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-100/40 dark:bg-emerald-900/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-100/40 dark:bg-teal-900/20 rounded-full blur-[100px]" />
      </div>

      <div className="container px-4 sm:px-6 mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          variants={fadeUp}
          className="text-center mb-16 md:mb-20 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/40 dark:border-white/10 text-emerald-700 dark:text-emerald-300 text-sm font-semibold uppercase mb-6 shadow-lg">
            Tentang Kami
          </div>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 font-heading tracking-tight leading-tight text-balance">
            {profile?.profilHeaderTitle || 'Membangun Karakter dari'}{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-600">
              {profile?.profilHeaderTitleHighlight || 'Tradisi & Inovasi'}
            </span>
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl font-light leading-relaxed">
            {profile.deskripsi}
          </p>
        </motion.div>

        {/* Content - Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Sejarah - Spans 2 columns on lg */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            variants={fadeUp}
            className="lg:col-span-2 md:col-span-2 group relative bg-white/60 dark:bg-slate-800/60 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-500 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/40 dark:border-white/10 shadow-lg overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute -right-10 -top-10 text-emerald-50 dark:text-slate-700/50 transform rotate-12 transition-transform duration-700 group-hover:rotate-0 group-hover:scale-110">
              <BookOpen className="w-64 h-64" />
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-600 text-white mb-6 shadow-md shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-7 h-7" />
              </div>
              <h4 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4 font-heading group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                Jejak Langkah & Sejarah
              </h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-light text-base md:text-lg max-w-2xl">
                {profile.sejarahDeskripsi ? (
                  profile.sejarahDeskripsi
                ) : (
                  <>
                    Didirikan dengan niat tulus menyebarkan agama Islam. Berawal
                    dari langgar kecil yang sederhana, berbekal keikhlasan dan
                    istiqomah, pesantren kami kini bertransformasi menjadi pusat
                    pendidikan yang komprehensif tanpa meninggalkan nilai-nilai
                    salaf.
                  </>
                )}
              </p>
            </div>
          </motion.div>

          {/* Visi - Spans 1 column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            variants={fadeUp}
            className="lg:col-span-1 md:col-span-1 group relative bg-white/60 dark:bg-slate-800/60 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-500 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/40 dark:border-white/10 shadow-lg overflow-hidden flex flex-col"
          >
            <div className="absolute -right-6 -bottom-6 text-teal-50 dark:text-slate-700/50 group-hover:scale-110 transition-transform duration-500">
              <Target className="w-40 h-40" />
            </div>

            <div className="relative z-10 flex-grow">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/80 dark:bg-slate-700/80 backdrop-blur-md border border-white/50 dark:border-slate-600 mb-6 text-emerald-600 dark:text-emerald-400 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Target className="w-6 h-6" />
              </div>
              <h4 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3 font-heading group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                Visi Kami
              </h4>
              <p className="text-slate-600 dark:text-slate-300 font-light text-base leading-relaxed">
                {profile.visi}
              </p>
            </div>
          </motion.div>

          {/* Misi - Spans 1 column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            variants={fadeUp}
            className="lg:col-span-1 md:col-span-1 group relative bg-linear-to-br from-emerald-600 to-teal-700 dark:from-emerald-800 dark:to-teal-900 hover:from-emerald-500 hover:to-teal-600 dark:hover:from-emerald-700 dark:hover:to-teal-800 transition-all duration-500 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-emerald-500/30 dark:border-emerald-700/50 shadow-lg shadow-emerald-500/20 overflow-hidden flex flex-col"
          >
            <div className="absolute -left-6 -bottom-6 text-white/10 group-hover:-translate-y-2 group-hover:scale-110 transition-transform duration-500">
              <Compass className="w-40 h-40" />
            </div>

            <div className="relative z-10 flex-grow">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 mb-6 text-white shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Compass className="w-6 h-6" />
              </div>
              <h4 className="text-xl md:text-2xl font-bold text-white mb-3 font-heading">
                Misi Kami
              </h4>
              <p className="text-emerald-50 font-light text-base leading-relaxed">
                {profile.misi}
              </p>
            </div>
          </motion.div>

          {/* Profil Pengasuh - Spans 2 columns */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            variants={fadeUp}
            className="lg:col-span-2 md:col-span-2 group relative bg-white/60 dark:bg-slate-800/60 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-500 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/40 dark:border-white/10 shadow-lg overflow-hidden flex flex-col md:flex-row gap-8 items-center"
          >
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-emerald-50/30 to-teal-50/30 dark:via-emerald-900/10 dark:to-teal-900/10 pointer-events-none" />

            <div className="relative z-10 flex-1 w-full">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-100/60 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-200/50 dark:border-emerald-800/30">
                <Users className="w-3.5 h-3.5" />
                Pengasuh Pondok
              </div>
              <h4 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3 font-heading group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-emerald-600 group-hover:to-teal-600 transition-all duration-300 w-fit">
                {profile.pengasuh}
              </h4>
              <p className="text-slate-600 dark:text-slate-300 font-light leading-relaxed max-w-xl">
                {profile.pengasuhDeskripsi ||
                  "Melanjutkan tongkat estafet perjuangan muassis dengan metode pendidikan modern yang berbasis teguh pada tradisi salafus shalih untuk mencetak generasi Qur'ani yang berwawasan luas."}
              </p>
            </div>

            {/* Pengasuh Photo */}
            <div className="hidden lg:flex w-48 h-48 xl:w-56 xl:h-56 shrink-0 relative rounded-2xl overflow-hidden border border-white/50 dark:border-white/10 shadow-inner bg-linear-to-br from-emerald-100 to-teal-50 dark:from-slate-700/50 dark:to-slate-800/50 items-center justify-center group-hover:shadow-lg transition-shadow duration-500">
              {profile.pengasuhFotoUrl ? (
                <Image
                  src={profile.pengasuhFotoUrl}
                  alt={profile.pengasuh || 'Pengasuh'}
                  fill
                  className="object-cover"
                />
              ) : (
                <>
                  <div className="absolute inset-0 opacity-20 dark:opacity-40 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-emerald-600 via-transparent to-transparent"></div>
                  <div className="relative z-10 w-24 h-24 rounded-full border-4 border-emerald-500/20 dark:border-emerald-400/20 flex items-center justify-center backdrop-blur-sm group-hover:border-emerald-500/40 transition-colors duration-500">
                    <Users className="w-10 h-10 text-emerald-600/50 dark:text-emerald-400/50" />
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

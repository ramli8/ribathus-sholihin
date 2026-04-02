'use client';

import {
  FileText,
  ClipboardList,
  Wallet,
  Download,
  CheckCircle,
} from 'lucide-react';
import { motion } from 'framer-motion';

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

import type { ProfilData } from '@/hooks/useProfil';

const fallbackSyarat = [
  'Mengisi formulir online',
  'Fotokopi KK & Akte Kelahiran',
  'Fotokopi Ijazah / SKHU',
  'Pas foto 3x4 (4 lembar)',
];

const fallbackAlur = [
  'Pendaftaran form online',
  'Transfer biaya format',
  'Verifikasi berkas admin',
  'Tes wawancara santri',
];

const fallbackBiaya = [
  { label: 'Formulir', value: 'Rp 200k' },
  { label: 'Uang Pangkal', value: 'Rp 2.5jt' },
  { label: 'Seragam', value: 'Rp 900k' },
  { label: 'SPP Bulanan', value: 'Rp 650k' },
];

export default function Pendaftaran({ profile }: { profile: ProfilData | null }) {

  const parseList = (
    jsonString: string | undefined,
    defaultList: Array<string | Record<string, unknown>>
  ) => {
    if (!jsonString) return defaultList;
    try {
      const parsed = JSON.parse(jsonString);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultList;
    } catch {
      return defaultList;
    }
  };

  const syaratList = parseList(profile?.psbSyaratList, fallbackSyarat);
  const alurList = parseList(profile?.psbAlurList, fallbackAlur);
  const biayaList = parseList(profile?.psbBiayaList, fallbackBiaya);

  return (
    <section
      id="pendaftaran"
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
            Pendaftaran
          </div>
          <h3 className="text-3xl md:text-5xl lg:text-[4rem] font-bold text-stone-900 dark:text-stone-100 mb-6 font-heading tracking-tight leading-[1.1] text-balance">
            {profile?.psbTitle || 'Langkah Awal'}{' '}
            <span className="text-emerald-900 dark:text-emerald-500 block sm:inline">
              {profile?.psbTitleHighlight || 'Menuju Masa Depan Gemilang'}
            </span>
          </h3>
          <p className="text-stone-600 dark:text-stone-400 text-lg md:text-xl font-normal leading-relaxed mt-6 whitespace-pre-line">
            {profile?.psbDesc ||
              'Kami membuka kesempatan bagi calon santri untuk bergabung dengan kuota terbatas guna menjamin efektivitas pembelajaran.'}
          </p>
        </motion.div>

        {/* Info Bento Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24 max-w-6xl mx-auto"
        >
          {/* Card 1: Syarat */}
          <motion.div
            variants={fadeUp}
            className="bg-white dark:bg-stone-900 rounded-[2rem] p-8 md:p-10 border border-stone-200/60 dark:border-stone-800 shadow-sm hover:-translate-y-1 transition-transform duration-300 group"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-full border border-stone-200 dark:border-stone-700 flex items-center justify-center bg-stone-50 dark:bg-stone-800 text-emerald-800 dark:text-emerald-500 shrink-0">
                <FileText size={20} className="stroke-[2]" />
              </div>
              <h4 className="text-2xl font-bold text-stone-900 dark:text-stone-100 font-heading group-hover:text-emerald-900 dark:group-hover:text-emerald-400 transition-colors">
                Syarat Berkas
              </h4>
            </div>
            <ul className="space-y-4">
              {syaratList.map((item: string, i: number) => (
                <li
                  key={i}
                  className="flex items-start gap-4 text-stone-600 dark:text-stone-400 font-normal text-[15px]"
                >
                  <CheckCircle className="w-5 h-5 text-emerald-700/80 dark:text-emerald-500/80 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Card 2: Alur */}
          <motion.div
            variants={fadeUp}
            className="bg-white dark:bg-stone-900 rounded-[2rem] p-8 md:p-10 border border-stone-200/60 dark:border-stone-800 shadow-sm hover:-translate-y-1 transition-transform duration-300 group"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-full border border-stone-200 dark:border-stone-700 flex items-center justify-center bg-stone-50 dark:bg-stone-800 text-emerald-800 dark:text-emerald-500 shrink-0">
                <ClipboardList size={20} className="stroke-[2]" />
              </div>
              <h4 className="text-2xl font-bold text-stone-900 dark:text-stone-100 font-heading group-hover:text-emerald-900 dark:group-hover:text-emerald-400 transition-colors">
                Alur Daftar
              </h4>
            </div>

            <div className="relative border-l-2 border-stone-200 dark:border-stone-700 pl-6 space-y-8 py-2 ml-2">
              {alurList.map((item: string, i: number) => (
                <div
                  key={i}
                  className="relative text-stone-600 dark:text-stone-400 font-normal text-[15px] group/step"
                >
                  <span className="absolute -left-[33px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white dark:bg-stone-900 border-[3px] border-emerald-700/50 dark:border-emerald-500/50 group-hover/step:border-emerald-800 dark:group-hover/step:border-emerald-400 transition-colors flex items-center justify-center" />
                  <span className="block leading-relaxed group-hover/step:text-stone-900 dark:group-hover/step:text-stone-200 transition-colors">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 3: Biaya */}
          <motion.div
            variants={fadeUp}
            className="bg-white dark:bg-stone-900 rounded-[2rem] p-8 md:p-10 border border-stone-200/60 dark:border-stone-800 shadow-sm hover:-translate-y-1 transition-transform duration-300 group"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-full border border-stone-200 dark:border-stone-700 flex items-center justify-center bg-stone-50 dark:bg-stone-800 text-emerald-800 dark:text-emerald-500 shrink-0">
                <Wallet size={20} className="stroke-[2]" />
              </div>
              <h4 className="text-2xl font-bold text-stone-900 dark:text-stone-100 font-heading group-hover:text-emerald-900 dark:group-hover:text-emerald-400 transition-colors">
                Investasi
              </h4>
            </div>

            <div className="space-y-3">
              {biayaList.map((item: any, i: number) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-4 px-5 rounded-2xl border border-stone-100 dark:border-stone-800 hover:border-stone-200 dark:hover:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
                >
                  <span className="text-stone-600 dark:text-stone-400 font-medium text-[15px]">
                    {item.label}
                  </span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Premium CTA Bento Banner */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-6xl mx-auto w-full"
        >
          <div className="relative rounded-[2rem] overflow-hidden bg-emerald-900 dark:bg-emerald-950 border border-emerald-800 shadow-sm group hover:-translate-y-1 transition-transform duration-300">
            <div className="relative z-10 p-10 md:p-14">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
                <div className="text-center lg:text-left max-w-xl">
                  <h4 className="text-2xl md:text-3xl font-bold text-white mb-4 font-heading tracking-tight group-hover:text-emerald-300 transition-colors">
                    Siap Menjadi Bagian Dari Kami?
                  </h4>
                  <p className="text-emerald-100/90 font-normal text-base md:text-lg leading-relaxed">
                    Pendaftaran online disarankan agar proses verifikasi lebih
                    cepat, akurat, dan transparan bagi semua pihak.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto flex-shrink-0">
                  {profile?.psbBrosurUrl ? (
                    <a
                      href={profile.psbBrosurUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white font-semibold hover:bg-white hover:text-emerald-900 transition-colors duration-300 w-full lg:w-auto bg-white/10"
                    >
                      <Download size={18} /> Unduh Brosur
                    </a>
                  ) : (
                    <button
                      disabled
                      className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-emerald-800 text-emerald-500/50 font-semibold cursor-not-allowed w-full lg:w-auto bg-emerald-950/30"
                    >
                      <Download size={18} /> Brosur Belum Tersedia
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

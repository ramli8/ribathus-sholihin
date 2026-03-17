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

import { useProfil } from '@/hooks/useProfil';

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

export default function Pendaftaran() {
  const { data: profile } = useProfil();

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
      className="py-24 md:py-32 bg-slate-50 dark:bg-slate-950 relative overflow-hidden"
    >
      {/* Modern Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 opacity-90 z-0" />

      {/* Animated Glassmorphism Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex justify-center items-center">
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-emerald-200/20 dark:bg-emerald-800/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-teal-200/20 dark:bg-teal-900/10 rounded-full blur-[120px]"
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
          className="text-center mb-16 md:mb-20 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 text-emerald-700 dark:text-emerald-300 text-sm font-medium shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none mb-6 tracking-wider">
            <ClipboardList size={16} className="text-emerald-500" />
            PENERIMAAN SANTRI BARU (PSB)
          </div>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 font-heading tracking-tight">
            {profile?.psbTitle || 'Langkah Awal'}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
              {profile?.psbTitleHighlight || 'Menuju Masa Depan Gemilang'}
            </span>
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto whitespace-pre-line">
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
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20"
        >
          {/* Card 1: Syarat (Minimalist Glass) */}
          <motion.div
            variants={fadeUp}
            className="p-8 rounded-3xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/40 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(16,185,129,0.1)] transition-all duration-500 relative overflow-hidden group"
          >
            {/* Soft highlight effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                <FileText size={22} className="stroke-[1.5]" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white font-heading tracking-tight">
                Syarat Berkas
              </h4>
            </div>
            <ul className="space-y-4">
              {syaratList.map((item: string, i: number) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-slate-600 dark:text-slate-300 font-light text-base group/item"
                >
                  <CheckCircle className="w-5 h-5 text-emerald-500/70 dark:text-emerald-400/70 flex-shrink-0 mt-0.5 group-hover/item:text-emerald-500 dark:group-hover/item:text-emerald-400 transition-colors" />
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Card 2: Alur (Premium Gradient Card) */}
          <motion.div
            variants={fadeUp}
            className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950 shadow-[0_8px_30px_rgb(0,0,0,0.1)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-transform duration-500 relative overflow-hidden group"
          >
            {/* Dynamic abstract shapes */}
            <div className="absolute -top-16 -right-16 w-32 h-32 bg-emerald-500/20 blur-[30px] rounded-full group-hover:bg-emerald-500/30 transition-colors duration-500" />
            <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-teal-500/20 blur-[30px] rounded-full group-hover:bg-teal-500/30 transition-colors duration-500" />

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-emerald-400 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                  <ClipboardList size={22} className="stroke-[1.5]" />
                </div>
                <h4 className="text-xl font-bold text-white font-heading tracking-tight">
                  Alur Daftar
                </h4>
              </div>

              <div className="relative border-l-2 border-slate-700/50 dark:border-slate-600/50 pl-6 space-y-8 py-2">
                {alurList.map((item: string, i: number) => (
                  <div
                    key={i}
                    className="relative text-slate-300 font-light text-base group/step"
                  >
                    <span className="absolute -left-[35px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] rounded-full bg-slate-800 border-2 border-emerald-500/50 group-hover/step:border-emerald-400 group-hover/step:bg-emerald-500 group-hover/step:scale-125 transition-all duration-300 flex items-center justify-center">
                      {/* Inner dot on hover */}
                      <span className="w-1.5 h-1.5 rounded-full bg-white opacity-0 group-hover/step:opacity-100 transition-opacity" />
                    </span>
                    <span className="block leading-snug group-hover/step:text-white transition-colors">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 3: Biaya (Minimalist Glass) */}
          <motion.div
            variants={fadeUp}
            className="p-8 rounded-3xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/40 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(20,184,166,0.1)] transition-all duration-500 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-500/10 rounded-2xl flex items-center justify-center text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform duration-300">
                <Wallet size={22} className="stroke-[1.5]" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white font-heading tracking-tight">
                Investasi
              </h4>
            </div>

            <div className="space-y-3">
              {biayaList.map((item: any, i: number) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-4 rounded-2xl bg-white/50 dark:bg-slate-800/40 backdrop-blur-md border border-white/40 dark:border-white/5 hover:bg-white dark:hover:bg-slate-800/80 transition-colors group/item"
                >
                  <span className="text-slate-600 dark:text-slate-400 font-light group-hover/item:text-slate-800 dark:group-hover/item:text-slate-200 transition-colors">
                    {item.label}
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
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
          className="relative rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] group"
        >
          {/* Animated Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 bg-[length:200%_auto] animate-gradient" />

          {/* Subtle noise/texture overlay for premium feel */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

          <div className="relative z-10 p-10 md:p-14">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="text-center lg:text-left max-w-xl">
                <h4 className="text-2xl md:text-3xl font-bold text-white mb-4 font-heading tracking-tight">
                  Siap Menjadi Bagian Dari Kami?
                </h4>
                <p className="text-emerald-50/90 font-light text-base md:text-lg leading-relaxed">
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
                    className="group/btn flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold hover:bg-white/20 transition-all duration-300 w-full lg:w-auto"
                  >
                    <Download size={18} /> Unduh Brosur
                  </a>
                ) : (
                  <button
                    disabled
                    className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/50 font-semibold cursor-not-allowed w-full lg:w-auto"
                  >
                    <Download size={18} /> Brosur Belum Tersedia
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

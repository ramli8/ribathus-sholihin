'use client';

import {
  BookOpen,
  GraduationCap,
  Clock,
  BookText,
  Microscope,
  Globe,
} from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const formalPrograms = [
  { name: 'MI / SD-IT Inklusif Berkarakter', icon: GraduationCap },
  { name: 'MTs / SMP Integrasi Kurikulum', icon: BookOpen },
  { name: 'MA / SMA Unggulan Sains & Agama', icon: Microscope },
];

const nonFormalPrograms = [
  { name: 'Madrasah Diniyah (Kitab Salafi)', icon: BookText },
  { name: "Tahfidz Al-Qur'an 30 Juz Bersanad", icon: Clock },
  { name: 'Kajian Bahasa (Arab & Inggris)', icon: Globe },
];

export default function Pendidikan() {
  return (
    <section
      id="pendidikan"
      className="py-24 md:py-32 bg-slate-50 dark:bg-slate-950 relative overflow-hidden"
    >
      {/* Soft Minimalist Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-white via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 opacity-90 z-0" />

      {/* Animated Glassmorphism Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex justify-center items-center">
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-10 -left-20 w-[600px] h-[600px] bg-emerald-300/10 dark:bg-emerald-800/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-teal-300/10 dark:bg-teal-900/10 rounded-full blur-[120px]"
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
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 text-emerald-700 dark:text-emerald-300 text-sm font-medium shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none mb-6">
            <BookOpen size={16} className="text-emerald-500" />
            <span className="uppercase tracking-wider">Kurikulum Terpadu</span>
          </div>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 font-heading tracking-tight">
            Pendidikan{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">
              Komprehensif
            </span>
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
            Perpaduan harmonis antara kedalaman ilmu-ilmu keislaman salaf dan
            kecakapan sains teknologi kontemporer untuk mencetak generasi
            unggul.
          </p>
        </motion.div>

        {/* Programs Grid - Bento Minimalist Glass Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
          {/* Formal Education */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            variants={fadeUp}
            className="group relative bg-white/40 dark:bg-slate-800/40 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all duration-500 backdrop-blur-2xl rounded-3xl p-8 md:p-10 border border-white/60 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden"
          >
            {/* Soft subtle glow on hover */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
                    Pendidikan Formal
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Integrasi sains dan agama
                  </p>
                </div>
              </div>

              <div className="space-y-4 flex-grow">
                {formalPrograms.map((program, idx) => {
                  const Icon = program.icon;
                  return (
                    <div
                      key={idx}
                      className="group/item flex items-center gap-4 p-4 rounded-2xl bg-white/50 dark:bg-slate-700/30 hover:bg-white/80 dark:hover:bg-slate-700/60 transition-colors backdrop-blur-md border border-white/40 dark:border-white/5"
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover/item:text-emerald-600 dark:group-hover/item:text-emerald-400 group-hover/item:bg-emerald-50 dark:group-hover/item:bg-emerald-900/20 transition-colors flex-shrink-0">
                        <Icon size={18} />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300 font-medium group-hover/item:text-slate-900 dark:group-hover/item:text-white transition-colors">
                        {program.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Diniyah Education */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            variants={fadeUp}
            className="group relative bg-white/40 dark:bg-slate-800/40 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all duration-500 backdrop-blur-2xl rounded-3xl p-8 md:p-10 border border-white/60 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden"
          >
            {/* Soft subtle glow on hover */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-teal-500/10 dark:bg-teal-500/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400">
                  <BookText size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
                    Pendidikan Diniyah
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Mengkaji warisan keilmuan Islam
                  </p>
                </div>
              </div>

              <div className="space-y-4 flex-grow">
                {nonFormalPrograms.map((program, idx) => {
                  const Icon = program.icon;
                  return (
                    <div
                      key={idx}
                      className="group/item flex items-center gap-4 p-4 rounded-2xl bg-white/50 dark:bg-slate-700/30 hover:bg-white/80 dark:hover:bg-slate-700/60 transition-colors backdrop-blur-md border border-white/40 dark:border-white/5"
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover/item:text-teal-600 dark:group-hover/item:text-teal-400 group-hover/item:bg-teal-50 dark:group-hover/item:bg-teal-900/20 transition-colors flex-shrink-0">
                        <Icon size={18} />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300 font-medium group-hover/item:text-slate-900 dark:group-hover/item:text-white transition-colors">
                        {program.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Daily Schedule - Highlight Card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          variants={fadeUp}
          className="relative rounded-3xl overflow-hidden group"
        >
          {/* Animated gradient border simulation */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 opacity-90 group-hover:scale-105 transition-transform duration-1000" />
          <div className="absolute inset-0 bg-slate-900/10 dark:bg-slate-950/20 blur-sm" />

          <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-8 bg-black/5 dark:bg-black/20 backdrop-blur-md m-[1px] rounded-[calc(1.5rem-1px)]">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white flex-shrink-0">
              <Clock size={32} />
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-2xl font-bold text-white mb-2 font-heading">
                Sistem Disiplin 24 Jam
              </h4>
              <p className="text-emerald-50/90 font-light leading-relaxed text-base md:text-lg max-w-3xl">
                Jadwal santri dikelola secara proporsional namun disiplin,
                dimulai dari qiyamullail sebelum subuh hingga mudzakarah di
                malam hari, membentuk rutinitas produktif dan ibadah yang
                istiqamah.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

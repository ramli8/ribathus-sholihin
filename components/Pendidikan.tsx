'use client';

import { BookOpen, GraduationCap, Clock, BookText } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

import type { ProfilData } from '@/hooks/useProfil';
import * as LucideIcons from 'lucide-react';

const fallbackFormal = [
  { name: 'MI / SD-IT Inklusif Berkarakter', icon: 'GraduationCap' },
  { name: 'MTs / SMP Integrasi Kurikulum', icon: 'BookOpen' },
  { name: 'MA / SMA Unggulan Sains & Agama', icon: 'Microscope' },
];

const fallbackDiniyah = [
  { name: 'Madrasah Diniyah (Kitab Salafi)', icon: 'BookText' },
  { name: "Tahfidz Al-Qur'an 30 Juz Bersanad", icon: 'Clock' },
  { name: 'Kajian Bahasa (Arab & Inggris)', icon: 'Globe' },
];

export default function Pendidikan({ profile }: { profile: ProfilData | null }) {

  // Helper to safely parse the JSON strings
  const parseProgramList = (
    jsonString: string | undefined,
    defaultList: any[]
  ) => {
    if (!jsonString) return defaultList;
    try {
      const parsed = JSON.parse(jsonString);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultList;
    } catch {
      return defaultList;
    }
  };

  const formalPrograms = parseProgramList(
    profile?.pendidikanFormalList,
    fallbackFormal
  );
  const nonFormalPrograms = parseProgramList(
    profile?.pendidikanDiniyahList,
    fallbackDiniyah
  );

  // Helper to render icon component string names
  const renderIcon = (iconName: string, size = 18) => {
    const Icon =
      (LucideIcons as Record<string, any>)[iconName] || LucideIcons.CheckCircle;
    return <Icon size={size} />;
  };
  return (
    <section
      id="pendidikan"
      className="py-16 md:py-24 bg-stone-50 dark:bg-stone-950 relative overflow-hidden"
    >
      {/* 
        Zero Ornaments Background. Earthy Editorial styling.
        Semua blur, warna-warni rotasi dihilangkan demi kelas maksimal.
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
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400 text-[11px] font-bold tracking-[0.2em] uppercase mb-8">
            Kurikulum Terpadu
          </div>
          <h3 className="text-3xl md:text-5xl lg:text-[4rem] font-bold text-stone-900 dark:text-stone-100 mb-6 font-heading tracking-tight leading-[1.1] text-balance">
            {profile?.pendidikanTitle || 'Pendidikan'}{' '}
            <span className="text-emerald-900 dark:text-emerald-500 block sm:inline">
              {profile?.pendidikanTitleHighlight || 'Komprehensif'}
            </span>
          </h3>
          <p className="text-stone-600 dark:text-stone-400 text-lg md:text-xl font-normal leading-relaxed mt-6 whitespace-pre-line">
            {profile?.pendidikanDesc ||
              'Perpaduan harmonis antara kedalaman ilmu-ilmu keislaman salaf dan kecakapan sains teknologi kontemporer untuk mencetak generasi unggul.'}
          </p>
        </motion.div>

        {/* Programs Grid - Pure Editorial Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-6 md:gap-y-8 max-w-6xl mx-auto">
          {/* Formal Education */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            variants={fadeUp}
            className="bg-white dark:bg-stone-900 rounded-[2rem] p-8 md:p-12 border border-stone-200/60 dark:border-stone-800 shadow-sm flex flex-col justify-start group hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10">
              <div className="w-16 h-16 rounded-full border border-stone-200 dark:border-stone-700 flex items-center justify-center bg-stone-50 dark:bg-stone-800 shrink-0">
                <GraduationCap className="w-7 h-7 text-emerald-800 dark:text-emerald-500" />
              </div>
              <div>
                <h4 className="text-2xl md:text-3xl font-bold text-stone-900 dark:text-stone-100 font-heading mb-2 group-hover:text-emerald-900 dark:group-hover:text-emerald-400 transition-colors">
                  {profile?.pendidikanFormalTitle || 'Pendidikan Formal'}
                </h4>
                <p className="text-stone-500 dark:text-stone-400 font-normal leading-relaxed text-[15px] max-w-md">
                  {profile?.pendidikanFormalDesc ||
                    'Integrasi sains dan agama'}
                </p>
              </div>
            </div>

            <div className="space-y-3 flex-grow">
              {formalPrograms.map(
                (program: Record<string, any>, idx: number) => {
                  return (
                    <div
                      key={idx}
                      className="group/item flex items-center gap-5 py-4 px-5 rounded-2xl border border-stone-100 dark:border-stone-800 hover:border-stone-200 dark:hover:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full border border-stone-100 dark:border-stone-700 bg-white dark:bg-stone-800 flex items-center justify-center text-stone-500 dark:text-stone-400 group-hover/item:text-emerald-800 dark:group-hover/item:text-emerald-500 transition-colors shrink-0 shadow-sm">
                        {renderIcon(program.icon as string, 20)}
                      </div>
                      <span className="text-stone-700 dark:text-stone-300 font-semibold group-hover/item:text-emerald-900 dark:group-hover/item:text-emerald-400 transition-colors">
                        {program.name as string}
                      </span>
                    </div>
                  );
                }
              )}
            </div>
          </motion.div>

          {/* Diniyah Education */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            variants={fadeUp}
            className="bg-white dark:bg-stone-900 rounded-[2rem] p-8 md:p-12 border border-stone-200/60 dark:border-stone-800 shadow-sm flex flex-col justify-start group hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10">
              <div className="w-16 h-16 rounded-full border border-stone-200 dark:border-stone-700 flex items-center justify-center bg-stone-50 dark:bg-stone-800 shrink-0">
                <BookText className="w-7 h-7 text-emerald-800 dark:text-emerald-500" />
              </div>
              <div>
                <h4 className="text-2xl md:text-3xl font-bold text-stone-900 dark:text-stone-100 font-heading mb-2 group-hover:text-emerald-900 dark:group-hover:text-emerald-400 transition-colors">
                  {profile?.pendidikanDiniyahTitle || 'Pendidikan Diniyah'}
                </h4>
                <p className="text-stone-500 dark:text-stone-400 font-normal leading-relaxed text-[15px] max-w-md">
                  {profile?.pendidikanDiniyahDesc ||
                    'Mengkaji warisan keilmuan Islam'}
                </p>
              </div>
            </div>

            <div className="space-y-3 flex-grow">
              {nonFormalPrograms.map(
                (program: Record<string, any>, idx: number) => {
                  return (
                    <div
                      key={idx}
                      className="group/item flex items-center gap-5 py-4 px-5 rounded-2xl border border-stone-100 dark:border-stone-800 hover:border-stone-200 dark:hover:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full border border-stone-100 dark:border-stone-700 bg-white dark:bg-stone-800 flex items-center justify-center text-stone-500 dark:text-stone-400 group-hover/item:text-emerald-800 dark:group-hover/item:text-emerald-500 transition-colors shrink-0 shadow-sm">
                        {renderIcon(program.icon as string, 20)}
                      </div>
                      <span className="text-stone-700 dark:text-stone-300 font-semibold group-hover/item:text-emerald-900 dark:group-hover/item:text-emerald-400 transition-colors">
                        {program.name as string}
                      </span>
                    </div>
                  );
                }
              )}
            </div>
          </motion.div>
        </div>

        {/* Daily Schedule - Highlight Slab */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          variants={fadeUp}
          className="max-w-6xl mx-auto w-full mt-6 lg:mt-8"
        >
          <div className="relative rounded-[2rem] bg-emerald-900 dark:bg-emerald-950 p-8 md:p-12 border border-emerald-800 flex flex-col md:flex-row items-center gap-8 group hover:-translate-y-1 transition-transform duration-300 overflow-hidden shadow-sm">
            {/* Minimalist Watermark Icon */}
            <div className="absolute -right-10 -bottom-10 text-emerald-800/30 dark:text-emerald-900/40 pointer-events-none group-hover:scale-110 transition-transform duration-700">
              <Clock className="w-48 h-48" />
            </div>

            <div className="w-16 h-16 rounded-full border border-emerald-800/50 flex items-center justify-center bg-emerald-950/40 text-emerald-100 shrink-0 z-10 shadow-inner">
              <Clock className="w-7 h-7" />
            </div>
            
            <div className="text-center md:text-left z-10">
              <h4 className="text-2xl md:text-3xl font-bold text-white mb-3 font-heading group-hover:text-emerald-300 transition-colors">
                {profile?.pendidikanDisiplinTitle || 'Sistem Disiplin 24 Jam'}
              </h4>
              <p className="text-emerald-100/90 font-normal leading-relaxed text-base lg:text-lg max-w-3xl whitespace-pre-line">
                {profile?.pendidikanDisiplinDesc ||
                  'Jadwal santri dikelola secara proporsional namun disiplin, dimulai dari qiyamullail sebelum subuh hingga mudzakarah di malam hari, membentuk rutinitas produktif dan ibadah yang istiqamah.'}
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

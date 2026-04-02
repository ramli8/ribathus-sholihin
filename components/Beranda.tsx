'use client';

import { useState } from 'react';
import { Play, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfil } from '@/hooks/useProfil';

export default function Beranda() {
  const { data: profile } = useProfil();
  const [showVideo, setShowVideo] = useState(false);

  const stats = [
    {
      value: `${profile?.statsSantri ?? 0}+`,
      label: 'Santri Aktif',
    },
    {
      value: `${profile?.statsTahun ?? 0}+`,
      label: 'Tahun Mengabdi',
    },
    {
      value: `${profile?.statsAsatidz ?? 0}+`,
      label: 'Pengajar Ahli',
    },
    {
      value: `${profile?.statsLulusan ?? 0}%`,
      label: 'Lulusan Unggul',
    },
  ];

  const renderHeroTitle = () => {
    const title = profile?.heroTitle || '';
    const highlight = profile?.heroTitleHighlight || '';

    if (!title) return null;

    if (!highlight || !title.includes(highlight)) {
      return <>{title}</>;
    }

    const parts = title.split(highlight);
    return (
      <>
        {parts[0]}
        <br className="hidden lg:block" />
        <span className="text-emerald-900 dark:text-emerald-500 relative whitespace-nowrap">
          {highlight}
        </span>
        <br className="hidden lg:block" />
        {parts.slice(1).join(highlight)}
      </>
    );
  };

  const getYoutubeEmbedUrl = (url: string) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <section
      id="#"
      className="relative bg-stone-50 dark:bg-stone-950 pt-32 pb-4 lg:pt-40 lg:pb-8 overflow-hidden flex flex-col justify-center"
    >
      {/* 
        NO BACKGROUND GRAPHICS. ZERO ORNAMENTS.
        Murni tipografi dan layout yang tajam (Editorial Design). 
      */}

      {/* Subtle Texture to prevent 'empty void' feeling on large monitors */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none z-0 mix-blend-multiply dark:mix-blend-screen"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '32px 32px' }}
      ></div>

      <div className="container relative z-10 px-4 sm:px-6 mx-auto max-w-7xl">
        
        {/* Centered Editorial Layout Container */}
        <div className="flex flex-col items-center justify-center max-w-4xl mx-auto text-center mt-12">
          
          <motion.div 
            className="flex flex-col items-center w-full"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-bold tracking-tight text-stone-900 dark:text-stone-100 leading-[1.08] mb-6"
            >
              {renderHeroTitle()}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-stone-600 dark:text-stone-400 font-normal leading-relaxed mb-8 max-w-3xl mx-auto"
            >
              {profile?.heroSubtitle || 'Mencetak generasi yang unggul dalam ilmu agama, berakhlak mulia, dan siap menghadapi tantangan zaman.'}
            </motion.p>
            
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
            >
              <a
                href="#pendaftaran"
                className="w-full sm:w-auto flex items-center justify-center h-14 px-10 rounded-xl bg-emerald-900 hover:bg-stone-900 dark:bg-emerald-800 dark:hover:bg-stone-100 dark:hover:text-stone-900 text-white font-medium transition-colors"
              >
                Pendaftaran Santri
                <ArrowRight className="ml-3 w-4 h-4" />
              </a>
              
              {profile?.youtubeUrl && (
                <button
                  type="button"
                  onClick={() => setShowVideo(true)}
                  className="w-full sm:w-auto flex items-center justify-center h-14 px-10 rounded-xl bg-transparent text-stone-800 dark:text-stone-200 font-medium transition-colors border border-stone-300 dark:border-stone-800 hover:border-emerald-900 dark:hover:border-emerald-500 group"
                >
                  <Play className="w-4 h-4 mr-3 text-stone-500 group-hover:text-emerald-900 dark:group-hover:text-emerald-400 transition-colors" />
                  Tonton Video
                </button>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Restored Bento Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 lg:mt-24 pb-4 max-w-6xl mx-auto w-full"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-stone-900 rounded-[1.25rem] md:rounded-4xl p-6 lg:p-8 flex flex-col justify-end min-h-[140px] md:min-h-[160px] relative overflow-hidden ring-1 ring-stone-200/50 dark:ring-stone-800 shadow-sm transition-transform duration-300 hover:-translate-y-1 group"
              >
                <span className="relative z-10 text-4xl md:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100 mb-1.5 font-heading">
                  {stat.value}
                </span>
                <span className="relative z-10 text-[13px] md:text-[14px] font-semibold tracking-wide text-emerald-800 dark:text-emerald-500 uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scroll Indicator (Mouse Outline) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-24 lg:mt-32 pb-16 flex flex-col items-center justify-center w-full"
        >
          <div className="w-[32px] h-[52px] rounded-full border-2 border-stone-300 dark:border-stone-700 flex justify-center p-2 mb-4 relative">
            <motion.div 
              className="w-1.5 h-3 bg-stone-400 dark:bg-stone-500 rounded-full"
              animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          <span className="text-[10px] font-bold tracking-[0.2em] text-stone-400 dark:text-stone-500 uppercase">
            Jelajahi
          </span>
        </motion.div>

      </div>

      {/* Video Modal Display */}
      <AnimatePresence>
        {showVideo && profile?.youtubeUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white transition-colors"
                onClick={() => setShowVideo(false)}
              >
                <X className="w-8 h-8" />
              </button>
              <iframe
                src={`${getYoutubeEmbedUrl(profile.youtubeUrl)}?autoplay=1`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Profil Pondok Pesantren Video"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

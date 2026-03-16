'use client';

import { useState } from 'react';
import { ArrowRight, Play, Sparkles, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfil } from '@/hooks/useProfil';

export default function Beranda() {
  const { data: profile } = useProfil();
  const [showVideo, setShowVideo] = useState(false);

  const stats = [
    {
      value: `${profile?.statsSantri || 1000}+`,
      label: 'Santri Aktif',
    },
    {
      value: `${profile?.statsTahun || 35}+`,
      label: 'Tahun Mengabdi',
    },
    {
      value: `${profile?.statsAsatidz || 50}+`,
      label: 'Pengajar Ahli',
    },
    {
      value: `${profile?.statsLulusan ?? 100}%`,
      label: 'Lulusan Unggul',
    },
  ];

  const getYoutubeEmbedUrl = (url: string) => {
    if (!url) return '';
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : '';
  };

  return (
    <section
      id="#"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950"
    >
      {/* Absolute Background Setup */}
      <div className="absolute inset-0 z-0">
        {/* Abstract Background Image for Texture */}
        <Image
          src="https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=2070&auto=format&fit=crop"
          alt="Abstract Background"
          fill
          className="object-cover opacity-[0.03] dark:opacity-[0.02] mix-blend-luminosity"
          priority
        />
        {/* Soft Minimalist Gradient Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 opacity-90" />
      </div>

      {/* Subtle Animated Orbs (Glassmorphism Core) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex justify-center items-center">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -top-[20%] right-[10%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full bg-emerald-300/20 dark:bg-emerald-800/20 blur-[120px]"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-[40%] -left-[10%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full bg-teal-300/20 dark:bg-teal-900/20 blur-[130px]"
        />
      </div>

      {/* Main Content Container */}
      <div className="container relative z-10 px-4 sm:px-6 mx-auto max-w-7xl pt-32 pb-20 md:py-32 flex flex-col items-center justify-center min-h-screen">
        {/* Floating Minimalist Top Badge */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="group relative mb-8 md:mb-12 cursor-pointer"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
          <Link
            href="#pendaftaran"
            className="relative flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 text-sm font-medium text-slate-700 dark:text-slate-300 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400">
              <Sparkles className="h-3 w-3 text-white" />
            </span>
            <span>
              Pendaftaran Santri Baru{' '}
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                2026/2027
              </span>{' '}
              Dibuka
            </span>
            <ArrowRight className="h-4 w-4 text-emerald-500 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Hero Typography - Minimalist & Grand */}
        <div className="text-center max-w-5xl mx-auto mb-10 md:mb-14">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6 font-heading"
          >
            {profile?.heroTitle?.split("Qur'ani")[0] || 'Mencetak Generasi '}
            <br className="hidden md:block" />
            <span className="relative whitespace-nowrap">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 dark:from-emerald-400 dark:via-teal-400 dark:to-emerald-500">
                Qur&apos;ani
              </span>
              <span className="absolute -bottom-2 left-0 right-0 h-3 bg-emerald-200/50 dark:bg-emerald-900/50 -rotate-1 skew-x-12 z-0 rounded-sm"></span>
            </span>{' '}
            {profile?.heroTitle?.split("Qur'ani")[1] || '& Berakhlakul Karimah'}
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="text-lg md:text-2xl text-slate-600 dark:text-slate-400 font-light max-w-3xl mx-auto leading-relaxed"
          >
            {profile?.heroSubtitle ||
              "Membangun peradaban Islam yang rahmatan lil 'alamin melalui pendidikan berkualitas dengan harmoni ilmu dunia dan akhirat."}
          </motion.p>
        </div>

        {/* Modern Minimal CTA Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto mb-20 md:mb-24"
        >
          <Link
            href="#pendaftaran"
            className="group relative flex h-14 w-full sm:w-auto items-center justify-center gap-2 overflow-hidden rounded-2xl bg-slate-900 dark:bg-emerald-600 px-8 text-white font-medium shadow-[0_0_40px_rgba(16,185,129,0.2)] dark:shadow-[0_0_40px_rgba(16,185,129,0.3)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(16,185,129,0.4)]"
          >
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
              <div className="relative h-full w-8 bg-white/20" />
            </div>
            <span className="relative z-10 flex items-center gap-2">
              Daftar Sekarang{' '}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          <button
            onClick={() => {
              if (profile?.youtubeUrl) {
                setShowVideo(true);
              }
            }}
            className="group flex h-14 w-full sm:w-auto items-center justify-center gap-3 rounded-2xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 px-8 text-slate-700 dark:text-slate-200 font-medium transition-all duration-300 hover:bg-white/60 dark:hover:bg-slate-800/60 hover:scale-[1.02]"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white transition-transform group-hover:scale-110">
              <Play className="h-3.5 w-3.5 ml-0.5" fill="currentColor" />
            </div>
            Tonton Profil Sekolah
          </button>
        </motion.div>

        {/* Minimalist Floating Stats */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 w-full max-w-5xl mx-auto"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="relative overflow-hidden flex flex-col items-center justify-center p-6 md:p-8 rounded-3xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-2xl border border-white/60 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-500 hover:-translate-y-1 hover:bg-white/60 dark:hover:bg-slate-800/60 group"
            >
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/5 dark:to-teal-500/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>

              <span className="relative z-10 text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-2 font-heading">
                {stat.value}
              </span>
              <span className="relative z-10 text-slate-500 dark:text-slate-400 text-sm md:text-base font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* YouTube Embed Modal */}
      <AnimatePresence>
        {showVideo && profile?.youtubeUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative w-full max-w-4xl mx-4 aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowVideo(false)}
                className="absolute -top-12 right-0 flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
              >
                <span className="text-sm font-medium">Tutup</span>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                  <X className="h-4 w-4" />
                </div>
              </button>

              {/* Video Iframe */}
              <iframe
                src={getYoutubeEmbedUrl(profile.youtubeUrl)}
                className="w-full h-full rounded-2xl shadow-2xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

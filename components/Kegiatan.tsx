'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ZoomIn } from 'lucide-react';
import { useProfil } from '@/hooks/useProfil';
import { useState } from 'react';
import ImageModal from '@/components/common/ImageModal';

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

interface EkstraItem {
  id: string;
  name: string;
  desc: string;
  image: string;
  colSpan: string;
}

const defaultActivities: EkstraItem[] = [
  {
    id: '1',
    name: 'Pramuka Santri',
    desc: 'Kemandirian & kepemimpinan',
    image:
      'https://images.unsplash.com/photo-1526976668912-1a811878dd37?q=80&w=400&auto=format&fit=crop',
    colSpan: 'lg:col-span-2 lg:row-span-2',
  },
  {
    id: '2',
    name: 'Pencak Silat',
    desc: 'Seni bela diri',
    image:
      'https://images.unsplash.com/photo-1518310383802-640c2de39ffb?q=80&w=400&auto=format&fit=crop',
    colSpan: '',
  },
  {
    id: '3',
    name: 'Kaligrafi',
    desc: "Seni khath Al-Qur'an",
    image:
      'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=400&auto=format&fit=crop',
    colSpan: '',
  },
  {
    id: '4',
    name: 'Jurnalistik',
    desc: 'Pelatihan mading & essay',
    image:
      'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?q=80&w=400&auto=format&fit=crop',
    colSpan: 'lg:col-span-2',
  },
  {
    id: '5',
    name: 'Multimedia',
    desc: 'Fotografi & desain',
    image:
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400&auto=format&fit=crop',
    colSpan: '',
  },
  {
    id: '6',
    name: 'Seni Hadroh',
    desc: 'Selawat Al-Banjari',
    image:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400&auto=format&fit=crop',
    colSpan: '',
  },
  {
    id: '7',
    name: 'Public Speaking',
    desc: 'Pidato 3 bahasa',
    image:
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=400&auto=format&fit=crop',
    colSpan: '',
  },
  {
    id: '8',
    name: 'Robotics',
    desc: 'Inovasi teknologi',
    image:
      'https://images.unsplash.com/photo-1581092921461-eab62e97a782?q=80&w=400&auto=format&fit=crop',
    colSpan: '',
  },
];

export default function Kegiatan() {
  const { data: profile } = useProfil();
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    name: string;
    desc?: string;
  } | null>(null);

  const parseEkstraList = (): EkstraItem[] => {
    if (!profile?.ekstraList) return defaultActivities;
    try {
      const parsed = JSON.parse(profile.ekstraList);
      return Array.isArray(parsed) && parsed.length > 0
        ? parsed
        : defaultActivities;
    } catch {
      return defaultActivities;
    }
  };

  const activities = parseEkstraList();
  const ekstraTitle = profile?.ekstraTitle || 'Kembangkan Minat &';
  const ekstraTitleHighlight = profile?.ekstraTitleHighlight || 'Bakat';
  const ekstraDesc =
    profile?.ekstraDesc ||
    'Kami meyakini setiap santri adalah bintang. Beragam program hadir untuk memastikan mereka siap menyongsong masa depan dengan skill terapan.';

  return (
    <section
      id="kegiatan"
      className="py-24 md:py-32 bg-slate-50 dark:bg-slate-950 relative overflow-hidden"
    >
      {/* Soft Minimalist Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 opacity-90 z-0" />

      {/* Animated Glassmorphism Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex justify-center items-center">
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-[20%] right-0 w-[500px] h-[500px] bg-emerald-200/15 dark:bg-emerald-800/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-[20%] left-0 w-[500px] h-[500px] bg-teal-200/15 dark:bg-teal-900/10 rounded-full blur-[120px]"
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
          className="text-center mb-16 md:mb-20 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 text-emerald-700 dark:text-emerald-300 text-sm font-medium shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none mb-6 tracking-wider">
            EKSTRAKURIKULER
          </div>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 font-heading tracking-tight">
            {ekstraTitle}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">
              {ekstraTitleHighlight}
            </span>
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
            {ekstraDesc}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[240px]"
        >
          {activities.map((act, idx) => {
            const isLarge = act.colSpan.includes('lg:row-span-2');
            const isWide = act.colSpan.includes('lg:col-span-2') && !isLarge;

            return (
              <motion.div
                key={act.id || idx}
                variants={fadeUp}
                onClick={() => setSelectedImage({ url: act.image, name: act.name, desc: act.desc })}
                className={`group relative rounded-3xl overflow-hidden bg-slate-900 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_8px_30px_rgba(16,185,129,0.15)] hover:-translate-y-1 cursor-pointer ${act.colSpan}`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0 h-full w-full">
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={
                        act.image ||
                        'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800&auto=format&fit=crop'
                      }
                      alt={act.name}
                      fill
                      className="object-cover opacity-80 group-hover:opacity-100 transform scale-100 group-hover:scale-110 transition-all duration-1000 ease-out"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      unoptimized={
                        act.image ? act.image.startsWith('/images/') : false
                      }
                    />
                    {/* Gradient Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${isLarge ? 'from-slate-900 via-slate-900/50 to-transparent' : 'from-slate-900/90 via-slate-900/40 to-transparent'} group-hover:from-slate-900/95 transition-colors duration-500`}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="absolute inset-0 z-10 p-6 flex flex-col justify-end h-full pointer-events-none">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h5
                      className={`font-bold text-white mb-1 font-heading tracking-tight drop-shadow-md ${isLarge ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'}`}
                    >
                      {act.name}
                    </h5>
                    <p
                      className={`text-slate-200 font-light leading-snug drop-shadow-sm opacity-80 group-hover:opacity-100 transition-opacity duration-500 ${isLarge || isWide ? 'text-base' : 'text-sm'}`}
                    >
                      {act.desc}
                    </p>
                  </div>

                  {/* Zoom Indicator */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ZoomIn size={20} />
                  </div>

                  {/* Decorative Element */}
                  <div className="absolute top-6 right-6 w-8 h-8 rounded-full border border-white/20 bg-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal
          isOpen={true}
          onClose={() => setSelectedImage(null)}
          imageUrl={selectedImage.url}
          title={selectedImage.name}
          description={selectedImage.desc}
        />
      )}
    </section>
  );
}

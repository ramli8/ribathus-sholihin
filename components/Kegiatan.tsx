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
            Ekstrakurikuler
          </div>
          <h3 className="text-3xl md:text-5xl lg:text-[4rem] font-bold text-stone-900 dark:text-stone-100 mb-6 font-heading tracking-tight leading-[1.1] text-balance">
            {ekstraTitle}{' '}
            <span className="text-emerald-900 dark:text-emerald-500 block sm:inline">
              {ekstraTitleHighlight}
            </span>
          </h3>
          <p className="text-stone-600 dark:text-stone-400 text-lg md:text-xl font-normal leading-relaxed mt-6 whitespace-pre-line">
            {ekstraDesc}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[240px] max-w-6xl mx-auto"
        >
          {activities.map((act, idx) => {
            const isLarge = act.colSpan.includes('lg:row-span-2');
            const isWide = act.colSpan.includes('lg:col-span-2') && !isLarge;

            return (
              <motion.div
                key={act.id || idx}
                variants={fadeUp}
                onClick={() => setSelectedImage({ url: act.image, name: act.name, desc: act.desc })}
                className={`group relative rounded-[2rem] overflow-hidden bg-stone-200 dark:bg-stone-900 shadow-sm border border-stone-200/50 dark:border-stone-800 hover:-translate-y-1 transition-transform duration-300 cursor-pointer ${act.colSpan}`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0 h-full w-full bg-stone-200 dark:bg-stone-800">
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={
                        act.image ||
                        'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800&auto=format&fit=crop'
                      }
                      alt={act.name}
                      fill
                      className="object-cover opacity-90 group-hover:opacity-100 transform scale-100 group-hover:scale-105 transition-all duration-[1.5s] ease-out mix-blend-multiply dark:mix-blend-normal"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      unoptimized={
                        act.image ? act.image.startsWith('/images/') : false
                      }
                    />
                    {/* Dark Editorial Gradient Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${
                        isLarge
                          ? 'from-stone-950/90 via-stone-900/50 to-transparent'
                          : 'from-stone-950/90 via-stone-900/40 to-transparent'
                      } group-hover:from-stone-900/90 transition-colors duration-500`}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="absolute inset-0 z-10 p-6 md:p-8 flex flex-col justify-end h-full pointer-events-none">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h5
                      className={`font-bold text-white mb-2 font-heading tracking-tight drop-shadow-sm group-hover:text-stone-100 transition-colors ${
                        isLarge ? 'text-2xl md:text-3xl' : 'text-xl'
                      }`}
                    >
                      {act.name}
                    </h5>
                    <p
                      className={`text-stone-300 font-normal leading-snug drop-shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75 h-0 overflow-hidden group-hover:h-auto ${
                        isLarge || isWide ? 'text-[15px]' : 'text-sm'
                      }`}
                    >
                      {act.desc}
                    </p>
                  </div>

                  {/* Zoom Indicator */}
                  <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ZoomIn size={18} />
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

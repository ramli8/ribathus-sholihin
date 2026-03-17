'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Building2, ZoomIn } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
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

interface FasilitasItem {
  id: string;
  title: string;
  desc: string;
  image: string;
  icon: string;
  colSpan: string;
}

const defaultFacilities: FasilitasItem[] = [
  {
    id: '1',
    title: 'Gedung Asrama',
    desc: 'Asrama putra & putri terpisah dengan fasilitas memadai. Diawasi musyrif 24 jam.',
    image:
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=600&auto=format&fit=crop',
    icon: 'Building2',
    colSpan: 'md:col-span-2 lg:col-span-2',
  },
  {
    id: '2',
    title: "Masjid Jami'",
    desc: 'Pusat ibadah berkapasitas 2000 jamaah untuk salat dan pengajian.',
    image:
      'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=400&auto=format&fit=crop',
    icon: 'Church',
    colSpan: 'col-span-1',
  },
  {
    id: '3',
    title: 'Ruang Kelas & Lab',
    desc: 'Ruang representatif ber-AC dengan lab komputer dan lab bahasa terpadu.',
    image:
      'https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=400&auto=format&fit=crop',
    icon: 'GraduationCap',
    colSpan: 'col-span-1',
  },
  {
    id: '4',
    title: 'Perpustakaan Kitab',
    desc: 'Koleksi ribuan kitab salaf hingga literatur modern untuk memfasilitasi riset.',
    image:
      'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=600&auto=format&fit=crop',
    icon: 'BookOpen',
    colSpan: 'md:col-span-2 lg:col-span-2',
  },
  {
    id: '5',
    title: 'Pos Kesehatan',
    desc: 'Klinik tingkat pertama dijaga perawat berpengalaman & dokter kunjungan.',
    image:
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=400&auto=format&fit=crop',
    icon: 'Heart',
    colSpan: 'md:col-span-1',
  },
  {
    id: '6',
    title: 'Kantin Memadai',
    desc: 'Kantin sehat dengan menu higienis bernutrisi dan koperasi pelajaran.',
    image:
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=400&auto=format&fit=crop',
    icon: 'Utensils',
    colSpan: 'md:col-span-2 lg:col-span-1 lg:row-span-2',
  },
];

const renderIcon = (iconName: string, size = 24) => {
  const Icon = (
    LucideIcons as Record<string, React.ComponentType<{ size?: number }>>
  )[iconName];
  return Icon ? <Icon size={size} /> : <Building2 size={size} />;
};

export default function Fasilitas() {
  const { data: profile } = useProfil();
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    title: string;
    desc?: string;
  } | null>(null);

  const parseFasilitasList = (): FasilitasItem[] => {
    if (!profile?.fasilitasList) return defaultFacilities;
    try {
      const parsed = JSON.parse(profile.fasilitasList);
      return Array.isArray(parsed) && parsed.length > 0
        ? parsed
        : defaultFacilities;
    } catch {
      return defaultFacilities;
    }
  };

  const facilities = parseFasilitasList();
  const fasilitasTitle = profile?.fasilitasTitle || 'Kenyamanan';
  const fasilitasTitleHighlight =
    profile?.fasilitasTitleHighlight || 'Menuntut Ilmu';
  const fasilitasDesc =
    profile?.fasilitasDesc ||
    'Kami merancang lingkungan pesantren yang asri, bersih, dan modern agar santri dapat fokus menuntut ilmu dengan nyaman.';

  return (
    <section
      id="fasilitas"
      className="py-24 md:py-32 bg-slate-50 dark:bg-slate-950 relative overflow-hidden"
    >
      {/* Soft Minimalist Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-100 via-slate-50 to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 opacity-90 z-0" />

      {/* Animated Glassmorphism Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex justify-center items-center">
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-emerald-200/20 dark:bg-emerald-800/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-[10%] left-[5%] w-[600px] h-[600px] bg-teal-200/20 dark:bg-teal-900/20 rounded-full blur-[120px]"
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
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 text-teal-700 dark:text-teal-300 text-sm font-medium shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none mb-6">
            <Building2 size={16} className="text-teal-500" />
            <span className="uppercase tracking-wider">
              Fasilitas Berstandar
            </span>
          </div>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 font-heading tracking-tight">
            {fasilitasTitle}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400">
              {fasilitasTitleHighlight}
            </span>
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
            {fasilitasDesc}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[320px]"
        >
          {facilities.map((fac, idx) => (
            <motion.div
              key={fac.id || idx}
              variants={fadeUp}
              onClick={() => setSelectedImage({ url: fac.image, title: fac.title, desc: fac.desc })}
              className={`group relative rounded-3xl overflow-hidden bg-white/40 dark:bg-slate-800/40 backdrop-blur-2xl border border-white/60 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_8px_30px_rgba(16,185,129,0.1)] hover:-translate-y-1 cursor-pointer ${fac.colSpan}`}
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={fac.image}
                    alt={fac.title}
                    fill
                    className="object-cover transform scale-100 group-hover:scale-110 transition-transform duration-1000 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized={fac.image.startsWith('/images/')}
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent group-hover:from-slate-900/95 group-hover:via-slate-900/50 transition-colors duration-500" />
                </div>
              </div>

              {/* Content */}
              <div className="absolute inset-0 z-10 p-6 md:p-8 flex flex-col justify-end h-full pointer-events-none">
                {/* Icon */}
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white mb-4 group-hover:scale-110 group-hover:bg-emerald-500/80 group-hover:border-emerald-400/50 transition-all duration-500">
                  {renderIcon(fac.icon)}
                </div>

                {/* Zoom Indicator */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn size={20} />
                </div>

                {/* Text */}
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h4 className="text-xl md:text-2xl font-bold text-white mb-2 font-heading tracking-tight drop-shadow-md">
                    {fac.title}
                  </h4>
                  <p className="text-slate-200 text-sm md:text-base font-light leading-relaxed max-w-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 h-0 overflow-hidden group-hover:h-auto">
                    {fac.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal
          isOpen={true}
          onClose={() => setSelectedImage(null)}
          imageUrl={selectedImage.url}
          title={selectedImage.title}
          description={selectedImage.desc}
        />
      )}
    </section>
  );
}

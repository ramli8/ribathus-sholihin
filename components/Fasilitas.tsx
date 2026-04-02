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
    LucideIcons as unknown as Record<
      string,
      React.ComponentType<{ size?: number }>
    >
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
      className="py-16 md:py-24 bg-stone-50 dark:bg-stone-950 relative overflow-hidden"
    >
      {/* Zero Ornaments Background - Terintegrasi dengan Earthy Editorial */}
      
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
            Fasilitas Berstandar
          </div>
          <h3 className="text-3xl md:text-5xl lg:text-[4rem] font-bold text-stone-900 dark:text-stone-100 mb-6 font-heading tracking-tight leading-[1.1] text-balance">
            {fasilitasTitle}{' '}
            <span className="text-emerald-900 dark:text-emerald-500 block sm:inline">
              {fasilitasTitleHighlight}
            </span>
          </h3>
          <p className="text-stone-600 dark:text-stone-400 text-lg md:text-xl font-normal leading-relaxed mt-6 whitespace-pre-line">
            {fasilitasDesc}
          </p>
        </motion.div>

        {/* Bento Grid Gallery */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[320px] max-w-6xl mx-auto"
        >
          {facilities.map((fac, idx) => (
            <motion.div
              key={fac.id || idx}
              variants={fadeUp}
              onClick={() =>
                setSelectedImage({
                  url: fac.image,
                  title: fac.title,
                  desc: fac.desc,
                })
              }
              className={`group relative rounded-[2rem] overflow-hidden bg-stone-200 dark:bg-stone-900 shadow-sm border border-stone-200/50 dark:border-stone-800 hover:-translate-y-1 transition-transform duration-300 cursor-pointer ${fac.colSpan}`}
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={fac.image}
                    alt={fac.title}
                    fill
                    className="object-cover transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out opacity-90 group-hover:opacity-100 mix-blend-multiply dark:mix-blend-normal"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized={fac.image.startsWith('/images/')}
                  />
                  {/* Heavy vignette gradient for earthy tone readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-900/40 to-transparent opacity-90 group-hover:from-stone-900/90 transition-colors duration-500" />
                </div>
              </div>

              {/* Content */}
              <div className="absolute inset-0 z-10 p-6 md:p-8 flex flex-col justify-end h-full pointer-events-none">
                {/* Icon */}
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white mb-5 group-hover:scale-110 group-hover:bg-emerald-700/90 group-hover:border-emerald-500/50 transition-all duration-300 shadow-sm">
                  {renderIcon(fac.icon)}
                </div>

                {/* Zoom Indicator */}
                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn size={18} />
                </div>

                {/* Text */}
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h4 className="text-xl md:text-2xl font-bold text-white mb-2 font-heading tracking-tight drop-shadow-sm group-hover:text-stone-100 transition-colors">
                    {fac.title}
                  </h4>
                  <p className="text-stone-300 text-[15px] font-normal leading-relaxed max-w-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75 h-0 overflow-hidden group-hover:h-auto">
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

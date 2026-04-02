'use client';

import {
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useProfil } from '@/hooks/useProfil';

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

export default function Kontak() {
  const { data: profile } = useProfil();

  const brandingName = profile?.nama || '';

  const contactInfo = [
    {
      label: 'Alamat',
      value:
        profile?.alamat ||
        'Jl. Pesantren No. 99, Desa Sidomulyo, Kec. Jombang, Kab. Jombang, Jawa Timur 61413',
    },
    {
      label: 'Telepon',
      value: profile?.telepon || '+62 812-3456-7890',
      subtext: '(Admin)',
    },
    {
      label: 'Email',
      value: profile?.email || 'info@ribathussholihin.sch.id',
    },
    {
      label: 'Jam Operasional',
      value: profile?.jamOperasional || 'Senin - Sabtu, 08:00 - 16:00 WIB',
    },
  ];

  // Dynamic social media links
  const socialLinks = [
    { icon: Instagram, href: profile?.instagramUrl || '', label: 'Instagram' },
    { icon: Facebook, href: profile?.facebookUrl || '', label: 'Facebook' },
    { icon: Youtube, href: profile?.youtubeChannelUrl || '', label: 'YouTube' },
    {
      icon: MessageCircle,
      href: profile?.whatsappUrl || '',
      label: 'WhatsApp',
    },
  ].filter((link) => link.href !== '');

  return (
    <footer
      id="kontak"
      className="pt-24 md:pt-32 pb-12 bg-stone-950 border-t border-stone-800"
    >
      <div className="container px-4 sm:px-6 mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 mb-20 max-w-6xl mx-auto"
        >
          {/* Sejarah Pondok / Brand Column */}
          <motion.div
            variants={fadeUp}
            className="md:col-span-4 lg:col-span-5 flex flex-col"
          >
            <Link href="/" className="flex items-center gap-4 mb-8">
              {profile?.logoUrl ? (
                <Image
                  src={profile.logoUrl}
                  alt={brandingName}
                  width={56}
                  height={56}
                  className="w-14 h-14 object-contain"
                  unoptimized
                />
              ) : (
                <div className="w-14 h-14 bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-300 font-bold text-xl rounded">
                  {brandingName.substring(0, 2).toUpperCase()}
                </div>
              )}
              <div className="flex flex-col">
                <span className="font-bold text-xl md:text-2xl text-stone-100 font-heading tracking-tight leading-none">
                  {brandingName}
                </span>
              </div>
            </Link>

            <p className="text-stone-400 text-sm md:text-[15px] leading-relaxed mb-10 font-light max-w-xs md:max-w-none">
              {profile?.deskripsi ||
                'Mencetak generasi rabbani yang tangguh secara spiritual dan intelektual, mencerahkan peradaban dengan landasan Ahlussunnah wal Jamaah.'}
            </p>

            {/* Social Links Minimum Style */}
            <div className="flex items-center gap-4 mt-auto">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-stone-500 hover:text-stone-100 transition-colors duration-300"
                  >
                    <Icon size={20} strokeWidth={1.5} />
                  </Link>
                );
              })}
            </div>
          </motion.div>

          {/* Contact Info Pure Typography Column */}
          <motion.div
            variants={fadeUp}
            className="md:col-span-8 lg:col-span-7 flex flex-col"
          >
            <h4 className="flex items-center gap-4 text-[11px] font-bold text-stone-500 uppercase tracking-widest mb-10 border-b border-stone-800/60 pb-3">
              Informasi Terpadu
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
              {contactInfo.map((info, idx) => (
                <div key={idx} className="flex flex-col text-left">
                  <p className="text-[10px] text-stone-500 uppercase tracking-widest mb-3 font-bold select-none">
                    {info.label}
                  </p>
                  <p className="text-stone-300 text-sm md:text-[15px] font-normal leading-relaxed text-balance">
                    {info.value}
                    {info.subtext && (
                      <span className="text-stone-500 block sm:inline sm:ml-1 font-medium mt-1 sm:mt-0">
                        {info.subtext}
                      </span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Pure Clean Map Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-16 max-w-6xl mx-auto"
        >
          <div className="h-[300px] md:h-[400px] w-full border border-stone-800 bg-stone-900 overflow-hidden">
            {profile?.gmapLocation ? (
              <iframe
                src={profile.gmapLocation}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
                title="Lokasi Pesantren"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8">
                <MapPin size={40} strokeWidth={1} className="mb-4 text-stone-700" />
                <p className="text-stone-500 text-sm font-light tracking-wide uppercase">Peta lokasi belum dikonfigurasi</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Minimalist Bottom Bar */}
        <div className="border-t border-stone-800/50 pt-8 pb-4 flex items-center justify-center max-w-6xl mx-auto">
          <p className="text-stone-500 text-[11px] font-normal uppercase tracking-widest text-center">
            © {new Date().getFullYear()}{' '}
            <span className="text-stone-400 font-bold ml-1">
              Yayasan {brandingName}
            </span>
            . Hak Cipta Dilindungi Undang-Undang.
          </p>
        </div>
      </div>
    </footer>
  );
}

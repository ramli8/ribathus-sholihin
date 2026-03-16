'use client';

import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
  Clock,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
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

const quickLinks = [
  'Beranda',
  'Profil Pengasuh',
  'Visi & Misi',
  'Program Pendidikan',
  'Pendaftaran Santri',
  'Galeri Kegiatan',
];

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: MessageCircle, href: '#', label: 'WhatsApp' },
];

import { useProfil } from '@/hooks/useProfil';

export default function Kontak() {
  const { data: profile } = useProfil();

  const brandingName = profile?.nama || 'Ribathus Sholihin';

  const contactInfo = [
    {
      icon: MapPin,
      label: 'Alamat',
      value:
        profile?.alamat ||
        'Jl. Pesantren No. 99, Desa Sidomulyo, Kec. Jombang, Kab. Jombang, Jawa Timur 61413',
    },
    {
      icon: Phone,
      label: 'Telepon',
      value: profile?.telepon || '+62 812-3456-7890',
      subtext: '(Admin)',
    },
    {
      icon: Mail,
      label: 'Email',
      value: profile?.email || 'info@ribathussholihin.sch.id',
    },
    {
      icon: Clock,
      label: 'Jam Operasional',
      value: 'Senin - Sabtu, 08:00 - 16:00 WIB',
    },
  ];

  return (
    <footer
      id="kontak"
      className="relative pt-24 md:pt-32 pb-12 overflow-hidden bg-slate-900"
    >
      {/* Modern Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-950 z-0" />

      {/* Animated Glassmorphism Orbs for Footer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex justify-center items-center">
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-0 right-[20%] w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-0 left-[10%] w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px]"
        />
      </div>

      <div className="container px-4 sm:px-6 mx-auto max-w-7xl relative z-10">
        {/* Main Footer Bento Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8 mb-16"
        >
          {/* Brand Info Card - Large */}
          <motion.div
            variants={fadeUp}
            className="lg:col-span-4 p-8 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.1)] flex flex-col h-full hover:bg-white/10 transition-colors duration-500"
          >
            <Link href="#" className="flex items-center gap-4 mb-8 group">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
                {brandingName.substring(0, 2).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-white font-heading tracking-tight text-left">
                  {brandingName}
                </span>
                <span className="text-sm text-emerald-300/80 font-medium tracking-wider uppercase text-left">
                  Pondok Pesantren
                </span>
              </div>
            </Link>

            <p className="text-slate-300/90 text-sm md:text-base leading-relaxed mb-8 flex-grow font-light">
              {profile?.deskripsi ||
                'Mencetak generasi rabbani yang tangguh secara spiritual dan intelektual, mencerahkan peradaban dengan landasan Ahlussunnah wal Jamaah.'}
            </p>

            {/* Social Links - Minimalist Glass */}
            <div className="flex items-center gap-3 mt-auto">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={idx}
                    href={social.href}
                    aria-label={social.label}
                    className="w-12 h-12 rounded-2xl bg-white/5 backdrop-blur-md flex items-center justify-center text-slate-300 hover:bg-emerald-500 hover:text-white transition-all duration-300 border border-white/10 hover:border-emerald-400/50 group"
                  >
                    <Icon
                      size={18}
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                  </Link>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links Card */}
          <motion.div
            variants={fadeUp}
            className="lg:col-span-3 p-8 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:bg-white/10 transition-colors duration-500"
          >
            <h4 className="flex items-center gap-2 text-sm font-semibold text-white uppercase tracking-wider mb-8">
              <span className="w-8 h-[1px] bg-emerald-500"></span>
              Tautan Cepat
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href="#"
                    className="group flex items-center gap-3 text-slate-300 hover:text-emerald-400 transition-colors text-sm font-medium"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-emerald-400 group-hover:scale-150 transition-all duration-300" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info Card */}
          <motion.div
            variants={fadeUp}
            className="lg:col-span-5 p-8 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:bg-white/10 transition-colors duration-500"
          >
            <h4 className="flex items-center gap-2 text-sm font-semibold text-white uppercase tracking-wider mb-8">
              <span className="w-8 h-[1px] bg-emerald-500"></span>
              Hubungi Kami
            </h4>
            <ul className="space-y-6">
              {contactInfo.map((info, idx) => {
                const Icon = info.icon;
                return (
                  <li key={idx} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-2xl bg-white/5 backdrop-blur-md flex items-center justify-center text-emerald-400 flex-shrink-0 border border-white/10 group-hover:bg-emerald-500/20 group-hover:text-emerald-300 transition-colors duration-300">
                      <Icon size={18} />
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-slate-400 uppercase tracking-wider mb-1 font-medium">
                        {info.label}
                      </p>
                      <p className="text-white text-sm md:text-base font-light leading-relaxed">
                        {info.value}
                        {info.subtext && (
                          <span className="text-emerald-400 ml-1 font-medium">
                            {info.subtext}
                          </span>
                        )}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>

        {/* Interactive Map Bento Card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-16 rounded-3xl p-2 bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.1)] group"
        >
          <div className="relative rounded-2xl overflow-hidden h-[300px] md:h-[400px] w-full">
            <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-[2px] group-hover:backdrop-blur-none transition-all duration-700 z-10 pointer-events-none" />

            {/* Overlay Gradient that fades on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-10 pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity duration-700" />

            {/* Map Placeholder Content (Visible before interaction) */}
            <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3 transform group-hover:translate-y-4 group-hover:opacity-0 transition-all duration-500">
              <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                <MapPin size={24} />
              </div>
              <div>
                <span className="block text-white font-bold text-lg drop-shadow-md">
                  Lokasi Pesantren
                </span>
                <span className="block text-emerald-50 text-sm drop-shadow-sm">
                  Jombang, Jawa Timur
                </span>
              </div>
            </div>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.678884808992!2d112.2234!3d-7.5456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMzInNDQuMiJTIDExMsKwMTMnMjQuMiJF!5e0!3m2!1sen!2sid!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale-[50%] contrast-[1.2] opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              title="Lokasi Pesantren"
            />
          </div>
        </motion.div>

        {/* Minimalist Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-400 text-sm text-center md:text-left font-light">
            © {new Date().getFullYear()}{' '}
            <span className="text-white font-medium">
              Yayasan Ribathus Sholihin
            </span>
            . Hak Cipta Dilindungi Undang-Undang.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-sm font-medium">
            <Link
              href="#"
              className="text-slate-400 hover:text-emerald-400 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-emerald-400 hover:after:w-full after:transition-all after:duration-300"
            >
              Kebijakan Privasi
            </Link>
            <div className="w-1 h-1 rounded-full bg-slate-700 hidden md:block" />
            <Link
              href="#"
              className="text-slate-400 hover:text-emerald-400 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-emerald-400 hover:after:w-full after:transition-all after:duration-300"
            >
              Syarat & Ketentuan
            </Link>
            <div className="w-1 h-1 rounded-full bg-slate-700 hidden md:block" />
            <Link
              href="#"
              className="text-slate-400 hover:text-emerald-400 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-emerald-400 hover:after:w-full after:transition-all after:duration-300"
            >
              Peta Situs
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

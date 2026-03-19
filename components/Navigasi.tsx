'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

import { useProfil } from '@/hooks/useProfil';

const navLinks = [
  { name: 'Beranda', href: '#' },
  { name: 'Profil', href: '#profil' },
  { name: 'Pendidikan', href: '#pendidikan' },
  { name: 'Fasilitas', href: '#fasilitas' },
  { name: 'Kegiatan', href: '#kegiatan' },
  { name: 'Berita', href: '#berita' },
  { name: 'Kontak', href: '#kontak' },
];

export default function Navigasi() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { data: profile } = useProfil();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const brandingName = profile?.nama || 'Ribathus Sholihin';

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled ? 'py-4' : 'py-6'
      )}
    >
      <div className="container px-4 sm:px-6 mx-auto max-w-7xl">
        {/* Modern Minimalist Navigation Bar */}
        <div
          className={cn(
            'flex items-center justify-between transition-all duration-500 rounded-full px-4 md:px-6 py-3 border border-transparent',
            isScrolled
              ? 'bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-none border-white/60 dark:border-slate-800/80'
              : 'bg-transparent'
          )}
        >
          {/* Logo */}
          <Link href="#" className="flex items-center gap-3 group">
            {profile?.logoUrl ? (
              <Image
                src={profile.logoUrl}
                alt={brandingName}
                width={40}
                height={40}
                className="w-10 h-10 object-contain group-hover:scale-105 transition-transform duration-300"
                unoptimized
              />
            ) : (
              <div className="w-10 h-10 bg-linear-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold tracking-tighter text-lg shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
                {brandingName.substring(0, 2).toUpperCase()}
              </div>
            )}
            <div className="flex flex-col text-left">
              <span className="font-bold text-sm sm:text-lg tracking-tight text-slate-900 dark:text-white font-heading leading-none">
                {brandingName}
              </span>
            </div>
          </Link>

          {/* Desktop Menu - Floating Pill Style */}
          <div className="hidden lg:flex items-center gap-1 px-4 py-1.5 rounded-full bg-slate-50/50 dark:bg-slate-800/30 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50">
            {navLinks.map((link) => {
              const targetHref = pathname === '/' ? link.href : `/${link.href}`;
              return (
                <Link
                  key={link.name}
                  href={targetHref}
                  className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors rounded-full hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm"
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="relative w-10 h-10 flex items-center justify-center rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent dark:border-slate-800"
                aria-label="Toggle Theme"
              >
                <Sun className="h-[18px] w-[18px] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[18px] w-[18px] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </button>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="relative w-10 h-10 flex items-center justify-center rounded-full text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </button>
            )}
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Minimalist Glass Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden absolute left-4 right-4 top-full mt-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/50 dark:border-slate-700/50 rounded-3xl overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-2">
              {navLinks.map((link) => {
                const targetHref =
                  pathname === '/' ? link.href : `/${link.href}`;
                return (
                  <Link
                    key={link.name}
                    href={targetHref}
                    className="py-3 px-4 text-base font-medium text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-white dark:hover:bg-slate-800 rounded-2xl transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="w-full h-px bg-slate-200/50 dark:bg-slate-700/50 my-2" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

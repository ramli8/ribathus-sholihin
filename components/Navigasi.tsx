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
];

export default function Navigasi() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { data: profile } = useProfil();
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState('#');

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navLinks.map(l => l.href.substring(1));
      let current = '#';
      
      if (window.scrollY < 300) {
        current = '#';
      } else {
        for (const section of sections) {
          if (!section) continue;
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
              current = `#${section}`;
            }
          }
        }
      }
      setActiveSection(current);
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const brandingName = profile?.nama || 'Ribathus Sholihin';

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-stone-50/90 dark:bg-stone-950/90 backdrop-blur-xl border-b border-stone-200/50 dark:border-stone-800/80 shadow-xs py-3'
          : 'bg-transparent py-5 lg:py-6'
      )}
    >
      <div className="container px-4 sm:px-6 mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            {profile?.logoUrl ? (
              <Image
                src={profile.logoUrl}
                alt={brandingName}
                width={40}
                height={40}
                className="w-9 h-9 object-contain rounded-lg"
                unoptimized
              />
            ) : (
              <div className="w-9 h-9 bg-emerald-700 dark:bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-sm tracking-tight">
                {brandingName.substring(0, 2).toUpperCase()}
              </div>
            )}
            <div className="flex flex-col text-left">
              <span className="font-bold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white leading-none">
                {brandingName}
              </span>
            </div>
          </Link>

          {/* Desktop Menu - Clean & Flat */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const targetHref = pathname === '/' ? link.href : `/${link.href}`;
              const isActive = activeSection === link.href;

              return (
                <Link
                  key={link.name}
                  href={targetHref}
                  className={cn(
                    "text-base font-semibold transition-colors",
                    isActive
                      ? "text-emerald-700 dark:text-emerald-400"
                      : "text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Actions Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle Theme"
              >
                <Sun className="h-5 w-5 hidden dark:block" />
                <Moon className="h-5 w-5 block dark:hidden" />
              </button>
            )}
            
            <Link
              href="#kontak"
              className="hidden lg:flex items-center px-7 py-2.5 text-[13px] uppercase tracking-widest font-bold text-stone-100 bg-stone-900 border border-stone-800 hover:bg-stone-800 dark:text-stone-900 dark:bg-stone-100 dark:hover:bg-white rounded-full transition-all shadow-sm"
            >
              Hubungi Kami
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Sun className="h-5 w-5 hidden dark:block" />
                <Moon className="h-5 w-5 block dark:hidden" />
              </button>
            )}
            <button
              className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Solid & Clean Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-stone-50/95 dark:bg-stone-950/95 backdrop-blur-3xl border-b border-stone-200/50 dark:border-stone-800/80 shadow-lg overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-1">
              {navLinks.map((link) => {
                const targetHref = pathname === '/' ? link.href : `/${link.href}`;
                const isActive = activeSection === link.href;
                
                return (
                  <Link
                    key={link.name}
                    href={targetHref}
                    className={cn(
                      "py-3 px-4 text-lg font-semibold rounded-xl transition-colors",
                      isActive 
                        ? "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20" 
                        : "text-slate-800 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}
              
              <div className="mt-4 pt-4 border-t border-stone-200/50 dark:border-stone-800/80">
                <Link
                  href="#kontak"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex justify-center py-3.5 text-[13px] uppercase tracking-widest font-bold text-stone-100 bg-stone-900 border border-stone-800 hover:bg-stone-800 dark:text-stone-900 dark:bg-stone-100 dark:hover:bg-white rounded-xl shadow-sm transition-colors"
                >
                  Hubungi Kami
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

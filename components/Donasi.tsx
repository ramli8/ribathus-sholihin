'use client';

import { ArrowRight, CreditCard, Copy, Check, QrCode } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { ProfilData } from '@/hooks/useProfil';

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

interface BankAccount {
  bank: string;
  number: string;
  name: string;
}

export default function Donasi({ profile }: { profile: ProfilData | null }) {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [qrisPattern, setQrisPattern] = useState<boolean[]>([]);

  useEffect(() => {
    setQrisPattern(Array.from({ length: 36 }, () => Math.random() > 0.5));
  }, []);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(key);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  // Dynamic data from profile
  const title = profile?.donasiTitle || 'Salurkan Infaq';
  const titleHighlight = profile?.donasiTitleHighlight || 'Terbaik Anda';
  const quote =
    profile?.donasiQuote ||
    'Jika seseorang meninggal dunia, maka terputuslah amalannya kecuali tiga perkara: sedekah jariyah, ilmu yang dimanfaatkan, atau doa anak yang sholeh';
  const quoteSource = profile?.donasiQuoteSource || 'HR. Muslim';
  const whatsappNumber = profile?.donasiWhatsappNumber || '';
  const qrisImageUrl = profile?.donasiQrisImageUrl || '';

  let bankAccounts: BankAccount[] = [
    {
      bank: 'Bank Syariah Indonesia (BSI)',
      number: '712 345 6789',
      name: 'a.n. Yayasan Ribathus Sholihin',
    },
    {
      bank: 'Bank Muamalat',
      number: '000 123 4567',
      name: 'a.n. PP. Ribathus Sholihin',
    },
  ];
  if (profile?.donasiBankAccounts) {
    try {
      bankAccounts = JSON.parse(profile.donasiBankAccounts);
    } catch {}
  }

  let wallets = ['GoPay', 'OVO', 'DANA', 'ShopeePay', 'BCA', 'Mandiri'];
  if (profile?.donasiWallets) {
    wallets = profile.donasiWallets
      .split(',')
      .map((w) => w.trim())
      .filter(Boolean);
  }

  const handleKonfirmasi = () => {
    if (whatsappNumber) {
      const msg = encodeURIComponent(
        "Assalamu'alaikum, saya ingin mengkonfirmasi transfer donasi ke Pondok Pesantren Ribathus Sholihin."
      );
      window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, '_blank');
    }
  };

  return (
    <section
      id="donasi"
      className="py-16 md:py-24 bg-stone-50 dark:bg-stone-950 relative overflow-hidden"
    >
      {/* Zero Ornaments Earthy Background */}
      
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
            Salurkan Donasi
          </div>
          <h3 className="text-3xl md:text-5xl lg:text-[4rem] font-bold text-stone-900 dark:text-stone-100 mb-6 font-heading tracking-tight leading-[1.1] text-balance">
            {title}{' '}
            <span className="text-emerald-900 dark:text-emerald-500 block sm:inline">
              {titleHighlight}
            </span>
          </h3>
          <p className="text-stone-600 dark:text-stone-400 text-lg md:text-xl font-normal leading-relaxed mt-6">
            &quot;{quote}&quot; <br />
            <span className="text-sm border-t border-stone-200 dark:border-stone-800 mt-4 pt-4 inline-block font-semibold tracking-wide uppercase text-stone-400">
              {quoteSource}
            </span>
          </p>
        </motion.div>

        {/* Bento Grid layout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto"
        >
          {/* QRIS Card - Core Slab Accent */}
          <motion.div
            variants={fadeUp}
            className="relative rounded-[2rem] overflow-hidden bg-emerald-900 dark:bg-emerald-950 border border-emerald-800 shadow-sm group flex flex-col hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="relative z-10 p-8 md:p-12 flex flex-col items-center justify-center flex-grow text-center h-full min-h-[400px]">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950/40 text-emerald-100/90 text-[11px] font-bold uppercase tracking-widest mb-8 border border-emerald-800/50">
                <QrCode size={16} /> QRIS Terintegrasi
              </div>

              <h4 className="text-2xl md:text-3xl font-bold text-white mb-2 font-heading tracking-tight group-hover:text-emerald-300 transition-colors">
                Scan & Bayar
              </h4>
              <p className="text-emerald-100/80 text-[15px] font-normal mb-8 max-w-xs leading-relaxed">
                Mendukung semua aplikasi e-wallet dan mobile banking di Indonesia.
              </p>

              {/* QRIS Image or Fake QR */}
              <div className="bg-white rounded-[2rem] p-4 mb-8 inline-block shadow-sm border border-stone-200 hover:scale-105 transition-transform duration-500">
                <div className="w-48 h-48 bg-stone-50 rounded-2xl flex items-center justify-center relative overflow-hidden border border-stone-100">
                  {qrisImageUrl ? (
                    <Image
                      src={qrisImageUrl}
                      alt="QRIS Code"
                      fill
                      className="object-contain p-2"
                      sizes="192px"
                    />
                  ) : (
                    <div className="absolute inset-0 grid grid-cols-6 gap-1.5 p-5">
                      {Array.from({ length: 36 }).map((_, i) => (
                        <div
                          key={i}
                          className={`rounded-sm transition-colors duration-[2s] ${
                            qrisPattern[i] ? 'bg-stone-800' : 'bg-transparent'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                  {!qrisImageUrl && (
                    <>
                      <div className="absolute top-4 left-4 w-8 h-8 border-[6px] border-stone-800 rounded-md" />
                      <div className="absolute top-4 right-4 w-8 h-8 border-[6px] border-stone-800 rounded-md" />
                      <div className="absolute bottom-4 left-4 w-8 h-8 border-[6px] border-stone-800 rounded-md" />
                    </>
                  )}
                </div>
              </div>

              {/* Supported Wallets Pills */}
              <div className="flex flex-wrap justify-center gap-2 max-w-xs w-full mt-auto">
                {wallets.map((wallet) => (
                  <span
                    key={wallet}
                    className="px-3 py-1.5 bg-emerald-950/30 rounded-lg text-[10px] font-bold tracking-widest uppercase text-emerald-200 border border-emerald-800/30 hover:bg-emerald-800/50 hover:text-white transition-colors"
                  >
                    {wallet}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bank Transfer Card - Pure Flat Bento */}
          <motion.div
            variants={fadeUp}
            className="p-8 md:p-12 rounded-[2rem] flex flex-col bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800 shadow-sm hover:-translate-y-1 transition-transform duration-300 group"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-stone-500 dark:text-stone-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-10 border border-stone-200 dark:border-stone-800 w-fit bg-stone-50 dark:bg-stone-800/50">
              <CreditCard size={14} className="text-emerald-800 dark:text-emerald-500" /> Transfer Manual
            </div>

            <div className="space-y-4 mb-8 flex-grow">
              {bankAccounts.map((account, idx) => (
                <div
                  key={idx}
                  className="group/account p-6 rounded-[1.5rem] bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800 hover:border-stone-200 dark:hover:border-stone-700 hover:bg-white dark:hover:bg-stone-800 transition-all duration-300"
                >
                  <p className="text-emerald-800 dark:text-emerald-500 text-[10px] font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 dark:bg-emerald-500 inline-block"></span>
                    {account.bank}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h5 className="text-2xl md:text-3xl font-bold text-stone-900 dark:text-stone-100 font-heading tracking-tight">
                      {account.number}
                    </h5>
                    <button
                      onClick={() =>
                        handleCopy(
                          account.number.replace(/\s/g, ''),
                          `account-${idx}`
                        )
                      }
                      className="inline-flex shrink-0 items-center justify-center w-12 h-12 rounded-[1rem] bg-stone-100 dark:bg-stone-900 border border-stone-200/50 dark:border-stone-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:border-emerald-200 dark:hover:border-emerald-800 transition-all shadow-sm group-hover/account:scale-105 active:scale-95"
                      title="Salin nomor rekening"
                    >
                      {copiedAccount === `account-${idx}` ? (
                        <Check
                          size={20}
                          className="text-emerald-700 dark:text-emerald-400"
                        />
                      ) : (
                        <Copy
                          size={18}
                          className="text-stone-500 dark:text-stone-400 group-hover/account:text-emerald-700 dark:group-hover/account:text-emerald-500 transition-colors"
                        />
                      )}
                    </button>
                  </div>
                  <p className="text-stone-500 dark:text-stone-400 text-[15px] mt-2 font-normal leading-relaxed">
                    {account.name}
                  </p>
                </div>
              ))}
            </div>

            {/* Minimalist CTA - WhatsApp Confirmation */}
            <button
              onClick={handleKonfirmasi}
              className="group relative mt-auto w-full overflow-hidden rounded-[1.5rem] bg-stone-900 px-6 py-5 dark:bg-stone-100 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 text-white dark:text-stone-900 font-bold uppercase tracking-widest text-[11px]">
                Konfirmasi Transfer via WA
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1.5 transition-transform"
                />
              </span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { ArrowRight, CreditCard, Copy, Check, QrCode } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
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

interface BankAccount {
  bank: string;
  number: string;
  name: string;
}

export default function Donasi() {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [qrisPattern, setQrisPattern] = useState<boolean[]>([]);
  const { data: profile } = useProfil();

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
      className="py-24 md:py-32 bg-slate-50 dark:bg-slate-950 relative overflow-hidden"
    >
      {/* Soft Minimalist Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 opacity-90 z-0" />

      {/* Animated Glassmorphism Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex justify-center items-center">
        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-[10%] -right-[10%] w-[500px] h-[500px] bg-emerald-200/20 dark:bg-emerald-800/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-[10%] -left-[5%] w-[600px] h-[600px] bg-teal-200/20 dark:bg-teal-900/20 rounded-full blur-[120px]"
        />
      </div>

      <div className="container px-4 sm:px-6 mx-auto max-w-7xl relative z-10">
        {/* Header - Minimalist Glass */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          variants={fadeUp}
          className="text-center mb-16 md:mb-20 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 text-emerald-700 dark:text-emerald-300 text-sm font-medium shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none mb-6">
            <QrCode size={16} className="text-emerald-500" />
            <span className="uppercase tracking-wider">Salurkan Donasi</span>
          </div>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 font-heading tracking-tight">
            {title}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">
              {titleHighlight}
            </span>
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
            &quot;{quote}&quot; <br />
            <span className="text-sm border-t border-slate-200/50 dark:border-slate-700/50 mt-4 pt-2 inline-block">
              ({quoteSource})
            </span>
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto"
        >
          {/* QRIS Card - Modern Minimalist Glass Gradient */}
          <motion.div
            variants={fadeUp}
            className="relative rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(16,185,129,0.1)] group flex flex-col"
          >
            {/* Background Map / Abstract */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 dark:from-emerald-600 dark:via-teal-600 dark:to-emerald-700 z-0 opacity-90 group-hover:scale-105 transition-transform duration-1000" />

            {/* Minimalist Grid Pattern Overlay */}
            <div className="absolute inset-0 z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKSIvPjwvc3ZnPg==')] opacity-50" />

            <div className="relative z-10 p-8 md:p-10 flex flex-col items-center justify-center flex-grow text-center h-full min-h-[400px]">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-xl text-white text-xs font-medium uppercase mb-6 border border-white/30 outline outline-4 outline-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.1)]">
                <QrCode size={16} /> QRIS Terintegrasi
              </div>

              <h4 className="text-2xl font-bold text-white mb-2 font-heading tracking-tight drop-shadow-md">
                Scan & Bayar
              </h4>
              <p className="text-emerald-50/90 text-sm font-light mb-8 max-w-xs leading-relaxed">
                Mendukung semua aplikasi e-wallet dan mobile banking di
                Indonesia.
              </p>

              {/* QRIS Image or Fake QR */}
              <div className="bg-white/95 backdrop-blur-3xl rounded-3xl p-6 mb-8 inline-block shadow-2xl border-4 border-white/20 hover:scale-105 transition-transform duration-500">
                <div className="w-48 h-48 bg-slate-50 rounded-2xl flex items-center justify-center relative overflow-hidden border border-slate-100">
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
                            qrisPattern[i] ? 'bg-slate-800' : 'bg-transparent'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                  {!qrisImageUrl && (
                    <>
                      <div className="absolute top-4 left-4 w-8 h-8 border-[6px] border-slate-800 rounded-md" />
                      <div className="absolute top-4 right-4 w-8 h-8 border-[6px] border-slate-800 rounded-md" />
                      <div className="absolute bottom-4 left-4 w-8 h-8 border-[6px] border-slate-800 rounded-md" />
                    </>
                  )}
                </div>
              </div>

              {/* Supported Wallets Pills */}
              <div className="flex flex-wrap justify-center gap-2 max-w-xs w-full mt-auto">
                {wallets.map((wallet) => (
                  <span
                    key={wallet}
                    className="px-3 py-1.5 bg-white/10 backdrop-blur-xl rounded-lg text-[10px] font-medium text-white border border-white/20 hover:bg-white/20 transition-colors"
                  >
                    {wallet}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bank Transfer Card - Minimalist Glass */}
          <motion.div
            variants={fadeUp}
            className="p-8 md:p-10 rounded-3xl flex flex-col bg-white/40 dark:bg-slate-800/40 backdrop-blur-2xl border border-white/60 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl text-slate-700 dark:text-slate-300 text-xs font-medium uppercase mb-8 border border-white/40 dark:border-slate-700/50 w-fit">
              <CreditCard size={14} className="text-emerald-500" /> Transfer
              Manual
            </div>

            <div className="space-y-4 mb-8 flex-grow">
              {bankAccounts.map((account, idx) => (
                <div
                  key={idx}
                  className="group/account p-5 rounded-2xl bg-white/50 dark:bg-slate-700/30 backdrop-blur-md border border-white/40 dark:border-white/5 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 hover:bg-white/80 dark:hover:bg-slate-700/50 transition-all duration-300"
                >
                  <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                    {account.bank}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <h5 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white font-mono tracking-tight">
                      {account.number}
                    </h5>
                    <button
                      onClick={() =>
                        handleCopy(
                          account.number.replace(/\s/g, ''),
                          `account-${idx}`
                        )
                      }
                      className="inline-flex shrink-0 items-center justify-center w-10 h-10 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:border-emerald-200 dark:hover:border-emerald-800/50 transition-all shadow-sm group-hover/account:scale-105 active:scale-95"
                      title="Salin nomor rekening"
                    >
                      {copiedAccount === `account-${idx}` ? (
                        <Check
                          size={18}
                          className="text-emerald-600 dark:text-emerald-400"
                        />
                      ) : (
                        <Copy
                          size={16}
                          className="text-slate-500 dark:text-slate-400 group-hover/account:text-emerald-600 dark:group-hover/account:text-emerald-400 transition-colors"
                        />
                      )}
                    </button>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 font-light">
                    {account.name}
                  </p>
                </div>
              ))}
            </div>

            {/* Minimalist CTA - WhatsApp Confirmation */}
            <button
              onClick={handleKonfirmasi}
              className="group relative mt-auto w-full overflow-hidden rounded-2xl bg-slate-900 px-6 py-4 dark:bg-emerald-600 shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(16,185,129,0.25)]"
            >
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
                <div className="relative h-full w-8 bg-white/20" />
              </div>
              <span className="relative z-10 flex items-center justify-center gap-2 text-white font-medium">
                Konfirmasi Transfer
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, AlertCircle, Shield } from 'lucide-react';

interface ProfilData {
  nama: string;
  logoUrl?: string;
}

function LoginForm() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/admin/beranda';

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [profil, setProfil] = useState<ProfilData | null>(null);

  useEffect(() => {
    fetch('/api/profil')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setProfil({
            nama: data.data.nama || '',
            logoUrl: data.data.logoUrl,
          });
        }
      })
      .catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login gagal');
      }

      // Redirect ke dashboard admin
      window.location.href = redirect;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  };

  const brandingName = profil?.nama || '';
  const initials = brandingName.substring(0, 2).toUpperCase();

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-950 px-4 font-sans">
      {/* Zero Ornaments Background. Pure Typography & Bento. */}

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-[420px]"
      >
        <div className="bg-white dark:bg-stone-900 rounded-[2rem] border border-stone-200/80 dark:border-stone-800 shadow-sm p-8 md:p-12">
          {/* Logo & Header */}
          <div className="mb-10 text-center">
            {profil?.logoUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={profil.logoUrl}
                alt={brandingName}
                className="h-16 w-auto object-contain mx-auto mb-6"
              />
            ) : (
              <div className="w-16 h-16 bg-stone-900 dark:bg-stone-800 border border-stone-800 flex items-center justify-center text-stone-100 font-bold text-2xl mb-6 mx-auto rounded-[1rem]">
                {initials}
              </div>
            )}

            <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 font-heading tracking-tight">
              Admin Login
            </h1>
            <p className="text-stone-500 dark:text-stone-400 text-xs mt-2 uppercase tracking-widest font-bold">
              {brandingName}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 flex items-start gap-3"
            >
              <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
              <p className="text-[13px] text-red-700 dark:text-red-400 font-medium">
                {error}
              </p>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div className="group">
              <label
                htmlFor="username"
                className="block text-[11px] font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-3"
              >
                Username
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-stone-900 dark:group-focus-within:text-white transition-colors">
                  <Mail size={18} strokeWidth={2} />
                </div>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-[15px] font-medium text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-white focus:border-stone-900 dark:focus:border-white transition-all shadow-inner"
                  placeholder="Masukkan username"
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="group">
              <label
                htmlFor="password"
                className="block text-[11px] font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-3"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-stone-900 dark:group-focus-within:text-white transition-colors">
                  <Lock size={18} strokeWidth={2} />
                </div>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-[15px] font-medium text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-white focus:border-stone-900 dark:focus:border-white transition-all shadow-inner"
                  placeholder="Masukkan password"
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-4 w-full flex items-center justify-center gap-3 bg-stone-900 dark:bg-emerald-900 text-stone-100 dark:text-emerald-50 text-[13px] font-bold uppercase tracking-widest py-4 px-6 rounded-xl border border-stone-800 dark:border-emerald-800 hover:bg-stone-800 dark:hover:bg-emerald-800 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>LOADING...</span>
                </>
              ) : (
                <>
                  <span>LOGIN</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Footer inside Card */}
          <div className="mt-8 pt-8 border-t border-stone-100 dark:border-stone-800 text-center flex flex-col items-center gap-4">
            <Link
              href="/"
              className="text-[12px] font-bold text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 transition-colors mt-2"
            >
              KEMBALI KE BERANDA
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-950">
          <div className="animate-pulse flex flex-col items-center gap-4 text-stone-400">
            <Lock size={24} />
            <p className="text-xs font-bold uppercase tracking-widest">
              Loading...
            </p>
          </div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}

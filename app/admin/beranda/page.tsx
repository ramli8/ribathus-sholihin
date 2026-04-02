'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Eye, Play } from 'lucide-react';
import alert from '@/lib/alert';
import {
  FormInput,
  FormTextarea,
  SectionTitle,
} from '@/components/common/FormComponents';

interface BerandaFormData {
  heroTitle: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  youtubeUrl: string;
  statsSantri: number | string;
  statsTahun: number | string;
  statsAsatidz: number | string;
  statsLulusan: number | string;
}

export default function AdminBerandaPage() {
  const [profilId, setProfilId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewVideo, setPreviewVideo] = useState(false);
  const [formData, setFormData] = useState<BerandaFormData>({
    heroTitle: '',
    heroTitleHighlight: '',
    heroSubtitle: '',
    youtubeUrl: '',
    statsSantri: 0,
    statsTahun: 0,
    statsAsatidz: 0,
    statsLulusan: 100,
  });

  useEffect(() => {
    fetchBeranda();
  }, []);

  const fetchBeranda = async () => {
    try {
      const res = await fetch('/api/profil');
      const data = await res.json();
      if (data.success && data.data) {
        setProfilId(data.data.id);
        setFormData({
          heroTitle: data.data.heroTitle || '',
          heroTitleHighlight: data.data.heroTitleHighlight || '',
          heroSubtitle: data.data.heroSubtitle || '',
          youtubeUrl: data.data.youtubeUrl || '',
          statsSantri: data.data.statsSantri || 0,
          statsTahun: data.data.statsTahun || 0,
          statsAsatidz: data.data.statsAsatidz || 0,
          statsLulusan: data.data.statsLulusan ?? 100,
        });
      }
    } catch (error) {
      console.error('Error fetching beranda:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profilId) {
      alert.error(
        'Profil belum tersedia',
        'Silakan buat profil terlebih dahulu di halaman Profil Pesantren.'
      );
      return;
    }
    setSaving(true);

    try {
      const payload = {
        ...formData,
        statsSantri: parseInt(formData.statsSantri as string) || 0,
        statsTahun: parseInt(formData.statsTahun as string) || 0,
        statsAsatidz: parseInt(formData.statsAsatidz as string) || 0,
        statsLulusan: parseInt(formData.statsLulusan as string) || 0,
      };

      const res = await fetch(`/api/profil/${profilId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert.success('Konten beranda berhasil disimpan!');
        fetchBeranda();
      } else {
        const error = await res.json();
        alert.error('Gagal menyimpan', error.error);
      }
    } catch {
      alert.error('Terjadi kesalahan', 'Gagal menyimpan konten beranda');
    } finally {
      setSaving(false);
    }
  };

  const getYoutubeEmbedUrl = (url: string) => {
    if (!url) return '';
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : '';
  };

  if (loading) {
    return (
      <div className="text-center py-12 text-[11px] uppercase tracking-widest text-stone-400 font-bold">
        MEMUAT KONTEN...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-heading tracking-tight text-stone-900 dark:text-stone-100">
            Kelola Beranda
          </h1>
          <p className="text-[12px] font-bold text-stone-500 dark:text-stone-400 mt-2 tracking-wide">
            Atur konten hero section dan statistik layar utama
          </p>
        </div>
      </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 md:p-10 rounded-[2rem] bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800 shadow-sm"
      >
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Hero Section */}
          <div>
            <SectionTitle title="Hero Section" />
            <div className="space-y-4">
              <FormInput
                label="Judul Utama (Hero Title)"
                placeholder="Mencetak Generasi Qur'ani & Berakhlakul Karimah"
                value={formData.heroTitle}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    heroTitle: e.target.value,
                  }))
                }
              />
              <FormInput
                label="Teks Highlight (Hero)"
                placeholder="Qur'ani"
                value={formData.heroTitleHighlight}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    heroTitleHighlight: e.target.value,
                  }))
                }
              />
              <FormTextarea
                label="Subjudul (Hero Subtitle)"
                placeholder="Membangun peradaban Islam yang rahmatan lil 'alamin..."
                rows={3}
                value={formData.heroSubtitle}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    heroSubtitle: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          {/* YouTube Video */}
          <div className="pt-8 border-t border-stone-100 dark:border-stone-800">
            <SectionTitle title="Video Profil Sekolah" />
            <div className="space-y-4">
              <FormInput
                label="Link YouTube"
                placeholder="https://www.youtube.com/watch?v=XXXXXXXXXX"
                value={formData.youtubeUrl}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    youtubeUrl: e.target.value,
                  }))
                }
              />
              <p className="text-[11px] font-bold tracking-wide text-stone-500 dark:text-stone-400">
                URL Modul Video YouTube (akan berjalan *autoplay* dalam pop-up)
              </p>

              {/* Preview button */}
              {formData.youtubeUrl && (
                <button
                  type="button"
                  onClick={() => setPreviewVideo(true)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-[11px] uppercase tracking-widest font-bold text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl hover:bg-stone-200 dark:hover:bg-stone-700 shadow-sm transition-colors"
                >
                  <Play size={14} />
                  PRATINJAU VIDEO
                </button>
              )}
            </div>
          </div>

          {/* Statistik */}
          <div className="pt-8 border-t border-stone-100 dark:border-stone-800">
            <SectionTitle title="Statistik Dasbor" />
            <p className="text-[11px] font-bold tracking-wide text-stone-500 dark:text-stone-400 mb-6">
              Angka-angka fundamental yang terukir di kaki struktur hero
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <FormInput
                label="Santri Aktif"
                type="text"
                value={formData.statsSantri.toString()}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    statsSantri: e.target.value.replace(/\D/g, ''),
                  }))
                }
              />
              <FormInput
                label="Tahun Mengabdi"
                type="text"
                value={formData.statsTahun.toString()}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    statsTahun: e.target.value.replace(/\D/g, ''),
                  }))
                }
              />
              <FormInput
                label="Pengajar Ahli"
                type="text"
                value={formData.statsAsatidz.toString()}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    statsAsatidz: e.target.value.replace(/\D/g, ''),
                  }))
                }
              />
              <FormInput
                label="Lulusan Unggul (%)"
                type="text"
                value={formData.statsLulusan.toString()}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    statsLulusan: e.target.value.replace(/\D/g, ''),
                  }))
                }
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-2 pt-8 border-t border-stone-100 dark:border-stone-800">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-stone-900 dark:bg-emerald-800 text-stone-100 dark:text-emerald-50 text-[12px] font-bold tracking-widest uppercase rounded-xl hover:bg-stone-800 dark:hover:bg-emerald-900 transition-colors shadow-sm disabled:opacity-50"
            >
              <Save size={18} />
              {saving ? 'MEMPROSES ...' : 'SIMPAN '}
            </button>
          </div>
        </form>
      </motion.div>

      {/* YouTube Preview Modal */}
      {previewVideo && formData.youtubeUrl && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setPreviewVideo(false)}
        >
          <div
            className="relative w-full max-w-4xl mx-4 aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewVideo(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors text-sm flex items-center gap-1"
            >
              Tutup ✕
            </button>
            <iframe
              src={getYoutubeEmbedUrl(formData.youtubeUrl)}
              className="w-full h-full rounded-2xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}

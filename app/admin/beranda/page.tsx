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
    return <div className="text-center py-12 text-gray-400">Memuat...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Kelola Beranda
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Atur konten hero section dan statistik yang tampil di halaman utama
          </p>
        </div>
      </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
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
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
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
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Masukkan URL YouTube. Video ini akan ditampilkan sebagai modal
                embed ketika pengunjung klik tombol &quot;Tonton Profil
                Sekolah&quot;.
              </p>

              {/* Preview button */}
              {formData.youtubeUrl && (
                <button
                  type="button"
                  onClick={() => setPreviewVideo(true)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <Play size={16} />
                  Preview Video
                </button>
              )}
            </div>
          </div>

          {/* Statistik */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <SectionTitle title="Statistik Beranda" />
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
              Angka-angka ini ditampilkan di bagian bawah hero section
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
          <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50"
            >
              <Save size={20} />
              {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
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

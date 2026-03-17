'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Eye, X } from 'lucide-react';
import alert from '@/lib/alert';
import {
  FormInput,
  FormTextarea,
  SectionTitle,
  UploadButton,
} from '@/components/common/FormComponents';

interface ProfilFormData {
  nama: string;
  alamat: string;
  deskripsi: string;
  visi: string;
  misi: string;
  telepon: string;
  email: string;
  profilHeaderTitle: string;
  profilHeaderTitleHighlight: string;
  pengasuh: string;
  pengasuhFotoUrl: string;
  pengasuhDeskripsi: string;
  sejarahDeskripsi: string;
  logoUrl: string;
}

export default function AdminProfilPage() {
  const [profilId, setProfilId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<ProfilFormData>({
    nama: '',
    alamat: '',
    deskripsi: '',
    visi: '',
    misi: '',
    telepon: '',
    email: '',
    profilHeaderTitle: '',
    profilHeaderTitleHighlight: '',
    pengasuh: '',
    pengasuhFotoUrl: '',
    pengasuhDeskripsi: '',
    sejarahDeskripsi: '',
    logoUrl: '',
  });

  useEffect(() => {
    fetchProfil();
  }, []);

  const fetchProfil = async () => {
    try {
      const res = await fetch('/api/profil');
      const data = await res.json();
      if (data.success && data.data) {
        setProfilId(data.data.id);
        setFormData({
          nama: data.data.nama || '',
          alamat: data.data.alamat || '',
          deskripsi: data.data.deskripsi || '',
          visi: data.data.visi || '',
          misi: data.data.misi || '',
          telepon: data.data.telepon || '',
          email: data.data.email || '',
          profilHeaderTitle: data.data.profilHeaderTitle || '',
          profilHeaderTitleHighlight: data.data.profilHeaderTitleHighlight || '',
          pengasuh: data.data.pengasuh || '',
          pengasuhFotoUrl: data.data.pengasuhFotoUrl || '',
          pengasuhDeskripsi: data.data.pengasuhDeskripsi || '',
          sejarahDeskripsi: data.data.sejarahDeskripsi || '',
          logoUrl: data.data.logoUrl || '',
        });
      }
    } catch {
      console.error('Error fetching profil');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profilId) {
      alert.error('Profil belum tersedia');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/profil/${profilId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert.success('Profil berhasil disimpan!');
        fetchProfil();
      } else {
        const error = await res.json();
        alert.error('Gagal menyimpan', error.error);
      }
    } catch {
      alert.error('Terjadi kesalahan', 'Gagal menyimpan profil');
    } finally {
      setSaving(false);
    }
  };

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'logoUrl' | 'pengasuhFotoUrl'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);
    formDataUpload.append('folder', 'profil');
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      });
      const data = await res.json();
      if (data.success) {
        setFormData((prev) => ({ ...prev, [field]: data.data.url }));
        alert.success('Gambar berhasil diupload!');
      } else {
        alert.error(data.error || 'Upload gagal');
      }
    } catch {
      alert.error('Upload gagal');
    } finally {
      setUploading(false);
    }
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
            Profil Pesantren
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Kelola informasi profil yang tampil di section Profil halaman utama
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
          {/* Deskripsi (Tentang Kami) */}
          <div>
            <SectionTitle title="Tentang Kami (Deskripsi Utama)" />
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Judul Utama (Header Profil)"
                  placeholder="Membangun Karakter dari"
                  required
                  value={formData.profilHeaderTitle}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      profilHeaderTitle: e.target.value,
                    }))
                  }
                />
                <FormInput
                  label="Judul Highlight (teks berwarna)"
                  placeholder="Tradisi & Inovasi"
                  value={formData.profilHeaderTitleHighlight}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      profilHeaderTitleHighlight: e.target.value,
                    }))
                  }
                />
              </div>
              <FormTextarea
                label="Deskripsi"
                required
                rows={3}
                placeholder="Deskripsi singkat pesantren yang tampil di header section profil..."
                value={formData.deskripsi}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    deskripsi: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          {/* Sejarah */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <SectionTitle title="Jejak Langkah & Sejarah" />
            <div className="space-y-4">
              <FormTextarea
                label="Deskripsi Sejarah"
                rows={4}
                placeholder="Ceritakan sejarah berdirinya pesantren..."
                value={formData.sejarahDeskripsi}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    sejarahDeskripsi: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          {/* Visi & Misi */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <SectionTitle title="Visi & Misi" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormTextarea
                label="Visi"
                rows={4}
                value={formData.visi}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, visi: e.target.value }))
                }
              />
              <FormTextarea
                label="Misi"
                rows={4}
                value={formData.misi}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, misi: e.target.value }))
                }
              />
            </div>
          </div>

          {/* Pengasuh */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <SectionTitle title="Profil Pengasuh" />
            <div className="space-y-4">
              <FormInput
                label="Nama Pengasuh"
                value={formData.pengasuh}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    pengasuh: e.target.value,
                  }))
                }
              />
              <FormTextarea
                label="Deskripsi Pengasuh"
                rows={3}
                placeholder="Deskripsi singkat tentang pengasuh..."
                value={formData.pengasuhDeskripsi}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    pengasuhDeskripsi: e.target.value,
                  }))
                }
              />
              {/* Foto Pengasuh */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Foto Pengasuh
                </label>
                <p className="text-xs text-gray-400 mb-2">
                  Rekomendasi: 400 × 400 px (1:1 rasio persegi,
                  portrait/close-up)
                </p>
                <div className="flex items-center gap-4">
                  <UploadButton
                    label="Upload Foto"
                    uploading={uploading}
                    onChange={(e) => handleUpload(e, 'pengasuhFotoUrl')}
                  />
                  {formData.pengasuhFotoUrl && (
                    <div className="relative">
                      <img
                        src={formData.pengasuhFotoUrl}
                        alt="Foto Pengasuh"
                        className="h-20 w-20 object-cover rounded-xl border border-gray-200 dark:border-gray-600"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            pengasuhFotoUrl: '',
                          }))
                        }
                        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
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
    </div>
  );
}

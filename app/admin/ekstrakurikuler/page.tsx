  'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, X, Upload } from 'lucide-react';
import alert from '@/lib/alert';
import {
  FormInput,
  FormTextarea,
  SectionTitle,
} from '@/components/common/FormComponents';

interface EkstraItem {
  id: string;
  name: string;
  desc: string;
  image: string;
  colSpan: string;
}

interface EkstraFormData {
  ekstraTitle: string;
  ekstraTitleHighlight: string;
  ekstraDesc: string;
  ekstraList: EkstraItem[];
}

const COLSPAN_OPTIONS = [
  { label: 'Normal (1 kolom)', value: '' },
  { label: 'Lebar (2 kolom)', value: 'lg:col-span-2' },
  { label: 'Besar (2 kolom + 2 baris)', value: 'lg:col-span-2 lg:row-span-2' },
];

export default function AdminEkstrakurikulerPage() {
  const [profilId, setProfilId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState<EkstraFormData>({
    ekstraTitle: '',
    ekstraTitleHighlight: '',
    ekstraDesc: '',
    ekstraList: [],
  });

  const safeParseJSON = (
    jsonString: string | undefined | null,
    defaultValue: EkstraItem[]
  ) => {
    if (!jsonString) return defaultValue;
    try {
      const parsed = JSON.parse(jsonString);
      return Array.isArray(parsed) ? parsed : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/profil');
      const data = await res.json();
      if (data.success && data.data) {
        setProfilId(data.data.id);
        setFormData({
          ekstraTitle: data.data.ekstraTitle || '',
          ekstraTitleHighlight: data.data.ekstraTitleHighlight || '',
          ekstraDesc: data.data.ekstraDesc || '',
          ekstraList: safeParseJSON(data.data.ekstraList, []),
        });
      }
    } catch {
      console.error('Error fetching data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profilId) {
      alert.error('Profil belum tersedia');
      return;
    }
    setSaving(true);

    const payload = {
      ...formData,
      ekstraList: JSON.stringify(formData.ekstraList),
    };

    try {
      const res = await fetch(`/api/profil/${profilId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert.success('Data Ekstrakurikuler berhasil disimpan!');
        fetchData();
      } else {
        const error = await res.json();
        alert.error('Gagal menyimpan', error.error);
      }
    } catch {
      alert.error('Terjadi kesalahan', 'Gagal menyimpan data');
    } finally {
      setSaving(false);
    }
  };

  const handleUploadImage = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert.error('File harus berupa gambar (JPG, PNG, WebP, GIF)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert.error('Ukuran file maksimal 5MB');
      return;
    }

    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);
    formDataUpload.append('folder', 'ekstrakurikuler');

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      });
      const data = await res.json();

      if (data.success && data.data?.url) {
        // Delete old file if exists
        const oldImage = formData.ekstraList[index]?.image;
        if (oldImage) {
          const parts = oldImage.split('/');
          const filename = parts[parts.length - 1];
          if (filename) {
            try {
              await fetch('/api/upload/delete', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  filename,
                  folder: 'ekstrakurikuler',
                }),
              });
            } catch (error) {
              console.error('Failed to delete old file:', error);
            }
          }
        }

        setFormData((prev) => {
          const newList = [...prev.ekstraList];
          newList[index] = { ...newList[index], image: data.data.url };
          return { ...prev, ekstraList: newList };
        });
        alert.success('Gambar berhasil diunggah');
      } else {
        alert.error('Gagal mengunggah gambar');
      }
    } catch (error) {
      alert.error('Terjadi kesalahan saat mengunggah');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const addItem = () => {
    setFormData((p) => ({
      ...p,
      ekstraList: [
        ...p.ekstraList,
        {
          id: Math.random().toString(36).substring(2),
          name: '',
          desc: '',
          image: '',
          colSpan: '',
        },
      ],
    }));
  };

  const removeItem = (index: number) => {
    setFormData((p) => ({
      ...p,
      ekstraList: p.ekstraList.filter((_, i) => i !== index),
    }));
  };

  if (loading) {
    return <div className="text-center py-12 text-gray-400">Memuat...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Kelola Ekstrakurikuler
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Atur daftar kegiatan ekstrakurikuler yang tampil di halaman utama
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
      >
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* SECTION: HEADER */}
          <div>
            <SectionTitle title="A. Header Ekstrakurikuler" />
            <div className="space-y-4">
              <FormInput
                label="Judul (teks biasa)"
                value={formData.ekstraTitle}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, ekstraTitle: e.target.value }))
                }
                placeholder="Kembangkan Minat &"
              />
              <FormInput
                label="Judul Highlight (teks berwarna)"
                value={formData.ekstraTitleHighlight}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    ekstraTitleHighlight: e.target.value,
                  }))
                }
                placeholder="Bakat"
              />
              <FormTextarea
                label="Deskripsi"
                rows={2}
                value={formData.ekstraDesc}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, ekstraDesc: e.target.value }))
                }
                placeholder="Kami meyakini setiap santri adalah bintang..."
              />
            </div>
          </div>

          {/* SECTION: DAFTAR EKSTRA */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <SectionTitle title="B. Daftar Ekstrakurikuler" />
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
              Setiap item ditampilkan sebagai kartu gambar di halaman utama.
              Atur ukuran layout masing-masing kartu.
            </p>

            <div className="space-y-6">
              {formData.ekstraList.map((item, index) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Ekstra #{index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                      label="Nama Kegiatan"
                      placeholder="Pramuka Santri"
                      value={item.name}
                      onChange={(e) => {
                        setFormData((prev) => {
                          const newList = [...prev.ekstraList];
                          newList[index] = { ...newList[index], name: e.target.value };
                          return { ...prev, ekstraList: newList };
                        });
                      }}
                    />
                    <FormInput
                      label="Deskripsi Singkat"
                      placeholder="Kemandirian & kepemimpinan"
                      value={item.desc}
                      onChange={(e) => {
                        setFormData((prev) => {
                          const newList = [...prev.ekstraList];
                          newList[index] = { ...newList[index], desc: e.target.value };
                          return { ...prev, ekstraList: newList };
                        });
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Ukuran Kartu (Layout)
                    </label>
                    <select
                      className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 dark:text-white"
                      value={item.colSpan}
                      onChange={(e) => {
                        setFormData((prev) => {
                          const newList = [...prev.ekstraList];
                          newList[index] = { ...newList[index], colSpan: e.target.value };
                          return { ...prev, ekstraList: newList };
                        });
                      }}
                    >
                      {COLSPAN_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Gambar
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                      Rekomendasi: 800 × 600 px (format JPG/PNG)
                    </p>
                    <div className="flex items-center gap-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleUploadImage(e, index)}
                        className="hidden"
                        id={`upload-ekstra-${index}`}
                      />
                      <label
                        htmlFor={`upload-ekstra-${index}`}
                        className={`flex items-center gap-2 px-4 py-2.5 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors cursor-pointer font-medium text-sm ${
                          uploading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        <Upload size={18} />
                        <span>{uploading ? 'Mengupload...' : 'Unggah Gambar'}</span>
                      </label>

                      {item.image && (
                        <div className="relative group">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.image}
                            alt={item.name || 'Preview'}
                            className="w-full h-48 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setFormData((prev) => {
                                const newList = [...prev.ekstraList];
                                newList[index] = { ...newList[index], image: '' };
                                return { ...prev, ekstraList: newList };
                              });
                            }}
                            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                            title="Hapus gambar"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      )}

                      {!item.image && (
                        <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center">
                          <div className="text-center">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Belum ada gambar
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addItem}
                className="flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium py-2"
              >
                <Plus size={16} /> Tambah Ekstrakurikuler
              </button>
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-2 pt-6 border-t border-gray-200 dark:border-gray-700">
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

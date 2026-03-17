'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Eye, Plus, X, Upload } from 'lucide-react';
import alert from '@/lib/alert';
import {
  FormInput,
  FormTextarea,
  SectionTitle,
} from '@/components/common/FormComponents';

import * as LucideIcons from 'lucide-react';

const ICONS_LIST = [
  'Building2',
  'Church',
  'GraduationCap',
  'BookOpen',
  'Heart',
  'Utensils',
  'Wifi',
  'Car',
  'Dumbbell',
  'Trees',
  'Library',
  'School',
  'Home',
  'Hospital',
  'ShoppingBag',
  'Coffee',
];

interface FasilitasItem {
  id: string;
  title: string;
  desc: string;
  image: string;
  icon: string;
  colSpan: string;
}

interface FasilitasFormData {
  fasilitasTitle: string;
  fasilitasTitleHighlight: string;
  fasilitasDesc: string;
  fasilitasList: FasilitasItem[];
}

export default function AdminFasilitasPage() {
  const [profilId, setProfilId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState<FasilitasFormData>({
    fasilitasTitle: '',
    fasilitasTitleHighlight: '',
    fasilitasDesc: '',
    fasilitasList: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const safeParseJSON = (
    jsonString: string | undefined | null,
    defaultValue: any
  ) => {
    if (!jsonString) return defaultValue;
    try {
      return JSON.parse(jsonString);
    } catch {
      return defaultValue;
    }
  };

  const fetchData = async () => {
    try {
      const res = await fetch('/api/profil');
      const data = await res.json();
      if (data.success && data.data) {
        setProfilId(data.data.id);
        setFormData({
          fasilitasTitle: data.data.fasilitasTitle || 'Fasilitas Berstandar',
          fasilitasTitleHighlight: data.data.fasilitasTitleHighlight || '',
          fasilitasDesc:
            data.data.fasilitasDesc ||
            'Kami merancang lingkungan pesantren yang asri, bersih, dan modern agar santri dapat fokus menuntut ilmu dengan nyaman.',
          fasilitasList: safeParseJSON(data.data.fasilitasList, []),
        });
      }
    } catch {
      console.error('Error fetching data');
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

    const payload = {
      ...formData,
      fasilitasList: JSON.stringify(formData.fasilitasList),
    };

    try {
      const res = await fetch(`/api/profil/${profilId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert.success('Data Fasilitas berhasil disimpan!');
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

    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);
    formDataUpload.append('folder', 'fasilitas');

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      });
      const data = await res.json();

      if (data.success) {
        setFormData((prev) => {
          const newList = [...prev.fasilitasList];
          newList[index] = { ...newList[index], image: data.data.url };
          return { ...prev, fasilitasList: newList };
        });
        alert.success('Gambar berhasil diunggah');
      } else {
        alert.error('Gagal mengunggah gambar');
      }
    } catch (error) {
      alert.error('Terjadi kesalahan saat mengunggah');
    } finally {
      setUploading(false);
    }
  };

  const renderIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon ? <Icon size={18} /> : null;
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
            Kelola Fasilitas
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Atur konten fasilitas yang tampil di halaman utama
          </p>
        </div>
      </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
      >
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Header Section */}
          <div>
            <SectionTitle title="Header Fasilitas" />
            <div className="space-y-4">
              <FormInput
                label="Judul Fasilitas (teks biasa)"
                value={formData.fasilitasTitle}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    fasilitasTitle: e.target.value,
                  }))
                }
                placeholder="Kenyamanan"
              />
              <FormInput
                label="Judul Highlight (teks berwarna)"
                value={formData.fasilitasTitleHighlight}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    fasilitasTitleHighlight: e.target.value,
                  }))
                }
                placeholder="Menuntut Ilmu"
              />
              <FormTextarea
                label="Deskripsi Fasilitas"
                rows={3}
                value={formData.fasilitasDesc}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    fasilitasDesc: e.target.value,
                  }))
                }
                placeholder="Deskripsi singkat tentang fasilitas pesantren..."
              />
            </div>
          </div>

          {/* Fasilitas List */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <SectionTitle title="Daftar Fasilitas" />
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
              Tambah, edit, atau hapus fasilitas yang akan ditampilkan. Setiap
              fasilitas memiliki judul, deskripsi, ikon, dan gambar.
            </p>

            <div className="space-y-6">
              {formData.fasilitasList.map((item, index) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Fasilitas #{index + 1}
                    </h4>
                    <button
                      type="button"
                      onClick={() => {
                        const newList = formData.fasilitasList.filter(
                          (_, i) => i !== index
                        );
                        setFormData((prev) => ({
                          ...prev,
                          fasilitasList: newList,
                        }));
                      }}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                      label="Judul Fasilitas"
                      value={item.title}
                      onChange={(e) => {
                        const newList = [...formData.fasilitasList];
                        newList[index].title = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          fasilitasList: newList,
                        }));
                      }}
                      placeholder="Contoh: Gedung Asrama"
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Ikon
                      </label>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-500">
                          {renderIcon(item.icon)}
                        </div>
                        <select
                          className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 dark:text-white"
                          value={item.icon}
                          onChange={(e) => {
                            const newList = [...formData.fasilitasList];
                            newList[index].icon = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              fasilitasList: newList,
                            }));
                          }}
                        >
                          {ICONS_LIST.map((ic) => (
                            <option key={ic} value={ic}>
                              {ic}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <FormTextarea
                        label="Deskripsi"
                        rows={2}
                        value={item.desc}
                        onChange={(e) => {
                          const newList = [...formData.fasilitasList];
                          newList[index].desc = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            fasilitasList: newList,
                          }));
                        }}
                        placeholder="Deskripsi singkat fasilitas..."
                      />
                    </div>

                    {/* Image Upload */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Gambar Fasilitas
                      </label>
                      <div className="flex items-center gap-4">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleUploadImage(e, index)}
                          className="hidden"
                          id={`upload-fasilitas-${index}`}
                        />
                        <label
                          htmlFor={`upload-fasilitas-${index}`}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg cursor-pointer text-gray-700 dark:text-gray-300 transition-colors"
                        >
                          <Upload size={18} />
                          <span className="text-sm">
                            {uploading ? 'Mengunggah...' : 'Upload Gambar'}
                          </span>
                        </label>
                        {item.image && (
                          <div className="relative">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="h-20 w-32 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newList = [...formData.fasilitasList];
                                newList[index].image = '';
                                setFormData((prev) => ({
                                  ...prev,
                                  fasilitasList: newList,
                                }));
                              }}
                              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* ColSpan Selection */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Ukuran Tampilan (Bento Grid)
                      </label>
                      <select
                        className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 dark:text-white"
                        value={item.colSpan}
                        onChange={(e) => {
                          const newList = [...formData.fasilitasList];
                          newList[index].colSpan = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            fasilitasList: newList,
                          }));
                        }}
                      >
                        <option value="col-span-1">Kecil (1 kolom)</option>
                        <option value="md:col-span-2 lg:col-span-2">
                          Besar (2 kolom - lebar)
                        </option>
                        <option value="md:col-span-2 lg:col-span-1 lg:row-span-2">
                          Tinggi (2 baris)
                        </option>
                      </select>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Pilih ukuran tampilan: Kecil untuk kartu biasa, Besar
                        untuk kartu lebar, atau Tinggi untuk kartu memanjang
                        vertikal.
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    fasilitasList: [
                      ...prev.fasilitasList,
                      {
                        id: Math.random().toString(),
                        title: '',
                        desc: '',
                        image: '',
                        icon: 'Building2',
                        colSpan: 'col-span-1',
                      },
                    ],
                  }));
                }}
                className="flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium py-2"
              >
                <Plus size={16} /> Tambah Fasilitas
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

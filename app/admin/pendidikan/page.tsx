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

// We import dynamic icons we might want to let users choose from
import * as LucideIcons from 'lucide-react';

const ICONS_LIST = [
  'GraduationCap',
  'BookOpen',
  'Clock',
  'BookText',
  'Microscope',
  'Globe',
  'Star',
  'Award',
  'CheckCircle',
  'Target',
  'Zap',
];

interface ProgramItem {
  id: string;
  name: string;
  icon: string;
}

interface BiayaItem {
  id: string;
  label: string;
  value: string;
}

interface AlurSyaratItem {
  id: string;
  value: string;
}

interface PendidikanFormData {
  pendidikanTitle: string;
  pendidikanTitleHighlight: string;
  pendidikanDesc: string;
  pendidikanFormalTitle: string;
  pendidikanFormalDesc: string;
  pendidikanFormalList: ProgramItem[];
  pendidikanDiniyahTitle: string;
  pendidikanDiniyahDesc: string;
  pendidikanDiniyahList: ProgramItem[];
  pendidikanDisiplinTitle: string;
  pendidikanDisiplinDesc: string;
  psbTitle: string;
  psbTitleHighlight: string;
  psbDesc: string;
  psbSyaratList: AlurSyaratItem[];
  psbAlurList: AlurSyaratItem[];
  psbBiayaList: BiayaItem[];
  psbBrosurUrl: string;
}

export default function AdminPendidikanPage() {
  const [profilId, setProfilId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState<PendidikanFormData>({
    pendidikanTitle: '',
    pendidikanTitleHighlight: '',
    pendidikanDesc: '',
    pendidikanFormalTitle: '',
    pendidikanFormalDesc: '',
    pendidikanFormalList: [],
    pendidikanDiniyahTitle: '',
    pendidikanDiniyahDesc: '',
    pendidikanDiniyahList: [],
    pendidikanDisiplinTitle: '',
    pendidikanDisiplinDesc: '',
    psbTitle: '',
    psbTitleHighlight: '',
    psbDesc: '',
    psbSyaratList: [],
    psbAlurList: [],
    psbBiayaList: [],
    psbBrosurUrl: '',
  });

  const [uploadingBrosur, setUploadingBrosur] = useState(false);

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
          pendidikanTitle: data.data.pendidikanTitle || '',
          pendidikanTitleHighlight: data.data.pendidikanTitleHighlight || '',
          pendidikanDesc: data.data.pendidikanDesc || '',
          pendidikanFormalTitle: data.data.pendidikanFormalTitle || '',
          pendidikanFormalDesc: data.data.pendidikanFormalDesc || '',
          pendidikanFormalList: safeParseJSON(
            data.data.pendidikanFormalList,
            []
          ),
          pendidikanDiniyahTitle: data.data.pendidikanDiniyahTitle || '',
          pendidikanDiniyahDesc: data.data.pendidikanDiniyahDesc || '',
          pendidikanDiniyahList: safeParseJSON(
            data.data.pendidikanDiniyahList,
            []
          ),
          pendidikanDisiplinTitle: data.data.pendidikanDisiplinTitle || '',
          pendidikanDisiplinDesc: data.data.pendidikanDisiplinDesc || '',
          psbTitle: data.data.psbTitle || '',
          psbTitleHighlight: data.data.psbTitleHighlight || '',
          psbDesc: data.data.psbDesc || '',
          psbSyaratList: safeParseJSON(data.data.psbSyaratList, []).map(
            (text: string) => ({ id: Math.random().toString(), value: text })
          ),
          psbAlurList: safeParseJSON(data.data.psbAlurList, []).map(
            (text: string) => ({ id: Math.random().toString(), value: text })
          ),
          psbBiayaList: safeParseJSON(data.data.psbBiayaList, []),
          psbBrosurUrl: data.data.psbBrosurUrl || '',
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

    // Prepare payload by stringifying lists
    const payload = {
      ...formData,
      pendidikanFormalList: JSON.stringify(formData.pendidikanFormalList),
      pendidikanDiniyahList: JSON.stringify(formData.pendidikanDiniyahList),
      pendidikanDisiplinTitle: formData.pendidikanDisiplinTitle,
      pendidikanDisiplinDesc: formData.pendidikanDisiplinDesc,
      psbSyaratList: JSON.stringify(formData.psbSyaratList.map((i) => i.value)),
      psbAlurList: JSON.stringify(formData.psbAlurList.map((i) => i.value)),
      psbBiayaList: JSON.stringify(formData.psbBiayaList),
      psbBrosurUrl: formData.psbBrosurUrl,
    };

    try {
      const res = await fetch(`/api/profil/${profilId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert.success('Data Pendidikan & PSB berhasil disimpan!');
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

  const handleUploadBrosur = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
    ];
    if (!allowedTypes.includes(file.type)) {
      alert.error(
        'Tipe file tidak didukung. Gunakan PDF, JPG, PNG, WebP, atau GIF'
      );
      e.target.value = '';
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert.error('Ukuran file maksimal 10MB');
      e.target.value = '';
      return;
    }

    setUploadingBrosur(true);
    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('folder', 'brosur');

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      });
      const data = await res.json();

      if (data.success) {
        // Delete old file if exists
        if (formData.psbBrosurUrl) {
          const oldFilename = formData.psbBrosurUrl.split('/').pop();
          if (oldFilename) {
            try {
              await fetch('/api/upload/delete', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  filename: oldFilename,
                  folder: 'brosur',
                }),
              });
            } catch (error) {
              console.error('Failed to delete old file:', error);
            }
          }
        }

        setFormData((prev) => ({ ...prev, psbBrosurUrl: data.data.url }));
        alert.success('Brosur berhasil diunggah');
      } else {
        alert.error(
          'Gagal mengunggah brosur',
          data.error || 'Silakan coba lagi'
        );
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert.error('Terjadi kesalahan saat mengunggah');
    } finally {
      setUploadingBrosur(false);
      e.target.value = '';
    }
  };

  const handleDeleteBrosur = async () => {
    if (!formData.psbBrosurUrl) return;

    const filename = formData.psbBrosurUrl.split('/').pop();
    if (!filename) return;

    try {
      await fetch('/api/upload/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename,
          folder: 'brosur',
        }),
      });
      setFormData((prev) => ({ ...prev, psbBrosurUrl: '' }));
      alert.success('Brosur berhasil dihapus');
    } catch (error) {
      console.error('Failed to delete file:', error);
      alert.error('Gagal menghapus brosur');
    }
  };

  // Helper for rendering selected icons
  const renderIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon ? <Icon size={18} /> : null;
  };

  if (loading) {
    return <div className="text-center py-12 text-gray-400">Memuat...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Kelola Pendidikan & PSB
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Atur konten Akademik, Kurikulum, dan Penerimaan Santri Baru
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
      >
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* SECTION: PENDIDIKAN HEADER */}
          <div>
            <SectionTitle title="A. Header Pendidikan" />
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Judul Pendidikan (teks biasa)"
                  required
                  value={formData.pendidikanTitle}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      pendidikanTitle: e.target.value,
                    }))
                  }
                  placeholder="Pendidikan"
                />
                <FormInput
                  label="Judul Highlight (teks berwarna)"
                  value={formData.pendidikanTitleHighlight}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      pendidikanTitleHighlight: e.target.value,
                    }))
                  }
                  placeholder="Komprehensif"
                />
              </div>
              <FormTextarea
                label="Deskripsi Pendidikan"
                rows={2}
                value={formData.pendidikanDesc}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, pendidikanDesc: e.target.value }))
                }
              />
            </div>
          </div>

          {/* SECTION: PROGRAM FORMAL */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <SectionTitle title="B. Program Pendidikan Formal" />
            <div className="space-y-4 mb-4">
              <FormInput
                label="Judul Card"
                value={formData.pendidikanFormalTitle}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    pendidikanFormalTitle: e.target.value,
                  }))
                }
                placeholder="Pendidikan Formal"
              />
              <FormInput
                label="Deskripsi Card"
                value={formData.pendidikanFormalDesc}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    pendidikanFormalDesc: e.target.value,
                  }))
                }
                placeholder="Integrasi sains dan agama"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Daftar Program
              </label>
              {formData.pendidikanFormalList.map((item, index) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-500">
                    {renderIcon(item.icon)}
                  </div>
                  <select
                    className="flex-shrink-0 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 dark:text-white"
                    value={item.icon}
                    onChange={(e) => {
                      const newList = [...formData.pendidikanFormalList];
                      newList[index].icon = e.target.value;
                      setFormData((p) => ({
                        ...p,
                        pendidikanFormalList: newList,
                      }));
                    }}
                  >
                    {ICONS_LIST.map((ic) => (
                      <option key={ic} value={ic}>
                        {ic}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    className="flex-grow bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 dark:text-white"
                    placeholder="Nama program..."
                    value={item.name}
                    onChange={(e) => {
                      const newList = [...formData.pendidikanFormalList];
                      newList[index].name = e.target.value;
                      setFormData((p) => ({
                        ...p,
                        pendidikanFormalList: newList,
                      }));
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newList = formData.pendidikanFormalList.filter(
                        (_, i) => i !== index
                      );
                      setFormData((p) => ({
                        ...p,
                        pendidikanFormalList: newList,
                      }));
                    }}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  setFormData((p) => ({
                    ...p,
                    pendidikanFormalList: [
                      ...p.pendidikanFormalList,
                      {
                        id: Math.random().toString(),
                        name: '',
                        icon: 'GraduationCap',
                      },
                    ],
                  }));
                }}
                className="flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium py-2"
              >
                <Plus size={16} /> Tambah Program Formal
              </button>
            </div>
          </div>

          {/* SECTION: PROGRAM DINIYAH */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <SectionTitle title="C. Program Pendidikan Diniyah" />
            <div className="space-y-4 mb-4">
              <FormInput
                label="Judul Card"
                value={formData.pendidikanDiniyahTitle}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    pendidikanDiniyahTitle: e.target.value,
                  }))
                }
                placeholder="Pendidikan Diniyah"
              />
              <FormInput
                label="Deskripsi Card"
                value={formData.pendidikanDiniyahDesc}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    pendidikanDiniyahDesc: e.target.value,
                  }))
                }
                placeholder="Mengkaji warisan keilmuan Islam"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Daftar Program
              </label>
              {formData.pendidikanDiniyahList.map((item, index) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-500">
                    {renderIcon(item.icon)}
                  </div>
                  <select
                    className="flex-shrink-0 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 dark:text-white"
                    value={item.icon}
                    onChange={(e) => {
                      const newList = [...formData.pendidikanDiniyahList];
                      newList[index].icon = e.target.value;
                      setFormData((p) => ({
                        ...p,
                        pendidikanDiniyahList: newList,
                      }));
                    }}
                  >
                    {ICONS_LIST.map((ic) => (
                      <option key={ic} value={ic}>
                        {ic}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    className="flex-grow bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 dark:text-white"
                    placeholder="Nama program..."
                    value={item.name}
                    onChange={(e) => {
                      const newList = [...formData.pendidikanDiniyahList];
                      newList[index].name = e.target.value;
                      setFormData((p) => ({
                        ...p,
                        pendidikanDiniyahList: newList,
                      }));
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newList = formData.pendidikanDiniyahList.filter(
                        (_, i) => i !== index
                      );
                      setFormData((p) => ({
                        ...p,
                        pendidikanDiniyahList: newList,
                      }));
                    }}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  setFormData((p) => ({
                    ...p,
                    pendidikanDiniyahList: [
                      ...p.pendidikanDiniyahList,
                      {
                        id: Math.random().toString(),
                        name: '',
                        icon: 'BookText',
                      },
                    ],
                  }));
                }}
                className="flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium py-2"
              >
                <Plus size={16} /> Tambah Program Diniyah
              </button>
            </div>
          </div>

          {/* SECTION: DISIPLIN */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <SectionTitle title="D. Sistem Disiplin" />
            <div className="space-y-4">
              <FormInput
                label="Judul"
                value={formData.pendidikanDisiplinTitle}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    pendidikanDisiplinTitle: e.target.value,
                  }))
                }
                placeholder="Sistem Disiplin 24 Jam"
              />
              <FormTextarea
                label="Deskripsi"
                rows={3}
                value={formData.pendidikanDisiplinDesc}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    pendidikanDisiplinDesc: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="py-4">
            <div className="h-px bg-slate-800 w-full mb-4"></div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              Bagian Pendaftaran (PSB)
            </h2>
          </div>

          {/* SECTION: PSB HEADER */}
          <div>
            <SectionTitle title="A. Header PSB" />
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Judul PSB (teks biasa)"
                  value={formData.psbTitle}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, psbTitle: e.target.value }))
                  }
                  placeholder="Langkah Awal"
                />
                <FormInput
                  label="Judul Highlight (teks berwarna)"
                  value={formData.psbTitleHighlight}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      psbTitleHighlight: e.target.value,
                    }))
                  }
                  placeholder="Menuju Masa Depan Gemilang"
                />
              </div>
              <FormTextarea
                label="Deskripsi PSB"
                rows={2}
                value={formData.psbDesc}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, psbDesc: e.target.value }))
                }
              />
            </div>
          </div>

          {/* SECTION: PSB LISTS */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* SYARAT */}
            <div>
              <SectionTitle title="B. Syarat Berkas" />
              <div className="space-y-3">
                {formData.psbSyaratList.map((item, index) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <input
                      type="text"
                      className="flex-grow bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 dark:text-white"
                      placeholder="Syarat..."
                      value={item.value}
                      onChange={(e) => {
                        const newList = [...formData.psbSyaratList];
                        newList[index].value = e.target.value;
                        setFormData((p) => ({ ...p, psbSyaratList: newList }));
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newList = formData.psbSyaratList.filter(
                          (_, i) => i !== index
                        );
                        setFormData((p) => ({ ...p, psbSyaratList: newList }));
                      }}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setFormData((p) => ({
                      ...p,
                      psbSyaratList: [
                        ...p.psbSyaratList,
                        { id: Math.random().toString(), value: '' },
                      ],
                    }));
                  }}
                  className="flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium py-1"
                >
                  <Plus size={16} /> Tambah Syarat
                </button>
              </div>
            </div>

            {/* ALUR */}
            <div>
              <SectionTitle title="C. Alur Daftar" />
              <div className="space-y-3">
                {formData.psbAlurList.map((item, index) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs text-slate-600 dark:text-slate-300">
                      {index + 1}
                    </div>
                    <input
                      type="text"
                      className="flex-grow bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 dark:text-white"
                      placeholder="Alur..."
                      value={item.value}
                      onChange={(e) => {
                        const newList = [...formData.psbAlurList];
                        newList[index].value = e.target.value;
                        setFormData((p) => ({ ...p, psbAlurList: newList }));
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newList = formData.psbAlurList.filter(
                          (_, i) => i !== index
                        );
                        setFormData((p) => ({ ...p, psbAlurList: newList }));
                      }}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setFormData((p) => ({
                      ...p,
                      psbAlurList: [
                        ...p.psbAlurList,
                        { id: Math.random().toString(), value: '' },
                      ],
                    }));
                  }}
                  className="flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium py-1"
                >
                  <Plus size={16} /> Tambah Alur
                </button>
              </div>
            </div>
          </div>

          {/* SECTION: BIAYA & CTA */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <SectionTitle title="D. Investasi / Biaya" />
            <div className="space-y-3 mb-6">
              {formData.psbBiayaList.map((item, index) => (
                <div key={item.id} className="flex items-center gap-3">
                  <input
                    type="text"
                    className="w-1/2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 dark:text-white"
                    placeholder="Nama Biaya (contoh: SPP Bulanan)"
                    value={item.label}
                    onChange={(e) => {
                      const newList = [...formData.psbBiayaList];
                      newList[index].label = e.target.value;
                      setFormData((p) => ({ ...p, psbBiayaList: newList }));
                    }}
                  />
                  <input
                    type="text"
                    className="w-1/2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 dark:text-white"
                    placeholder="Nominal (contoh: Rp 650k)"
                    value={item.value}
                    onChange={(e) => {
                      const newList = [...formData.psbBiayaList];
                      newList[index].value = e.target.value;
                      setFormData((p) => ({ ...p, psbBiayaList: newList }));
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newList = formData.psbBiayaList.filter(
                        (_, i) => i !== index
                      );
                      setFormData((p) => ({ ...p, psbBiayaList: newList }));
                    }}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  setFormData((p) => ({
                    ...p,
                    psbBiayaList: [
                      ...p.psbBiayaList,
                      { id: Math.random().toString(), label: '', value: '' },
                    ],
                  }));
                }}
                className="flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium py-1"
              >
                <Plus size={16} /> Tambah Biaya
              </button>
            </div>

            <SectionTitle title="E. File Brosur" />
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="application/pdf,image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleUploadBrosur}
                  className="hidden"
                  id="upload-brosur"
                />
                <label
                  htmlFor="upload-brosur"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg cursor-pointer text-gray-700 dark:text-gray-300 transition-colors duration-200"
                >
                  <Upload size={20} />
                  <span className="text-sm font-medium">
                    {uploadingBrosur
                      ? 'Mengunggah...'
                      : 'Unggah Brosur (PDF/Image)'}
                  </span>
                </label>
                {formData.psbBrosurUrl && (
                  <a
                    href={formData.psbBrosurUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium py-1 px-3 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                  >
                    <Eye size={16} /> Lihat Brosur
                  </a>
                )}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Pilih file PDF atau gambar (JPG, PNG, WebP, GIF) untuk diunggah
                sebagai brosur resmi. Url brosur yang tersimpan akan dibagikan
                ke pengunjung web.
              </p>
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

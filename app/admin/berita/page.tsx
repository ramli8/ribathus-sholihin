'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Upload,
  X,
  Newspaper,
  Save,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import alert from '@/lib/alert';
import {
  FormInput,
  FormTextarea,
  SectionTitle,
} from '@/components/common/FormComponents';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';

interface Berita {
  id: number;
  judul: string;
  slug: string;
  isi: string;
  coverUrl?: string;
  kategori?: string;
  penulis?: string;
  viewed: number;
  published: boolean;
  createdAt: string;
}

export default function AdminBeritaPage() {
  const router = useRouter();
  const [beritaList, setBeritaList] = useState<Berita[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    judul: '',
    slug: '',
    isi: '',
    coverUrl: '',
    kategori: '',
    penulis: '',
    published: true,
  });
  const [uploading, setUploading] = useState(false);

  // Header section state
  const [profilId, setProfilId] = useState<number | null>(null);
  const [showHeaderSettings, setShowHeaderSettings] = useState(false);
  const [savingHeader, setSavingHeader] = useState(false);
  const [headerData, setHeaderData] = useState({
    beritaTitle: '',
    beritaTitleHighlight: '',
    beritaDesc: '',
  });

  const fetchHeaderData = useCallback(async () => {
    try {
      const res = await fetch('/api/profil');
      const data = await res.json();
      if (data.success && data.data) {
        setProfilId(data.data.id);
        setHeaderData({
          beritaTitle: data.data.beritaTitle || '',
          beritaTitleHighlight: data.data.beritaTitleHighlight || '',
          beritaDesc: data.data.beritaDesc || '',
        });
      }
    } catch {
      console.error('Error fetching header data');
    }
  }, []);

  const handleSaveHeader = async () => {
    if (!profilId) return;
    setSavingHeader(true);
    try {
      const res = await fetch(`/api/profil/${profilId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(headerData),
      });
      if (res.ok) {
        alert.success('Header berita berhasil disimpan!');
      } else {
        alert.error('Gagal menyimpan header');
      }
    } catch {
      alert.error('Terjadi kesalahan');
    } finally {
      setSavingHeader(false);
    }
  };

  useEffect(() => {
    fetchBerita();
    fetchHeaderData();
  }, [fetchHeaderData]);

  const fetchBerita = async () => {
    try {
      const res = await fetch('/api/berita');
      const data = await res.json();
      if (data.success) {
        setBeritaList(data.data);
      }
    } catch (error) {
      console.error('Error fetching berita:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const slug =
      formData.slug ||
      formData.judul
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const url = editingId ? `/api/berita/${editingId}` : '/api/berita';

    const method = editingId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, slug }),
      });

      if (res.ok) {
        alert.success(
          editingId
            ? 'Berita berhasil diupdate!'
            : 'Berita berhasil ditambahkan!'
        );
        setShowForm(false);
        setEditingId(null);
        setFormData({
          judul: '',
          slug: '',
          isi: '',
          coverUrl: '',
          kategori: '',
          penulis: '',
          published: true,
        });
        fetchBerita();
      } else {
        const error = await res.json();
        alert.error('Gagal menyimpan berita', error.error);
      }
    } catch (error) {
      alert.error('Terjadi kesalahan', 'Gagal menyimpan berita');
    }
  };

  const handleEdit = (item: Berita) => {
    setEditingId(item.id);
    setFormData({
      judul: item.judul,
      slug: item.slug,
      isi: item.isi,
      coverUrl: item.coverUrl || '',
      kategori: item.kategori || '',
      penulis: item.penulis || '',
      published: item.published,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    const confirmed = await alert.confirm(
      'Hapus Berita',
      'Yakin ingin menghapus berita ini?'
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/berita/${id}`, { method: 'DELETE' });
      if (res.ok) {
        alert.success('Berita berhasil dihapus!');
        fetchBerita();
      } else {
        alert.error('Gagal menghapus berita');
      }
    } catch (error) {
      alert.error('Terjadi kesalahan', 'Gagal menghapus berita');
    }
  };

  const handleTogglePublish = async (id: number, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/berita/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !currentStatus }),
      });

      if (res.ok) {
        alert.success(
          !currentStatus
            ? 'Berita berhasil dipublish!'
            : 'Berita berhasil di-unpublish!'
        );
        fetchBerita();
      } else {
        alert.error('Gagal mengubah status');
      }
    } catch (error) {
      alert.error('Gagal mengubah status', 'Terjadi kesalahan');
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);
    formDataUpload.append('folder', 'berita');

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      });

      const data = await res.json();
      if (data.success) {
        setFormData((prev) => ({ ...prev, coverUrl: data.data.url }));
        alert.success('Gambar berhasil diupload!');
      } else {
        alert.error(data.error || 'Upload gagal');
      }
    } catch (error) {
      alert.error('Upload gagal', 'Terjadi kesalahan saat upload');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12 text-gray-400">Memuat...</div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Kelola Berita
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Kelola berita, artikel, dan header section berita di halaman utama
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHeaderSettings(!showHeaderSettings)}
            className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {showHeaderSettings ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
            Pengaturan Header
          </button>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500 text-white text-sm font-medium rounded-lg hover:bg-emerald-600 transition-colors"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Tambah Berita</span>
          </button>
        </div>
      </div>

      {/* Header Settings */}
      {showHeaderSettings && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
        >
          <SectionTitle title="Header Section Berita" />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 mb-6">
            Teks yang muncul di atas daftar berita di halaman utama website.
          </p>
          <div className="space-y-4">
            <FormInput
              label="Judul (teks biasa)"
              value={headerData.beritaTitle}
              onChange={(e) =>
                setHeaderData((p) => ({ ...p, beritaTitle: e.target.value }))
              }
              placeholder="Warta"
            />
            <FormInput
              label="Judul Highlight (teks berwarna)"
              value={headerData.beritaTitleHighlight}
              onChange={(e) =>
                setHeaderData((p) => ({
                  ...p,
                  beritaTitleHighlight: e.target.value,
                }))
              }
              placeholder="Terkini"
            />
            <FormTextarea
              label="Deskripsi"
              rows={2}
              value={headerData.beritaDesc}
              onChange={(e) =>
                setHeaderData((p) => ({ ...p, beritaDesc: e.target.value }))
              }
              placeholder="Ikuti perkembangan pondok, warta kegiatan santri..."
            />
            <button
              type="button"
              onClick={handleSaveHeader}
              disabled={savingHeader}
              className="flex items-center gap-2 px-6 py-2 bg-emerald-500 text-white text-sm rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50"
            >
              <Save size={20} />
              {savingHeader ? 'Menyimpan...' : 'Simpan Header'}
            </button>
          </div>
        </motion.div>
      )}

      {/* Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {editingId ? 'Edit Berita' : 'Tambah Berita Baru'}
            </h2>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setFormData({
                  judul: '',
                  slug: '',
                  isi: '',
                  coverUrl: '',
                  kategori: '',
                  penulis: '',
                  published: false,
                });
              }}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Judul Berita *
                </label>
                <input
                  type="text"
                  value={formData.judul}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, judul: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 text-sm border border-[#E2E8F0] rounded-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-zinc-800 dark:border-zinc-700"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Slug (URL)
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, slug: e.target.value }))
                  }
                  placeholder="auto-generate"
                  className="w-full px-4 py-2.5 text-sm border border-[#E2E8F0] rounded-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-zinc-800 dark:border-zinc-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Kategori
                </label>
                <select
                  value={formData.kategori}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      kategori: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2.5 text-sm border border-[#E2E8F0] rounded-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-zinc-800 dark:border-zinc-700"
                >
                  <option value="">Pilih Kategori</option>
                  <option value="Umum">Umum</option>
                  <option value="Kajian">Kajian</option>
                  <option value="Kegiatan">Kegiatan</option>
                  <option value="Pengumuman">Pengumuman</option>
                  <option value="Prestasi">Prestasi</option>
                  <option value="Pendidikan">Pendidikan</option>
                  <option value="Kunjungan">Kunjungan</option>
                  <option value="Santri">Santri</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Penulis
                </label>
                <input
                  type="text"
                  value={formData.penulis}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      penulis: e.target.value,
                    }))
                  }
                  placeholder="Nama Penulis"
                  className="w-full px-4 py-2.5 text-sm border border-[#E2E8F0] rounded-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-zinc-800 dark:border-zinc-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cover Image
              </label>
              <div className="flex items-center gap-4">
                {formData.coverUrl && (
                  <img
                    src={formData.coverUrl}
                    alt="Cover preview"
                    className="w-20 h-20 object-cover rounded-sm border border-gray-200"
                  />
                )}
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    disabled={uploading}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-sm file:border-0
                      file:text-sm file:font-medium
                      file:bg-emerald-50 file:text-emerald-700
                      hover:file:bg-emerald-100"
                  />
                  {uploading && (
                    <p className="text-xs text-gray-500 mt-1">
                      Mengupload gambar...
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Isi Berita *
              </label>
              <div className="bg-white dark:bg-gray-800 rounded-lg">
                <ReactQuill
                  theme="snow"
                  value={formData.isi}
                  onChange={(content) =>
                    setFormData((prev) => ({ ...prev, isi: content }))
                  }
                  className="h-64 mb-12"
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, 3, false] }],
                      ['bold', 'italic', 'underline', 'strike'],
                      [{ list: 'ordered' }, { list: 'bullet' }],
                      ['link', 'image'],
                      ['clean'],
                    ],
                  }}
                />
              </div>
            </div>

            <div className="flex gap-2 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
              >
                <Save size={20} />
                {editingId ? 'Update Berita' : 'Simpan Berita'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors dark:bg-gray-800 dark:text-gray-300"
              >
                Batal
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Daftar Berita
        </h2>
        <div className="space-y-4">
          {beritaList.map((berita) => (
            <motion.div
              key={berita.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                {berita.coverUrl ? (
                  <img
                    src={berita.coverUrl}
                    alt={berita.judul}
                    className="w-20 h-16 object-cover rounded-lg flex-shrink-0 border border-gray-200 dark:border-gray-700"
                  />
                ) : (
                  <div className="w-20 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200 dark:border-gray-700">
                    <Newspaper size={24} className="text-gray-400" />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {berita.judul}
                    </h3>
                    {berita.published ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-md font-medium dark:bg-green-900/30 dark:text-green-400">
                        Published
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium dark:bg-gray-800 dark:text-gray-400">
                        Draft
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 line-clamp-2">
                    {berita.isi.substring(0, 100)}...
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md font-medium text-gray-600 dark:text-gray-400">
                      {berita.kategori || 'Umum'}
                    </span>
                    <span>•</span>
                    <span>{berita.penulis || 'Admin'}</span>
                    <span>•</span>
                    <span>
                      {new Date(berita.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() =>
                      handleTogglePublish(berita.id, berita.published)
                    }
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    title={berita.published ? 'Unpublish' : 'Publish'}
                  >
                    {berita.published ? (
                      <EyeOff size={18} className="text-gray-500" />
                    ) : (
                      <Eye size={18} className="text-gray-500" />
                    )}
                  </button>
                  <button
                    onClick={() => handleEdit(berita)}
                    className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit size={18} className="text-blue-600 dark:text-blue-400" />
                  </button>
                  <button
                    onClick={() => handleDelete(berita.id)}
                    className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={18} className="text-red-600 dark:text-red-400" />
                  </button>
                </div>
              </div>
          </motion.div>
        ))}

        {beritaList.length === 0 && (
          <div className="py-12 text-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Newspaper size={32} className="text-gray-400" />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Belum ada berita</p>
          </div>
        )}
        </div>
      </motion.div>
    </div>
  );
}

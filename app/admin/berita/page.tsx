'use client';

import { useEffect, useState, useCallback } from 'react';
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
import ImageModal from '@/components/common/ImageModal';

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
  const [previewImage, setPreviewImage] = useState<string | null>(null);

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
        // Delete old file if exists
        const oldImage = formData.coverUrl;
        if (oldImage) {
          const parts = oldImage.split('/');
          const filename = parts[parts.length - 1];
          if (filename) {
            await fetch('/api/upload/delete', {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ filename, folder: 'berita' }),
            }).catch(console.error);
          }
        }

        const newUrl = data.data.url;
        setFormData((prev) => ({ ...prev, coverUrl: newUrl }));

        if (editingId) {
          await fetch(`/api/berita/${editingId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ coverUrl: newUrl }),
          });
        }

        alert.success('Gambar berhasil diupload dan disimpan!');
      } else {
        alert.error(data.error || 'Upload gagal');
      }
    } catch (error) {
      alert.error('Upload gagal', 'Terjadi kesalahan saat upload');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleRemoveCover = async () => {
    const confirmed = await alert.confirm(
      'Hapus Cover',
      'Yakin ingin menghapus cover image ini? Gambar akan dihapus permanen.'
    );
    if (!confirmed) return;

    if (formData.coverUrl) {
      const parts = formData.coverUrl.split('/');
      const filename = parts[parts.length - 1];
      if (filename) {
        await fetch('/api/upload/delete', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename, folder: 'berita' }),
        }).catch(console.error);
      }
    }

    setFormData((prev) => ({ ...prev, coverUrl: '' }));

    if (editingId) {
      try {
        await fetch(`/api/berita/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ coverUrl: '' }),
        });
        alert.success('Cover image berhasil dihapus!');
      } catch {
        alert.error('Gagal memperbarui database');
      }
    }
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
            Kelola Berita
          </h1>
          <p className="text-[12px] font-bold text-stone-500 dark:text-stone-400 mt-2 tracking-wide">
            Kelola berita, artikel, dan header section berita di halaman utama
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHeaderSettings(!showHeaderSettings)}
            className="flex items-center gap-1.5 px-4 py-2 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-sm font-medium rounded-lg hover:bg-stone-200 dark:hover:bg-gray-600 transition-colors"
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
            className="inline-flex items-center justify-center gap-3 px-4 py-2 bg-stone-900 dark:bg-emerald-800 text-stone-100 dark:text-emerald-50 text-[12px] font-bold tracking-widest uppercase rounded-xl hover:bg-stone-800 dark:hover:bg-emerald-900 transition-colors shadow-sm disabled:opacity-50"
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
          className="p-8 md:p-10 rounded-[2rem] bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800 shadow-sm"
        >
          <SectionTitle title="Header Section Berita" />
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-4 mb-6">
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
              className="inline-flex items-center justify-center gap-3 px-6 py-2 bg-stone-900 dark:bg-emerald-800 text-stone-100 dark:text-emerald-50 text-[12px] font-bold tracking-widest uppercase rounded-xl hover:bg-stone-800 dark:hover:bg-emerald-900 transition-colors shadow-sm disabled:opacity-50"
            >
              <Save size={20} />
              {savingHeader ? 'MEMPROSES ...' : 'Simpan Header'}
            </button>
          </div>
        </motion.div>
      )}

      {/* Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 md:p-10 rounded-[2rem] bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-200 dark:border-stone-800">
            <h2 className="text-lg font-semibold text-stone-900 dark:text-white">
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
              className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
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
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
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
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
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
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
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
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                Cover Image
              </label>
              <p className="text-xs text-stone-500 dark:text-stone-400 mb-2">
                Rekomendasi: 1280 × 720 px (16:9 Landscape, format JPG/PNG)
              </p>
              <div className="flex items-center gap-4">
                {formData.coverUrl && (
                  <div>
                    <div className="relative group w-fit">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={formData.coverUrl}
                        alt="Cover preview"
                        onClick={() => setPreviewImage(formData.coverUrl)}
                        className="w-20 h-20 object-cover rounded-sm border border-stone-200 cursor-pointer"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveCover}
                        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                        title="Hapus Cover"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-2 font-medium">
                      ✨ Klik gambar untuk membesarkan
                    </p>
                  </div>
                )}
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    disabled={uploading}
                    className="hidden"
                    id="upload-cover-berita"
                  />
                  <label
                    htmlFor="upload-cover-berita"
                    className={`inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors cursor-pointer font-medium text-sm ${
                      uploading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <Upload size={18} />
                    <span>{uploading ? 'Mengupload...' : 'Unggah Cover'}</span>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                Isi Berita *
              </label>
              <div className="bg-white dark:bg-stone-900 rounded-lg">
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

            <div className="flex gap-2 pt-6 border-t border-stone-200 dark:border-stone-800">
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
                className="px-6 py-2 bg-stone-100 text-stone-700 rounded-lg hover:bg-stone-200 transition-colors dark:bg-stone-900 dark:text-stone-300"
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
        className="p-8 md:p-10 rounded-[2rem] bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800 shadow-sm"
      >
        <h2 className="text-lg font-semibold text-stone-900 dark:text-white mb-6">
          Daftar Berita
        </h2>
        <div className="space-y-4">
          {beritaList.map((berita) => (
            <motion.div
              key={berita.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 hover:bg-gray-50 dark:hover:bg-stone-950/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                {berita.coverUrl ? (
                  <div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={berita.coverUrl}
                      alt={berita.judul}
                      onClick={() => setPreviewImage(berita.coverUrl!)}
                      className="w-20 h-16 object-cover rounded-lg flex-shrink-0 border border-stone-200 dark:border-stone-800 cursor-pointer"
                    />
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1 font-medium select-none w-max">
                      ✨ Klik zoom
                    </p>
                  </div>
                ) : (
                  <div className="w-20 h-16 bg-stone-100 dark:bg-stone-900 rounded-lg flex items-center justify-center flex-shrink-0 border border-stone-200 dark:border-stone-800">
                    <Newspaper size={24} className="text-stone-400" />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-sm font-semibold text-stone-900 dark:text-white truncate">
                      {berita.judul}
                    </h3>
                    {berita.published ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-md font-medium dark:bg-green-900/30 dark:text-green-400">
                        Published
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-stone-100 text-stone-700 text-xs rounded-md font-medium dark:bg-stone-900 dark:text-stone-400">
                        Draft
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-stone-500 dark:text-stone-400 mb-2 line-clamp-2">
                    {berita.isi.substring(0, 100)}...
                  </p>
                  <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                    <span className="px-2 py-1 bg-stone-100 dark:bg-stone-900 rounded-md font-medium text-stone-600 dark:text-stone-400">
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
                    className="p-2 hover:bg-stone-100 dark:hover:bg-stone-900 rounded-lg transition-colors"
                    title={berita.published ? 'Unpublish' : 'Publish'}
                  >
                    {berita.published ? (
                      <EyeOff size={18} className="text-stone-500" />
                    ) : (
                      <Eye size={18} className="text-stone-500" />
                    )}
                  </button>
                  <button
                    onClick={() => handleEdit(berita)}
                    className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit
                      size={18}
                      className="text-blue-600 dark:text-blue-400"
                    />
                  </button>
                  <button
                    onClick={() => handleDelete(berita.id)}
                    className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2
                      size={18}
                      className="text-red-600 dark:text-red-400"
                    />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {beritaList.length === 0 && (
            <div className="py-12 text-center">
              <div className="w-16 h-16 bg-stone-100 dark:bg-stone-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Newspaper size={32} className="text-stone-400" />
              </div>
              <p className="text-sm text-stone-500 dark:text-stone-400">
                Belum ada berita
              </p>
            </div>
          )}
        </div>
      </motion.div>

      <ImageModal
        isOpen={!!previewImage}
        onClose={() => setPreviewImage(null)}
        imageUrl={previewImage || ''}
        title="Preview Cover Berita"
      />
    </div>
  );
}

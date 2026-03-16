'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, EyeOff, Upload, X, Newspaper } from 'lucide-react';
import alert from '@/lib/alert';

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
    published: false,
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchBerita();
  }, []);

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
          editingId ? 'Berita berhasil diupdate!' : 'Berita berhasil ditambahkan!'
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
          published: false,
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
    const confirmed = await alert.confirm('Hapus Berita', 'Yakin ingin menghapus berita ini?');
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
          !currentStatus ? 'Berita berhasil dipublish!' : 'Berita berhasil di-unpublish!'
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
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-gray-400">Memuat...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500">
            Kelola berita dan artikel pondok
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 text-white text-xs font-medium rounded hover:bg-emerald-600 transition-colors"
        >
          <Plus size={14} />
          <span className="hidden sm:inline">Tambah Berita</span>
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-sm border border-[#E2E8F0] bg-white shadow-default dark:border-zinc-800 dark:bg-zinc-900"
        >
          <div className="px-6.5 py-4 border-b border-[#E2E8F0] flex items-center justify-between dark:border-zinc-800">
            <h2 className="font-semibold text-gray-900 dark:text-white">
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
              className="p-1 hover:bg-gray-100 rounded-sm"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6.5 space-y-4">
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

            <div className="flex gap-4 pt-4 border-t border-[#E2E8F0] dark:border-zinc-800">
              <button
                type="submit"
                className="px-6 py-2.5 text-sm font-medium bg-emerald-500 text-white rounded-sm hover:bg-emerald-600 transition-colors shadow-sm"
              >
                {editingId ? 'Update Berita' : 'Simpan Berita'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-2.5 text-sm font-medium bg-gray-100 text-gray-700 rounded-sm hover:bg-gray-200 transition-colors dark:bg-zinc-800 dark:text-gray-300"
              >
                Batal
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* List */}
      <div className="rounded-sm border border-[#E2E8F0] bg-white shadow-default dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden divide-y divide-[#E2E8F0] dark:divide-zinc-800">
        {beritaList.map((berita) => (
          <motion.div
            key={berita.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-4 py-3 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start gap-3">
              {berita.coverUrl ? (
                <img
                  src={berita.coverUrl}
                  alt={berita.judul}
                  className="w-16 h-12 object-cover rounded flex-shrink-0"
                />
              ) : (
                <div className="w-16 h-12 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-gray-400 text-xs">No Image</span>
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xs font-semibold text-gray-900 truncate">
                    {berita.judul}
                  </h3>
                  {berita.published ? (
                    <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-xs rounded font-medium">
                      Published
                    </span>
                  ) : (
                    <span className="px-1.5 py-0.5 bg-gray-100 text-gray-700 text-xs rounded font-medium">
                      Draft
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mb-1 line-clamp-2">
                  {berita.isi.substring(0, 100)}...
                </p>
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <span className="font-medium text-gray-600">
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

              <div className="flex items-center gap-0.5">
                <button
                  onClick={() =>
                    handleTogglePublish(berita.id, berita.published)
                  }
                  className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                  title={berita.published ? 'Unpublish' : 'Publish'}
                >
                  {berita.published ? (
                    <EyeOff size={14} className="text-gray-500" />
                  ) : (
                    <Eye size={14} className="text-gray-500" />
                  )}
                </button>
                <button
                  onClick={() => handleEdit(berita)}
                  className="p-1.5 hover:bg-blue-50 rounded transition-colors"
                  title="Edit"
                >
                  <Edit size={14} className="text-blue-600" />
                </button>
                <button
                  onClick={() => handleDelete(berita.id)}
                  className="p-1.5 hover:bg-red-50 rounded transition-colors"
                  title="Delete"
                >
                  <Trash2 size={14} className="text-red-600" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {beritaList.length === 0 && (
          <div className="px-4 py-12 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Newspaper size={20} className="text-gray-400" />
            </div>
            <p className="text-xs text-gray-500">Belum ada berita</p>
          </div>
        )}
      </div>
    </div>
  );
}

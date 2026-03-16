'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Upload, X, Calendar, Image } from 'lucide-react';
import alert from '@/lib/alert';

interface Kegiatan {
  id: number;
  judul: string;
  deskripsi?: string;
  tanggal: string;
  lokasi?: string;
  coverUrl?: string;
  published: boolean;
  createdAt: string;
}

export default function AdminKegiatanPage() {
  const [kegiatanList, setKegiatanList] = useState<Kegiatan[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    judul: '',
    deskripsi: '',
    tanggal: '',
    lokasi: '',
    coverUrl: '',
    published: false,
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchKegiatan();
  }, []);

  const fetchKegiatan = async () => {
    try {
      const res = await fetch('/api/kegiatan');
      const data = await res.json();
      if (data.success) {
        setKegiatanList(data.data);
      }
    } catch (error) {
      console.error('Error fetching kegiatan:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const url = editingId 
      ? `/api/kegiatan/${editingId}`
      : '/api/kegiatan';
    
    const method = editingId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tanggal: new Date(formData.tanggal).toISOString(),
        }),
      });

      if (res.ok) {
        alert.success(editingId ? 'Kegiatan berhasil diupdate!' : 'Kegiatan berhasil ditambahkan!');
        setShowForm(false);
        setEditingId(null);
        setFormData({
          judul: '',
          deskripsi: '',
          tanggal: '',
          lokasi: '',
          coverUrl: '',
          published: false,
        });
        fetchKegiatan();
      } else {
        const error = await res.json();
        alert.error('Gagal menyimpan kegiatan', error.error);
      }
    } catch (error) {
      alert.error('Terjadi kesalahan', 'Gagal menyimpan kegiatan');
    }
  };

  const handleEdit = (item: Kegiatan) => {
    setEditingId(item.id);
    setFormData({
      judul: item.judul,
      deskripsi: item.deskripsi || '',
      tanggal: item.tanggal.split('T')[0],
      lokasi: item.lokasi || '',
      coverUrl: item.coverUrl || '',
      published: item.published,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    const confirmed = await alert.confirm('Hapus Kegiatan', 'Yakin ingin menghapus kegiatan ini?');
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/kegiatan/${id}`, { method: 'DELETE' });
      if (res.ok) {
        alert.success('Kegiatan berhasil dihapus!');
        fetchKegiatan();
      } else {
        alert.error('Gagal menghapus kegiatan');
      }
    } catch (error) {
      alert.error('Terjadi kesalahan', 'Gagal menghapus kegiatan');
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);
    formDataUpload.append('folder', 'kegiatan');

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      });

      const data = await res.json();
      if (data.success) {
        setFormData(prev => ({ ...prev, coverUrl: data.data.url }));
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
    return <div className="text-center py-12 text-gray-400">Memuat...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kelola Kegiatan</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola agenda kegiatan santri</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">Tambah Kegiatan</span>
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">
              {editingId ? 'Edit Kegiatan' : 'Tambah Kegiatan Baru'}
            </h2>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setFormData({
                  judul: '',
                  deskripsi: '',
                  tanggal: '',
                  lokasi: '',
                  coverUrl: '',
                  published: false,
                });
              }}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Judul Kegiatan *
              </label>
              <input
                type="text"
                value={formData.judul}
                onChange={(e) => setFormData(prev => ({ ...prev, judul: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deskripsi
              </label>
              <textarea
                value={formData.deskripsi}
                onChange={(e) => setFormData(prev => ({ ...prev, deskripsi: e.target.value }))}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tanggal *
                </label>
                <input
                  type="date"
                  value={formData.tanggal}
                  onChange={(e) => setFormData(prev => ({ ...prev, tanggal: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lokasi
                </label>
                <input
                  type="text"
                  value={formData.lokasi}
                  onChange={(e) => setFormData(prev => ({ ...prev, lokasi: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cover Image
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  className="hidden"
                  id="kegiatan-upload"
                />
                <label
                  htmlFor="kegiatan-upload"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer"
                >
                  <Upload size={20} />
                  <span>{uploading ? 'Uploading...' : 'Upload Gambar'}</span>
                </label>
                {formData.coverUrl && (
                  <div className="relative">
                    <img
                      src={formData.coverUrl}
                      alt="Preview"
                      className="h-20 w-auto rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, coverUrl: '' }))}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
              />
              <label htmlFor="published" className="text-sm text-gray-700">
                Publikasikan kegiatan
              </label>
            </div>

            <div className="flex gap-2 pt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
              >
                {editingId ? 'Update' : 'Simpan'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Batal
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* List */}
      <div className="grid gap-4">
        {kegiatanList.map((kegiatan) => (
          <motion.div
            key={kegiatan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              {kegiatan.coverUrl ? (
                <img
                  src={kegiatan.coverUrl}
                  alt={kegiatan.judul}
                  className="w-32 h-24 object-cover rounded-lg"
                />
              ) : (
                <div className="w-32 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Calendar size={32} className="text-gray-400" />
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{kegiatan.judul}</h3>
                  {kegiatan.published ? (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">Published</span>
                  ) : (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">Draft</span>
                  )}
                </div>
                {kegiatan.deskripsi && (
                  <p className="text-sm text-gray-500 mb-2 line-clamp-2">{kegiatan.deskripsi}</p>
                )}
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(kegiatan.tanggal).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                  {kegiatan.lokasi && (
                    <>
                      <span>•</span>
                      <span>{kegiatan.lokasi}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(kegiatan)}
                  className="p-2 hover:bg-gray-100 rounded-lg text-blue-600"
                  title="Edit"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(kegiatan.id)}
                  className="p-2 hover:bg-gray-100 rounded-lg text-red-600"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {kegiatanList.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <Calendar size={48} className="mx-auto mb-4 opacity-50" />
            <p>Belum ada kegiatan</p>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Upload, X, Star, Image } from 'lucide-react';
import alert from '@/lib/alert';

interface Galeri {
  id: number;
  judul: string;
  deskripsi?: string;
  imageUrl: string;
  kategori?: string;
  featured: boolean;
  viewed: number;
  createdAt: string;
}

export default function AdminGaleriPage() {
  const [galeriList, setGaleriList] = useState<Galeri[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    judul: '',
    deskripsi: '',
    imageUrl: '',
    kategori: '',
    featured: false,
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchGaleri();
  }, []);

  const fetchGaleri = async () => {
    try {
      const res = await fetch('/api/galeri');
      const data = await res.json();
      if (data.success) {
        setGaleriList(data.data);
      }
    } catch (error) {
      console.error('Error fetching galeri:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const url = editingId 
      ? `/api/galeri/${editingId}`
      : '/api/galeri';
    
    const method = editingId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert.success(editingId ? 'Galeri berhasil diupdate!' : 'Galeri berhasil ditambahkan!');
        setShowForm(false);
        setEditingId(null);
        setFormData({
          judul: '',
          deskripsi: '',
          imageUrl: '',
          kategori: '',
          featured: false,
        });
        fetchGaleri();
      } else {
        const error = await res.json();
        alert.error('Gagal menyimpan galeri', error.error);
      }
    } catch (error) {
      alert.error('Terjadi kesalahan', 'Gagal menyimpan galeri');
    }
  };

  const handleEdit = (item: Galeri) => {
    setEditingId(item.id);
    setFormData({
      judul: item.judul,
      deskripsi: item.deskripsi || '',
      imageUrl: item.imageUrl,
      kategori: item.kategori || '',
      featured: item.featured,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    const confirmed = await alert.confirm('Hapus Galeri', 'Yakin ingin menghapus galeri ini?');
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/galeri/${id}`, { method: 'DELETE' });
      if (res.ok) {
        alert.success('Galeri berhasil dihapus!');
        fetchGaleri();
      } else {
        alert.error('Gagal menghapus galeri');
      }
    } catch (error) {
      alert.error('Terjadi kesalahan', 'Gagal menghapus galeri');
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);
    formDataUpload.append('folder', 'galeri');

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      });

      const data = await res.json();
      if (data.success) {
        setFormData(prev => ({ ...prev, imageUrl: data.data.url }));
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
          <h1 className="text-2xl font-bold text-gray-900">Kelola Galeri</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola foto kegiatan pondok</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">Tambah Galeri</span>
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
              {editingId ? 'Edit Galeri' : 'Tambah Galeri Baru'}
            </h2>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setFormData({
                  judul: '',
                  deskripsi: '',
                  imageUrl: '',
                  kategori: '',
                  featured: false,
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
                Judul *
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
                  Kategori
                </label>
                <input
                  type="text"
                  value={formData.kategori}
                  onChange={(e) => setFormData(prev => ({ ...prev, kategori: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gambar *
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    className="hidden"
                    id="galeri-upload"
                  />
                  <label
                    htmlFor="galeri-upload"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer"
                  >
                    <Upload size={20} />
                    <span>{uploading ? 'Uploading...' : 'Upload Gambar'}</span>
                  </label>
                  {formData.imageUrl && (
                    <div className="relative">
                      <img
                        src={formData.imageUrl}
                        alt="Preview"
                        className="h-20 w-auto rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}
                        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
              />
              <label htmlFor="featured" className="text-sm text-gray-700">
                Jadikan galeri unggulan (featured)
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

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galeriList.map((galeri) => (
          <motion.div
            key={galeri.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden group"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={galeri.imageUrl}
                alt={galeri.judul}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              {galeri.featured && (
                <div className="absolute top-2 right-2 p-2 bg-yellow-500 text-white rounded-full">
                  <Star size={16} fill="currentColor" />
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="font-bold text-gray-900 mb-1">{galeri.judul}</h3>
              {galeri.deskripsi && (
                <p className="text-sm text-gray-500 mb-2 line-clamp-2">{galeri.deskripsi}</p>
              )}
              <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                <span>{galeri.kategori || 'Umum'}</span>
                <span>•</span>
                <span>{galeri.viewed} views</span>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(galeri)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm font-medium"
                >
                  <Edit size={14} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(galeri.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {galeriList.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-400">
            <Image size={48} className="mx-auto mb-4 opacity-50" />
            <p>Belum ada galeri</p>
          </div>
        )}
      </div>
    </div>
  );
}

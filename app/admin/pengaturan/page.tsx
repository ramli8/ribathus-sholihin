'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Eye, Instagram, Video, Facebook, Youtube, MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import alert from '@/lib/alert';
import {
  FormInput,
  FormTextarea,
  SectionTitle,
} from '@/components/common/FormComponents';
import ImageUploadPreview from '@/components/common/ImageUploadPreview';

interface PengaturanFormData {
  nama: string;
  alamat: string;
  deskripsi: string;
  telepon: string;
  email: string;
  logoUrl: string;
  instagramUrl: string;
  tiktokUrl: string;
  facebookUrl: string;
  youtubeChannelUrl: string;
  whatsappUrl: string;
  jamOperasional: string;
  gmapLocation: string;
}

export default function AdminPengaturanPage() {
  const [profilId, setProfilId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'social' | 'operational'>('general');

  const [formData, setFormData] = useState<PengaturanFormData>({
    nama: '',
    alamat: '',
    deskripsi: '',
    telepon: '',
    email: '',
    logoUrl: '',
    instagramUrl: '',
    tiktokUrl: '',
    facebookUrl: '',
    youtubeChannelUrl: '',
    whatsappUrl: '',
    jamOperasional: '',
    gmapLocation: '',
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
          telepon: data.data.telepon || '',
          email: data.data.email || '',
          logoUrl: data.data.logoUrl || '',
          instagramUrl: data.data.instagramUrl || '',
          tiktokUrl: data.data.tiktokUrl || '',
          facebookUrl: data.data.facebookUrl || '',
          youtubeChannelUrl: data.data.youtubeChannelUrl || '',
          whatsappUrl: data.data.whatsappUrl || '',
          jamOperasional: data.data.jamOperasional || '',
          gmapLocation: data.data.gmapLocation || '',
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
        alert.success('Pengaturan berhasil disimpan!');
        fetchProfil();
      } else {
        const error = await res.json();
        alert.error('Gagal menyimpan', error.error);
      }
    } catch {
      alert.error('Terjadi kesalahan', 'Gagal menyimpan pengaturan');
    } finally {
      setSaving(false);
    }
  };

  // Helper function to extract Google Maps URL from iframe HTML
  const extractGoogleMapsUrl = (html: string) => {
    const match = html.match(/src="([^"]+)"/);
    return match ? match[1] : html;
  };

  const handleGmapChange = (value: string) => {
    // If user pastes full iframe, extract just the src URL
    const cleanUrl = value.includes('<iframe') 
      ? extractGoogleMapsUrl(value) 
      : value;
    setFormData((prev) => ({ ...prev, gmapLocation: cleanUrl }));
  };

  if (loading) {
    return <div className="text-center py-12 text-gray-400">Memuat...</div>;
  }

  const tabs = [
    { id: 'general' as const, label: 'Informasi Umum', icon: MapPin },
    { id: 'social' as const, label: 'Media Sosial', icon: Instagram },
    { id: 'operational' as const, label: 'Operasional', icon: Clock },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Pengaturan Pondok Pesantren
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Kelola informasi pondok pesantren yang tampil di halaman utama
          </p>
        </div>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors"
        >
          <Eye size={16} />
          Lihat Website
        </a>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Form */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* General Information Tab */}
          {activeTab === 'general' && (
            <>
              <SectionTitle title="Informasi Dasar" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Nama Pondok Pesantren"
                  placeholder="Contoh: Pondok Pesantren Ribathus Sholihin"
                  required
                  value={formData.nama}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, nama: e.target.value }))
                  }
                />
                <FormInput
                  label="Deskripsi Singkat"
                  placeholder="Deskripsi singkat yang muncul di header"
                  value={formData.deskripsi}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, deskripsi: e.target.value }))
                  }
                />
              </div>
              <FormTextarea
                label="Alamat Lengkap"
                rows={3}
                placeholder="Jl. Contoh No. 123, Desa, Kecamatan, Kabupaten, Provinsi"
                required
                value={formData.alamat}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, alamat: e.target.value }))
                }
              />

              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <SectionTitle title="Logo Pesantren" />
                <ImageUploadPreview
                  label="Logo Pesantren"
                  value={formData.logoUrl}
                  onChange={(url) => setFormData((prev) => ({ ...prev, logoUrl: url }))}
                  folder="profil"
                  width="w-32"
                  height="h-32"
                  placeholder="Upload Logo"
                  description="Rekomendasi: 200 × 200 px (format PNG/SVG)"
                />
              </div>
            </>
          )}

          {/* Social Media Tab */}
          {activeTab === 'social' && (
            <>
              <SectionTitle title="Link Media Sosial" />
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Masukkan URL lengkap profil media sosial pesantren. Link ini akan ditampilkan di footer website.
              </p>
              
              <div className="space-y-4">
                {/* Instagram */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg text-white flex-shrink-0">
                    <Instagram size={20} />
                  </div>
                  <div className="flex-1">
                    <FormInput
                      label="Instagram"
                      placeholder="https://instagram.com/username"
                      value={formData.instagramUrl}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, instagramUrl: e.target.value }))
                      }
                    />
                  </div>
                </div>

                {/* TikTok */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-black rounded-lg text-white flex-shrink-0">
                    <Video size={20} />
                  </div>
                  <div className="flex-1">
                    <FormInput
                      label="TikTok"
                      placeholder="https://tiktok.com/@username"
                      value={formData.tiktokUrl}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, tiktokUrl: e.target.value }))
                      }
                    />
                  </div>
                </div>

                {/* Facebook */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-blue-600 rounded-lg text-white flex-shrink-0">
                    <Facebook size={20} />
                  </div>
                  <div className="flex-1">
                    <FormInput
                      label="Facebook"
                      placeholder="https://facebook.com/username"
                      value={formData.facebookUrl}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, facebookUrl: e.target.value }))
                      }
                    />
                  </div>
                </div>

                {/* YouTube */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-red-600 rounded-lg text-white flex-shrink-0">
                    <Youtube size={20} />
                  </div>
                  <div className="flex-1">
                    <FormInput
                      label="YouTube Channel"
                      placeholder="https://youtube.com/@channelname"
                      value={formData.youtubeChannelUrl}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, youtubeChannelUrl: e.target.value }))
                      }
                    />
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-green-500 rounded-lg text-white flex-shrink-0">
                    <MessageCircle size={20} />
                  </div>
                  <div className="flex-1">
                    <FormInput
                      label="WhatsApp"
                      placeholder="https://wa.me/6281234567890 atau https://api.whatsapp.com/send?phone=6281234567890"
                      value={formData.whatsappUrl}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, whatsappUrl: e.target.value }))
                      }
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Operational Tab */}
          {activeTab === 'operational' && (
            <>
              <SectionTitle title="Informasi Kontak & Operasional" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Nomor Telepon"
                  placeholder="+62 812 3456 7890"
                  type="tel"
                  value={formData.telepon}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, telepon: e.target.value }))
                  }
                />
                <FormInput
                  label="Email"
                  placeholder="info@pesantren.sch.id"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </div>

              <FormInput
                label="Jam Operasional"
                placeholder="Senin - Jumat: 07:00 - 16:00 WIB"
                value={formData.jamOperasional}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, jamOperasional: e.target.value }))
                }
              />

              <div className="pt-4">
                <SectionTitle title="Lokasi Google Maps" />
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Masukkan URL embed dari Google Maps untuk menampilkan peta lokasi pesantren.
                </p>
                <FormTextarea
                  label="Google Maps Embed URL"
                  rows={3}
                  placeholder="https://www.google.com/maps/embed?pb=... atau paste seluruh kode iframe"
                  value={formData.gmapLocation}
                  onChange={(e) => handleGmapChange(e.target.value)}
                />
                <p className="text-xs text-gray-400 mt-2">
                  Cara mendapatkan: Buka Google Maps → Cari lokasi → Klik &quot;Share&quot; → &quot;Embed a map&quot; → Copy hanya URL dari atribut src (bukan seluruh tag iframe)
                </p>
                {formData.gmapLocation && (
                  <div className="mt-4 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                    <iframe
                      src={formData.gmapLocation}
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full"
                    />
                  </div>
                )}
              </div>
            </>
          )}

          {/* Submit Button */}
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

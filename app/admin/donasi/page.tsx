'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, Trash2, Eye } from 'lucide-react';
import alert from '@/lib/alert';
import {
  FormInput,
  FormTextarea,
  SectionTitle,
} from '@/components/common/FormComponents';
import ImageUploadPreview from '@/components/common/ImageUploadPreview';

interface BankAccount {
  bank: string;
  number: string;
  name: string;
}

export default function AdminDonasiPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [donasiTitle, setDonasiTitle] = useState('Salurkan Infaq');
  const [donasiTitleHighlight, setDonasiTitleHighlight] =
    useState('Terbaik Anda');
  const [donasiQuote, setDonasiQuote] = useState(
    'Jika seseorang meninggal dunia, maka terputuslah amalannya kecuali tiga perkara: sedekah jariyah, ilmu yang dimanfaatkan, atau doa anak yang sholeh'
  );
  const [donasiQuoteSource, setDonasiQuoteSource] = useState('HR. Muslim');
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([
    {
      bank: 'Bank Syariah Indonesia (BSI)',
      number: '712 345 6789',
      name: 'a.n. Yayasan Ribathus Sholihin',
    },
    {
      bank: 'Bank Muamalat',
      number: '000 123 4567',
      name: 'a.n. PP. Ribathus Sholihin',
    },
  ]);
  const [donasiQrisImageUrl, setDonasiQrisImageUrl] = useState('');
  const [donasiWhatsappNumber, setDonasiWhatsappNumber] = useState('');
  const [donasiWallets, setDonasiWallets] = useState(
    'GoPay,OVO,DANA,ShopeePay,BCA,Mandiri'
  );

  useEffect(() => {
    fetch('/api/profil')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          const d = json.data;
          if (d.donasiTitle) setDonasiTitle(d.donasiTitle);
          if (d.donasiTitleHighlight)
            setDonasiTitleHighlight(d.donasiTitleHighlight);
          if (d.donasiQuote) setDonasiQuote(d.donasiQuote);
          if (d.donasiQuoteSource) setDonasiQuoteSource(d.donasiQuoteSource);
          if (d.donasiBankAccounts) {
            try {
              setBankAccounts(JSON.parse(d.donasiBankAccounts));
            } catch {}
          }
          if (d.donasiQrisImageUrl) setDonasiQrisImageUrl(d.donasiQrisImageUrl);
          if (d.donasiWhatsappNumber)
            setDonasiWhatsappNumber(d.donasiWhatsappNumber);
          if (d.donasiWallets) setDonasiWallets(d.donasiWallets);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/profil', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          donasiTitle,
          donasiTitleHighlight,
          donasiQuote,
          donasiQuoteSource,
          donasiBankAccounts: JSON.stringify(bankAccounts),
          donasiQrisImageUrl,
          donasiWhatsappNumber,
          donasiWallets,
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert.success('Pengaturan donasi berhasil disimpan!');
      } else {
        alert.error('Gagal menyimpan', data.error || 'Unknown error');
      }
    } catch {
      alert.error('Gagal menyimpan pengaturan donasi');
    }
    setSaving(false);
  };

  const addBankAccount = () => {
    setBankAccounts([...bankAccounts, { bank: '', number: '', name: '' }]);
  };

  const removeBankAccount = (index: number) => {
    setBankAccounts(bankAccounts.filter((_, i) => i !== index));
  };

  const updateBankAccount = (
    index: number,
    field: keyof BankAccount,
    value: string
  ) => {
    const updated = [...bankAccounts];
    updated[index][field] = value;
    setBankAccounts(updated);
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
            Kelola Donasi
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Atur informasi donasi, rekening bank, QRIS, dan link konfirmasi WhatsApp
          </p>
        </div>
      </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
      >
        <form onSubmit={handleSave} className="space-y-8">
          {/* Header Donasi */}
          <div>
            <SectionTitle title="Header Donasi" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <FormInput
                label="Judul"
                value={donasiTitle}
                onChange={(e) => setDonasiTitle(e.target.value)}
                placeholder="Salurkan Infaq"
              />
              <FormInput
                label="Judul Highlight"
                value={donasiTitleHighlight}
                onChange={(e) => setDonasiTitleHighlight(e.target.value)}
                placeholder="Terbaik Anda"
              />
            </div>
            <FormTextarea
              label="Kutipan / Quote"
              rows={3}
              value={donasiQuote}
              onChange={(e) => setDonasiQuote(e.target.value)}
              placeholder="Jika seseorang meninggal dunia..."
            />
            <FormInput
              label="Sumber Kutipan"
              value={donasiQuoteSource}
              onChange={(e) => setDonasiQuoteSource(e.target.value)}
              placeholder="Contoh: HR. Muslim"
            />
          </div>

          {/* Rekening Bank */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <SectionTitle title="Rekening Bank" />
            <div className="flex justify-end mb-4">
              <button
                type="button"
                onClick={addBankAccount}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 dark:hover:bg-emerald-900/50 transition-colors font-medium"
              >
                <Plus className="w-4 h-4" /> Tambah Rekening
              </button>
            </div>
            <div className="space-y-4">
              {bankAccounts.map((account, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Rekening #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeBankAccount(idx)}
                      className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <FormInput
                      label="Nama Bank"
                      value={account.bank}
                      onChange={(e) =>
                        updateBankAccount(idx, 'bank', e.target.value)
                      }
                      placeholder="Bank Syariah Indonesia"
                    />
                    <FormInput
                      label="Nomor Rekening"
                      value={account.number}
                      onChange={(e) =>
                        updateBankAccount(idx, 'number', e.target.value)
                      }
                      placeholder="712 345 6789"
                    />
                    <FormInput
                      label="Atas Nama"
                      value={account.name}
                      onChange={(e) =>
                        updateBankAccount(idx, 'name', e.target.value)
                      }
                      placeholder="a.n. Yayasan ..."
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* QRIS & E-Wallet */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <SectionTitle title="QRIS & E-Wallet" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Gambar QRIS
                </label>
                <ImageUploadPreview
                  label=""
                  value={donasiQrisImageUrl}
                  onChange={setDonasiQrisImageUrl}
                  folder="donasi"
                  width="w-32"
                  height="h-32"
                  placeholder="Upload QRIS"
                  showPreview={true}
                />
              </div>
              <div>
                <FormInput
                  label="Daftar E-Wallet (pisahkan koma)"
                  value={donasiWallets}
                  onChange={(e) => setDonasiWallets(e.target.value)}
                  placeholder="GoPay,OVO,DANA,ShopeePay,BCA,Mandiri"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Contoh: GoPay,OVO,DANA,ShopeePay
                </p>
              </div>
            </div>
          </div>

          {/* Konfirmasi Transfer */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <SectionTitle title="Konfirmasi Transfer (WhatsApp)" />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 mb-4">
              Tombol "Konfirmasi Transfer" di halaman utama akan membuka WhatsApp ke nomor ini.
            </p>
            <FormInput
              label="Nomor WhatsApp"
              value={donasiWhatsappNumber}
              onChange={(e) => setDonasiWhatsappNumber(e.target.value)}
              placeholder="6281234567890 (tanpa + atau spasi)"
            />
            <p className="text-xs text-gray-400 mt-1">
              Format internasional tanpa tanda + (contoh: 6281234567890)
            </p>
          </div>

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

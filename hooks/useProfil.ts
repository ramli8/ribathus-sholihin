'use client';

import { useState, useEffect } from 'react';

export interface ProfilData {
  id: number;
  nama: string;
  alamat: string;
  deskripsi: string;
  visi?: string;
  misi?: string;
  telepon?: string;
  email?: string;
  logoUrl?: string;
  profilHeaderTitle?: string;
  profilHeaderTitleHighlight?: string;
  pengasuh?: string;
  pengasuhFotoUrl?: string;
  pengasuhDeskripsi?: string;
  sejarahDeskripsi?: string;

  // Social Media
  instagramUrl?: string;
  tiktokUrl?: string;
  facebookUrl?: string;
  youtubeChannelUrl?: string;
  whatsappUrl?: string;

  // Operational Info
  jamOperasional?: string;
  gmapLocation?: string;

  // Pendidikan Section
  pendidikanTitle?: string;
  pendidikanTitleHighlight?: string;
  pendidikanDesc?: string;
  pendidikanFormalTitle?: string;
  pendidikanFormalDesc?: string;
  pendidikanFormalList?: string;
  pendidikanDiniyahTitle?: string;
  pendidikanDiniyahDesc?: string;
  pendidikanDiniyahList?: string;
  pendidikanDisiplinTitle?: string;
  pendidikanDisiplinDesc?: string;

  // PSB (Pendaftaran) Section
  psbTitle?: string;
  psbTitleHighlight?: string;
  psbDesc?: string;
  psbSyaratList?: string;
  psbAlurList?: string;
  psbBiayaList?: string;
  psbBrosurUrl?: string;

  // Fasilitas Section
  fasilitasTitle?: string;
  fasilitasTitleHighlight?: string;
  fasilitasDesc?: string;
  fasilitasList?: string;

  // Ekstrakurikuler Section
  ekstraTitle?: string;
  ekstraTitleHighlight?: string;
  ekstraDesc?: string;
  ekstraList?: string;

  // Berita Section
  beritaTitle?: string;
  beritaTitleHighlight?: string;
  beritaDesc?: string;

  // Donasi Section
  donasiTitle?: string;
  donasiTitleHighlight?: string;
  donasiQuote?: string;
  donasiQuoteSource?: string;
  donasiBankAccounts?: string;
  donasiQrisImageUrl?: string;
  donasiWhatsappNumber?: string;
  donasiWallets?: string;

  statsTahun?: number;
  statsSantri?: number;
  statsAsatidz?: number;
  heroTitle?: string;
  heroSubtitle?: string;
  youtubeUrl?: string;
  statsLulusan?: number;
}

export function useProfil() {
  const [data, setData] = useState<ProfilData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/profil')
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setData(json.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}

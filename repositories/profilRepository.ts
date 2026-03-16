import db from '@/lib/db';

export interface CreateProfilInput {
  nama: string;
  alamat: string;
  deskripsi: string;
  visi?: string;
  misi?: string;
  telepon?: string;
  email?: string;
  logoUrl?: string;
  coverUrl?: string;
  profilHeaderTitle?: string;
  pengasuhFotoUrl?: string;
  pengasuhDeskripsi?: string;
  sejarahDeskripsi?: string;

  // Pendidikan Section
  pendidikanTitle?: string;
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
  psbDesc?: string;
  psbSyaratList?: string;
  psbAlurList?: string;
  psbBiayaList?: string;
  psbBrosurUrl?: string;

  statsTahun?: number;
  statsSantri?: number;
  statsAsatidz?: number;
  heroTitle?: string;
  heroSubtitle?: string;
  youtubeUrl?: string;
  statsLulusan?: number;
}

export async function findProfil() {
  return db.profilPesantren.findFirst();
}

export async function createProfil(data: CreateProfilInput) {
  return db.profilPesantren.create({
    data,
  });
}

export async function updateProfil(id: number, data: CreateProfilInput) {
  // Filter out undefined values for SQLite compatibility
  const cleanData: Record<string, unknown> = {};
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined) {
      cleanData[key] = value;
    }
  });

  return db.profilPesantren.update({
    where: { id },
    data: cleanData,
  });
}

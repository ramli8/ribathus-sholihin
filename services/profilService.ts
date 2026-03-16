import * as repo from '@/repositories/profilRepository';

export async function getProfil() {
  return repo.findProfil();
}

export async function createProfilService(data: repo.CreateProfilInput) {
  if (!data.nama) throw new Error('Nama pesantren wajib diisi');
  if (!data.alamat) throw new Error('Alamat wajib diisi');
  return repo.createProfil(data);
}

export async function updateProfilService(
  id: number,
  data: Partial<repo.CreateProfilInput>
) {
  // Only validate if field is explicitly sent (allows partial updates)
  if ('nama' in data && !data.nama)
    throw new Error('Nama pesantren wajib diisi');
  if ('alamat' in data && !data.alamat) throw new Error('Alamat wajib diisi');
  return repo.updateProfil(id, data as repo.CreateProfilInput);
}

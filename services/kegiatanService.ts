import * as repo from '@/repositories/kegiatanRepository';

export async function getKegiatanPublished() {
  return repo.findManyKegiatan({ published: true });
}

export async function getKegiatanById(id: number) {
  return repo.findKegiatanById(id);
}

export async function getAllKegiatan() {
  return repo.findManyKegiatan();
}

export async function createKegiatanService(data: repo.CreateKegiatanInput) {
  if (!data.judul) throw new Error('Judul wajib diisi');
  if (!data.tanggal) throw new Error('Tanggal wajib diisi');
  return repo.createKegiatan(data);
}

export async function updateKegiatanService(id: number, data: Partial<repo.CreateKegiatanInput>) {
  const existing = await repo.findKegiatanById(id);
  if (!existing) throw new Error('Kegiatan tidak ditemukan');
  return repo.updateKegiatan(id, data);
}

export async function deleteKegiatanService(id: number) {
  const existing = await repo.findKegiatanById(id);
  if (!existing) throw new Error('Kegiatan tidak ditemukan');
  return repo.deleteKegiatan(id);
}

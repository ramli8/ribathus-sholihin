import * as repo from '@/repositories/pengaturanRepository';

export async function getAllPengaturan() {
  return repo.findManyPengaturan();
}

export async function getPengaturanValue(key: string, defaultValue?: string) {
  return repo.getPengaturanValue(key, defaultValue);
}

export async function updatePengaturanService(id: number, data: Partial<repo.CreatePengaturanInput>) {
  return repo.updatePengaturan(id, data);
}

export async function createPengaturanService(data: repo.CreatePengaturanInput) {
  if (!data.key) throw new Error('Key wajib diisi');
  return repo.createPengaturan(data);
}

export async function deletePengaturanService(id: number) {
  return repo.deletePengaturan(id);
}

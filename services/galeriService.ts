import * as repo from '@/repositories/galeriRepository';

export async function getGaleriPublished() {
  return repo.findManyGaleri();
}

export async function getGaleriFeatured() {
  return repo.findManyGaleri({ featured: true });
}

export async function getGaleriById(id: number) {
  const galeri = await repo.findGaleriById(id);
  if (galeri) {
    await repo.incrementGaleriView(galeri.id);
  }
  return galeri;
}

export async function getAllGaleri() {
  return repo.findManyGaleri();
}

export async function createGaleriService(data: repo.CreateGaleriInput) {
  if (!data.judul) throw new Error('Judul wajib diisi');
  if (!data.imageUrl) throw new Error('Gambar wajib diisi');
  return repo.createGaleri(data);
}

export async function updateGaleriService(id: number, data: Partial<repo.CreateGaleriInput>) {
  const existing = await repo.findGaleriById(id);
  if (!existing) throw new Error('Galeri tidak ditemukan');
  return repo.updateGaleri(id, data);
}

export async function deleteGaleriService(id: number) {
  const existing = await repo.findGaleriById(id);
  if (!existing) throw new Error('Galeri tidak ditemukan');
  return repo.deleteGaleri(id);
}

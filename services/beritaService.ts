import * as repo from '@/repositories/beritaRepository';

export async function getBeritaPublished() {
  return repo.findManyBerita({ published: true });
}

export async function getBeritaBySlug(slug: string) {
  const berita = await repo.findBeritaBySlug(slug);
  if (berita && berita.published) {
    await repo.incrementBeritaView(berita.id);
  }
  return berita;
}

export async function getAllBerita() {
  return repo.findManyBerita();
}

export async function createBeritaService(data: repo.CreateBeritaInput) {
  if (!data.judul) throw new Error('Judul wajib diisi');
  if (!data.slug) throw new Error('Slug wajib diisi');
  if (!data.isi) throw new Error('Isi berita wajib diisi');
  return repo.createBerita(data);
}

export async function updateBeritaService(id: number, data: Partial<repo.CreateBeritaInput>) {
  const existing = await repo.findBeritaById(id);
  if (!existing) throw new Error('Berita tidak ditemukan');
  return repo.updateBerita(id, data);
}

export async function deleteBeritaService(id: number) {
  const existing = await repo.findBeritaById(id);
  if (!existing) throw new Error('Berita tidak ditemukan');
  return repo.deleteBerita(id);
}

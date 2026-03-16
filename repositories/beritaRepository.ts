import db from '@/lib/db';

export interface CreateBeritaInput {
  judul: string;
  slug: string;
  isi: string;
  coverUrl?: string;
  kategori?: string;
  penulis?: string;
  published?: boolean;
}

export async function findManyBerita(where?: { published?: boolean; kategori?: string }) {
  return db.berita.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });
}

export async function findBeritaBySlug(slug: string) {
  return db.berita.findUnique({
    where: { slug },
  });
}

export async function findBeritaById(id: number) {
  return db.berita.findUnique({
    where: { id },
  });
}

export async function createBerita(data: CreateBeritaInput) {
  return db.berita.create({ data });
}

export async function updateBerita(id: number, data: Partial<CreateBeritaInput>) {
  return db.berita.update({
    where: { id },
    data,
  });
}

export async function deleteBerita(id: number) {
  return db.berita.delete({
    where: { id },
  });
}

export async function incrementBeritaView(id: number) {
  return db.berita.update({
    where: { id },
    data: { viewed: { increment: 1 } },
  });
}

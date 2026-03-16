import db from '@/lib/db';

export interface CreateGaleriInput {
  judul: string;
  deskripsi?: string;
  imageUrl: string;
  kategori?: string;
  featured?: boolean;
}

export async function findManyGaleri(where?: { featured?: boolean; kategori?: string }) {
  return db.galeri.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });
}

export async function findGaleriById(id: number) {
  return db.galeri.findUnique({
    where: { id },
  });
}

export async function createGaleri(data: CreateGaleriInput) {
  return db.galeri.create({ data });
}

export async function updateGaleri(id: number, data: Partial<CreateGaleriInput>) {
  return db.galeri.update({
    where: { id },
    data,
  });
}

export async function deleteGaleri(id: number) {
  return db.galeri.delete({
    where: { id },
  });
}

export async function incrementGaleriView(id: number) {
  return db.galeri.update({
    where: { id },
    data: { viewed: { increment: 1 } },
  });
}

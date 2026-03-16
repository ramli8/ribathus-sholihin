import db from '@/lib/db';

export interface CreateKegiatanInput {
  judul: string;
  deskripsi?: string;
  tanggal: Date;
  lokasi?: string;
  coverUrl?: string;
  published?: boolean;
}

export async function findManyKegiatan(where?: { published?: boolean }) {
  return db.kegiatan.findMany({
    where,
    orderBy: { tanggal: 'asc' },
  });
}

export async function findKegiatanById(id: number) {
  return db.kegiatan.findUnique({
    where: { id },
  });
}

export async function createKegiatan(data: CreateKegiatanInput) {
  return db.kegiatan.create({ data });
}

export async function updateKegiatan(id: number, data: Partial<CreateKegiatanInput>) {
  return db.kegiatan.update({
    where: { id },
    data,
  });
}

export async function deleteKegiatan(id: number) {
  return db.kegiatan.delete({
    where: { id },
  });
}

import db from '@/lib/db';

export interface CreatePengaturanInput {
  key: string;
  value?: string;
  label?: string;
  type?: string;
}

export async function findManyPengaturan() {
  return db.pengaturan.findMany({
    orderBy: { label: 'asc' },
  });
}

export async function findPengaturanByKey(key: string) {
  return db.pengaturan.findUnique({
    where: { key },
  });
}

export async function getPengaturanValue(key: string, defaultValue?: string) {
  const pengaturan = await findPengaturanByKey(key);
  return pengaturan?.value ?? defaultValue ?? null;
}

export async function updatePengaturan(id: number, data: Partial<CreatePengaturanInput>) {
  return db.pengaturan.update({
    where: { id },
    data,
  });
}

export async function createPengaturan(data: CreatePengaturanInput) {
  return db.pengaturan.create({ data });
}

export async function deletePengaturan(id: number) {
  return db.pengaturan.delete({
    where: { id },
  });
}

import db from '@/lib/db';

export interface CreateUserInput {
  username: string;
  password: string;
  role?: string;
}

export interface User {
  id: number;
  username: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function findUserByUsername(username: string): Promise<User | null> {
  return db.user.findUnique({
    where: { username },
  });
}

export async function findUserById(id: number): Promise<User | null> {
  return db.user.findUnique({
    where: { id },
  });
}

export async function createUser(data: CreateUserInput): Promise<User> {
  return db.user.create({
    data,
  });
}

export async function updateUser(id: number, data: Partial<CreateUserInput>): Promise<User> {
  return db.user.update({
    where: { id },
    data,
  });
}

export async function deleteUser(id: number): Promise<User> {
  return db.user.delete({
    where: { id },
  });
}

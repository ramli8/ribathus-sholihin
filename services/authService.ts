import * as repo from '@/repositories/userRepository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = '24h';

export interface LoginInput {
  username: string;
  password: string;
}

export interface AuthUser {
  id: number;
  username: string;
  role: string;
}

export interface TokenPayload {
  id: number;
  username: string;
  role: string;
}

export async function login(username: string, password: string): Promise<{ user: AuthUser; token: string }> {
  const user = await repo.findUserByUsername(username);
  
  if (!user) {
    throw new Error('User tidak ditemukan');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  
  if (!isValidPassword) {
    throw new Error('Password salah');
  }

  const authUser: AuthUser = {
    id: user.id,
    username: user.username,
    role: user.role,
  };

  const tokenPayload: TokenPayload = {
    id: user.id,
    username: user.username,
    role: user.role,
  };

  const token = jwt.sign(tokenPayload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return { user: authUser, token };
}

export function verifyToken(token: string): TokenPayload {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    throw new Error('Token tidak valid atau sudah kadaluarsa');
  }
}

export function hasRole(user: AuthUser, requiredRole: string): boolean {
  return user.role === requiredRole;
}

export function isAdmin(user: AuthUser): boolean {
  return user.role === 'admin' || user.role === 'superadmin';
}

export function isSuperAdmin(user: AuthUser): boolean {
  return user.role === 'superadmin';
}

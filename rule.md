# 📐 PROJECT ARCHITECTURE RULE

## Next.js App Router + Service Layer + Admin Dashboard Pattern

---

# 🎯 TUJUAN

- Memisahkan:
  - UI (presentation)
  - Logic bisnis
  - Akses database
- Digunakan untuk:
  - Website profil pesantren
  - Admin dashboard (CRUD konten)

---

# 🧱 STRUKTUR FOLDER

src/
├─ app/
│ ├─ (public)/ # halaman publik
│ ├─ admin/ # dashboard admin
│ └─ api/ # API route handler
│
├─ services/ # business logic
├─ repositories/ # database layer
├─ lib/ # db, auth, config

---

# 📂 TANGGUNG JAWAB TIAP LAYER

## 1. app/ (UI Layer)

Boleh:

- Render UI
- Call API / service

Tidak boleh:
❌ Query database  
❌ Logic bisnis kompleks

---

## 2. services/ (Business Layer)

Boleh:

- Validasi data
- Aturan bisnis

Tidak boleh:
❌ Query database  
❌ Akses HTTP (req/res)

---

## 3. repositories/ (Data Layer)

Boleh:

- Query database

Tidak boleh:
❌ Logic bisnis  
❌ Validasi UI

---

## 4. app/api/ (Controller Layer)

Boleh:

- Terima request HTTP
- Call service

Tidak boleh:
❌ Query database

---

# 🔁 DATA FLOW (WAJIB)

UI  
→ Service  
→ Repository  
→ Database

API  
→ Service  
→ Repository  
→ Database

TIDAK BOLEH shortcut.

---

# 🅰️ CONTOH CRUD "BERITA"

## Repository

```ts
// repositories/beritaRepository.ts
import db from "@/lib/db";

export function findAllBerita() {
  return db.berita.findMany({ orderBy: { createdAt: "desc" } });
}

export function findBeritaBySlug(slug: string) {
  return db.berita.findUnique({ where: { slug } });
}

export function createBerita(data) {
  return db.berita.create({ data });
}

export function updateBerita(id: number, data) {
  return db.berita.update({ where: { id }, data });
}

export function deleteBerita(id: number) {
  return db.berita.delete({ where: { id } });
}
Service
// services/beritaService.ts
import * as repo from "@/repositories/beritaRepository";

export async function getBerita() {
  return repo.findAllBerita();
}

export async function addBerita(payload) {
  if (!payload.judul) throw new Error("Judul wajib diisi");
  return repo.createBerita(payload);
}
API
// app/api/berita/route.ts
import { NextResponse } from "next/server";
import { getBerita, addBerita } from "@/services/beritaService";

export async function GET() {
  return NextResponse.json(await getBerita());
}

export async function POST(req) {
  const body = await req.json();
  return NextResponse.json(await addBerita(body));
}
🅱️ AUTH & ROLE RULE
Role:

admin

Semua route:

/admin/*

WAJIB:

Login

Role = admin

Service Authorization
export function deleteBerita(user, id) {
  if (user.role !== "admin") throw new Error("Forbidden");
  return repo.deleteBerita(id);
}
Middleware
// middleware.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    jwt.verify(token, process.env.JWT_SECRET);
  }
}
🅲 DATABASE SCHEMA (SQLite + Prisma)
datasource db {
  provider = "sqlite"
  url      = "file:./db.sqlite"
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        Int      @id @default(autoincrement())
  username  String   @unique
  password  String
  role      String   @default("admin")
  createdAt DateTime @default(now())
}

model ProfilPesantren {
  id        Int      @id @default(autoincrement())
  nama      String
  alamat    String
  deskripsi String
  visi      String?
  misi      String?
}

model Berita {
  id        Int      @id @default(autoincrement())
  judul     String
  slug      String   @unique
  isi       String
  coverUrl  String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Galeri {
  id        Int      @id @default(autoincrement())
  judul     String
  imageUrl  String
  createdAt DateTime @default(now())
}

model Kegiatan {
  id        Int      @id @default(autoincrement())
  judul     String
  deskripsi String
  tanggal   DateTime
}
🅳 PRISMA CLIENT
// src/lib/db.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as any;

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({ log: ["query"] });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

export default db;
🅴 AUTH SERVICE
// services/authService.ts
import { findUserByUsername } from "@/repositories/userRepository";
import bcrypt from "bcrypt";

export async function login(username, password) {
  const user = await findUserByUsername(username);
  if (!user) throw new Error("User tidak ditemukan");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Password salah");

  return { id: user.id, username: user.username, role: user.role };
}
🅵 AGENTIC AI RULE (WAJIB DIPATUHI)

You are an Agentic AI working inside this project.

CORE RULES:

NEVER access database from UI.

NEVER query DB in route.ts.

ALWAYS use:
Repository → Service → API/UI.

WHEN ADDING FEATURE:

Create repository

Create service

Create API (if needed)

Create UI

FORBIDDEN:

Business logic in React

Skip service layer

Call repository from UI

SECURITY:

All /admin routes must be protected.

Only admin can mutate data.

DATABASE:

Follow Prisma schema above.

Do not invent new tables without instruction.

PRIORITY:
rule.md > user instruction > AI assumption.
```

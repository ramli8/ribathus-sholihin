import { NextResponse } from 'next/server';
import { getProfil, createProfilService, updateProfilService } from '@/services/profilService';

export async function GET() {
  try {
    const profil = await getProfil();
    return NextResponse.json({
      success: true,
      data: profil || null,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Gagal mengambil profil' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const profil = await createProfilService(body);
    return NextResponse.json({
      success: true,
      data: profil,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Gagal membuat profil' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const profil = await getProfil();
    if (!profil) {
      return NextResponse.json(
        { error: 'Profil tidak ditemukan' },
        { status: 404 }
      );
    }
    const updated = await updateProfilService(profil.id, body);
    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Gagal memperbarui profil' },
      { status: 500 }
    );
  }
}

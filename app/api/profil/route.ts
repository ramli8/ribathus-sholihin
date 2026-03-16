import { NextResponse } from 'next/server';
import { getProfil, createProfilService } from '@/services/profilService';

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

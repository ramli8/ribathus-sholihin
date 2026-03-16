import { NextResponse } from 'next/server';
import { updateProfilService } from '@/services/profilService';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 });
    }
    const body = await request.json();
    const profil = await updateProfilService(id, body);
    return NextResponse.json({
      success: true,
      data: profil,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Gagal memperbarui profil' },
      { status: 500 }
    );
  }
}

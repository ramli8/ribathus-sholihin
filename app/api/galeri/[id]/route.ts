import { NextRequest, NextResponse } from 'next/server';
import {
  updateGaleriService,
  deleteGaleriService,
} from '@/services/galeriService';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    const body = await request.json();
    const galeri = await updateGaleriService(id, body);
    return NextResponse.json({
      success: true,
      data: galeri,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Gagal update galeri' },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    await deleteGaleriService(id);
    return NextResponse.json({
      success: true,
      message: 'Galeri berhasil dihapus',
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Gagal menghapus galeri' },
      { status: 400 }
    );
  }
}

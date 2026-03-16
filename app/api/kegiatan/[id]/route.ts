import { NextRequest, NextResponse } from 'next/server';
import {
  updateKegiatanService,
  deleteKegiatanService,
} from '@/services/kegiatanService';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    const body = await request.json();
    const kegiatan = await updateKegiatanService(id, body);
    return NextResponse.json({
      success: true,
      data: kegiatan,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Gagal update kegiatan' },
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
    await deleteKegiatanService(id);
    return NextResponse.json({
      success: true,
      message: 'Kegiatan berhasil dihapus',
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Gagal menghapus kegiatan' },
      { status: 400 }
    );
  }
}

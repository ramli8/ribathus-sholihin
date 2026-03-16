import { NextRequest, NextResponse } from 'next/server';
import {
  getBeritaBySlug,
  updateBeritaService,
  deleteBeritaService,
} from '@/services/beritaService';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const berita = await getBeritaBySlug(slug);
    if (!berita) {
      return NextResponse.json(
        { error: 'Berita tidak ditemukan' },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      data: berita,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Gagal mengambil berita' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const id = parseInt(slug);
    const body = await request.json();
    const berita = await updateBeritaService(id, body);
    return NextResponse.json({
      success: true,
      data: berita,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Gagal update berita' },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const id = parseInt(slug);
    await deleteBeritaService(id);
    return NextResponse.json({
      success: true,
      message: 'Berita berhasil dihapus',
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Gagal menghapus berita' },
      { status: 400 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { getAllBerita, getBeritaPublished, createBeritaService } from '@/services/beritaService';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const published = searchParams.get('published') === 'true';
    
    const berita = published ? await getBeritaPublished() : await getAllBerita();
    return NextResponse.json(
      { success: true, data: berita },
      {
        headers: published
          ? { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' }
          : {},
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Gagal mengambil berita' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const berita = await createBeritaService(body);
    revalidateTag('berita', { expire: 0 });
    return NextResponse.json({
      success: true,
      data: berita,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Gagal membuat berita' },
      { status: 400 }
    );
  }
}

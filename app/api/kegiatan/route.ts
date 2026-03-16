import { NextRequest, NextResponse } from 'next/server';
import { getAllKegiatan, getKegiatanPublished, createKegiatanService } from '@/services/kegiatanService';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const published = searchParams.get('published') === 'true';
    
    const kegiatan = published ? await getKegiatanPublished() : await getAllKegiatan();
    return NextResponse.json({
      success: true,
      data: kegiatan,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Gagal mengambil kegiatan' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const kegiatan = await createKegiatanService(body);
    return NextResponse.json({
      success: true,
      data: kegiatan,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Gagal membuat kegiatan' },
      { status: 400 }
    );
  }
}

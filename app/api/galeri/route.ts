import { NextRequest, NextResponse } from 'next/server';
import { getAllGaleri, getGaleriPublished, createGaleriService } from '@/services/galeriService';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const published = searchParams.get('published') === 'true';
    const featured = searchParams.get('featured') === 'true';
    
    let galeri;
    if (featured) {
      galeri = await getGaleriFeatured();
    } else if (published) {
      galeri = await getGaleriPublished();
    } else {
      galeri = await getAllGaleri();
    }
    
    return NextResponse.json({
      success: true,
      data: galeri,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Gagal mengambil galeri' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const galeri = await createGaleriService(body);
    return NextResponse.json({
      success: true,
      data: galeri,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Gagal membuat galeri' },
      { status: 400 }
    );
  }
}

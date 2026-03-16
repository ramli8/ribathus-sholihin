import { NextResponse } from 'next/server';
import { getAllPengaturan } from '@/services/pengaturanService';

export async function GET() {
  try {
    const pengaturan = await getAllPengaturan();
    // Convert array to object for easier access
    const data = pengaturan.reduce((acc, item) => {
      acc[item.key] = item.type === 'boolean' ? item.value === 'true' : 
                      item.type === 'number' ? parseFloat(item.value || '0') : 
                      item.value;
      return acc;
    }, {} as Record<string, any>);
    
    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Gagal mengambil pengaturan' },
      { status: 500 }
    );
  }
}

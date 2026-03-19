import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const [
      totalBerita,
      totalDonasi,
      totalPendaftaran,
      totalPendaftaranPending,
      totalUser,
      latestDonasi,
      latestPendaftaran,
    ] = await Promise.all([
      prisma.berita.count(),
      prisma.donasi.count(),
      prisma.pendaftaran.count(),
      prisma.pendaftaran.count({ where: { status: 'pending' } }),
      prisma.user.count(),
      prisma.donasi.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.pendaftaran.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    // Aggregate true total collected funds
    const totalDonasiAmountAggregation = await prisma.donasi.aggregate({
      where: { status: 'paid' },
      _sum: {
        jumlah: true,
      },
    });

    const totalDonasiAmount = totalDonasiAmountAggregation._sum.jumlah || 0;

    return NextResponse.json({
      success: true,
      data: {
        totalBerita,
        totalDonasi,
        totalDonasiAmount,
        totalPendaftaran,
        totalPendaftaranPending,
        totalUser,
        latestDonasi,
        latestPendaftaran,
      },
    });
  } catch (error) {
    console.error('API Dashboard Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard summary' },
      { status: 500 }
    );
  }
}

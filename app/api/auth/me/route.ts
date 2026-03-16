import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/services/authService';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Token tidak ditemukan' },
        { status: 401 }
      );
    }

    const user = verifyToken(token);

    return NextResponse.json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Token tidak valid' },
      { status: 401 }
    );
  }
}

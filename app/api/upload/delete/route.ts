import { NextRequest, NextResponse } from 'next/server';
import { unlink } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { filename, folder = 'uploads' } = body;

    if (!filename) {
      return NextResponse.json(
        { error: 'Filename tidak ditemukan' },
        { status: 400 }
      );
    }

    // Security: Prevent directory traversal attacks
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9._-]/g, '');
    const sanitizedFolder = folder.replace(/[^a-zA-Z0-9._-]/g, '');

    // Build file path
    const filepath = join(process.cwd(), 'public', 'images', sanitizedFolder, sanitizedFilename);

    // Check if file exists
    if (!existsSync(filepath)) {
      return NextResponse.json(
        { error: 'File tidak ditemukan', success: false },
        { status: 404 }
      );
    }

    // Delete file
    await unlink(filepath);

    return NextResponse.json({
      success: true,
      message: 'File berhasil dihapus',
    });
  } catch (error) {
    console.error('Delete file error:', error);
    return NextResponse.json(
      { error: 'Gagal menghapus file', success: false },
      { status: 500 }
    );
  }
}

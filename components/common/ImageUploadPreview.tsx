'use client';

import { useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import alert from '@/lib/alert';

interface ImageUploadPreviewProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  width?: string;
  height?: string;
  placeholder?: string;
  description?: string;
  showPreview?: boolean;
}

// Helper to extract filename from URL
const extractFilename = (url: string): string | null => {
  if (!url) return null;
  const parts = url.split('/');
  return parts[parts.length - 1] || null;
};

export default function ImageUploadPreview({
  label,
  value,
  onChange,
  folder = 'uploads',
  width = 'w-full',
  height = 'h-48',
  placeholder = 'Upload gambar',
  description,
  showPreview = true,
}: ImageUploadPreviewProps) {
  const [uploading, setUploading] = useState(false);

  // Use value directly from props, no need for useEffect tracking
  const localValue = value || '';

  const handleUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert.error('File harus berupa gambar (JPG, PNG, WebP, GIF)');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert.error('Ukuran file maksimal 5MB');
        return;
      }

      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();

        if (data.success && data.data?.url) {
          // Delete old file if exists (use localValue instead of stale previousValue)
          if (localValue) {
            const oldFilename = extractFilename(localValue);
            if (oldFilename) {
              try {
                await fetch('/api/upload/delete', {
                  method: 'DELETE',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    filename: oldFilename,
                    folder,
                  }),
                });
              } catch (error) {
                console.error('Failed to delete old file:', error);
              }
            }
          }

          onChange(data.data.url);
          alert.success('Gambar berhasil diupload!');
        } else {
          alert.error('Gagal upload', data.error || 'Silakan coba lagi');
        }
      } catch (error) {
        console.error('Upload error:', error);
        alert.error('Gagal upload gambar');
      } finally {
        setUploading(false);
        // Reset input
        e.target.value = '';
      }
    },
    [folder, onChange, localValue]
  );

  const handleRemove = useCallback(async () => {
    // Delete file from server
    if (localValue) {
      const filename = extractFilename(localValue);
      if (filename) {
        try {
          await fetch('/api/upload/delete', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              filename,
              folder,
            }),
          });
          alert.success('Gambar dihapus dari server');
        } catch (error) {
          console.error('Failed to delete file:', error);
          alert.error('Gagal menghapus file dari server');
        }
      }
    }
    onChange('');
  }, [localValue, folder, onChange]);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      {description && (
        <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
      )}

      <div className="flex items-start gap-4">
        {/* Upload Button */}
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={uploading}
          className="hidden"
          id={`upload-${label.replace(/\s+/g, '-').toLowerCase()}`}
        />
        <label
          htmlFor={`upload-${label.replace(/\s+/g, '-').toLowerCase()}`}
          className={`flex items-center gap-2 px-4 py-2.5 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors cursor-pointer font-medium text-sm ${
            uploading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <Upload size={18} />
          <span>{uploading ? 'Mengupload...' : placeholder}</span>
        </label>

        {/* Preview */}
        {showPreview && value && (
          <div className="relative group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Preview"
              className={`${width} ${height} object-cover rounded-lg border border-gray-200 dark:border-gray-700`}
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              title="Hapus gambar"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>

      {/* No Image Placeholder */}
      {showPreview && !value && (
        <div
          className={`${width} ${height} bg-gray-100 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center`}
        >
          <div className="text-center">
            <ImageIcon
              size={40}
              className="mx-auto text-gray-400 mb-2"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Belum ada gambar
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
  description?: string;
}

export default function ImageModal({
  isOpen,
  onClose,
  imageUrl,
  title,
  description,
}: ImageModalProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[9999]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
          >
            <div className="relative max-w-6xl w-full max-h-[90vh] overflow-hidden rounded-2xl bg-slate-900 shadow-2xl">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>

              {/* Image Container */}
              <div className="relative w-full h-full max-h-[85vh]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Caption */}
              {(title || description) && (
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {title}
                  </h3>
                  {description && (
                    <p className="text-slate-300 text-sm md:text-base">
                      {description}
                    </p>
                  )}
                </div>
              )}

              {/* Zoom Hint */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md text-white text-sm">
                <ZoomIn size={16} />
                <span>Scroll untuk zoom</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

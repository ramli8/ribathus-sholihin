'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex flex-col items-center justify-center">
      {/* Decorative top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-stone-200 dark:bg-stone-800 overflow-hidden">
        <motion.div
          className="h-full bg-stone-900 dark:bg-stone-100"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: 'easeInOut',
          }}
          style={{ width: '40%' }}
        />
      </div>

      <div className="flex flex-col items-center gap-8">
        {/* Pulse dots */}
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-stone-900 dark:bg-stone-100"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                repeat: Infinity,
                duration: 1,
                delay: i * 0.2,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        <div className="text-center space-y-3">
          <motion.p
            className="text-[11px] font-bold uppercase tracking-[0.3em] text-stone-400 dark:text-stone-500"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: 'easeInOut',
            }}
          >
            Memuat Konten
          </motion.p>
          <p className="text-[10px] tracking-widest text-stone-300 dark:text-stone-600 font-medium">
            PONDOK PESANTREN RIBATHUS SHOLIHIN
          </p>
        </div>
      </div>
    </div>
  );
}

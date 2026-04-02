'use client';

function SkeletonPulse({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-xl bg-stone-200 dark:bg-stone-800 ${className || ''}`} />
  );
}

export default function Loading() {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 overflow-hidden">
      {/* Skeleton Navbar */}
      <div className="flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <SkeletonPulse className="w-9 h-9 rounded-lg" />
          <SkeletonPulse className="w-32 h-4" />
        </div>
        <div className="hidden lg:flex items-center gap-6">
          {[...Array(7)].map((_, i) => (
            <SkeletonPulse key={i} className="w-16 h-3" />
          ))}
        </div>
        <div className="hidden lg:flex items-center gap-3">
          <SkeletonPulse className="w-9 h-9 rounded-lg" />
          <SkeletonPulse className="w-28 h-10 rounded-full" />
        </div>
      </div>

      {/* Skeleton Hero Section */}
      <div className="max-w-4xl mx-auto px-6 text-center mt-20 lg:mt-28">
        <div className="flex flex-col items-center gap-3 mb-8">
          <SkeletonPulse className="w-[80%] h-10 md:h-14 rounded-2xl" />
          <SkeletonPulse className="w-[60%] h-10 md:h-14 rounded-2xl" />
          <SkeletonPulse className="w-[50%] h-10 md:h-14 rounded-2xl" />
        </div>

        <div className="flex flex-col items-center gap-2 mb-10">
          <SkeletonPulse className="w-[75%] h-4 md:h-5" />
          <SkeletonPulse className="w-[55%] h-4 md:h-5" />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <SkeletonPulse className="w-48 h-14 rounded-xl" />
          <SkeletonPulse className="w-40 h-14 rounded-xl" />
        </div>
      </div>

      {/* Skeleton Stats Cards */}
      <div className="max-w-6xl mx-auto px-6 mt-16 lg:mt-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-stone-900 rounded-[1.25rem] md:rounded-4xl p-6 lg:p-8 min-h-[140px] md:min-h-[160px] ring-1 ring-stone-200/50 dark:ring-stone-800 flex flex-col justify-end gap-3"
            >
              <SkeletonPulse className="w-24 h-10" />
              <SkeletonPulse className="w-20 h-3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AppHeader from '@/layout/AppHeader';
import AppSidebar from '@/layout/AppSidebar';
import { useSidebar } from '@/context/SidebarContext';

interface AuthUser {
  id: number;
  username: string;
  role: string;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { isExpanded, isHovered } = useSidebar();
  
  // Memoize isLogin check
  const isLogin = useMemo(() => pathname === '/admin/login', [pathname]);

  // Initialize state - loading is true for auth check, false for login
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    // Skip auth check for login page
    if (isLogin) {
      return;
    }

    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(data.data.user);
        } else {
          router.push('/admin/login');
        }
      })
      .catch(() => {
        router.push('/admin/login');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [router, isLogin]);

  // Render login page without layout (skip loading check)
  if (isLogin) {
    return <>{children}</>;
  }

  // Show loading for admin pages during auth check
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-950">
        <div className="flex items-center gap-3 text-stone-600 dark:text-stone-400">
          <div className="w-8 h-8 border-4 border-stone-900 dark:border-stone-100 border-t-transparent dark:border-t-transparent rounded-full animate-spin" />
          <span className="font-bold uppercase tracking-widest text-xs">Otentikasi...</span>
        </div>
      </div>
    );
  }

  // Render admin pages with layout
  return (
    <div className="flex h-screen overflow-hidden bg-stone-50 dark:bg-stone-950 font-sans">
      <AppSidebar user={user} />
      <div
        className={`relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? 'lg:ml-[290px]' : 'lg:ml-[90px]'
        }`}
      >
        <AppHeader user={user} />
        <main>
          <div className="p-4 md:p-8 lg:p-10 w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

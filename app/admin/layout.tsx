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
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex items-center gap-3 text-gray-600">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  // Render admin pages with layout
  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-gray-dark">
      <AppSidebar user={user} />
      <div
        className={`relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? 'lg:ml-[290px]' : 'lg:ml-[90px]'
        }`}
      >
        <AppHeader user={user} />
        <main>
          <div className="p-4 mx-auto max-w-screen-2xl md:p-6 2xl:p-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

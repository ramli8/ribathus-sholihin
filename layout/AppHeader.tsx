'use client';
import { ThemeToggleButton } from '@/components/common/ThemeToggleButton';
import NotificationDropdown from '@/components/header/NotificationDropdown';
import UserDropdown from '@/components/header/UserDropdown';
import { useSidebar } from '@/context/SidebarContext';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';

interface AppHeaderProps {
  user?: {
    username: string;
    role: string;
  } | null;
}

interface ProfilData {
  nama: string;
  logoUrl?: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({ user }) => {
  const [profil, setProfil] = useState<ProfilData | null>(null);

  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();

  useEffect(() => {
    fetch('/api/profil')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setProfil({
            nama: data.data.nama || '',
            logoUrl: data.data.logoUrl,
          });
        }
      })
      .catch(console.error);
  }, []);

  const brandingName = profil?.nama || '';
  const initials = brandingName.substring(0, 2).toUpperCase();

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <header className="sticky top-0 flex w-full bg-stone-50 border-b border-stone-200 z-40 dark:border-stone-800 dark:bg-stone-950">
      <div className="flex items-center justify-between grow px-4 py-3 lg:px-8 xl:px-10 lg:py-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            className="items-center justify-center w-11 h-11 text-stone-500 border-stone-200 dark:bg-stone-900 rounded-xl z-40 dark:border-stone-800 hidden lg:flex dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 border transition-colors"
            onClick={handleToggle}
            aria-label="Toggle Sidebar"
          >
            {isMobileOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z" fill="currentColor"/>
              </svg>
            ) : (
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.583252 1C0.583252 0.585788 0.919038 0.25 1.33325 0.25H14.6666C15.0808 0.25 15.4166 0.585786 15.4166 1C15.4166 1.41421 15.0808 1.75 14.6666 1.75L1.33325 1.75C0.919038 1.75 0.583252 1.41422 0.583252 1ZM0.583252 11C0.583252 10.5858 0.919038 10.25 1.33325 10.25L14.6666 10.25C15.0808 10.25 15.4166 10.5858 15.4166 11C15.4166 11.4142 15.0808 11.75 14.6666 11.75L1.33325 11.75C0.919038 11.75 0.583252 11.4142 0.583252 11ZM1.33325 5.25C0.919038 5.25 0.583252 5.58579 0.583252 6C0.583252 6.41421 0.919038 6.75 1.33325 6.75L7.99992 6.75C8.41413 6.75 8.74992 6.41421 8.74992 6C8.74992 5.58579 8.41413 5.25 7.99992 5.25L1.33325 5.25Z" fill="currentColor"/>
              </svg>
            )}
          </button>
          
          <button
            className="items-center justify-center w-10 h-10 sm:w-11 sm:h-11 text-stone-500 border-stone-200 dark:bg-stone-900 rounded-xl z-40 dark:border-stone-800 flex lg:hidden dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 border transition-colors"
            onClick={handleToggle}
            aria-label="Toggle Sidebar"
          >
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M0.583252 1C0.583252 0.585788 0.919038 0.25 1.33325 0.25H14.6666C15.0808 0.25 15.4166 0.585786 15.4166 1C15.4166 1.41421 15.0808 1.75 14.6666 1.75L1.33325 1.75C0.919038 1.75 0.583252 1.41422 0.583252 1ZM0.583252 11C0.583252 10.5858 0.919038 10.25 1.33325 10.25L14.6666 10.25C15.0808 10.25 15.4166 10.5858 15.4166 11C15.4166 11.4142 15.0808 11.75 14.6666 11.75L1.33325 11.75C0.919038 11.75 0.583252 11.4142 0.583252 11ZM1.33325 5.25C0.919038 5.25 0.583252 5.58579 0.583252 6C0.583252 6.41421 0.919038 6.75 1.33325 6.75L7.99992 6.75C8.41413 6.75 8.74992 6.41421 8.74992 6C8.74992 5.58579 8.41413 5.25 7.99992 5.25L1.33325 5.25Z" fill="currentColor"/>
            </svg>
          </button>

          <Link href="/" className="flex lg:hidden items-center">
            {profil?.logoUrl ? (
              <img
                src={profil.logoUrl}
                alt={brandingName}
                className="w-9 h-9 object-contain rounded"
              />
            ) : (
              <div className="w-9 h-9 border border-stone-800 bg-stone-900 rounded flex items-center justify-center text-white font-bold text-lg">
                {initials}
              </div>
            )}
          </Link>

          <div className="hidden lg:flex items-center gap-2">
            <div className="text-[11px] uppercase tracking-widest font-bold text-stone-400 dark:text-stone-500 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 px-3 py-1.5 rounded-full">
              Pusat Kontrol Akses
            </div>
            <span className="text-[11px] uppercase tracking-widest font-bold text-stone-900 dark:text-white px-3 py-1.5">
              {brandingName}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <ThemeToggleButton />
          <UserDropdown user={user} />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;

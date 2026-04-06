import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dropdown } from '../ui/dropdown/Dropdown';
import { DropdownItem } from '../ui/dropdown/DropdownItem';

interface UserDropdownProps {
  user?: {
    username: string;
    role: string;
  } | null;
}

export default function UserDropdown({ user }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  function toggleDropdown(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-700 dark:text-gray-400 dropdown-toggle"
      >
        <div className="mr-3 overflow-hidden rounded-full h-11 w-11 border-2 border-emerald-800 dark:border-emerald-500 p-0.5 transition-colors">
          <div className="w-full h-full rounded-full bg-emerald-800 dark:bg-emerald-600 flex items-center justify-center text-white font-bold transition-colors">
            {user?.username?.charAt(0).toUpperCase() || 'A'}
          </div>
        </div>

        <div className="hidden text-left lg:block mr-3">
          <span className="block font-bold text-stone-900 dark:text-white leading-tight">
            {user?.username || 'Admin'}
          </span>
          <span className="block text-[9px] font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400 mt-1">
            {user?.role === 'superadmin' ? 'Super Admin' : 'Administrator'}
          </span>
        </div>

        <svg
          className={`stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-4 flex w-[260px] flex-col rounded-3xl border border-stone-200/60 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900"
      >
        <div className="pb-4 border-b border-stone-100 dark:border-stone-800">
          <span className="block font-bold text-stone-900 dark:text-stone-100 tracking-tight text-lg">
            {user?.username || 'Admin'}
          </span>
          <span className="mt-2 block uppercase tracking-widest text-[10px] font-bold text-stone-400 dark:text-stone-500">
            {user?.role === 'superadmin' ? 'Super Admin' : 'Administrator'}
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 mt-4 text-[11px] font-bold uppercase tracking-widest text-stone-600 rounded-xl group hover:bg-red-50 hover:text-red-600 dark:text-stone-400 dark:hover:bg-red-950 dark:hover:text-red-400 px-4 py-3 transition-colors"
        >
          Sign out
        </button>
      </Dropdown>
    </div>
  );
}

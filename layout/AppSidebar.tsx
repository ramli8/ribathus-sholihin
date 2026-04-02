'use client';
import {
  BookOpen,
  Building2,
  CreditCard,
  Home,
  Settings,
  Trophy,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSidebar } from '../context/SidebarContext';
import { ChevronDownIcon, ListIcon, PlugInIcon } from '../icons/index';

interface ProfilData {
  nama: string;
  logoUrl?: string;
}

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  roleRequired?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

interface AppSidebarProps {
  user?: {
    username: string;
    role: string;
  } | null;
}

const navItems: NavItem[] = [
  {
    icon: <Home size={22} />,
    name: 'Kelola Beranda',
    path: '/admin/beranda',
  },
  {
    icon: <PlugInIcon />,
    name: 'Profil Pesantren',
    path: '/admin/profil',
  },
  {
    icon: <BookOpen size={22} />,
    name: 'Kelola Pendidikan & PSB',
    path: '/admin/pendidikan',
  },
  {
    icon: <Building2 size={22} />,
    name: 'Kelola Fasilitas',
    path: '/admin/fasilitas',
  },
  {
    icon: <Trophy size={22} />,
    name: 'Kelola Ekstrakurikuler',
    path: '/admin/ekstrakurikuler',
  },
  {
    icon: <ListIcon />,
    name: 'Kelola Berita',
    path: '/admin/berita',
  },
  {
    icon: <CreditCard size={22} />,
    name: 'Kelola Donasi',
    path: '/admin/donasi',
  },
  {
    icon: <Settings size={22} />,
    name: 'Pengaturan',
    path: '/admin/pengaturan',
  },
];

const AppSidebar: React.FC<AppSidebarProps> = ({ user }) => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();
  const [profil, setProfil] = useState<ProfilData | null>(null);

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

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: 'main' | 'others';
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
    let submenuMatched = false;
    navItems.forEach((nav, index) => {
      if (nav.subItems) {
        nav.subItems.forEach((subItem) => {
          if (isActive(subItem.path)) {
            setOpenSubmenu({
              type: 'main',
              index,
            });
            submenuMatched = true;
          }
        });
      }
    });

    if (!submenuMatched) {
      setTimeout(() => setOpenSubmenu(null), 0);
    }
  }, [pathname, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === 'main' &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: 'main' as const, index };
    });
  };

  const filteredNavItems = navItems.filter(
    (item) => !item.roleRequired || user?.role === item.roleRequired
  );

  const renderMenuItems = (navItems: NavItem[]) => (
    <ul className="flex flex-col gap-4">
      {navItems.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index)}
              className={`menu-item group ${
                openSubmenu?.type === 'main' && openSubmenu?.index === index
                  ? 'bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100'
                  : 'text-stone-600 hover:bg-stone-50 dark:text-stone-400 dark:hover:bg-stone-800'
              } cursor-pointer rounded-xl transition-colors font-medium flex items-center px-4 py-3 w-full ${
                !isExpanded && !isHovered
                  ? 'lg:justify-center'
                  : 'lg:justify-start'
              }`}
            >
              <span className="shrink-0">{nav.icon}</span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="ml-3 text-[13px] font-bold uppercase tracking-widest leading-none mt-0.5">{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                    openSubmenu?.type === 'main' && openSubmenu?.index === index
                      ? 'rotate-180 text-emerald-800 dark:text-emerald-500'
                      : ''
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`menu-item group flex items-center px-4 py-3 rounded-xl transition-colors font-medium ${
                  isActive(nav.path) 
                  ? 'bg-stone-100 dark:bg-stone-800 text-emerald-900 border border-stone-200 dark:border-stone-700 dark:text-emerald-400 shadow-sm' 
                  : 'text-stone-600 hover:bg-stone-50 border border-transparent dark:text-stone-400 dark:hover:bg-stone-800'
                } ${
                  !isExpanded && !isHovered
                    ? 'lg:justify-center'
                    : 'lg:justify-start'
                }`}
              >
                <span className="shrink-0">{nav.icon}</span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="ml-4 text-[11px] font-bold uppercase tracking-[0.15em] leading-none mt-[1px]">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`main-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === 'main' && openSubmenu?.index === index
                    ? `${subMenuHeight[`main-${index}`]}px`
                    : '0px',
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.path}
                      className={`block py-2 px-4 rounded-lg text-xs font-bold uppercase tracking-widest ${
                        isActive(subItem.path)
                          ? 'text-emerald-800 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-900/30'
                          : 'text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200'
                      }`}
                    >
                      {subItem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-[72px] flex flex-col lg:mt-0 top-0 px-4 left-0 bg-stone-50 dark:bg-stone-950 dark:border-stone-800 text-stone-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-stone-200 
        ${
          isExpanded || isMobileOpen
            ? 'w-[290px]'
            : isHovered
              ? 'w-[290px]'
              : 'w-[90px]'
        }
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start ml-2'
        }`}
      >
        <Link href="/admin/beranda">
          {isExpanded || isHovered || isMobileOpen ? (
            <div className="flex items-center gap-4">
              {profil?.logoUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={profil.logoUrl}
                  alt={brandingName}
                  className="w-10 h-10 object-contain rounded-md"
                />
              ) : (
                <div className="w-10 h-10 bg-stone-900 dark:bg-stone-800 border border-stone-800 rounded-md flex items-center justify-center text-stone-100 font-bold text-lg">
                  {initials}
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-stone-900 dark:text-white text-base font-bold font-heading tracking-tight leading-tight">
                  Beranda Admin
                </span>
                <span className="text-stone-500 dark:text-stone-400 text-[9px] font-bold uppercase tracking-widest mt-0.5">
                  {brandingName}
                </span>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 bg-stone-900 dark:bg-stone-800 border border-stone-800 rounded-md flex items-center justify-center text-stone-100 font-bold text-lg">
              {initials.substring(0, 1)}
            </div>
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar mt-4">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>{renderMenuItems(filteredNavItems)}</div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;

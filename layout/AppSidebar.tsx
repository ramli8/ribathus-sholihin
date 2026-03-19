'use client';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  BookOpen,
  Building2,
  Trophy,
  CreditCard,
  Settings,
} from 'lucide-react';
import { useSidebar } from '../context/SidebarContext';
import {
  GridIcon,
  ListIcon,
  PlugInIcon,
  ChevronDownIcon,
} from '../icons/index';

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
    icon: <GridIcon />,
    name: 'Dashboard',
    path: '/admin',
  },
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
            nama: data.data.nama || 'Ribathus Sholihin',
            logoUrl: data.data.logoUrl,
          });
        }
      })
      .catch(console.error);
  }, []);

  const brandingName = profil?.nama || 'Ribathus Sholihin';
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
                  ? 'menu-item-active'
                  : 'menu-item-inactive'
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? 'lg:justify-center'
                  : 'lg:justify-start'
              }`}
            >
              <span
                className={`${
                  openSubmenu?.type === 'main' && openSubmenu?.index === index
                    ? 'menu-item-icon-active'
                    : 'menu-item-icon-inactive'
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className={`menu-item-text`}>{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                    openSubmenu?.type === 'main' && openSubmenu?.index === index
                      ? 'rotate-180 text-brand-500'
                      : ''
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? 'menu-item-active' : 'menu-item-inactive'
                }`}
              >
                <span
                  className={`${
                    isActive(nav.path)
                      ? 'menu-item-icon-active'
                      : 'menu-item-icon-inactive'
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className={`menu-item-text`}>{nav.name}</span>
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
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? 'menu-dropdown-item-active'
                          : 'menu-dropdown-item-inactive'
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
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
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
          !isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'
        }`}
      >
        <Link href="/admin">
          {isExpanded || isHovered || isMobileOpen ? (
            <div className="flex items-center gap-3">
              {profil?.logoUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={profil.logoUrl}
                  alt={brandingName}
                  className="w-9 h-9 object-contain rounded"
                />
              ) : (
                <div className="w-9 h-9 bg-linear-to-br from-emerald-500 to-teal-600 rounded flex items-center justify-center text-white font-bold text-lg">
                  {initials}
                </div>
              )}
              <span className="text-gray-900 dark:text-white text-xl font-bold tracking-tight">
                {brandingName}
              </span>
            </div>
          ) : (
            <div className="w-8 h-8 bg-linear-to-br from-emerald-500 to-teal-600 rounded flex items-center justify-center text-white font-bold text-sm">
              {initials.substring(0, 1)}
            </div>
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
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

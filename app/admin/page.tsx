'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  GridIcon,
  CalenderIcon,
  ListIcon,
  VideoIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  PlugInIcon,
} from '@/icons';
import Badge from '@/components/ui/badge/Badge';

const StatisticsChart = dynamic(
  () => import('@/components/ecommerce/StatisticsChart'),
  { ssr: false }
);

interface Stats {
  berita: number;
  pengunjung: number;
}

interface ProfilData {
  nama: string;
  logoUrl?: string;
}

export default function AdminDashboardPage() {
  const [statsData, setStatsData] = useState<Stats>({
    berita: 0,
    pengunjung: 0,
  });
  const [loading, setLoading] = useState(true);
  const [profil, setProfil] = useState<ProfilData | null>(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/berita').then((r) => r.json()),
      fetch('/api/profil').then((r) => r.json()),
    ])
      .then(([beritaRes, profilRes]) => {
        setStatsData({
          berita: beritaRes.success ? beritaRes.data.length : 0,
          pengunjung: Math.floor(Math.random() * 1000) + 500,
        });
        if (profilRes.success && profilRes.data) {
          setProfil({
            nama: profilRes.data.nama || 'Ribathus Sholihin',
            logoUrl: profilRes.data.logoUrl,
          });
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const statCards = [
    {
      label: 'Total Berita',
      value: statsData.berita,
      icon: <ListIcon className="text-gray-800 size-6 dark:text-white/90" />,
      change: '+12.5%',
      isPositive: true,
    },
    {
      label: 'Pengunjung',
      value: statsData.pengunjung.toLocaleString(),
      icon: <GridIcon className="text-gray-800 size-6 dark:text-white/90" />,
      change: '-1.2%',
      isPositive: false,
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 font-medium">Memuat Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
        {statCards.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3 md:p-6"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
              {stat.icon}
            </div>

            <div className="flex items-end justify-between mt-5">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {stat.label}
                </span>
                <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                  {stat.value}
                </h4>
              </div>
              <Badge color={stat.isPositive ? 'success' : 'error'}>
                {stat.isPositive ? (
                  <ArrowUpIcon className="size-3" />
                ) : (
                  <ArrowDownIcon className="size-3" />
                )}
                {stat.change}
              </Badge>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <StatisticsChart />
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
            Aksi Cepat
          </h3>
          <div className="space-y-4">
            {[
              {
                name: 'Tambah Berita',
                href: '/admin/berita?action=create',
                icon: <ListIcon />,
                color: 'text-brand-500 bg-brand-50',
              },
              {
                name: 'Tambah Kegiatan',
                href: '/admin/kegiatan?action=create',
                icon: <CalenderIcon />,
                color: 'text-orange-500 bg-orange-50',
              },
              {
                name: 'Update Profil',
                href: '/admin/profil',
                icon: <PlugInIcon />,
                color: 'text-success-500 bg-success-50',
              },
            ].map((action) => (
              <Link
                key={action.name}
                href={action.href}
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-brand-500 hover:bg-brand-50/20 transition-all group dark:border-gray-800"
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${action.color} dark:bg-gray-800`}
                >
                  {action.icon}
                </div>
                <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-brand-600">
                  {action.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

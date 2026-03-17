import Navigasi from '@/components/Navigasi';
import Kontak from '@/components/Kontak';

export default function BeritaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigasi />
      <main className="flex-1">{children}</main>
      <Kontak />
    </div>
  );
}

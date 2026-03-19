import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Start seeding...');

  // 1. Super Admin
  const superAdminUsername = 'superadmin';
  const superAdminPassword = 'SuperAdmin123';

  const existingUser = await prisma.user.findUnique({
    where: { username: superAdminUsername },
  });

  if (!existingUser) {
    const hashedPassword = await bcrypt.hash(superAdminPassword, 10);
    await prisma.user.create({
      data: {
        username: superAdminUsername,
        password: hashedPassword,
        role: 'superadmin',
      },
    });
    console.log('✅ Super admin created');
  }

  // 2. Profil Pesantren
  const profilExists = await prisma.profilPesantren.findFirst();
  if (!profilExists) {
    await prisma.profilPesantren.create({
      data: {
        nama: 'Pondok Pesantren Ribathus Sholihin',
        alamat:
          'Jl. Pesantren No. 99, Desa Sidomulyo, Kec. Jombang, Kab. Jombang, Jawa Timur 61413',
        deskripsi:
          "Mencetak generasi Qur'ani dan berakhlakul karimah melalui pendidikan berkualitas dengan harmoni ilmu dunia dan akhirat.",
        visi: 'Menjadi lembaga rujukan yang mencetak kader ulama dan umara berwawasan global serta berpijak teguh pada tradisi.',
        misi: 'Menyelenggarakan pendidikan Islam terpadu yang responsif terhadap dinamika zaman dan senantiasa hadir untuk umat.',
        telepon: '+62 812-3456-7890',
        email: 'info@ribathussholihin.sch.id',
      },
    });
    console.log('✅ Profil pesantren created');
  }

  // 3. Sample Berita
  const beritaExists = await prisma.berita.findFirst();
  if (!beritaExists) {
    await prisma.berita.createMany({
      data: [
        {
          judul:
            'Kunjungan Silaturahim Ulama Timur Tengah ke Ribathus Sholihin',
          slug: 'kunjungan-ulama-timur-tengah',
          isi: 'Alhamdulillah, hari ini pesantren kedatangan tamu mulia dari hadramaut untuk memberikan ijazah kubro dan pengarahan kurikulum kepada segenap jajaran asatidz dan santri senior...',
          kategori: 'Berita Utama',
          penulis: 'Admin',
          published: true,
        },
        {
          judul: 'Juara 1 Lomba Baca Kitab Kuning (MQK) Tingkat Provinsi',
          slug: 'juara-1-mqk-provinsi',
          isi: "Selamat kepada Ananda M. Hafidzulkur'an yang berhasil meraih juara pertama pada perlombaan bergengsi tahunan Kemenag. Semoga ilmu yang didapat barokah...",
          kategori: 'Prestasi',
          penulis: 'Humas',
          published: true,
        },
        {
          judul: 'Adab Sebelum Ilmu: Pesan Kiai untuk Santri Baru',
          slug: 'adab-sebelum-ilmu',
          isi: 'Dalam tradisi salaf, mempelajari adab memakan waktu lebih lama daripada mempelajari ilmu itu sendiri. Hal ini mengajarkan kita pentingnya membersihkan wadah...',
          kategori: 'Kolom Opini',
          penulis: 'Ust. Fahrur Rozi',
          published: true,
        },
      ],
    });
    console.log('✅ Sample berita created');
  }

  // 6. Pengaturan Website
  const pengaturanExists = await prisma.pengaturan.findFirst();
  if (!pengaturanExists) {
    await prisma.pengaturan.createMany({
      data: [
        {
          key: 'website_title',
          value: 'Pondok Pesantren Ribathus Sholihin',
          label: 'Judul Website',
          type: 'text',
        },
        {
          key: 'website_description',
          value: 'Website Profil Pondok Pesantren Ribathus Sholihin',
          label: 'Deskripsi Website',
          type: 'text',
        },
        {
          key: 'pendaftaran_dibuka',
          value: 'true',
          label: 'Pendaftaran Dibuka',
          type: 'boolean',
        },
        {
          key: 'biaya_pendaftaran',
          value: '200000',
          label: 'Biaya Pendaftaran',
          type: 'number',
        },
        {
          key: 'biaya_pangkal',
          value: '2500000',
          label: 'Biaya Pangkal',
          type: 'number',
        },
        {
          key: 'spp_bulanan',
          value: '650000',
          label: 'SPP Bulanan',
          type: 'number',
        },
      ],
    });
    console.log('✅ Pengaturan created');
  }

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

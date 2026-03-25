import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Start seeding (migrated from SQLite data)...');

  // 1. User (superadmin)
  const existingUser = await prisma.user.findUnique({
    where: { username: 'superadmin' },
  });

  if (!existingUser) {
    await prisma.user.create({
      data: {
        username: 'superadmin',
        // bcrypt hash dari 'SuperAdmin123'
        password: '$2b$10$7HUodoU6RuukofG0JtWH.eNvRFOUOBM7pvCS6ihyyUNECm0TOx1E2',
        role: 'superadmin',
        createdAt: new Date(1773625977897),
        updatedAt: new Date(1773625977897),
      },
    });
    console.log('✅ User superadmin created');
  } else {
    console.log('⏭️  User superadmin already exists, skipped');
  }

  // 2. Profil Pesantren
  const profilExists = await prisma.profilPesantren.findFirst();
  if (!profilExists) {
    await prisma.profilPesantren.create({
      data: {
        nama: 'Pondok Pesantren Ribathus Sholihin',
        alamat: 'Area Sawah/Kebun, Denok, Kec. Lumajang, Kabupaten Lumajang, Jawa Timur 67316',
        deskripsi: 'Berdiri sejak tahun 1990, kami berkomitmen mencetak generasi santri yang mandiri, berprestasi, dan berakhlakul karimah melalui kurikulum yang adaptif.',
        visi: 'Menjadi lembaga rujukan yang mencetak kader ulama dan umara berwawasan global serta berpijak teguh pada tradisi.',
        misi: 'Menyelenggarakan pendidikan Islam terpadu yang responsif terhadap dinamika zaman dan senantiasa hadir untuk umat.',
        telepon: '+62 812-3456-999',
        email: 'info@ribathussholihin.sch.id',
        logoUrl: '/images/profil/1773718961230-zvj0d6.png',
        profilHeaderTitle: 'Membangun Karakter dari ',
        profilHeaderTitleHighlight: 'Tradisi & Inovasi',
        pengasuh: 'K.H. Ahmad Sholihin',
        pengasuhFotoUrl: '/images/profil/1773643765917-s77cfg.jpg',
        pengasuhDeskripsi: 'Alumni universitas ternama di Timur Tengah, meneruskan tongkat estafet perjuangan muassis dengan metode pendidikan modern yang berbasis teguh pada tradisi salafus shalih.',
        sejarahDeskripsi: 'Didirikan oleh K.H. Abdul Wahid dengan niat tulus menyebarkan agama Islam. Berawal dari langgar kecil yang sederhana, berbekal keikhlasan dan istiqomah, pesantren kami kini bertransformasi menjadi pusat pendidikan yang komprehensif tanpa meninggalkan nilai-nilai salaf.',
        statsTahun: 50,
        statsSantri: 560,
        statsAsatidz: 15,
        heroTitle: "Mencetak Generasi Qur'ani & Berakhlakul Karimah",
        heroSubtitle: "Membangun peradaban Islam yang rahmatan lil 'alamin melalui pendidikan berkualitas dengan harmoni ilmu dunia dan akhirat.",
        youtubeUrl: 'https://www.youtube.com/watch?v=inxAsh4Gaa8',
        statsLulusan: 90,
        instagramUrl: 'https://www.instagram.com/ponpesribathussholihin/',
        tiktokUrl: '',
        facebookUrl: 'https://www.facebook.com/ponpesribathussholihin/',
        youtubeChannelUrl: '',
        whatsappUrl: 'https://wa.me/6282234641698',
        jamOperasional: 'Senin - Sabtu, 08:00 - 16:00 WIB',
        gmapLocation: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.5421151818846!2d113.27357359999999!3d-8.1480064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd667026ea9ece3%3A0xcb55e972b7ff700f!2sPondok%20Pesantren%20Al%20Islamiyah%20As%20Salafiyah%20Ribathus%20Sholohin!5e0!3m2!1sen!2sid!4v1773718645943!5m2!1sen!2sid',
        pendidikanTitle: 'Pendidikan ',
        pendidikanTitleHighlight: 'Komprehensif',
        pendidikanDesc: 'Perpaduan harmonis antara kedalaman ilmu-ilmu keislaman salaf dan kecakapan sains teknologi kontemporer untuk mencetak generasi unggul.',
        pendidikanFormalTitle: 'Pendidikan Formal',
        pendidikanFormalDesc: 'Integrasi sains dan agama',
        pendidikanFormalList: JSON.stringify([
          { id: '0.15635386405064566', name: 'MI / SD-IT Inklusif Berkarakter', icon: 'GraduationCap' },
          { id: '0.8282002231057564', name: 'MTs / SMP Integrasi Kurikulum', icon: 'BookOpen' },
          { id: '0.8540733539549881', name: 'MA / SMA Unggulan Sains & Agama', icon: 'Microscope' },
        ]),
        pendidikanDiniyahTitle: 'Pendidikan Diniyah',
        pendidikanDiniyahDesc: 'Mengkaji warisan keilmuan Islam',
        pendidikanDiniyahList: JSON.stringify([
          { id: '0.6009582746061571', name: 'Madrasah Diniyah (Kitab Salafi)', icon: 'BookText' },
          { id: '0.8602784033540286', name: "Tahfidz Al-Qur'an 30 Juz Bersanad", icon: 'Clock' },
          { id: '0.8948685806407533', name: 'Kajian Bahasa (Arab & Inggris)', icon: 'Globe' },
        ]),
        pendidikanDisiplinTitle: 'Sistem Disiplin 24 Jam',
        pendidikanDisiplinDesc: 'Jadwal santri dikelola secara proporsional namun disiplin, dimulai dari qiyamullail sebelum subuh hingga mudzakarah di malam hari, membentuk rutinitas produktif dan ibadah yang istiqamah.',
        psbTitle: 'Langkah Awal Menuju ',
        psbTitleHighlight: 'Masa Depan Gemilang',
        psbDesc: 'Kami membuka kesempatan bagi calon santri untuk bergabung dengan kuota terbatas guna menjamin efektivitas pembelajaran.',
        psbSyaratList: JSON.stringify([
          'Mengisi formulir online',
          'Fotokopi KK & Akte Kelahiran',
          'Fotokopi Ijazah / SKHU',
          'Pas foto 3x4 (4 lembar)',
        ]),
        psbAlurList: JSON.stringify([
          'Pendaftaran form online',
          'Transfer biaya format',
          'Verifikasi berkas admin',
          'Tes wawancara santri',
        ]),
        psbBiayaList: JSON.stringify([
          { id: '0.8623744070078985', label: 'Formulir', value: 'Rp 50.000' },
          { id: '0.001696342255017469', label: 'Uang Pangkal', value: 'Rp 500.000' },
          { id: '0.5046253617263977', label: 'Seragam', value: 'Rp. 1.000.000' },
          { id: '0.6224401024104728', label: 'SPP Bulanan', value: 'Rp 200.000' },
        ]),
        psbBrosurUrl: '/images/brosur/1773884949436-0vp765.pdf',
        fasilitasTitle: 'Fasilitas Berstandar',
        fasilitasTitleHighlight: 'Kenyamanan Menuntut Ilmu',
        fasilitasDesc: 'Kami merancang lingkungan pesantren yang asri, bersih, dan modern agar santri dapat fokus menuntut ilmu dengan nyaman.',
        fasilitasList: JSON.stringify([
          { id: '0.8791215966684826', title: 'Gedung Asrama ', desc: 'Asrama putra & putri terpisah dengan fasilitas memadai. Diawasi musyrif 24 jam.', image: '/images/fasilitas/1773709958649-hpf6e1.jpg', icon: 'Building2', colSpan: 'md:col-span-2 lg:col-span-2' },
          { id: '0.8889138274004393', title: "Masjid Jami'", desc: 'Pusat ibadah berkapasitas 2000 jamaah untuk salat dan pengajian.', image: '/images/fasilitas/1773709962468-x6pwv3.png', icon: 'Hospital', colSpan: 'col-span-1' },
          { id: '0.3659015611599661', title: 'Ruang Kelas & Lab', desc: 'Ruang representatif ber-AC dengan lab komputer dan lab bahasa terpadu.', image: '/images/fasilitas/1773710228895-3rqs4p.jpeg', icon: 'GraduationCap', colSpan: 'col-span-1' },
          { id: '0.33297481702463916', title: 'Perpustakaan Kitab', desc: 'Koleksi ribuan kitab salaf hingga literatur modern untuk memfasilitasi riset.', image: '/images/fasilitas/1773710307251-hmk5nw.jpg', icon: 'BookOpen', colSpan: 'md:col-span-2 lg:col-span-2' },
          { id: '0.10937088891512481', title: 'Pos Kesehatan', desc: 'Klinik tingkat pertama dijaga perawat berpengalaman & dokter kunjungan.', image: '/images/fasilitas/1773710504753-031qqi.jpg', icon: 'Heart', colSpan: 'md:col-span-2 lg:col-span-1 lg:row-span-2' },
          { id: '0.4590463016595794', title: 'Kantin ', desc: 'Kantin sehat dengan menu higienis bernutrisi dan koperasi pelajaran.', image: '/images/fasilitas/1773710577135-8ctvsc.jpeg', icon: 'Utensils', colSpan: 'md:col-span-2 lg:col-span-2' },
          { id: '0.13329467604889966', title: 'Lapangan Olahraga', desc: 'Lapangn serba guna untuk melakukan olahraga.', image: '/images/fasilitas/1773710666010-xeauel.jpeg', icon: 'Dumbbell', colSpan: 'md:col-span-2 lg:col-span-2' },
        ]),
        ekstraTitle: 'Kembangkan Minat &',
        ekstraTitleHighlight: 'Bakat ',
        ekstraDesc: 'Kami meyakini setiap santri adalah bintang. Beragam program hadir untuk memastikan mereka siap menyongsong masa depan dengan skill terapan.',
        ekstraList: JSON.stringify([
          { id: 'icefdxv2ha', name: 'Pramuka Santri', desc: 'Kemandirian dan kepimpipinan', image: '/images/ekstrakurikuler/1773729578656-2daqti.jpg', colSpan: 'lg:col-span-2 lg:row-span-2' },
          { id: 'ct5zj5hn59n', name: 'Pencak Silat', desc: 'Seni Bela Diri', image: '/images/ekstrakurikuler/1773729561732-5vm1mt.jpg', colSpan: '' },
          { id: 'wzdwp3no7w', name: 'Kaligrafi', desc: "Seni khath Al-Qur'an", image: '/images/ekstrakurikuler/1773729642515-8pxwac.jpg', colSpan: '' },
          { id: 'zjbtm035pub', name: 'Jurnalistik', desc: 'Pelatihan mading & essay', image: '/images/ekstrakurikuler/1773729675152-4q7km2.jpg', colSpan: '' },
          { id: 'vgqlg9rl58', name: 'Multimedia ', desc: 'Fotografi dan desain', image: '/images/ekstrakurikuler/1773729726585-bik9n1.jpg', colSpan: '' },
          { id: 'udvcabkc8yk', name: 'Seni Hadrah', desc: 'Sholawat Al-Banjari', image: '/images/ekstrakurikuler/1773729771787-ua87jq.jpeg', colSpan: '' },
          { id: 'sg30z3od9p', name: 'Public Speaking', desc: 'Pidato 3 bahasa', image: '/images/ekstrakurikuler/1773729815913-pf2xu9.jpg', colSpan: '' },
          { id: 'fkgt9x3cpfh', name: 'Robotics', desc: 'Inovasi Teknologi', image: '/images/ekstrakurikuler/1773729841489-z7yyqz.jpeg', colSpan: 'lg:col-span-2' },
        ]),
        beritaTitle: 'Warta',
        beritaTitleHighlight: 'Terkini',
        beritaDesc: 'Ikuti perkembangan pondok, warta kegiatan santri, hingga goresan pena inspiratif dari jajaran asatidz.',
        donasiTitle: 'Salurkan Infaq',
        donasiTitleHighlight: 'Terbaik Anda',
        donasiQuote: 'Jika seseorang meninggal dunia, maka terputuslah amalannya kecuali tiga perkara: sedekah jariyah, ilmu yang dimanfaatkan, atau doa anak yang sholeh',
        donasiQuoteSource: 'HR. Muslim',
        donasiBankAccounts: JSON.stringify([
          { bank: 'Bank Syariah Indonesia (BSI)', number: '712 345 6789', name: 'a.n. Yayasan Ribathus Sholihin' },
          { bank: 'Bank Muamalat', number: '000 123 4567', name: 'a.n. PP. Ribathus Sholihin' },
        ]),
        donasiQrisImageUrl: '/images/donasi/1773717590630-ful53w.png',
        donasiWhatsappNumber: '6282234641688',
        donasiWallets: 'GoPay,OVO,DANA,ShopeePay,BCA,Mandiri',
        createdAt: new Date(1773631112963),
        updatedAt: new Date(1773885639636),
      },
    });
    console.log('✅ Profil pesantren created');
  } else {
    console.log('⏭️  Profil pesantren already exists, skipped');
  }

  // 3. Berita
  const beritaCount = await prisma.berita.count();
  if (beritaCount === 0) {
    // Berita ID 4
    await prisma.berita.create({
      data: {
        judul: 'Kunjungan Silaturahim Ulama Timur Tengah ke Ribathus Sholihin',
        slug: 'kunjungan-silaturahim-ulama-timur-tengah-ke-ribathus-sholihin',
        isi: `<p><span style="background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);">Nurul&nbsp;Iman&nbsp;kedatangan&nbsp;tamu&nbsp;jauh,&nbsp;tepatnya&nbsp;dari&nbsp;Pondok&nbsp;Pesantren&nbsp;Al-Madani&nbsp;Lubuk&nbsp;Linggau,&nbsp;Sumatra&nbsp;Selatan.&nbsp;Menjelang&nbsp;siang,&nbsp;setibanya&nbsp;mereka&nbsp;dari&nbsp;bis&nbsp;yang&nbsp;ditumpangi&nbsp;dalam&nbsp;waktu&nbsp;seharian&nbsp;penuh&nbsp;sekitar&nbsp;dua&nbsp;puluh&nbsp;jam&nbsp;lebih,&nbsp;berhenti&nbsp;di&nbsp;kampus&nbsp;biru&nbsp;untuk&nbsp;mengikuti&nbsp;kegiatan&nbsp;studi&nbsp;banding.&nbsp;Para&nbsp;santri&nbsp;terlihat&nbsp;antusias&nbsp;untuk&nbsp;mengikuti&nbsp;kegiatan&nbsp;ini.&nbsp;Acara&nbsp;dimulai&nbsp;dengan&nbsp;pembukaan,&nbsp;dan&nbsp;diisi&nbsp;oleh&nbsp;beberapa&nbsp;sambutan&nbsp;dari&nbsp;pak&nbsp;kyai,&nbsp;ustadz&nbsp;Asep,&nbsp;dan&nbsp;juga&nbsp;ustadz&nbsp;Mukti.</span></p>`,
        coverUrl: '/images/berita/1773713890363-u7bn0g.jpg',
        kategori: 'Umum',
        penulis: 'Deddy Miswar',
        viewed: 9,
        published: true,
        createdAt: new Date(1773713893100),
        updatedAt: new Date(1773715843777),
      },
    });

    // Berita ID 5
    await prisma.berita.create({
      data: {
        judul: 'Kunjungan Silaturahim Ulama Timur Tengah ke Ribathus Sholihin',
        slug: 'adab-sebelum-ilmu-pesan-kiai-untuk-santri-baru',
        isi: `<p><span style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);">Nurul&nbsp;Iman&nbsp;kedatangan&nbsp;tamu&nbsp;jauh,&nbsp;tepatnya&nbsp;dari&nbsp;Pondok&nbsp;Pesantren&nbsp;Al-Madani&nbsp;Lubuk&nbsp;Linggau,&nbsp;Sumatra&nbsp;Selatan.&nbsp;Menjelang&nbsp;siang,&nbsp;setibanya&nbsp;mereka&nbsp;dari&nbsp;bis&nbsp;yang&nbsp;ditumpangi&nbsp;dalam&nbsp;waktu&nbsp;seharian&nbsp;penuh&nbsp;sekitar&nbsp;dua&nbsp;puluh&nbsp;jam&nbsp;lebih,&nbsp;berhenti&nbsp;di&nbsp;kampus&nbsp;biru&nbsp;untuk&nbsp;mengikuti&nbsp;kegiatan&nbsp;studi&nbsp;banding.</span></p>`,
        coverUrl: '/images/berita/1773729880750-26l63p.jpg',
        kategori: 'umum',
        penulis: 'Test',
        viewed: 1,
        published: true,
        createdAt: new Date(1773715823531),
        updatedAt: new Date(1773729886941),
      },
    });
    console.log('✅ Berita created (2 records)');
  } else {
    console.log(`⏭️  Berita already has ${beritaCount} records, skipped`);
  }

  // 4. Pengaturan
  const pengaturanCount = await prisma.pengaturan.count();
  if (pengaturanCount === 0) {
    await prisma.pengaturan.createMany({
      data: [
        {
          key: 'website_title',
          value: 'Pondok Pesantren Ribathus Sholihin',
          label: 'Judul Website',
          type: 'text',
          createdAt: new Date(1773631147764),
          updatedAt: new Date(1773631147764),
        },
        {
          key: 'website_description',
          value: 'Website Profil Pondok Pesantren Ribathus Sholihin',
          label: 'Deskripsi Website',
          type: 'text',
          createdAt: new Date(1773631147764),
          updatedAt: new Date(1773631147764),
        },
        {
          key: 'pendaftaran_dibuka',
          value: 'true',
          label: 'Pendaftaran Dibuka',
          type: 'boolean',
          createdAt: new Date(1773631147764),
          updatedAt: new Date(1773631147764),
        },
        {
          key: 'biaya_pendaftaran',
          value: '200000',
          label: 'Biaya Pendaftaran',
          type: 'number',
          createdAt: new Date(1773631147764),
          updatedAt: new Date(1773631147764),
        },
        {
          key: 'biaya_pangkal',
          value: '2500000',
          label: 'Biaya Pangkal',
          type: 'number',
          createdAt: new Date(1773631147764),
          updatedAt: new Date(1773631147764),
        },
        {
          key: 'spp_bulanan',
          value: '650000',
          label: 'SPP Bulanan',
          type: 'number',
          createdAt: new Date(1773631147764),
          updatedAt: new Date(1773631147764),
        },
      ],
    });
    console.log('✅ Pengaturan created (6 records)');
  } else {
    console.log(`⏭️  Pengaturan already has ${pengaturanCount} records, skipped`);
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

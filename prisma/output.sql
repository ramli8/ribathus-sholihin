PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO User VALUES(1,'superadmin','$2b$10$7HUodoU6RuukofG0JtWH.eNvRFOUOBM7pvCS6ihyyUNECm0TOx1E2','superadmin',1773625977897,1773625977897);
CREATE TABLE IF NOT EXISTS "Berita" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "judul" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "isi" TEXT NOT NULL,
    "coverUrl" TEXT,
    "kategori" TEXT,
    "penulis" TEXT,
    "viewed" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO Berita VALUES(4,'Kunjungan Silaturahim Ulama Timur Tengah ke Ribathus Sholihin','kunjungan-silaturahim-ulama-timur-tengah-ke-ribathus-sholihin','<p><span style="background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);">Nurul&nbsp;Iman&nbsp;kedatangan&nbsp;tamu&nbsp;jauh,&nbsp;tepatnya&nbsp;dari&nbsp;Pondok&nbsp;Pesantren&nbsp;Al-Madani&nbsp;Lubuk&nbsp;Linggau,&nbsp;Sumatra&nbsp;Selatan.&nbsp;Menjelang&nbsp;siang,&nbsp;setibanya&nbsp;mereka&nbsp;dari&nbsp;bis&nbsp;yang&nbsp;ditumpangi&nbsp;dalam&nbsp;waktu&nbsp;seharian&nbsp;penuh&nbsp;sekitar&nbsp;dua&nbsp;puluh&nbsp;jam&nbsp;lebih,&nbsp;berhenti&nbsp;di&nbsp;kampus&nbsp;biru&nbsp;untuk&nbsp;mengikuti&nbsp;kegiatan&nbsp;studi&nbsp;banding.&nbsp;Para&nbsp;santri&nbsp;terlihat&nbsp;antusias&nbsp;untuk&nbsp;mengikuti&nbsp;kegiatan&nbsp;ini.&nbsp;Acara&nbsp;dimulai&nbsp;dengan&nbsp;pembukaan,&nbsp;dan&nbsp;diisi&nbsp;oleh&nbsp;beberapa&nbsp;sambutan&nbsp;dari&nbsp;pak&nbsp;kyai,&nbsp;ustadz&nbsp;Asep,&nbsp;dan&nbsp;juga&nbsp;ustadz&nbsp;Mukti.&nbsp;Dalam&nbsp;sambutannya&nbsp;ustadz&nbsp;Asep&nbsp;menjelaskan,&nbsp;bagaimana&nbsp;Nurul&nbsp;Iman&nbsp;mengelola&nbsp;kewirausahaan&nbsp;untuk&nbsp;menunjang&nbsp;aspek&nbsp;di&nbsp;Nurul&nbsp;Iman&nbsp;dan&nbsp;melakukan&nbsp;kerjasama&nbsp;berbagai&nbsp;pihak&nbsp;dalam&nbsp;meningkatkan&nbsp;wirausaha&nbsp;pesantren.&nbsp;Semua&nbsp;audiens&nbsp;dalam&nbsp;ruangan&nbsp;tersebut&nbsp;takjub&nbsp;dengan&nbsp;kehebatan&nbsp;Nurul&nbsp;Iman&nbsp;dalam&nbsp;pengelolaan&nbsp;wirausaha&nbsp;dan&nbsp;juga&nbsp;sistem&nbsp;pendidikan&nbsp;yang&nbsp;diterapkan,&nbsp;pak&nbsp;kyai&nbsp;sekaligus&nbsp;pimpinan&nbsp;ponpes,&nbsp;Bapak&nbsp;Abi&nbsp;Muh&nbsp;Arpan&nbsp;Haj&nbsp;juga&nbsp;merasa&nbsp;bangga&nbsp;dan&nbsp;senang&nbsp;bisa&nbsp;berkunjung&nbsp;kesini.&nbsp;Ustadz&nbsp;mukti&nbsp;juga&nbsp;menambahkan&nbsp;rasa&nbsp;senang&nbsp;para&nbsp;santri&nbsp;dan&nbsp;kyai&nbsp;dengan&nbsp;titah&nbsp;abah&nbsp;“yang&nbsp;kepondok&nbsp;saya&nbsp;merupakan&nbsp;undangan&nbsp;dari&nbsp;Rasulullah&nbsp;SAW”.&nbsp;Tidak&nbsp;hanya&nbsp;nilai&nbsp;wirausaha&nbsp;yang&nbsp;dapat&nbsp;dipetik,&nbsp;tapi&nbsp;nilai&nbsp;religius&nbsp;dapat&nbsp;dipetik&nbsp;juga&nbsp;dari&nbsp;kegiatan&nbsp;ini.</span></p><p><span style="background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);">Setelah&nbsp;acara&nbsp;ditutup&nbsp;seluruh&nbsp;peserta&nbsp;melakukan&nbsp;tour&nbsp;ke&nbsp;berbagai&nbsp;intansi&nbsp;wirausaha&nbsp;di&nbsp;Nurul&nbsp;Iman,&nbsp;mereka&nbsp;mengamati&nbsp;betul&nbsp;apa&nbsp;yang&nbsp;disampaikan&nbsp;oleh&nbsp;guider.&nbsp;Melakukan&nbsp;perjalanan&nbsp;yang&nbsp;lumayan&nbsp;bertenaga&nbsp;namun&nbsp;menyenangkan&nbsp;karena&nbsp;bisa&nbsp;dapat&nbsp;mengambil&nbsp;pelajaran&nbsp;di&nbsp;setiap&nbsp;langkahnya,&nbsp;karena&nbsp;santri&nbsp;yang&nbsp;mengikuti&nbsp;kegiatan&nbsp;ini&nbsp;adalah&nbsp;santri&nbsp;kelas&nbsp;akhir&nbsp;yang&nbsp;akan&nbsp;lulus.&nbsp;Sebuah&nbsp;program&nbsp;yang&nbsp;bagus&nbsp;dari&nbsp;Ponpes&nbsp;Al-Madani&nbsp;untuk&nbsp;memperkenalkan&nbsp;santrinya&nbsp;kewirausahaan&nbsp;yang&nbsp;bisa&nbsp;juga&nbsp;dilakukan&nbsp;oleh&nbsp;pondok&nbsp;pesantren.&nbsp;Dalam&nbsp;wawancaranya,&nbsp;Pak&nbsp;Kyai&nbsp;menjelaskan&nbsp;sebelum&nbsp;ke&nbsp;Nurul&nbsp;Iman,&nbsp;santri&nbsp;ini&nbsp;mengunjungi&nbsp;Ponpes&nbsp;Al-Ihtifaq&nbsp;di&nbsp;Bandung,&nbsp;dan&nbsp;akan&nbsp;melakukan&nbsp;lagi&nbsp;perjalanan&nbsp;ke&nbsp;ponpes&nbsp;di&nbsp;Jakarta.&nbsp;“Program&nbsp;perjalananya&nbsp;ini&nbsp;bukan&nbsp;semata-semata&nbsp;sebagai&nbsp;ajang&nbsp;tour&nbsp;biasa,&nbsp;tapi&nbsp;menjadi&nbsp;langkah&nbsp;dasar&nbsp;dan&nbsp;pengetahuan&nbsp;santrinya&nbsp;tentang&nbsp;wirausaha&nbsp;yang&nbsp;bisa&nbsp;dilakukan&nbsp;saat&nbsp;sudah&nbsp;lulus”.</span></p><p><span style="background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);">“Kita&nbsp;disini&nbsp;merasa&nbsp;senang,&nbsp;karena&nbsp;kita&nbsp;bisa&nbsp;belajar&nbsp;banyak&nbsp;di&nbsp;pondok&nbsp;pesantren,&nbsp;pondokan&nbsp;ini&nbsp;memang&nbsp;beda,&nbsp;kita&nbsp;memang&nbsp;ke&nbsp;berbagai&nbsp;tempat,&nbsp;tapi&nbsp;pesantren&nbsp;yang&nbsp;lengkap&nbsp;ada&nbsp;wirausaha&nbsp;dan&nbsp;itu&nbsp;gratis,&nbsp;ya&nbsp;disini,&nbsp;mandiri,&nbsp;kita&nbsp;sangat&nbsp;termotivasi”&nbsp;ujar&nbsp;Karimah&nbsp;dan&nbsp;Ilas,&nbsp;santri&nbsp;dari&nbsp;ponpes&nbsp;Al-Madani&nbsp;yang&nbsp;kagum&nbsp;dengan&nbsp;mandirinya&nbsp;Nurul&nbsp;Iman.&nbsp;Setelah&nbsp;berkeliling&nbsp;para&nbsp;santri&nbsp;segera&nbsp;bergegas&nbsp;untuk&nbsp;pulang&nbsp;ke&nbsp;penginapan&nbsp;agar&nbsp;diesok&nbsp;hari&nbsp;mereka&nbsp;dapat&nbsp;melakukan&nbsp;kegiatan&nbsp;kembali&nbsp;dengan&nbsp;fit,&nbsp;Pak&nbsp;Kyai&nbsp;dan&nbsp;ustadz&nbsp;berpamitan&nbsp;dan&nbsp;senang&nbsp;bisa&nbsp;datang&nbsp;kesini,&nbsp;dengan&nbsp;harapan&nbsp;suatu&nbsp;saat&nbsp;bisa&nbsp;kembali&nbsp;berkunjung&nbsp;ke&nbsp;Nurul&nbsp;Iman.</span></p><p><a href="https://www.nuruliman.or.id/wp-content/uploads/2023/05/IMG_7728-min.jpg" rel="noopener noreferrer" target="_blank" style="background-color: rgb(255, 255, 255); color: rgb(170, 221, 51);"><img src="https://www.nuruliman.or.id/wp-content/uploads/2023/05/IMG_7728-min-300x200.jpg" height="254" width="381"></a></p><p></p>','/images/berita/1773713890363-u7bn0g.jpg','Umum','Deddy Miswar',9,1,1773713893100,1773715843777);
INSERT INTO Berita VALUES(5,'Kunjungan Silaturahim Ulama Timur Tengah ke Ribathus Sholihin','adab-sebelum-ilmu-pesan-kiai-untuk-santri-baru','<p><span style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);">Nurul&nbsp;Iman&nbsp;kedatangan&nbsp;tamu&nbsp;jauh,&nbsp;tepatnya&nbsp;dari&nbsp;Pondok&nbsp;Pesantren&nbsp;Al-Madani&nbsp;Lubuk&nbsp;Linggau,&nbsp;Sumatra&nbsp;Selatan.&nbsp;Menjelang&nbsp;siang,&nbsp;setibanya&nbsp;mereka&nbsp;dari&nbsp;bis&nbsp;yang&nbsp;ditumpangi&nbsp;dalam&nbsp;waktu&nbsp;seharian&nbsp;penuh&nbsp;sekitar&nbsp;dua&nbsp;puluh&nbsp;jam&nbsp;lebih,&nbsp;berhenti&nbsp;di&nbsp;kampus&nbsp;biru&nbsp;untuk&nbsp;mengikuti&nbsp;kegiatan&nbsp;studi&nbsp;banding.&nbsp;Para&nbsp;santri&nbsp;terlihat&nbsp;antusias&nbsp;untuk&nbsp;mengikuti&nbsp;kegiatan&nbsp;ini.&nbsp;Acara&nbsp;dimulai&nbsp;dengan&nbsp;pembukaan,&nbsp;dan&nbsp;diisi&nbsp;oleh&nbsp;beberapa&nbsp;sambutan&nbsp;dari&nbsp;pak&nbsp;kyai,&nbsp;ustadz&nbsp;Asep,&nbsp;dan&nbsp;juga&nbsp;ustadz&nbsp;Mukti.&nbsp;Dalam&nbsp;sambutannya&nbsp;ustadz&nbsp;Asep&nbsp;menjelaskan,&nbsp;bagaimana&nbsp;Nurul&nbsp;Iman&nbsp;mengelola&nbsp;kewirausahaan&nbsp;untuk&nbsp;menunjang&nbsp;aspek&nbsp;di&nbsp;Nurul&nbsp;Iman&nbsp;dan&nbsp;melakukan&nbsp;kerjasama&nbsp;berbagai&nbsp;pihak&nbsp;dalam&nbsp;meningkatkan&nbsp;wirausaha&nbsp;pesantren.&nbsp;Semua&nbsp;audiens&nbsp;dalam&nbsp;ruangan&nbsp;tersebut&nbsp;takjub&nbsp;dengan&nbsp;kehebatan&nbsp;Nurul&nbsp;Iman&nbsp;dalam&nbsp;pengelolaan&nbsp;wirausaha&nbsp;dan&nbsp;juga&nbsp;sistem&nbsp;pendidikan&nbsp;yang&nbsp;diterapkan,&nbsp;pak&nbsp;kyai&nbsp;sekaligus&nbsp;pimpinan&nbsp;ponpes,&nbsp;Bapak&nbsp;Abi&nbsp;Muh&nbsp;Arpan&nbsp;Haj&nbsp;juga&nbsp;merasa&nbsp;bangga&nbsp;dan&nbsp;senang&nbsp;bisa&nbsp;berkunjung&nbsp;kesini.&nbsp;Ustadz&nbsp;mukti&nbsp;juga&nbsp;menambahkan&nbsp;rasa&nbsp;senang&nbsp;para&nbsp;santri&nbsp;dan&nbsp;kyai&nbsp;dengan&nbsp;titah&nbsp;abah&nbsp;“yang&nbsp;kepondok&nbsp;saya&nbsp;merupakan&nbsp;undangan&nbsp;dari&nbsp;Rasulullah&nbsp;SAW”.&nbsp;Tidak&nbsp;hanya&nbsp;nilai&nbsp;wirausaha&nbsp;yang&nbsp;dapat&nbsp;dipetik,&nbsp;tapi&nbsp;nilai&nbsp;religius&nbsp;dapat&nbsp;dipetik&nbsp;juga&nbsp;dari&nbsp;kegiatan&nbsp;ini.</span></p><p><span style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);">Setelah&nbsp;acara&nbsp;ditutup&nbsp;seluruh&nbsp;peserta&nbsp;melakukan&nbsp;tour&nbsp;ke&nbsp;berbagai&nbsp;intansi&nbsp;wirausaha&nbsp;di&nbsp;Nurul&nbsp;Iman,&nbsp;mereka&nbsp;mengamati&nbsp;betul&nbsp;apa&nbsp;yang&nbsp;disampaikan&nbsp;oleh&nbsp;guider.&nbsp;Melakukan&nbsp;perjalanan&nbsp;yang&nbsp;lumayan&nbsp;bertenaga&nbsp;namun&nbsp;menyenangkan&nbsp;karena&nbsp;bisa&nbsp;dapat&nbsp;mengambil&nbsp;pelajaran&nbsp;di&nbsp;setiap&nbsp;langkahnya,&nbsp;karena&nbsp;santri&nbsp;yang&nbsp;mengikuti&nbsp;kegiatan&nbsp;ini&nbsp;adalah&nbsp;santri&nbsp;kelas&nbsp;akhir&nbsp;yang&nbsp;akan&nbsp;lulus.&nbsp;Sebuah&nbsp;program&nbsp;yang&nbsp;bagus&nbsp;dari&nbsp;Ponpes&nbsp;Al-Madani&nbsp;untuk&nbsp;memperkenalkan&nbsp;santrinya&nbsp;kewirausahaan&nbsp;yang&nbsp;bisa&nbsp;juga&nbsp;dilakukan&nbsp;oleh&nbsp;pondok&nbsp;pesantren.&nbsp;Dalam&nbsp;wawancaranya,&nbsp;Pak&nbsp;Kyai&nbsp;menjelaskan&nbsp;sebelum&nbsp;ke&nbsp;Nurul&nbsp;Iman,&nbsp;santri&nbsp;ini&nbsp;mengunjungi&nbsp;Ponpes&nbsp;Al-Ihtifaq&nbsp;di&nbsp;Bandung,&nbsp;dan&nbsp;akan&nbsp;melakukan&nbsp;lagi&nbsp;perjalanan&nbsp;ke&nbsp;ponpes&nbsp;di&nbsp;Jakarta.&nbsp;“Program&nbsp;perjalananya&nbsp;ini&nbsp;bukan&nbsp;semata-semata&nbsp;sebagai&nbsp;ajang&nbsp;tour&nbsp;biasa,&nbsp;tapi&nbsp;menjadi&nbsp;langkah&nbsp;dasar&nbsp;dan&nbsp;pengetahuan&nbsp;santrinya&nbsp;tentang&nbsp;wirausaha&nbsp;yang&nbsp;bisa&nbsp;dilakukan&nbsp;saat&nbsp;sudah&nbsp;lulus”.</span></p><p><span style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);">“Kita&nbsp;disini&nbsp;merasa&nbsp;senang,&nbsp;karena&nbsp;kita&nbsp;bisa&nbsp;belajar&nbsp;banyak&nbsp;di&nbsp;pondok&nbsp;pesantren,&nbsp;pondokan&nbsp;ini&nbsp;memang&nbsp;beda,&nbsp;kita&nbsp;memang&nbsp;ke&nbsp;berbagai&nbsp;tempat,&nbsp;tapi&nbsp;pesantren&nbsp;yang&nbsp;lengkap&nbsp;ada&nbsp;wirausaha&nbsp;dan&nbsp;itu&nbsp;gratis,&nbsp;ya&nbsp;disini,&nbsp;mandiri,&nbsp;kita&nbsp;sangat&nbsp;termotivasi”&nbsp;ujar&nbsp;Karimah&nbsp;dan&nbsp;Ilas,&nbsp;santri&nbsp;dari&nbsp;ponpes&nbsp;Al-Madani&nbsp;yang&nbsp;kagum&nbsp;dengan&nbsp;mandirinya&nbsp;Nurul&nbsp;Iman.&nbsp;Setelah&nbsp;berkeliling&nbsp;para&nbsp;santri&nbsp;segera&nbsp;bergegas&nbsp;untuk&nbsp;pulang&nbsp;ke&nbsp;penginapan&nbsp;agar&nbsp;diesok&nbsp;hari&nbsp;mereka&nbsp;dapat&nbsp;melakukan&nbsp;kegiatan&nbsp;kembali&nbsp;dengan&nbsp;fit,&nbsp;Pak&nbsp;Kyai&nbsp;dan&nbsp;ustadz&nbsp;berpamitan&nbsp;dan&nbsp;senang&nbsp;bisa&nbsp;datang&nbsp;kesini,&nbsp;dengan&nbsp;harapan&nbsp;suatu&nbsp;saat&nbsp;bisa&nbsp;kembali&nbsp;berkunjung&nbsp;ke&nbsp;Nurul&nbsp;Iman.</span></p><p><a href="https://www.nuruliman.or.id/wp-content/uploads/2023/05/IMG_7728-min.jpg" rel="noopener noreferrer" target="_blank" style="color: rgb(170, 221, 51); background-color: rgb(255, 255, 255);"><img src="https://www.nuruliman.or.id/wp-content/uploads/2023/05/IMG_7728-min-300x200.jpg" height="254" width="381"></a></p>','/images/berita/1773729880750-26l63p.jpg','umum','Test',1,1,1773715823531,1773729886941);
CREATE TABLE IF NOT EXISTS "Pendaftaran" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telepon" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "tanggalLahir" DATETIME NOT NULL,
    "namaWali" TEXT NOT NULL,
    "teleponWali" TEXT NOT NULL,
    "pendidikanTerakhir" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "catatan" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
CREATE TABLE IF NOT EXISTS "Donasi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT,
    "email" TEXT,
    "jumlah" REAL NOT NULL,
    "pesan" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "metodePembayaran" TEXT,
    "buktiBayarUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
CREATE TABLE IF NOT EXISTS "Pengaturan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "value" TEXT,
    "label" TEXT,
    "type" TEXT NOT NULL DEFAULT 'text',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO Pengaturan VALUES(1,'website_title','Pondok Pesantren Ribathus Sholihin','Judul Website','text',1773631147764,1773631147764);
INSERT INTO Pengaturan VALUES(2,'website_description','Website Profil Pondok Pesantren Ribathus Sholihin','Deskripsi Website','text',1773631147764,1773631147764);
INSERT INTO Pengaturan VALUES(3,'pendaftaran_dibuka','true','Pendaftaran Dibuka','boolean',1773631147764,1773631147764);
INSERT INTO Pengaturan VALUES(4,'biaya_pendaftaran','200000','Biaya Pendaftaran','number',1773631147764,1773631147764);
INSERT INTO Pengaturan VALUES(5,'biaya_pangkal','2500000','Biaya Pangkal','number',1773631147764,1773631147764);
INSERT INTO Pengaturan VALUES(6,'spp_bulanan','650000','SPP Bulanan','number',1773631147764,1773631147764);
CREATE TABLE IF NOT EXISTS "ProfilPesantren" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "visi" TEXT,
    "misi" TEXT,
    "telepon" TEXT,
    "email" TEXT,
    "logoUrl" TEXT,
    "profilHeaderTitle" TEXT,
    "pengasuh" TEXT,
    "pengasuhFotoUrl" TEXT,
    "pengasuhDeskripsi" TEXT,
    "sejarahDeskripsi" TEXT,
    "statsTahun" INTEGER NOT NULL DEFAULT 0,
    "statsSantri" INTEGER NOT NULL DEFAULT 0,
    "statsAsatidz" INTEGER NOT NULL DEFAULT 0,
    "heroTitle" TEXT DEFAULT 'Mencetak Generasi Qur''ani & Berakhlakul Karimah',
    "heroSubtitle" TEXT DEFAULT 'Membangun peradaban Islam yang rahmatan lil ''alamin melalui pendidikan berkualitas dengan harmoni ilmu dunia dan akhirat.',
    "youtubeUrl" TEXT,
    "statsLulusan" INTEGER DEFAULT 100,
    "instagramUrl" TEXT,
    "tiktokUrl" TEXT,
    "facebookUrl" TEXT,
    "youtubeChannelUrl" TEXT,
    "whatsappUrl" TEXT,
    "jamOperasional" TEXT,
    "gmapLocation" TEXT,
    "pendidikanTitle" TEXT,
    "pendidikanDesc" TEXT,
    "pendidikanFormalTitle" TEXT,
    "pendidikanFormalDesc" TEXT,
    "pendidikanFormalList" TEXT,
    "pendidikanDiniyahTitle" TEXT,
    "pendidikanDiniyahDesc" TEXT,
    "pendidikanDiniyahList" TEXT,
    "pendidikanDisiplinTitle" TEXT,
    "pendidikanDisiplinDesc" TEXT,
    "psbTitle" TEXT,
    "psbDesc" TEXT,
    "psbSyaratList" TEXT,
    "psbAlurList" TEXT,
    "psbBiayaList" TEXT,
    "psbBrosurUrl" TEXT,
    "fasilitasTitle" TEXT,
    "fasilitasTitleHighlight" TEXT,
    "fasilitasDesc" TEXT,
    "fasilitasList" TEXT,
    "ekstraTitle" TEXT,
    "ekstraTitleHighlight" TEXT,
    "ekstraDesc" TEXT,
    "ekstraList" TEXT,
    "beritaTitle" TEXT,
    "beritaTitleHighlight" TEXT,
    "beritaDesc" TEXT,
    "donasiTitle" TEXT,
    "donasiTitleHighlight" TEXT,
    "donasiQuote" TEXT,
    "donasiQuoteSource" TEXT,
    "donasiBankAccounts" TEXT,
    "donasiQrisImageUrl" TEXT,
    "donasiWhatsappNumber" TEXT,
    "donasiWallets" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
, "pendidikanTitleHighlight" TEXT, "profilHeaderTitleHighlight" TEXT, "psbTitleHighlight" TEXT);
INSERT INTO ProfilPesantren VALUES(1,'Pondok Pesantren Ribathus Sholihin','Area Sawah/Kebun, Denok, Kec. Lumajang, Kabupaten Lumajang, Jawa Timur 67316','Berdiri sejak tahun 1990, kami berkomitmen mencetak generasi santri yang mandiri, berprestasi, dan berakhlakul karimah melalui kurikulum yang adaptif.','Menjadi lembaga rujukan yang mencetak kader ulama dan umara berwawasan global serta berpijak teguh pada tradisi.','Menyelenggarakan pendidikan Islam terpadu yang responsif terhadap dinamika zaman dan senantiasa hadir untuk umat.','+62 812-3456-999','info@ribathussholihin.sch.id','/images/profil/1773718961230-zvj0d6.png','Membangun Karakter dari ','K.H. Ahmad Sholihin','/images/profil/1773643765917-s77cfg.jpg','Alumni universitas ternama di Timur Tengah, meneruskan tongkat estafet perjuangan muassis dengan metode pendidikan modern yang berbasis teguh pada tradisi salafus shalih.','Didirikan oleh K.H. Abdul Wahid dengan niat tulus menyebarkan agama Islam. Berawal dari langgar kecil yang sederhana, berbekal keikhlasan dan istiqomah, pesantren kami kini bertransformasi menjadi pusat pendidikan yang komprehensif tanpa meninggalkan nilai-nilai salaf.',50,560,15,'Mencetak Generasi Qur''ani & Berakhlakul Karimah','Membangun peradaban Islam yang rahmatan lil ''alamin melalui pendidikan berkualitas dengan harmoni ilmu dunia dan akhirat.','https://www.youtube.com/watch?v=inxAsh4Gaa8',90,'https://www.instagram.com/ponpesribathussholihin/','','https://www.facebook.com/ponpesribathussholihin/','','https://wa.me/6282234641698','Senin - Sabtu, 08:00 - 16:00 WIB','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.5421151818846!2d113.27357359999999!3d-8.1480064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd667026ea9ece3%3A0xcb55e972b7ff700f!2sPondok%20Pesantren%20Al%20Islamiyah%20As%20Salafiyah%20Ribathus%20Sholohin!5e0!3m2!1sen!2sid!4v1773718645943!5m2!1sen!2sid','Pendidikan ','Perpaduan harmonis antara kedalaman ilmu-ilmu keislaman salaf dan kecakapan sains teknologi kontemporer untuk mencetak generasi unggul.','Pendidikan Formal','Integrasi sains dan agama','[{"id":"0.15635386405064566","name":"MI / SD-IT Inklusif Berkarakter","icon":"GraduationCap"},{"id":"0.8282002231057564","name":"MTs / SMP Integrasi Kurikulum","icon":"BookOpen"},{"id":"0.8540733539549881","name":"MA / SMA Unggulan Sains & Agama","icon":"Microscope"}]','Pendidikan Diniyah','Mengkaji warisan keilmuan Islam','[{"id":"0.6009582746061571","name":"Madrasah Diniyah (Kitab Salafi)","icon":"BookText"},{"id":"0.8602784033540286","name":"Tahfidz Al-Qur''an 30 Juz Bersanad","icon":"Clock"},{"id":"0.8948685806407533","name":"Kajian Bahasa (Arab & Inggris)","icon":"Globe"}]','Sistem Disiplin 24 Jam','Jadwal santri dikelola secara proporsional namun disiplin, dimulai dari qiyamullail sebelum subuh hingga mudzakarah di malam hari, membentuk rutinitas produktif dan ibadah yang istiqamah.','Langkah Awal Menuju ','Kami membuka kesempatan bagi calon santri untuk bergabung dengan kuota terbatas guna menjamin efektivitas pembelajaran.','["Mengisi formulir online","Fotokopi KK & Akte Kelahiran","Fotokopi Ijazah / SKHU","Pas foto 3x4 (4 lembar)"]','["Pendaftaran form online","Transfer biaya format","Verifikasi berkas admin","Tes wawancara santri"]','[{"id":"0.8623744070078985","label":"Formulir","value":"Rp 50.000"},{"id":"0.001696342255017469","label":"Uang Pangkal","value":"Rp 500.000"},{"id":"0.5046253617263977","label":"Seragam","value":"Rp. 1.000.000"},{"id":"0.6224401024104728","label":"SPP Bulanan","value":"Rp 200.000"}]','/images/brosur/1773884949436-0vp765.pdf','Fasilitas Berstandar','Kenyamanan Menuntut Ilmu','Kami merancang lingkungan pesantren yang asri, bersih, dan modern agar santri dapat fokus menuntut ilmu dengan nyaman.','[{"id":"0.8791215966684826","title":"Gedung Asrama ","desc":"Asrama putra & putri terpisah dengan fasilitas memadai. Diawasi musyrif 24 jam.","image":"/images/fasilitas/1773709958649-hpf6e1.jpg","icon":"Building2","colSpan":"md:col-span-2 lg:col-span-2"},{"id":"0.8889138274004393","title":"Masjid Jami''","desc":"Pusat ibadah berkapasitas 2000 jamaah untuk salat dan pengajian.","image":"/images/fasilitas/1773709962468-x6pwv3.png","icon":"Hospital","colSpan":"col-span-1"},{"id":"0.3659015611599661","title":"Ruang Kelas & Lab","desc":"Ruang representatif ber-AC dengan lab komputer dan lab bahasa terpadu.","image":"/images/fasilitas/1773710228895-3rqs4p.jpeg","icon":"GraduationCap","colSpan":"col-span-1"},{"id":"0.33297481702463916","title":"Perpustakaan Kitab","desc":"Koleksi ribuan kitab salaf hingga literatur modern untuk memfasilitasi riset.","image":"/images/fasilitas/1773710307251-hmk5nw.jpg","icon":"BookOpen","colSpan":"md:col-span-2 lg:col-span-2"},{"id":"0.10937088891512481","title":"Pos Kesehatan","desc":"Klinik tingkat pertama dijaga perawat berpengalaman & dokter kunjungan.","image":"/images/fasilitas/1773710504753-031qqi.jpg","icon":"Heart","colSpan":"md:col-span-2 lg:col-span-1 lg:row-span-2"},{"id":"0.4590463016595794","title":"Kantin ","desc":"Kantin sehat dengan menu higienis bernutrisi dan koperasi pelajaran.","image":"/images/fasilitas/1773710577135-8ctvsc.jpeg","icon":"Utensils","colSpan":"md:col-span-2 lg:col-span-2"},{"id":"0.13329467604889966","title":"Lapangan Olahraga","desc":"Lapangn serba guna untuk melakukan olahraga.","image":"/images/fasilitas/1773710666010-xeauel.jpeg","icon":"Dumbbell","colSpan":"md:col-span-2 lg:col-span-2"}]','Kembangkan Minat &','Bakat ','Kami meyakini setiap santri adalah bintang. Beragam program hadir untuk memastikan mereka siap menyongsong masa depan dengan skill terapan.','[{"id":"icefdxv2ha","name":"Pramuka Santri","desc":"Kemandirian dan kepimpipinan","image":"/images/ekstrakurikuler/1773729578656-2daqti.jpg","colSpan":"lg:col-span-2 lg:row-span-2"},{"id":"ct5zj5hn59n","name":"Pencak Silat","desc":"Seni Bela Diri","image":"/images/ekstrakurikuler/1773729561732-5vm1mt.jpg","colSpan":""},{"id":"wzdwp3no7w","name":"Kaligrafi","desc":"Seni khath Al-Qur''an","image":"/images/ekstrakurikuler/1773729642515-8pxwac.jpg","colSpan":""},{"id":"zjbtm035pub","name":"Jurnalistik","desc":"Pelatihan mading & essay","image":"/images/ekstrakurikuler/1773729675152-4q7km2.jpg","colSpan":""},{"id":"vgqlg9rl58","name":"Multimedia ","desc":"Fotografi dan desain","image":"/images/ekstrakurikuler/1773729726585-bik9n1.jpg","colSpan":""},{"id":"udvcabkc8yk","name":"Seni Hadrah","desc":"Sholawat Al-Banjari","image":"/images/ekstrakurikuler/1773729771787-ua87jq.jpeg","colSpan":""},{"id":"sg30z3od9p","name":"Public Speaking","desc":"Pidato 3 bahasa","image":"/images/ekstrakurikuler/1773729815913-pf2xu9.jpg","colSpan":""},{"id":"fkgt9x3cpfh","name":"Robotics","desc":"Inovasi Teknologi","image":"/images/ekstrakurikuler/1773729841489-z7yyqz.jpeg","colSpan":"lg:col-span-2"}]','Warta','Terkini','Ikuti perkembangan pondok, warta kegiatan santri, hingga goresan pena inspiratif dari jajaran asatidz.','Salurkan Infaq','Terbaik Anda','Jika seseorang meninggal dunia, maka terputuslah amalannya kecuali tiga perkara: sedekah jariyah, ilmu yang dimanfaatkan, atau doa anak yang sholeh','HR. Muslim','[{"bank":"Bank Syariah Indonesia (BSI)","number":"712 345 6789","name":"a.n. Yayasan Ribathus Sholihin"},{"bank":"Bank Muamalat","number":"000 123 4567","name":"a.n. PP. Ribathus Sholihin"}]','/images/donasi/1773717590630-ful53w.png','6282234641688','GoPay,OVO,DANA,ShopeePay,BCA,Mandiri',1773631112963,1773885639636,'Komprehensif','Tradisi & Inovasi','Masa Depan Gemilang');
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('User',1);
INSERT INTO sqlite_sequence VALUES('Berita',5);
INSERT INTO sqlite_sequence VALUES('Pengaturan',6);
INSERT INTO sqlite_sequence VALUES('ProfilPesantren',1);
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "Berita_slug_key" ON "Berita"("slug");
CREATE UNIQUE INDEX "Pengaturan_key_key" ON "Pengaturan"("key");
COMMIT;

import imgCat1 from "../assets/img/category1.png"
import imgCat2 from "../assets/img/category2.png"
import imgCat3 from "../assets/img/category3.png"
import imgCat4 from "../assets/img/category4.png"




const dataItems = [
    // =========================
    // MAKANAN
    // =========================
    {
        id: 1,
        nama: "Roti Cokelat Premium bla bla  bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla",
        price: 8500,
        category: "Makanan",
        deskripsi: `Roti lembut dengan tekstur yang empuk dan lezat.
Dibuat dari bahan pilihan berkualitas tinggi.
Memiliki isian cokelat yang melimpah dan manis.
Cocok untuk sarapan maupun camilan sore hari.
Kemasan praktis sehingga mudah dibawa bepergian.
Disukai oleh anak-anak maupun orang dewasa.
Diproduksi dengan standar kebersihan yang tinggi.
Menjadi pilihan favorit untuk menemani aktivitas harian.`,
        img: imgCat1
    },
    {
        id: 2,
        nama: "Biskuit Keju Gurih",
        price: 12000,
        category: "Makanan",
        deskripsi: `Biskuit renyah dengan rasa keju yang khas.
Memiliki tekstur ringan dan mudah dinikmati.
Cocok disajikan bersama teh atau kopi hangat.
Dikemas secara higienis dan aman dikonsumsi.
Menggunakan bahan baku pilihan berkualitas.
Praktis dijadikan bekal perjalanan sehari-hari.
Memberikan sensasi gurih yang memuaskan.
Menjadi camilan favorit keluarga Indonesia.`,
        img: imgCat1
    },
    {
        id: 3,
        nama: "Keripik Kentang Original",
        price: 15000,
        category: "Makanan",
        deskripsi: `Keripik kentang dengan rasa original yang lezat.
Dibuat dari kentang pilihan berkualitas premium.
Memiliki tingkat kerenyahan yang maksimal.
Cocok untuk menemani waktu santai di rumah.
Kemasan menarik dan mudah dibuka kapan saja.
Diproses dengan teknologi produksi modern.
Disukai oleh berbagai kalangan usia.
Memberikan pengalaman ngemil yang menyenangkan.`,
        img: imgCat1
    },
    {
        id: 4,
        nama: "Wafer Vanila",
        price: 10000,
        category: "Makanan",
        deskripsi: `Wafer renyah dengan lapisan krim vanila lembut.
Memiliki perpaduan rasa yang seimbang dan nikmat.
Cocok untuk camilan keluarga di berbagai suasana.
Aroma vanila memberikan sensasi yang menenangkan.
Kemasan ekonomis dan mudah dibawa.
Dibuat dari bahan pilihan yang berkualitas.
Digemari oleh anak-anak maupun dewasa.
Pilihan tepat untuk menemani waktu santai.`,
        img: imgCat1
    },
    {
        id: 5,
        nama: "Kacang Panggang",
        price: 13500,
        category: "Makanan",
        deskripsi: `Kacang panggang dengan rasa gurih alami.
Mengandung protein yang baik untuk tubuh.
Diproses tanpa minyak berlebih untuk kualitas terbaik.
Cocok dikonsumsi sebagai camilan sehat harian.
Kemasan modern menjaga kesegaran lebih lama.
Praktis dibawa saat bekerja atau bepergian.
Memiliki cita rasa yang khas dan nikmat.
Menjadi pilihan favorit banyak konsumen.`,
        img: imgCat1
    },
    {
        id: 6,
        nama: "Mi Instan Ayam Bawang",
        price: 4500,
        category: "Makanan",
        deskripsi: `Mi instan dengan cita rasa ayam bawang khas.
Mudah disiapkan hanya dalam beberapa menit.
Tekstur mi kenyal dan bumbu yang lezat.
Cocok untuk makan siang maupun malam.
Kemasan praktis untuk penyimpanan jangka panjang.
Menjadi makanan favorit berbagai kalangan.
Dibuat dengan standar kualitas yang baik.
Pilihan tepat saat membutuhkan makanan praktis.`,
        img: imgCat1
    },
    {
        id: 7,
        nama: "Cokelat Batang Susu",
        price: 18000,
        category: "Makanan",
        deskripsi: `Cokelat susu dengan rasa manis yang pas.
Memiliki tekstur lembut yang mudah meleleh.
Dibuat dari bahan berkualitas tinggi.
Cocok dijadikan hadiah maupun camilan pribadi.
Kemasan elegan dan menarik perhatian.
Disukai oleh berbagai kalangan usia.
Memberikan sensasi manis yang memuaskan.
Pilihan tepat bagi pecinta cokelat.`,
        img: imgCat1
    },
    {
        id: 8,
        nama: "Sereal Jagung",
        price: 22000,
        category: "Makanan",
        deskripsi: `Sereal jagung renyah yang cocok untuk sarapan.
Mengandung berbagai nutrisi penting harian.
Dapat dinikmati dengan susu atau yogurt.
Memberikan energi untuk memulai aktivitas.
Tekstur ringan dan mudah dikonsumsi.
Kemasan praktis menjaga kualitas produk.
Rasa lezat yang disukai berbagai usia.
Pilihan tepat untuk gaya hidup modern.`,
        img: imgCat1
    },

    // =========================
    // MINUMAN
    // =========================
    {
        id: 9,
        nama: "Air Mineral 600ml",
        price: 3500,
        category: "Minuman",
        deskripsi: `Air mineral murni dari sumber terpercaya.
Diproses menggunakan teknologi modern.
Membantu memenuhi kebutuhan cairan tubuh.
Memiliki rasa segar dan ringan diminum.
Kemasan praktis untuk aktivitas sehari-hari.
Terjamin kebersihan dan kualitasnya.
Cocok untuk semua kalangan usia.
Pilihan terbaik untuk menjaga hidrasi.`,
        img: imgCat2
    },
    {
        id: 10,
        nama: "Teh Botol Melati",
        price: 5000,
        category: "Minuman",
        deskripsi: `Minuman teh dengan aroma melati khas.
Memberikan sensasi segar saat diminum dingin.
Dibuat dari daun teh pilihan berkualitas.
Cocok menemani waktu makan dan bersantai.
Memiliki rasa manis yang seimbang.
Kemasan botol praktis dibawa ke mana saja.
Disukai oleh berbagai kalangan masyarakat.
Menjadi minuman favorit sepanjang hari.`,
        img: imgCat2
    },
    {
        id: 11,
        nama: "Kopi Susu Siap Minum",
        price: 8500,
        category: "Minuman",
        deskripsi: `Perpaduan kopi dan susu yang seimbang.
Memberikan energi tambahan saat beraktivitas.
Memiliki aroma kopi yang menggoda.
Kemasan praktis untuk konsumsi langsung.
Menggunakan biji kopi berkualitas pilihan.
Cocok dinikmati pagi maupun sore hari.
Disukai oleh pecinta kopi modern.
Memberikan rasa yang kaya dan nikmat.`,
        img: imgCat2
    },
    {
        id: 12,
        nama: "Jus Jeruk Kemasan",
        price: 7000,
        category: "Minuman",
        deskripsi: `Minuman rasa jeruk yang menyegarkan.
Mengandung vitamin yang baik untuk tubuh.
Perpaduan rasa manis dan asam yang pas.
Cocok dinikmati dalam keadaan dingin.
Kemasan praktis dan mudah dibawa.
Diproduksi dengan standar kualitas tinggi.
Memberikan kesegaran setiap saat.
Pilihan favorit untuk aktivitas harian.`,
        img: imgCat2
    },
    {
        id: 13,
        nama: "Susu UHT Cokelat",
        price: 7500,
        category: "Minuman",
        deskripsi: `Susu cokelat dengan rasa yang lezat.
Mengandung nutrisi penting untuk tubuh.
Cocok dikonsumsi anak-anak dan dewasa.
Kemasan aman dan tahan lama.
Memiliki rasa manis yang pas.
Diproses secara higienis dan modern.
Mudah dibawa untuk bekal sekolah.
Pilihan tepat untuk minuman bergizi.`,
        img: imgCat2
    },
    {
        id: 14,
        nama: "Minuman Isotonik",
        price: 6500,
        category: "Minuman",
        deskripsi: `Membantu menggantikan cairan tubuh yang hilang.
Cocok dikonsumsi setelah berolahraga.
Mengandung elektrolit yang dibutuhkan tubuh.
Memiliki rasa segar dan menyenangkan.
Kemasan botol praktis untuk dibawa.
Membantu menjaga keseimbangan cairan tubuh.
Diproduksi dengan standar mutu yang baik.
Pilihan tepat untuk aktivitas aktif.`,
        img: imgCat2
    },
    {
        id: 15,
        nama: "Teh Hijau Kemasan",
        price: 6000,
        category: "Minuman",
        deskripsi: `Minuman teh hijau dengan rasa ringan.
Memberikan sensasi segar dan menenangkan.
Dibuat dari ekstrak daun teh berkualitas.
Cocok dinikmati kapan saja.
Memiliki aroma alami yang khas.
Kemasan praktis untuk aktivitas sehari-hari.
Disukai oleh pecinta minuman teh.
Pilihan menyegarkan yang mudah ditemukan.`,
        img: imgCat2
    },
    {
        id: 16,
        nama: "Soda Lemon",
        price: 5500,
        category: "Minuman",
        deskripsi: `Minuman bersoda dengan rasa lemon segar.
Memiliki sensasi karbonasi yang menyenangkan.
Cocok diminum saat cuaca panas.
Rasa asam manis yang seimbang.
Kemasan menarik dan mudah dibawa.
Menjadi teman yang pas saat berkumpul.
Diproduksi dengan bahan berkualitas.
Pilihan favorit untuk minuman ringan.`,
        img: imgCat2
    },

    // =========================
    // Perawatan RUMAH
    // =========================
    {
        id: 17,
        nama: "Deterjen Cair",
        price: 28000,
        category: "Perawatan Rumah",
        deskripsi: `Deterjen cair yang efektif mengangkat noda.
Memiliki aroma segar yang tahan lama.
Mudah larut dalam air saat digunakan.
Cocok untuk mesin cuci maupun manual.
Kemasan ekonomis untuk kebutuhan keluarga.
Membantu menjaga warna pakaian tetap cerah.
Menggunakan teknologi pembersih modern.
Pilihan praktis untuk mencuci setiap hari.`,
        img: imgCat3
    },
    {
        id: 18,
        nama: "Sabun Cuci Piring",
        price: 12000,
        category: "Perawatan Rumah",
        deskripsi: `Membersihkan lemak dan noda membandel.
Menghasilkan busa melimpah dan efektif.
Aroma segar yang nyaman digunakan.
Aman untuk berbagai jenis peralatan makan.
Kemasan ekonomis dan praktis.
Membantu menjaga kebersihan dapur.
Mudah digunakan setiap hari.
Pilihan tepat untuk rumah tangga.`,
        img: imgCat3
    },
    {
        id: 19,
        nama: "Pembersih Lantai",
        price: 18000,
        category: "Perawatan Rumah",
        deskripsi: `Membersihkan lantai dengan efektif dan cepat.
Meninggalkan aroma harum yang tahan lama.
Cocok untuk berbagai jenis lantai.
Membantu menjaga kebersihan rumah.
Kemasan praktis dan mudah digunakan.
Efektif untuk penggunaan sehari-hari.
Memberikan kesan rumah lebih segar.
Pilihan ideal untuk keluarga.`,
        img: imgCat3
    },
    {
        id: 20,
        nama: "Tisu Gulung",
        price: 15000,
        category: "Perawatan Rumah",
        deskripsi: `Tisu lembut dengan daya serap tinggi.
Cocok untuk berbagai Perawatan rumah tangga.
Praktis digunakan di berbagai ruangan.
Kemasan higienis dan aman disimpan.
Nyaman digunakan oleh seluruh keluarga.
Memiliki tekstur yang kuat dan tidak mudah sobek.
Membantu menjaga kebersihan sehari-hari.
Produk penting yang selalu dibutuhkan.`,
        img: imgCat3
    },
    {
        id: 21,
        nama: "Pewangi Ruangan",
        price: 22000,
        category: "Perawatan Rumah",
        deskripsi: `Menjaga ruangan tetap harum dan segar.
Memiliki aroma yang tahan lama.
Cocok digunakan di rumah maupun kantor.
Desain kemasan modern dan menarik.
Mudah digunakan tanpa perawatan tambahan.
Membantu meningkatkan kenyamanan ruangan.
Tersedia dalam berbagai pilihan aroma.
Pilihan tepat untuk suasana menyenangkan.`,
        img: imgCat3
    },
    {
        id: 22,
        nama: "Kantong Sampah",
        price: 10000,
        category: "Perawatan Rumah",
        deskripsi: `Kantong sampah kuat untuk kebutuhan harian.
Mudah digunakan dan disimpan.
Membantu menjaga kebersihan lingkungan rumah.
Tersedia dalam ukuran yang praktis.
Material cukup kuat untuk penggunaan rutin.
Mendukung pengelolaan sampah yang rapi.
Cocok untuk berbagai jenis tempat sampah.
Produk wajib di setiap rumah.`,
        img: imgCat3
    },
    {
        id: 23,
        nama: "Spons Cuci",
        price: 7000,
        category: "Perawatan Rumah",
        deskripsi: `Spons berkualitas untuk membersihkan dapur.
Memiliki permukaan yang efektif mengangkat kotoran.
Nyaman digunakan dan mudah digenggam.
Cocok untuk berbagai peralatan makan.
Tahan digunakan dalam aktivitas harian.
Membantu menjaga kebersihan dapur.
Material aman dan tidak mudah rusak.
Pilihan praktis untuk rumah tangga.`,
        img: imgCat3
    },
    {
        id: 24,
        nama: "Pengharum Lemari",
        price: 12000,
        category: "Perawatan Rumah",
        deskripsi: `Menjaga aroma lemari tetap segar.
Membantu mengurangi bau tidak sedap.
Praktis digunakan tanpa perawatan tambahan.
Memiliki aroma yang tahan lama.
Desain ringkas dan mudah ditempatkan.
Cocok digunakan pada lemari pakaian.
Membantu menjaga kenyamanan penggunaan pakaian.
Pilihan sederhana untuk rumah yang segar.`,
        img: imgCat3
    },

    // =========================
    // KECANTIKAN
    // =========================
    {
        id: 25,
        nama: "Shampoo Herbal",
        price: 32000,
        category: "Kecantikan",
        deskripsi: `Shampoo dengan ekstrak herbal alami.
Membantu membersihkan kulit kepala secara optimal.
Memberikan aroma yang menyegarkan.
Cocok digunakan untuk berbagai jenis rambut.
Menjadikan rambut terasa lebih bersih.
Kemasan praktis untuk penggunaan harian.
Diformulasikan untuk perawatan rutin.
Pilihan tepat menjaga kesehatan rambut.`,
        img: imgCat4
    },
    {
        id: 26,
        nama: "Sabun Wajah",
        price: 28000,
        category: "Kecantikan",
        deskripsi: `Membersihkan wajah dari debu dan minyak.
Memberikan sensasi segar setelah digunakan.
Tekstur lembut dan nyaman di kulit.
Cocok digunakan pagi dan malam hari.
Membantu menjaga kebersihan wajah.
Kemasan praktis mudah dibawa.
Diformulasikan untuk penggunaan rutin.
Pilihan ideal perawatan dasar wajah.`,
        img: imgCat4
    },
    {
        id: 27,
        nama: "Body Lotion",
        price: 35000,
        category: "Kecantikan",
        deskripsi: `Membantu menjaga kelembapan kulit.
Memiliki tekstur ringan yang mudah meresap.
Memberikan rasa nyaman sepanjang hari.
Cocok digunakan setelah mandi.
Membantu membuat kulit lebih halus.
Kemasan praktis untuk penggunaan harian.
Diformulasikan untuk berbagai jenis kulit.
Pilihan tepat untuk perawatan tubuh.`,
        img: imgCat4
    },
    {
        id: 28,
        nama: "Deodoran Roll On",
        price: 18000,
        category: "Kecantikan",
        deskripsi: `Menjaga kesegaran tubuh sepanjang hari.
Mudah diaplikasikan dan cepat kering.
Memberikan perlindungan dari bau tidak sedap.
Memiliki aroma yang ringan dan nyaman.
Cocok digunakan untuk aktivitas harian.
Kemasan praktis mudah dibawa.
Meningkatkan rasa percaya diri pengguna.
Pilihan tepat untuk gaya hidup aktif.`,
        img: imgCat4
    },
    {
        id: 29,
        nama: "Lip Balm",
        price: 15000,
        category: "Kecantikan",
        deskripsi: `Membantu menjaga kelembapan bibir.
Tekstur lembut dan nyaman digunakan.
Cocok digunakan sepanjang hari.
Praktis dibawa ke mana saja.
Membantu membuat bibir tampak sehat.
Diformulasikan untuk penggunaan rutin.
Aman digunakan berbagai usia.
Pilihan sederhana untuk perawatan bibir.`,
        img: imgCat4
    },
    {
        id: 30,
        nama: "Parfum Floral",
        price: 45000,
        category: "Kecantikan",
        deskripsi: `Parfum dengan aroma bunga yang elegan.
Memberikan kesan segar dan percaya diri.
Cocok digunakan untuk berbagai kesempatan.
Aroma tahan lama sepanjang hari.
Kemasan modern dan menarik.
Mudah diaplikasikan sebelum beraktivitas.
Disukai oleh banyak pengguna.
Pilihan tepat menunjang penampilan.`,
        img: imgCat4
    },
    {
        id: 31,
        nama: "Masker Wajah",
        price: 12000,
        category: "Kecantikan",
        deskripsi: `Masker wajah untuk perawatan kulit rutin.
Memberikan sensasi relaksasi saat digunakan.
Mudah diaplikasikan di rumah.
Cocok digunakan saat waktu istirahat.
Membantu menjaga kesegaran kulit.
Kemasan praktis untuk sekali pakai.
Menjadi bagian dari perawatan modern.
Pilihan tepat untuk wajah yang terawat.`,
        img: imgCat4
    },
    {
        id: 32,
        nama: "Hand Cream",
        price: 25000,
        category: "Kecantikan",
        deskripsi: `Krim tangan yang menjaga kelembapan kulit.
Tekstur ringan dan cepat meresap.
Cocok digunakan setelah mencuci tangan.
Memberikan rasa halus dan nyaman.
Kemasan kecil mudah dibawa.
Memiliki aroma yang lembut.
Dapat digunakan setiap hari.
Pilihan praktis untuk perawatan tangan.`,
        img: imgCat4
    }
];

export default dataItems
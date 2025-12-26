import news1 from "@assets/generated_images/business_strategy_meeting_with_charts.png";
import news2 from "@assets/generated_images/indonesian_street_food_vendor_success_story.png";
import news3 from "@assets/generated_images/digital_marketing_for_small_business.png";
import news4 from "@assets/generated_images/financial_planning_for_business.png";

export interface InsightArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  author: string;
  image: string;
  excerpt: string;
  readTime: string;
  content: string[];
}

export const INSIGHT_ARTICLES: InsightArticle[] = [
  {
    id: "1",
    title: "Tren Bisnis Franchise 2025: Apa yang Harus Diketahui?",
    slug: "tren-bisnis-franchise-2025",
    category: "Bisnis",
    date: "18 Des 2025",
    author: "Tim Mitranesia",
    image: news1,
    excerpt:
      "Menjelajahi peluang bisnis waralaba yang diprediksi akan booming di tahun mendatang. Simak analisis lengkapnya di sini.",
    readTime: "5 min baca",
    content: [
      "Franchise tetap menjadi pilihan menarik bagi calon pengusaha karena modelnya yang teruji dan dukungan operasional yang jelas. Di 2025, tren akan semakin mengarah pada konsep yang efisien dan terukur.",
      "Kategori makanan dan minuman masih mendominasi, tetapi peluang besar juga terbuka di sektor layanan dan kesehatan. Digitalisasi proses dan pemasaran akan menjadi pembeda utama bagi brand yang ingin bertumbuh.",
      "Bagi investor, penting untuk menilai kekuatan brand, struktur biaya, serta kesiapan sistem operasional sebelum mengambil keputusan. Pastikan Anda memilih mitra yang transparan dan memiliki rekam jejak kuat."
    ]
  },
  {
    id: "2",
    title: "Kisah Sukses UMKM: Dari Gerobak Menjadi Ruko",
    slug: "kisah-sukses-umkm-dari-gerobak-menjadi-ruko",
    category: "Inspirasi",
    date: "15 Des 2025",
    author: "Budi Santoso",
    image: news2,
    excerpt:
      "Perjalanan inspiratif Pak Joko membangun bisnis kuliner tradisionalnya hingga memiliki 5 cabang di Jabodetabek.",
    readTime: "7 min baca",
    content: [
      "Pak Joko memulai dari gerobak kecil di pinggir jalan. Kunci keberhasilannya adalah konsistensi rasa dan pelayanan yang ramah.",
      "Seiring meningkatnya permintaan, ia mulai menata SOP sederhana dan memperkuat branding. Setelah itu, ekspansi ke ruko menjadi langkah yang lebih terukur.",
      "Cerita ini menunjukkan bahwa UMKM bisa bertumbuh dengan strategi yang disiplin dan fokus pada kualitas."
    ]
  },
  {
    id: "3",
    title: "Pentingnya Digital Marketing untuk UMKM di Era Modern",
    slug: "pentingnya-digital-marketing-untuk-umkm",
    category: "Marketing",
    date: "10 Des 2025",
    author: "Sarah Wijaya",
    image: news3,
    excerpt:
      "Strategi pemasaran digital yang efektif dan hemat biaya untuk meningkatkan omzet bisnis kecil dan menengah.",
    readTime: "6 min baca",
    content: [
      "Digital marketing membantu UMKM menjangkau audiens yang lebih luas dengan biaya yang relatif efisien. Kanal seperti media sosial dan marketplace kini menjadi kebutuhan utama.",
      "Mulailah dari konten yang konsisten, gunakan data sederhana untuk memahami performa, dan fokus pada pesan yang relevan dengan target pasar.",
      "Dengan pendekatan yang terukur, UMKM dapat meningkatkan brand awareness sekaligus penjualan."
    ]
  },
  {
    id: "4",
    title: "Tips Mengelola Keuangan untuk Pemula Bisnis",
    slug: "tips-mengelola-keuangan-untuk-pemula-bisnis",
    category: "Keuangan",
    date: "05 Des 2025",
    author: "Rina Finance",
    image: news4,
    excerpt:
      "Panduan praktis mengatur arus kas dan pembukuan sederhana agar bisnis tetap sehat dan profitable.",
    readTime: "4 min baca",
    content: [
      "Pisahkan keuangan pribadi dan bisnis sejak awal. Ini membantu Anda melihat arus kas secara lebih jelas.",
      "Catat pemasukan dan pengeluaran harian, lalu evaluasi secara bulanan untuk menentukan langkah perbaikan.",
      "Disiplin finansial sederhana akan menjaga bisnis tetap sehat dan siap berkembang."
    ]
  },
  {
    id: "5",
    title: "Mitranesia Meluncurkan Program Kemitraan Baru",
    slug: "mitranesia-meluncurkan-program-kemitraan-baru",
    category: "Berita",
    date: "01 Des 2025",
    author: "Admin",
    image: news1,
    excerpt:
      "Program inkubasi bisnis terbaru dari Mitranesia untuk membantu calon pengusaha memulai bisnis franchise pertama mereka.",
    readTime: "3 min baca",
    content: [
      "Program ini dirancang untuk mempercepat proses belajar calon mitra dengan materi praktis dan pendampingan terstruktur.",
      "Peserta akan mendapatkan akses ke mentor, materi bisnis, dan jaringan vendor yang siap mendukung operasional.",
      "Dengan ekosistem yang kuat, Mitranesia berharap lebih banyak UMKM dapat naik kelas secara berkelanjutan."
    ]
  }
];

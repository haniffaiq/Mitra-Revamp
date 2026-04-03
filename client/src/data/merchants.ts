export type MerchantPartnershipType =
  | "Self Managed"
  | "Semi-Autopilot"
  | "Full-Autopilot"
  | "Auto Pilot";

export interface MerchantPackage {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface MerchantProps {
  id: string;
  name: string;
  slug: string;
  category: string;
  logoUrl: string;
  bepMonths: number;
  isTopMerchant?: boolean;
  rating?: number;
  type: MerchantPartnershipType;
  packages: MerchantPackage[];
}

function createPackage(name: string, price: number, description: string): MerchantPackage {
  return {
    id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    name,
    price,
    description,
  };
}

function createDefaultPackages(basePrice: number): MerchantPackage[] {
  const premiumPrice = Math.ceil((basePrice * 1.35) / 1000000) * 1000000;

  return [
    createPackage(
      "Paket Starter",
      basePrice,
      "Paket awal untuk memulai operasional outlet dengan kebutuhan utama yang paling esensial."
    ),
    createPackage(
      "Paket Premium",
      premiumPrice,
      "Paket pengembangan dengan dukungan perlengkapan dan aktivasi operasional yang lebih lengkap."
    ),
  ];
}

export function getMerchantMinPrice(merchant: MerchantProps) {
  return Math.min(...merchant.packages.map((pkg) => pkg.price));
}

export function getMerchantMaxPrice(merchant: MerchantProps) {
  return Math.max(...merchant.packages.map((pkg) => pkg.price));
}

export const DUMMY_MERCHANTS: MerchantProps[] = [
  {
    id: "0d4243f6-6d9b-45c7-b6d5-0f8bb4f5a201",
    name: "Soc Clean",
    slug: "soc-clean",
    logoUrl: "https://peluang-images.s3.ap-southeast-1.amazonaws.com/mitranesia/soc_clean.png",
    category: "Cleaning Service",
    type: "Semi-Autopilot",
    bepMonths: 8,
    packages: [
      createPackage(
        "Custom Brand",
        2500000,
        "Paket awal untuk membangun brand kebersihan dengan identitas usaha sendiri."
      ),
      createPackage(
        "Franchise Brand",
        15000000,
        "Paket kemitraan franchise dengan dukungan branding dan sistem operasional brand."
      ),
    ],
  },
  {
    id: "df1b6b03-7c28-4a1f-b724-6037f810ca02",
    name: "Chicken Roll",
    slug: "chicken-roll",
    logoUrl: "https://placehold.co/500x400.png?text=Chicken+Roll",
    category: "Food & Beverages",
    type: "Semi-Autopilot",
    bepMonths: 12,
    packages: [
      createPackage("Paket Bronze", 5000000, "Paket ekonomis untuk memulai penjualan Chicken Roll skala kecil."),
      createPackage("Paket Platinum", 15000000, "Paket pengembangan dengan dukungan perlengkapan operasional lebih lengkap."),
      createPackage(
        "Paket Exclusive Mini Kontainer",
        30000000,
        "Paket outlet mini kontainer untuk model usaha yang lebih siap ekspansi."
      ),
      createPackage(
        "Paket Exclusive Both Sepeda",
        40000000,
        "Paket mobile outlet dengan konsep sepeda untuk penjualan fleksibel."
      ),
    ],
  },
  {
    id: "87bfc62c-0423-4c43-85b8-9ee3944a7b06",
    name: "Pixify Studio",
    slug: "pixify-studio",
    logoUrl: "https://peluang-images.s3.ap-southeast-1.amazonaws.com/mitranesia/pixify.png",
    category: "Creative Studio",
    type: "Semi-Autopilot",
    bepMonths: 16,
    packages: [
      createPackage("Basic", 40000000, "Paket dasar studio kreatif untuk layanan dan operasional inti."),
      createPackage("Paket Smail", 54000000, "Paket pengembangan studio dengan cakupan layanan yang lebih luas."),
      createPackage("Paket Prime", 70000000, "Paket studio premium untuk kebutuhan usaha yang lebih lengkap."),
    ],
  },
  {
    id: "bf5931ab-c2fc-4061-a8f8-657e33f2d809",
    name: "Deftbarber",
    slug: "deftbarber",
    logoUrl: "https://peluang-images.s3.ap-southeast-1.amazonaws.com/mitranesia/daft_barber.png",
    category: "Beauty/Self Care",
    type: "Full-Autopilot",
    isTopMerchant:true,
    bepMonths: 16,
    packages: [
      createPackage("Paket Silver", 69000000, "Paket barbershop dasar untuk outlet dengan kebutuhan operasional inti."),
      createPackage("Paket Gold", 98000000, "Paket pengembangan outlet dengan fasilitas dan perlengkapan lebih lengkap."),
      createPackage("Paket Platinum", 137000000, "Paket premium untuk outlet barbershop dengan setup yang lebih komprehensif."),
    ],
  },
  {
    id: "0a18da27-4a07-4c43-bc2e-2f5065d7b911",
    name: "Mafia Seblak",
    slug: "mafia-seblak",
    logoUrl: "https://peluang-images.s3.ap-southeast-1.amazonaws.com/mitranesia/mafia_seblak.jpg",
    category: "Food & Beverages",
    type: "Full-Autopilot",
    bepMonths: 18,
    packages: [
      createPackage("Paket Lisensi A", 87000000, "Paket lisensi awal untuk menjalankan outlet Mafia Seblak."),
      createPackage("Paket Lisensi B", 120000000, "Paket lisensi lanjutan dengan dukungan operasional yang lebih luas."),
      createPackage("Paket Restoran A", 175000000, "Paket restoran untuk outlet dengan kapasitas layanan lebih besar."),
      createPackage("Paket Restoran B", 210000000, "Paket restoran skala lebih tinggi untuk model usaha yang lebih matang."),
    ],
  },
  {
    id: "473e4cb0-7314-423d-aeb4-ebd5347bfe13",
    name: "Doyan Ayam",
    slug: "doyan-ayam",
    logoUrl: "https://peluang-images.s3.ap-southeast-1.amazonaws.com/mitranesia/doyan_ayam.png",
    category: "Food & Beverages",
    type: "Full-Autopilot",
    isTopMerchant:true,
    bepMonths: 16,
    packages: [
      createPackage("Paket Starter", 99000000, "Paket awal untuk memulai outlet Doyan Ayam."),
      createPackage("Paket Grow", 135000000, "Paket pengembangan usaha dengan kapasitas operasional lebih besar."),
      createPackage("Paket Premium", 149000000, "Paket premium untuk outlet dengan dukungan setup lebih lengkap."),
    ],
  },
  {
    id: "08433016-7f86-4b0b-b45a-b39776e2ba17",
    name: "Laundry Hari Ini",
    slug: "laundry-hari-ini",
    logoUrl: "https://peluang-images.s3.ap-southeast-1.amazonaws.com/mitranesia/loundry_harinin.png",
    category: "Laundry Service",
    type: "Auto Pilot",
    bepMonths: 18,
    packages: [
      createPackage("Paket Weekday", 139000000, "Paket laundry untuk operasional harian dengan kebutuhan inti."),
      createPackage("Paket Weekend", 179000000, "Paket laundry dengan kapasitas lebih tinggi untuk trafik pelanggan lebih ramai."),
    ],
  },
  {
    id: "eff03ba1-0476-4d65-ad37-f7c6de806622",
    name: "Pempek Farina",
    slug: "pempek-farina",
    logoUrl: "https://peluang-images.s3.ap-southeast-1.amazonaws.com/mitranesia/pempek_farina.jpg",
    category: "Food & Beverages",
    type: "Auto Pilot",
    bepMonths: 24,
    packages: [
      createPackage("Paket Food Court", 421000000, "Paket outlet food court untuk ekspansi di area komersial."),
      createPackage("Outlet Baru", 750000000, "Paket pembukaan outlet baru dengan kebutuhan setup yang lebih besar."),
      createPackage("Stand Alone", 838000000, "Paket stand alone untuk outlet mandiri dengan skala investasi penuh."),
    ],
  },
  {
    id: "1badab00-f01c-4f81-adac-5f2a6f545a68",
    name: "Kebuli Abuya",
    slug: "kebuli-abuya",
    logoUrl: "https://peluang-images.s3.ap-southeast-1.amazonaws.com/Kebuli+Abuya/Logo-Kebuli+ABUYA+(1).jpg",
    category: "Food & Beverages",
    type: "Self Managed",
    bepMonths: 12,
    isTopMerchant: true,
    rating: 4.9,
    packages: createDefaultPackages(90000000),
  },
  {
    id: "7f29df02-b9d2-43dd-ae71-d2f4c41384d8",
    name: "Tohang's Barber",
    slug: "tohangs-barber",
    logoUrl: "https://peluang-images.s3.ap-southeast-1.amazonaws.com/Tohang/logo3+1.png",
    category: "Beauty/Self Care",
    type: "Semi-Autopilot",
    bepMonths: 12,
    isTopMerchant: true,
    rating: 4.8,
    packages: createDefaultPackages(256000000),
  },
  {
    id: "1012e969-25ee-4134-ab44-6918f1713a5b",
    name: "Balkan Shawarma",
    slug: "balkan-shawarma",
    logoUrl: "https://peluang-images.s3.ap-southeast-1.amazonaws.com/Balkan/balkan+logo.jpg",
    category: "Food & Beverages",
    type: "Full-Autopilot",
    bepMonths: 12,
    rating: 4.7,
    packages: createDefaultPackages(59000000),
  },
  {
    id: "cd80fea0-d31e-4d3d-b5bc-59461ca0a966",
    name: "Autoclean Waterless",
    slug: "autoclean-waterless",
    logoUrl: "https://peluang-images.s3.ap-southeast-1.amazonaws.com/Autoclean/autoclean+logo.png",
    category: "Automotive",
    type: "Full-Autopilot",
    bepMonths: 12,
    rating: 4.6,
    packages: createDefaultPackages(98000000),
  },
  {
    id: "d75371cd-baa7-4101-805f-bba99c5040ed",
    name: "Sukayaki",
    slug: "sukayaki",
    logoUrl: "https://peluang-images.s3.ap-southeast-1.amazonaws.com/Sukayaki/sukayaki-logo(2)+(2).png",
    category: "Food & Beverages",
    type: "Semi-Autopilot",
    bepMonths: 12,
    rating: 4.5,
    packages: createDefaultPackages(9888888),
  },
  {
    id: "69325721-4b5f-477c-9456-a2cfbcce7bd1",
    name: "Kriuk Kriuk",
    slug: "kriuk-kriuk",
    logoUrl: "https://peluang-images.s3.ap-southeast-1.amazonaws.com/Kriuk-Kriuk/LOGO+PNG+(1).png",
    category: "Food & Beverages",
    type: "Semi-Autopilot",
    bepMonths: 12,
    rating: 4.4,
    packages: createDefaultPackages(40000000),
  },
  {
    id: "d5a3bbe9-bdad-44d5-82ed-70b62be3c7e5",
    name: "BongOBong",
    slug: "bongobong",
    logoUrl: "https://peluang-images.s3.ap-southeast-1.amazonaws.com/BongoBong/Artboard+4+logo.png",
    category: "Food & Beverages",
    type: "Semi-Autopilot",
    bepMonths: 12,
    rating: 4.3,
    packages: createDefaultPackages(600000000),
  },
  {
    id: "03184ee3-f1d8-4618-84cd-1960e73abdab",
    name: "GYU-RIH",
    slug: "gyu-rih",
    logoUrl: "https://peluang-images.s3.ap-southeast-1.amazonaws.com/GYU-RIH/Artboard+5+(1).png",
    category: "Food & Beverages",
    type: "Semi-Autopilot",
    bepMonths: 12,
    rating: 4.2,
    packages: createDefaultPackages(100000000),
  },
  {
    id: "f5f7d018-b44e-40cf-9386-f039df00750c",
    name: "Studio Potong",
    slug: "studio-potong",
    logoUrl: "https://peluang-images.s3.ap-southeast-1.amazonaws.com/Studiopotong/LOGO+SP+WHITE+(1).jpg",
    category: "Beauty/Self Care",
    type: "Semi-Autopilot",
    bepMonths: 12,
    rating: 4.1,
    packages: createDefaultPackages(240000000),
  },
  {
    id: "6aea450d-b849-446e-b726-399181862110",
    name: "Roti Ropi",
    slug: "roti-ropi",
    logoUrl: "https://peluang-images.s3.ap-southeast-1.amazonaws.com/RotiRopi/logo+ropi.jpg",
    category: "Food & Beverages",
    type: "Semi-Autopilot",
    bepMonths: 12,
    rating: 4.0,
    packages: createDefaultPackages(165000000),
  },
  {
    id: "3d69b836-94de-46e5-8410-bf64276910b2",
    name: "Barburger",
    slug: "barburger",
    logoUrl: "https://peluang-images.s3.ap-southeast-1.amazonaws.com/BARBURGER/new-logo.png",
    category: "Food & Beverages",
    type: "Semi-Autopilot",
    bepMonths: 12,
    isTopMerchant: true,
    rating: 4.9,
    packages: createDefaultPackages(123000000),
  },
  {
    id: "e3c58962-9ffb-400b-8523-627f18d891d9",
    name: "Crispyku",
    slug: "crispyku",
    logoUrl: "https://peluang-images.s3.ap-southeast-1.amazonaws.com/Crispyku/Crispyku.png",
    category: "Food & Beverages",
    type: "Semi-Autopilot",
    bepMonths: 12,
    isTopMerchant: true,
    rating: 4.8,
    packages: createDefaultPackages(22000000),
  },
  {
    id: "9f2289ea-01ab-49a7-9701-9c077818271e",
    name: "KANE FRIED CHICKEN",
    slug: "kane-fried-chicken",
    logoUrl: "https://peluang-images.s3.ap-southeast-1.amazonaws.com/KANE+FRIED+CHICKEN/logo+kane.jpg",
    category: "Food & Beverages",
    type: "Semi-Autopilot",
    bepMonths: 12,
    rating: 4.7,
    packages: createDefaultPackages(22000000),
  },
  {
    id: "2b06e722-6031-4c38-8dc9-3694645900b1",
    name: "MIE AYAM BENGKEL",
    slug: "mie-ayam-bengkel",
    logoUrl: "https://peluang-images.s3.ap-southeast-1.amazonaws.com/MIE+AYAM+BENGKEL/PHOTO-2024-04-19-15-33-50.jpg",
    category: "Food & Beverages",
    type: "Semi-Autopilot",
    bepMonths: 12,
    rating: 4.6,
    packages: createDefaultPackages(35000000),
  },
  {
    id: "b6a453df-51da-48df-95e8-b5a8cdaa044f",
    name: "MIE AYAM + BAKSO BENGKEL",
    slug: "mie-ayam-bakso-bengkel",
    logoUrl: "https://placehold.co/500x400.png?text=Mie+Ayam",
    category: "Food & Beverages",
    type: "Semi-Autopilot",
    bepMonths: 12,
    rating: 4.5,
    packages: createDefaultPackages(100000000),
  },
  {
    id: "c0012a74-627d-4b9b-bc4c-d461acb9924e",
    name: "Ayam penyet cobek kaisar",
    slug: "ayam-penyet-cobek-kaisar",
    logoUrl: "https://placehold.co/500x400.png?text=Ayam+Penyet",
    category: "Food & Beverages",
    type: "Semi-Autopilot",
    bepMonths: 12,
    rating: 4.4,
    packages: createDefaultPackages(100000000),
  },
  {
    id: "5c23d972-8ca7-4765-a53f-b6cca31c6860",
    name: "Jalakoteku",
    slug: "jalakoteku",
    logoUrl: "https://peluang-images.s3.ap-southeast-1.amazonaws.com/JALAKOTEKU/LOGO+UTAMA.png",
    category: "Food & Beverages",
    type: "Semi-Autopilot",
    bepMonths: 12,
    rating: 4.3,
    packages: createDefaultPackages(4400000),
  },
  {
    id: "f586aca3-865b-4756-9b2d-74514c1f7d02",
    name: "Misnow",
    slug: "misnow",
    logoUrl: "https://peluang-images.s3.ap-southeast-1.amazonaws.com/MISNOW/logo+msinow.png",
    category: "Food & Beverages",
    type: "Semi-Autopilot",
    bepMonths: 12,
    rating: 4.2,
    packages: createDefaultPackages(115000000),
  },
  {
    id: "ced37ec6-03bc-496b-8316-4c7dc1ab5987",
    name: "Chick e'Nin",
    slug: "chick-e-nin",
    logoUrl: "https://peluang-images.s3.ap-southeast-1.amazonaws.com/Chic+e_+Nin/61b0478b52e45.webp",
    category: "Food & Beverages",
    type: "Semi-Autopilot",
    bepMonths: 12,
    rating: 4.1,
    packages: createDefaultPackages(9000000),
  },
  {
    id: "6b1c3099-a764-4f7d-8408-00239cacee5b",
    name: "Ghanisa Clinic & Skincare",
    slug: "ghanisa-clinic-skincare",
    logoUrl: "https://placehold.co/500x400.png?text=Ghanisa",
    category: "Beauty/Self Care",
    type: "Auto Pilot",
    bepMonths: 12,
    rating: 4.2,
    packages: createDefaultPackages(250000000),
  },
];

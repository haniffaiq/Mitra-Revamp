export interface MerchantProps {
  id: string;
  name: string;
  category: string;
  logo: string;
  bep: string;
  price: string;
  rating?: number;
  type: string;
}

export const DUMMY_MERCHANTS: MerchantProps[] = [
  {
    id: "1",
    name: "Kebuli Abuya",
    logo: "https://peluang-images.s3.ap-southeast-1.amazonaws.com/Kebuli+Abuya/Logo-Kebuli+ABUYA+(1).jpg",
    category: "Food & Beverages",
    type: "Self Managed",
    bep: "12 Bulan",
    rating: 4.9,
    price: "Rp.90.000.000"
  },
  {
    id: "2",
    name: "Tohang's Barber",
    logo: "https://peluang-images.s3.ap-southeast-1.amazonaws.com/Tohang/logo3+1.png",
    category: "Beauty/Self Care",
    type: "Semi-Autopilot",
    bep: "12 Bulan",
    rating: 4.8,
    price: "Rp.256.000.000"
  },
  {
    id: "3",
    name: "Balkan Shawarma",
    logo: "https://peluang-images.s3.ap-southeast-1.amazonaws.com/Balkan/balkan+logo.jpg",
    category: "Food & Beverages",
    type: "Full-Autopilot",
    bep: "12 Bulan",
    rating: 4.7,
    price: "Rp.59.000.000"
  },
  {
    id: "4",
    name: "Autoclean Waterless",
    logo: "https://peluang-images.s3.ap-southeast-1.amazonaws.com/Autoclean/autoclean+logo.png",
    category: "Automotive",
    type: "Full-Autopilot",
    bep: "12 Bulan",
    rating: 4.6,
    price: "Rp.98.000.000"
  },
  {
    id: "6",
    name: "Sukayaki",
    logo: "https://peluang-images.s3.ap-southeast-1.amazonaws.com/Sukayaki/sukayaki-logo(2)+(2).png",
    category: "Food & Beverages",
    type: "Semi-Autopilot",
    bep: "12 Bulan",
    rating: 4.5,
    price: "Rp.9.888.888"
  },
  {
    id: "7",
    name: "Kriuk Kriuk",
    logo: "https://peluang-images.s3.ap-southeast-1.amazonaws.com/Kriuk-Kriuk/LOGO+PNG+(1).png",
    category: "Food & Beverages",
    type: "Semi-Autopilot",
    bep: "12 Bulan",
    rating: 4.4,
    price: "Rp.40.000.000"
  },
  {
    id: "8",
    name: "BongOBong",
    logo: "https://peluang-images.s3.ap-southeast-1.amazonaws.com/BongoBong/Artboard+4+logo.png",
    category: "Food & Beverages",
    type: "Semi-Autopilot",
    bep: "12 Bulan",
    rating: 4.3,
    price: "Rp.600.000.000"
  },
  {
    id: "9",
    name: "GYU-RIH",
    logo: "https://peluang-images.s3.ap-southeast-1.amazonaws.com/GYU-RIH/Artboard+5+(1).png",
    category: "Food & Beverages",
    type: "Semi-Autopilot",
    bep: "12 Bulan",
    rating: 4.2,
    price: "Rp.100.000.000"
  },
  {
    id: "10",
    name: "Studio Potong",
    logo: "https://peluang-images.s3.ap-southeast-1.amazonaws.com/Studiopotong/LOGO+SP+WHITE+(1).jpg",
    category: "Beauty/Self Care",
    type: "Semi-Autopilot",
    bep: "12 Bulan",
    rating: 4.1,
    price: "Rp.240.000.000"
  },
  {
    id: "11",
    name: "Roti Ropi",
    logo: "https://peluang-images.s3.ap-southeast-1.amazonaws.com/RotiRopi/logo+ropi.jpg",
    category: "Food & Beverages",
    type: "Semi-Autopilot",
    bep: "12 Bulan",
    rating: 4.0,
    price: "Rp.165.000.000"
  },
  {
    id: "12",
    name: "Barburger",
    logo: "https://peluang-images.s3.ap-southeast-1.amazonaws.com/BARBURGER/new-logo.png",
    category: "Food & Beverages",
    type: "Semi-Autopilot",
    bep: "12 Bulan",
    rating: 4.9,
    price: "Rp.123.000.000"
  },
  {
    id: "13",
    name: "Crispyku",
    logo: "https://peluang-images.s3.ap-southeast-1.amazonaws.com/Crispyku/Crispyku.png",
    category: "Food & Beverages",
    type: "Semi-Autopilot",
    bep: "12 Bulan",
    rating: 4.8,
    price: "Rp.22.000.000"
  },
  {
    id: "14",
    name: "KANE FRIED CHICKEN",
    logo: "https://peluang-images.s3.ap-southeast-1.amazonaws.com/KANE+FRIED+CHICKEN/logo+kane.jpg",
    category: "Food & Beverages",
    type: "Semi-Autopilot",
    bep: "12 Bulan",
    rating: 4.7,
    price: "Rp.22.000.000"
  },
  {
    id: "15",
    name: "MIE AYAM BENGKEL",
    logo: "https://peluang-images.s3.ap-southeast-1.amazonaws.com/MIE+AYAM+BENGKEL/PHOTO-2024-04-19-15-33-50.jpg",
    category: "Food & Beverages",
    type: "Semi-Autopilot",
    bep: "12 Bulan",
    rating: 4.6,
    price: "Rp.35.000.000"
  },
  {
    id: "16",
    name: "MIE AYAM + BAKSO BENGKEL",
    logo: "https://placehold.co/500x400.png?text=Mie+Ayam",
    category: "Food & Beverages",
    type: "Semi-Autopilot",
    bep: "12 Bulan",
    rating: 4.5,
    price: "Rp.100.000.000"
  },
  {
    id: "17",
    name: "Ayam penyet cobek kaisar",
    logo: "https://placehold.co/500x400.png?text=Ayam+Penyet",
    category: "Food & Beverages",
    type: "Semi-Autopilot",
    bep: "12 Bulan",
    rating: 4.4,
    price: "Rp.100.000.000"
  },
  {
    id: "18",
    name: "Jalakoteku",
    logo: "https://peluang-images.s3.ap-southeast-1.amazonaws.com/JALAKOTEKU/LOGO+UTAMA.png",
    category: "Food & Beverages",
    type: "Semi-Autopilot",
    bep: "12 Bulan",
    rating: 4.3,
    price: "Rp.4.400.000"
  },
  {
    id: "19",
    name: "Misnow",
    logo: "https://peluang-images.s3.ap-southeast-1.amazonaws.com/MISNOW/logo+msinow.png",
    category: "Food & Beverages",
    type: "Semi-Autopilot",
    bep: "12 Bulan",
    rating: 4.2,
    price: "Rp.115.000.000"
  },
  {
    id: "20",
    name: "Chick e'Nin",
    logo: "https://peluang-images.s3.ap-southeast-1.amazonaws.com/Chic+e_+Nin/61b0478b52e45.webp",
    category: "Food & Beverages",
    type: "Semi-Autopilot",
    bep: "12 Bulan",
    rating: 4.1,
    price: "Rp.9.000.000"
  },
  {
    id: "21",
    name: "Ghanisa Clinic & Skincare",
    logo: "https://placehold.co/500x400.png?text=Ghanisa",
    category: "Beauty/Self Care",
    type: "Auto Pilot",
    bep: "12 Bulan",
    rating: 4.2,
    price: "Rp.250.000.000"
  }
];

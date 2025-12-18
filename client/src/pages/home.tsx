import { useState } from "react";
import { Link, useRoute } from "wouter";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MerchantCard, MerchantProps } from "@/components/merchant-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, ArrowRight, TrendingUp } from "lucide-react";
import heroImage from "@assets/generated_images/professional_business_partnership_banner_showing_growth_and_success.png";
import kebabLogo from "@assets/generated_images/logo_for_a_kebab_franchise.png";
import coffeeLogo from "@assets/generated_images/logo_for_a_coffee_shop_franchise.png";
import laundryLogo from "@assets/generated_images/logo_for_a_laundry_franchise.png";
import burgerLogo from "@assets/generated_images/logo_for_a_burger_franchise.png";

const SAMPLE_MERCHANTS: MerchantProps[] = [
  { id: "1", name: "Kebuli Abuya", category: "Food & Beverages", logo: kebabLogo, bep: "8-12 Bulan", price: "Rp 50.000.000", type: "Self Managed", rating: 4.8 },
  { id: "2", name: "Kopi Senja", category: "Coffee Shop", logo: coffeeLogo, bep: "10-14 Bulan", price: "Rp 85.000.000", type: "Auto Pilot", rating: 4.9 },
  { id: "3", name: "Clean & Fresh", category: "Services", logo: laundryLogo, bep: "12-18 Bulan", price: "Rp 120.000.000", type: "Self Managed", rating: 4.7 },
  { id: "4", name: "Burger Bros", category: "Food & Beverages", logo: burgerLogo, bep: "6-10 Bulan", price: "Rp 45.000.000", type: "Self Managed", rating: 4.6 },
  { id: "5", name: "Tohang's Barber", category: "Services", logo: kebabLogo, bep: "12 Bulan", price: "Rp 60.000.000", type: "Self Managed", rating: 4.5 },
  { id: "6", name: "Balkan Shawarma", category: "Food & Beverages", logo: kebabLogo, bep: "10 Bulan", price: "Rp 55.000.000", type: "Auto Pilot", rating: 4.8 },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-8 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background pointer-events-none -z-10" />
        
        <div className="container mx-auto px-4 md:px-6 space-y-8">
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-2 flex flex-col md:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Cari nama merchant..." className="pl-9 bg-transparent border-transparent focus-visible:ring-0" />
            </div>
            <div className="h-px md:h-10 md:w-px bg-border my-2 md:my-0" />
            <div className="flex gap-2 p-1 overflow-x-auto">
               <Select>
                <SelectTrigger className="w-[140px] border-none bg-secondary/50 hover:bg-secondary focus:ring-0 rounded-lg">
                  <SelectValue placeholder="Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fnb">F&B</SelectItem>
                  <SelectItem value="service">Services</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[140px] border-none bg-secondary/50 hover:bg-secondary focus:ring-0 rounded-lg">
                  <SelectValue placeholder="Budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">&lt; 50 Juta</SelectItem>
                  <SelectItem value="mid">50 - 100 Juta</SelectItem>
                  <SelectItem value="high">&gt; 100 Juta</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-lg px-6 shadow-md">
                Cari
              </Button>
            </div>
          </div>

          {/* Banner */}
          <div className="relative rounded-3xl overflow-hidden aspect-[21/9] md:aspect-[3/1] shadow-2xl group">
            <img src={heroImage} alt="Hero Banner" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/40 to-transparent flex items-center px-8 md:px-16">
              <div className="max-w-lg space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 text-white text-xs font-medium">
                  <TrendingUp size={12} />
                  <span>Trending 2025</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                  Bisnis Autopilot <br/> 
                  <span className="text-accent">100% Keuntungan</span>
                </h1>
                <p className="text-white/90 text-sm md:text-base max-w-md">
                  Mulai bisnismu sekarang dengan dukungan penuh dari tim ahli kami. Tanpa ribet, langsung profit.
                </p>
                <Button variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white hover:text-primary mt-4 backdrop-blur-sm">
                  Pelajari Lebih Lanjut
                </Button>
              </div>
            </div>
          </div>
          
          {/* Promo Bar */}
          <div className="bg-white border border-border rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingUp className="text-primary w-5 h-5" />
              </div>
              <p className="text-sm font-medium">Ingin lebih mudah bermitra dengan Merchant? Daftarkan diri kamu di Peluang!</p>
            </div>
            <Button size="sm" className="bg-foreground text-background hover:bg-primary hover:text-white">Daftar Sekarang</Button>
          </div>
        </div>
      </section>

      {/* Merchant Eksklusif */}
      <section className="py-12 bg-secondary/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">Merchant Eksklusif</h2>
            <Link href="#">
              <a className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                Lihat Semua <ArrowRight size={14} />
              </a>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {SAMPLE_MERCHANTS.slice(0, 4).map((merchant) => (
              <MerchantCard key={merchant.id} merchant={merchant} />
            ))}
          </div>
        </div>
      </section>

      {/* Rekomendasi Kami */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold text-foreground mb-8">Rekomendasi Kami</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {SAMPLE_MERCHANTS.slice(2, 6).map((merchant) => (
              <MerchantCard key={`rec-${merchant.id}`} merchant={merchant} />
            ))}
          </div>
        </div>
      </section>

      {/* Temukan Merchant Lainnya */}
      <section className="py-12 pb-24 bg-secondary/20">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Temukan Merchant Lainnya</h2>
          
          <Tabs defaultValue="all" className="w-full mb-8">
            <div className="flex justify-center">
              <TabsList className="bg-background/50 backdrop-blur-sm border border-border p-1 h-auto">
                <TabsTrigger value="all" className="rounded-md px-4 py-2 text-sm">Semua</TabsTrigger>
                <TabsTrigger value="fnb" className="rounded-md px-4 py-2 text-sm">Food & Beverages</TabsTrigger>
                <TabsTrigger value="daily" className="rounded-md px-4 py-2 text-sm">Daily Needs</TabsTrigger>
                <TabsTrigger value="health" className="rounded-md px-4 py-2 text-sm">Health</TabsTrigger>
                <TabsTrigger value="beauty" className="rounded-md px-4 py-2 text-sm">Beauty/Self Care</TabsTrigger>
              </TabsList>
            </div>
          </Tabs>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
             {SAMPLE_MERCHANTS.map((merchant) => (
              <MerchantCard key={`find-${merchant.id}`} merchant={merchant} />
            ))}
            {SAMPLE_MERCHANTS.slice(0, 2).map((merchant) => (
              <MerchantCard key={`find-more-${merchant.id}`} merchant={merchant} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button variant="outline" className="gap-2">
              Lihat Lebih Banyak <ArrowRight size={14} />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

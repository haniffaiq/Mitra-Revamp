import { useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MerchantCard } from "@/components/merchant-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Search, ArrowRight, TrendingUp, Coffee, Dumbbell } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { ClientCarouselSlide, ClientHomeResponse, fetchJson } from "@/lib/api";

const FALLBACK_CAROUSEL_SLIDES: ClientCarouselSlide[] = [
  {
    id: "fallback-1",
    image: "https://placehold.co/1600x720/png?text=Bisnis+Autopilot",
    tag: "Trending 2025",
    icon: "trending-up",
    title: "Bisnis Autopilot",
    highlight: "100% Keuntungan",
    description: "Mulai bisnismu sekarang dengan dukungan penuh dari tim ahli kami. Tanpa ribet, langsung profit.",
    color: "from-primary/95 via-primary/60",
    ctaLabel: "Pelajari Lebih Lanjut",
    ctaHref: "/merchants",
  },
  {
    id: "fallback-2",
    image: "https://placehold.co/1600x720/png?text=Waralaba+Kopi",
    tag: "F&B Terlaris",
    icon: "coffee",
    title: "Waralaba Kopi",
    highlight: "ROI Tinggi",
    description: "Bergabung dengan jaringan coffee shop dengan pertumbuhan tercepat di Indonesia. Konsep modern & diminati.",
    color: "from-amber-900/95 via-amber-800/60",
    ctaLabel: "Lihat Merchant",
    ctaHref: "/merchants?category=Food%20%26%20Beverage",
  },
  {
    id: "fallback-3",
    image: "https://placehold.co/1600x720/png?text=Pusat+Kebugaran",
    tag: "Gaya Hidup Sehat",
    icon: "dumbbell",
    title: "Pusat Kebugaran",
    highlight: "Member Setia",
    description: "Bisnis gym modern dengan peralatan premium. Peluang emas di industri kesehatan yang sedang naik daun.",
    color: "from-slate-900/95 via-slate-800/60",
    ctaLabel: "Eksplor Merchant",
    ctaHref: "/merchants?category=Fitness",
  },
];

const ICON_MAP = {
  "trending-up": TrendingUp,
  coffee: Coffee,
  dumbbell: Dumbbell,
} as const;

export default function Home() {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["client-home"],
    queryFn: () => fetchJson<ClientHomeResponse>("/api/client/home"),
  });

  const topMerchants = data?.topMerchants ?? [];
  const recommendedMerchants = data?.recommendedMerchants ?? [];
  const otherMerchants = data?.otherMerchants ?? [];
  const categories = data?.merchantFilters.categories ?? [];
  const carouselSlides = data?.carouselSlides?.length ? data.carouselSlides : FALLBACK_CAROUSEL_SLIDES;

  function handleCarouselClick(href: string) {
    if (/^https?:\/\//.test(href)) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }
    setLocation(href);
  }

  function handleSearch() {
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set("search", searchTerm.trim());
    if (category) params.set("category", category);
    setLocation(`/merchants${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      <section className="relative pt-6 pb-12 md:pt-8 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background pointer-events-none -z-10" />

        <div className="container mx-auto px-4 md:px-6 space-y-6 md:space-y-8">
          <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-xl md:rounded-2xl shadow-lg border border-white/20 p-3 flex flex-col md:flex-row gap-3 relative z-10">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Cari nama merchant..."
                className="pl-9 bg-transparent border-transparent focus-visible:ring-0 h-10 md:h-auto"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="h-px w-full md:h-10 md:w-px bg-border" />

            <div className="grid grid-cols-2 md:flex gap-2">
              <Select value={category || undefined} onValueChange={(value) => setCategory(value === "all" ? "" : value)}>
                <SelectTrigger className="w-full md:w-[180px] border-none bg-secondary/50 hover:bg-secondary focus:ring-0 rounded-lg h-10 md:h-auto">
                  <SelectValue placeholder="Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua</SelectItem>
                  {categories.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                className="col-span-2 md:col-span-1 bg-primary hover:bg-primary/90 text-white rounded-lg px-6 shadow-md h-10 md:h-auto w-full md:w-auto"
                onClick={handleSearch}
              >
                Cari
              </Button>
            </div>
          </div>

          <Carousel
            plugins={[plugin.current]}
            className="w-full shadow-xl md:shadow-2xl rounded-2xl md:rounded-3xl overflow-hidden"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {carouselSlides.map((slide) => {
                const Icon = ICON_MAP[slide.icon as keyof typeof ICON_MAP] ?? TrendingUp;
                return (
                  <CarouselItem key={slide.id}>
                    <div className="relative aspect-[4/3] sm:aspect-[21/9] md:aspect-[3/1] group">
                      <img src={slide.image} alt={slide.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className={`absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r ${slide.color} to-transparent flex items-end md:items-center p-6 md:px-16`}>
                        <div className="max-w-lg space-y-3 md:space-y-4 w-full">
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 text-white text-[10px] md:text-xs font-medium">
                            <Icon size={12} />
                            <span>{slide.tag}</span>
                          </div>
                          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white leading-tight">
                            {slide.title} <br />
                            <span className="text-accent">{slide.highlight}</span>
                          </h1>
                          <p className="text-white/90 text-xs sm:text-sm md:text-base max-w-md hidden sm:block">{slide.description}</p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full sm:w-auto bg-white/10 text-white border-white/30 hover:bg-white hover:text-primary mt-2 backdrop-blur-sm"
                            onClick={() => handleCarouselClick(slide.ctaHref)}
                          >
                            {slide.ctaLabel}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="left-4 hidden md:flex" />
            <CarouselNext className="right-4 hidden md:flex" />
          </Carousel>

          <div className="bg-white border border-border rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                <TrendingUp className="text-primary w-5 h-5" />
              </div>
              <p className="text-sm font-medium">Ingin lebih mudah bermitra dengan Merchant? <br className="sm:hidden" />Daftarkan diri kamu di Peluang!</p>
            </div>
            <Button size="sm" className="w-full sm:w-auto bg-foreground text-background hover:bg-primary hover:text-white" onClick={() => setLocation("/register")}>
              Daftar Sekarang
            </Button>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12 bg-secondary/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-foreground">Top Merchant</h2>
            <Link href="/merchants">
              <a className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                Lihat Semua <ArrowRight size={14} />
              </a>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {!isLoading && topMerchants.slice(0, 8).map((merchant) => <MerchantCard key={merchant.id} merchant={merchant} />)}
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 md:mb-8">Rekomendasi Kami</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {!isLoading && recommendedMerchants.slice(0, 4).map((merchant) => <MerchantCard key={`rec-${merchant.id}`} merchant={merchant} />)}
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12 pb-20 md:pb-24 bg-secondary/20">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 md:mb-8 text-center">Temukan Merchant Lainnya</h2>

          <Tabs defaultValue="all" className="w-full mb-8">
            <div className="flex justify-center overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 hide-scrollbar">
              <TabsList className="bg-background/50 backdrop-blur-sm border border-border p-1 h-auto flex-nowrap inline-flex w-max sm:w-auto">
                <TabsTrigger value="all" className="rounded-md px-3 py-2 md:px-4 text-xs md:text-sm whitespace-nowrap">Semua</TabsTrigger>
                {categories.slice(0, 4).map((item) => (
                  <TabsTrigger key={item} value={item} className="rounded-md px-3 py-2 md:px-4 text-xs md:text-sm whitespace-nowrap">
                    {item}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </Tabs>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {!isLoading && otherMerchants.slice(0, 8).map((merchant) => <MerchantCard key={`find-${merchant.id}`} merchant={merchant} />)}
          </div>

          <div className="mt-8 md:mt-12 text-center">
            <Button variant="outline" className="w-full sm:w-auto gap-2" onClick={() => setLocation("/merchants")}>
              Lihat Lebih Banyak <ArrowRight size={14} />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

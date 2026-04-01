import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MerchantCard } from "@/components/merchant-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X } from "lucide-react";
import { DUMMY_MERCHANTS, getMerchantMaxPrice, getMerchantMinPrice } from "@/data/merchants";

export default function Merchants() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 500]); // In Millions

  // Filter Logic
  const filteredMerchants = DUMMY_MERCHANTS
    .filter((merchant) => {
      const matchesSearch = merchant.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === "all" || merchant.category === categoryFilter;
      const matchesType = typeFilter === "all" || merchant.type === typeFilter;

      const minPriceValue = getMerchantMinPrice(merchant) / 1000000;
      const maxPriceValue = getMerchantMaxPrice(merchant) / 1000000;
      const matchesPrice = maxPriceValue >= priceRange[0] && minPriceValue <= priceRange[1];

      return matchesSearch && matchesCategory && matchesType && matchesPrice;
    })
    .sort((a, b) => getMerchantMinPrice(a) - getMerchantMinPrice(b));

  const categories = Array.from(new Set(DUMMY_MERCHANTS.map(m => m.category)));
  const types = Array.from(new Set(DUMMY_MERCHANTS.map(m => m.type)));

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      
      {/* Header */}
      <section className="bg-secondary/30 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Merchant Kami</h1>
          <p className="text-muted-foreground max-w-2xl">
            Temukan berbagai peluang bisnis franchise terbaik yang telah terkurasi untuk kesuksesan Anda.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <div className="lg:w-1/4 space-y-6">
            <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Filter size={18} /> Filter
                </h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-auto p-0 text-muted-foreground hover:text-primary"
                  onClick={() => {
                    setCategoryFilter("all");
                    setTypeFilter("all");
                    setPriceRange([0, 500]);
                    setSearchTerm("");
                  }}
                >
                  Reset
                </Button>
              </div>

              <div className="space-y-6">
                {/* Search Mobile (if needed inside filter) or just keep desktop style */}
                
                {/* Category */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Kategori</label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Semua Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Kategori</SelectItem>
                      {categories.map(c => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Type */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tipe Kemitraan</label>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Semua Tipe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Tipe</SelectItem>
                      {types.map(t => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Budget (Juta)</label>
                    <span className="text-xs text-muted-foreground">
                      {priceRange[0]}jt - {priceRange[1]}jt+
                    </span>
                  </div>
                  <Slider 
                    defaultValue={[0, 500]} 
                    max={500} 
                    step={10} 
                    value={priceRange} 
                    onValueChange={setPriceRange}
                    className="py-4"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4 space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Cari nama merchant..." 
                className="pl-10 h-12 text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Active Filters Display */}
            {(categoryFilter !== "all" || typeFilter !== "all" || searchTerm) && (
              <div className="flex flex-wrap gap-2">
                {searchTerm && (
                  <Badge variant="secondary" className="gap-1 pl-2 pr-1 py-1">
                    "{searchTerm}" <X size={14} className="cursor-pointer hover:text-destructive" onClick={() => setSearchTerm("")} />
                  </Badge>
                )}
                {categoryFilter !== "all" && (
                  <Badge variant="secondary" className="gap-1 pl-2 pr-1 py-1">
                    {categoryFilter} <X size={14} className="cursor-pointer hover:text-destructive" onClick={() => setCategoryFilter("all")} />
                  </Badge>
                )}
                {typeFilter !== "all" && (
                  <Badge variant="secondary" className="gap-1 pl-2 pr-1 py-1">
                    {typeFilter} <X size={14} className="cursor-pointer hover:text-destructive" onClick={() => setTypeFilter("all")} />
                  </Badge>
                )}
              </div>
            )}

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredMerchants.length > 0 ? (
                filteredMerchants.map((merchant) => (
                  <MerchantCard key={merchant.id} merchant={merchant} />
                ))
              ) : (
                <div className="col-span-full py-12 text-center text-muted-foreground bg-secondary/20 rounded-xl border border-dashed border-border">
                  <p className="text-lg font-medium">Tidak ada merchant ditemukan</p>
                  <p className="text-sm">Coba sesuaikan filter pencarian Anda</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}

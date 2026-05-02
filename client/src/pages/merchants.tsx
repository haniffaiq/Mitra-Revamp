import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MerchantCard, MerchantCardSkeleton } from "@/components/merchant-card";
import { JsonLd, buildBreadcrumb } from "@/components/json-ld";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X } from "lucide-react";
import { ClientMerchantListResponse, fetchJson } from "@/lib/api";

export default function Merchants() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [officialOnly, setOfficialOnly] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialSearch = params.get("search") ?? params.get("q");
    const initialCategory = params.get("category");
    if (initialSearch) setSearchTerm(initialSearch);
    if (initialCategory) setCategoryFilter(initialCategory);
    if (params.get("official") === "1") setOfficialOnly(true);
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["client-merchants", searchTerm, categoryFilter, typeFilter, priceRange[0], priceRange[1], page],
    queryFn: () => {
      const params = new URLSearchParams();
      if (searchTerm.trim()) params.set("search", searchTerm.trim());
      if (categoryFilter !== "all") params.set("category", categoryFilter);
      if (typeFilter !== "all") params.set("type", typeFilter);
      params.set("min_price", String(priceRange[0] * 1000000));
      params.set("max_price", String(priceRange[1] * 1000000));
      params.set("page", String(page));
      params.set("page_size", "12");
      params.set("sort_by", "min_price");
      params.set("sort_order", "asc");
      return fetchJson<ClientMerchantListResponse>(`/api/client/merchants?${params.toString()}`);
    },
  });

  const merchants = (data?.data ?? []).filter((m) => (officialOnly ? m.isOfficialPartner : true));
  const categories = data?.filters.categories ?? [];
  const types = data?.filters.types ?? [];

  return (
    <div className="min-h-screen bg-background font-sans">
      <JsonLd data={buildBreadcrumb([
        { name: "Beranda", url: "https://mitranesia.id/" },
        { name: "Merchant", url: "https://mitranesia.id/merchants" },
      ])} />
      <Navbar />

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
                    setOfficialOnly(false);
                    setPage(1);
                  }}
                >
                  Reset
                </Button>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Kategori</label>
                  <Select value={categoryFilter} onValueChange={(value) => { setCategoryFilter(value); setPage(1); }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Semua Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Kategori</SelectItem>
                      {categories.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Tipe Kemitraan</label>
                  <Select value={typeFilter} onValueChange={(value) => { setTypeFilter(value); setPage(1); }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Semua Tipe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Tipe</SelectItem>
                      {types.map((t) => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
                  <input
                    type="checkbox"
                    checked={officialOnly}
                    onChange={(e) => { setOfficialOnly(e.target.checked); setPage(1); }}
                    className="rounded border-input"
                  />
                  Official Partner only
                </label>

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
                    onValueChange={(value) => { setPriceRange(value); setPage(1); }}
                    className="py-4"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-3/4 space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Cari nama merchant..."
                className="pl-10 h-12 text-base"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
              />
            </div>

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

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => <MerchantCardSkeleton key={`merchants-skel-${i}`} />)
              ) : merchants.length > 0 ? (
                merchants.map((merchant) => <MerchantCard key={merchant.id} merchant={merchant} />)
              ) : (
                <div className="col-span-full py-12 text-center text-muted-foreground bg-secondary/20 rounded-xl border border-dashed border-border">
                  <p className="text-lg font-medium">Tidak ada merchant ditemukan</p>
                  <p className="text-sm">Coba sesuaikan filter pencarian Anda</p>
                </div>
              )}
            </div>

            {data && data.meta.total_pages > 1 && (
              <div className="flex items-center justify-center gap-3">
                <Button variant="outline" disabled={page <= 1} onClick={() => setPage((value) => value - 1)}>
                  Sebelumnya
                </Button>
                <span className="text-sm text-muted-foreground">
                  Halaman {data.meta.page} dari {data.meta.total_pages}
                </span>
                <Button variant="outline" disabled={page >= data.meta.total_pages} onClick={() => setPage((value) => value + 1)}>
                  Berikutnya
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

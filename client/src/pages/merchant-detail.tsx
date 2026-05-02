import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useRoute } from "wouter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Star, Share2, CheckCircle2, Info, BadgeCheck } from "lucide-react";
import heroImage from "@assets/generated_images/professional_business_partnership_banner_showing_growth_and_success.png";
import NotFound from "@/pages/not-found";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth";
import { ClientMerchant, ClientMerchantReview, DetailResponse, fetchJson, fetchMerchantReviews, postJson, submitMerchantReview } from "@/lib/api";
import { formatIdr, formatPriceRange, getPackagePriceRange } from "@/lib/utils";
import { JsonLd, buildBreadcrumb } from "@/components/json-ld";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { ShieldCheck } from "lucide-react";

export default function MerchantDetail() {
  const [, params] = useRoute("/merchant/:id");
  const [, setLocation] = useLocation();
  const id = params?.id;
  const { token, user } = useAuth();
  const { toast } = useToast();
  const [selectedPackageId, setSelectedPackageId] = useState("");
  const [message, setMessage] = useState("");
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewName, setReviewName] = useState("");
  const [reviewEmail, setReviewEmail] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");

  const { data: merchant, isLoading, isError } = useQuery({
    queryKey: ["client-merchant-detail", id],
    queryFn: () => fetchJson<ClientMerchant>(`/api/client/merchants/${id}`),
    enabled: Boolean(id),
  });

  const reviewsQuery = useQuery({
    queryKey: ["client-merchant-reviews", id],
    queryFn: () => fetchMerchantReviews(id!),
    enabled: Boolean(id),
  });

  const reviewMutation = useMutation({
    mutationFn: () => submitMerchantReview(id!, {
      reviewerName: reviewName.trim(),
      reviewerEmail: reviewEmail.trim() || null,
      rating: reviewRating,
      comment: reviewComment.trim() || null,
    }),
    onSuccess: () => {
      toast({ title: "Ulasan dikirim", description: "Akan tampil setelah disetujui admin." });
      setReviewOpen(false);
      setReviewName("");
      setReviewEmail("");
      setReviewRating(5);
      setReviewComment("");
    },
    onError: (e) => toast({ title: "Gagal kirim", description: String(e), variant: "destructive" }),
  });

  const selectedPackage = useMemo(() => {
    if (!merchant) return undefined;
    return merchant.packages.find((pkg) => pkg.id === selectedPackageId) ?? merchant.packages[0];
  }, [merchant, selectedPackageId]);

  const merchantPriceRange = useMemo(() => {
    if (!merchant) return undefined;
    return getPackagePriceRange(merchant.packages);
  }, [merchant]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [id]);

  useEffect(() => {
    if (merchant) {
      setSelectedPackageId(merchant.packages[0]?.id ?? "");
    }
  }, [merchant]);

  const inquiryMutation = useMutation({
    mutationFn: async (inquiryType: string) => {
      if (!merchant) throw new Error("Merchant tidak ditemukan");
      return postJson<DetailResponse<{ id: string }>>(
        "/api/client/merchant-inquiries",
        {
          merchant_id: merchant.id,
          package_name: selectedPackage?.name,
          inquiry_type: inquiryType,
          message,
        },
        token ?? undefined,
      );
    },
    onSuccess: () => {
      setMessage("");
      toast({
        title: "Permintaan terkirim",
        description: "Tim Mitranesia akan menindaklanjuti minat Anda ke merchant ini.",
      });
    },
    onError: (error) => {
      toast({
        title: "Gagal mengirim permintaan",
        description: error instanceof Error ? error.message : "Terjadi kesalahan.",
      });
    },
  });

  function handleInquiry(inquiryType: string) {
    if (!token) {
      setLocation(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }
    inquiryMutation.mutate(inquiryType);
  }

  if (isError) return <NotFound />;
  if (!merchant) return null;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: merchant.name,
    image: merchant.logoUrl,
    category: merchant.category,
    brand: { "@type": "Brand", name: merchant.name },
    aggregateRating: (merchant.reviewCount && merchant.reviewCount > 0)
      ? { "@type": "AggregateRating", ratingValue: merchant.reviewAverage ?? merchant.rating ?? 5, ratingCount: merchant.reviewCount, bestRating: 5 }
      : merchant.rating
        ? { "@type": "AggregateRating", ratingValue: merchant.rating, ratingCount: 1, bestRating: 5 }
        : undefined,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "IDR",
      lowPrice: merchant.minPrice,
      highPrice: merchant.maxPrice,
      offerCount: merchant.packages.length,
      availability: "https://schema.org/InStock",
    },
    description: `Peluang waralaba ${merchant.name} (${merchant.type}) di Mitranesia. BEP estimasi ${merchant.bepMonths} bulan.`,
    url: `https://mitranesia.id/merchant/${merchant.id}`,
  };

  const faqs = [
    {
      q: `Berapa modal awal franchise ${merchant.name}?`,
      a: `Modal mulai dari ${formatIdr(merchant.minPrice)} sampai ${formatIdr(merchant.maxPrice)} tergantung paket yang dipilih (${merchant.packages.length} paket tersedia).`,
    },
    {
      q: `Berapa lama BEP (Break Even Point) franchise ${merchant.name}?`,
      a: `Estimasi BEP ${merchant.bepMonths} bulan berdasar rata-rata performa mitra existing.`,
    },
    {
      q: `Apa tipe kemitraan ${merchant.name}?`,
      a: `${merchant.name} masuk kategori "${merchant.type}" di kategori ${merchant.category}.`,
    },
    {
      q: `Bagaimana cara mendaftar mitra ${merchant.name}?`,
      a: `Klik tombol "Saya Tertarik" di halaman ini, isi form pendaftaran, tim Mitranesia akan menghubungi maks. 1x24 jam dengan informasi lengkap dan jadwal meeting.`,
    },
    ...(merchant.isOfficialPartner
      ? [{
          q: `Apakah ${merchant.name} Official Partner Mitranesia?`,
          a: `Ya, ${merchant.name} adalah Official Partner Mitranesia — telah melalui proses verifikasi legalitas, finansial, dan operasional.`,
        }]
      : []),
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = buildBreadcrumb([
    { name: "Beranda", url: "https://mitranesia.id/" },
    { name: "Merchant", url: "https://mitranesia.id/merchants" },
    { name: merchant.name, url: `https://mitranesia.id/merchant/${merchant.id}` },
  ]);

  return (
    <div className="min-h-screen bg-background font-sans">
      <JsonLd data={productSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <Navbar />

      <div className="container mx-auto px-4 py-4 text-sm text-muted-foreground">
        <Link href="/"><a className="hover:text-primary">Home</a></Link>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">{merchant.name}</span>
      </div>

      <div className="container mx-auto px-4 md:px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-6 md:space-y-8">
            <div className="bg-card rounded-2xl p-5 md:p-8 border border-border shadow-sm">
              <div className="flex flex-col sm:flex-row gap-5 md:gap-6 items-start sm:items-center">
                <div className="w-20 h-20 md:w-32 md:h-32 rounded-full border-4 border-secondary p-1 bg-white shrink-0 mx-auto sm:mx-0 overflow-hidden">
                  <img src={merchant.logoUrl} alt={`Logo ${merchant.name}`} className="w-full h-full object-contain rounded-full" />
                </div>
                <div className="flex-1 space-y-2 w-full text-center sm:text-left">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground w-full sm:w-auto inline-flex items-center gap-2">
                      {merchant.name}
                      {merchant.isOfficialPartner ? (
                        <BadgeCheck size={22} className="shrink-0 text-blue-600" aria-label="Official Partner" />
                      ) : null}
                    </h1>
                    <div className="flex gap-2 hidden sm:flex">
                      <Button variant="ghost" size="icon" className="rounded-full"><Share2 size={18} /></Button>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 md:gap-3 text-xs md:text-sm">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 gap-1 pl-1 pr-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Online
                    </Badge>
                    {merchant.isOfficialPartner ? (
                      <Badge className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50 gap-1">
                        <BadgeCheck size={14} className="text-blue-600" />
                        Official Partner
                      </Badge>
                    ) : null}
                    {merchant.rating && (
                      <div className="flex items-center gap-1 text-yellow-500 font-medium">
                        <Star size={14} className="fill-current" /> {merchant.rating}
                      </div>
                    )}
                    <span className="text-muted-foreground hidden sm:inline">•</span>
                    <span className="text-muted-foreground">{merchant.category}</span>
                    <span className="text-muted-foreground hidden sm:inline">•</span>
                    <span className="text-muted-foreground">{merchant.type}</span>
                  </div>
                  <p className="text-muted-foreground pt-2 leading-relaxed text-sm md:text-base">
                    {selectedPackage?.description ?? "Informasi merchant sedang dimuat."}
                  </p>
                </div>
              </div>
            </div>

            {(() => {
              const galleryImages = (merchant.images ?? []).slice(0, 3);
              const slots = [0, 1, 2];
              return (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  {slots.map((slotIdx) => {
                    const img = galleryImages[slotIdx];
                    const isFirst = slotIdx === 0;
                    const containerClass = `${isFirst ? "col-span-2 md:col-span-1 " : ""}aspect-video rounded-xl overflow-hidden bg-muted relative group cursor-pointer shadow-sm`;
                    if (img) {
                      return (
                        <div key={img.id} className={containerClass}>
                          <img
                            src={img.url}
                            alt={img.label ?? `Gallery ${slotIdx + 1}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          {img.label ? (
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 text-white text-xs font-medium">
                              {img.label}
                            </div>
                          ) : null}
                        </div>
                      );
                    }
                    if (isFirst) {
                      return (
                        <div key={`slot-${slotIdx}`} className={containerClass}>
                          <img src={heroImage} alt="Gallery placeholder" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/20" />
                        </div>
                      );
                    }
                    return (
                      <div key={`slot-${slotIdx}`} className={containerClass}>
                        <div className="w-full h-full bg-secondary/50 flex items-center justify-center text-primary font-medium text-sm md:text-base">
                          {slotIdx === 1 ? "Menu" : "Outlet"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}

            <Tabs defaultValue="about" className="w-full">
              <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar">
                <TabsList className="w-full justify-start border-b border-border bg-transparent p-0 h-auto rounded-none gap-6 inline-flex min-w-max sm:min-w-0">
                  <TabsTrigger value="about" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary px-0 py-3 bg-transparent font-medium text-sm md:text-base shadow-none">Tentang</TabsTrigger>
                  <TabsTrigger value="packages" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary px-0 py-3 bg-transparent font-medium text-sm md:text-base shadow-none">Paket Kemitraan</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="about" className="pt-6 space-y-6">
                <div className="prose prose-sm max-w-none text-muted-foreground">
                  <h3 className="text-foreground font-semibold text-lg">Keunggulan Bermitra</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mt-4">
                    {[
                      "Bahan baku berkualitas premium",
                      "Sistem operasional mudah (SOP Jelas)",
                      "Support marketing nasional",
                      "Harga jual terjangkau, margin tinggi",
                      "Tanpa royalty fee bulanan",
                      "Training karyawan gratis",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm md:text-base">
                        <CheckCircle2 size={18} className="text-primary mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="packages" className="pt-6">
                <div className="grid gap-4 md:grid-cols-2">
                  {merchant.packages.map((pkg) => {
                    const isActive = selectedPackage?.id === pkg.id;
                    return (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setSelectedPackageId(pkg.id)}
                        className={`rounded-xl border p-5 text-left transition-all ${
                          isActive ? "border-primary bg-primary/5 shadow-sm" : "border-border bg-card hover:border-primary/40"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-base font-semibold text-foreground">{pkg.name}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pkg.description}</p>
                          </div>
                          {isActive && <Badge className="bg-primary text-white hover:bg-primary">Dipilih</Badge>}
                        </div>
                        <p className="mt-4 text-lg font-bold text-primary">{formatIdr(pkg.price)}</p>
                      </button>
                    );
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 space-y-6">
              <Card className="border-border shadow-lg overflow-hidden">
                <div className="bg-secondary/30 p-4 border-b border-border">
                  <h3 className="font-semibold text-lg">Pilih Paket Kemitraan</h3>
                </div>
                <div className="p-5 md:p-6 space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Tipe Paket</label>
                    <Select value={selectedPackageId} onValueChange={setSelectedPackageId}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih paket" />
                      </SelectTrigger>
                      <SelectContent>
                        {merchant.packages.map((pkg) => (
                          <SelectItem key={pkg.id} value={pkg.id}>
                            {pkg.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Mulai Dari</p>
                    <p className="text-2xl md:text-3xl font-bold text-primary">
                      {selectedPackage ? formatIdr(selectedPackage.price) : merchantPriceRange ? formatPriceRange(merchantPriceRange.min, merchantPriceRange.max) : "-"}
                    </p>
                    <p className="text-xs text-muted-foreground">BEP {merchant.bepMonths} Bulan</p>
                  </div>

                  {selectedPackage && (
                    <div className="rounded-lg border border-border bg-muted/30 p-3">
                      <p className="text-xs font-semibold text-foreground">{selectedPackage.name}</p>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{selectedPackage.description}</p>
                    </div>
                  )}

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-3">
                    <div className="bg-amber-100 p-1.5 rounded-full h-fit text-amber-600 shrink-0">
                      <Info size={16} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-amber-800">Perlu diperhatikan!</p>
                      <p className="text-[10px] text-amber-700 leading-tight">Biaya diatas belum termasuk biaya sewa lokasi dan renovasi tempat.</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Pesan untuk tim kami</label>
                    <Textarea
                      placeholder={user ? "Tulis kebutuhan atau pertanyaan Anda..." : "Masuk dulu untuk mengirim pertanyaan"}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={!user}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="w-full text-xs sm:text-sm" onClick={() => handleInquiry("buy")} disabled={inquiryMutation.isPending || isLoading}>
                      Beli Sekarang
                    </Button>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white shadow-md text-xs sm:text-sm" onClick={() => handleInquiry("contact")} disabled={inquiryMutation.isPending || isLoading}>
                      Hubungi
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <section className="mt-12 md:mt-16 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Pertanyaan Yang Sering Ditanya</h2>
            <Accordion type="single" collapsible className="bg-card border border-border rounded-xl">
              {faqs.map((f, idx) => (
                <AccordionItem key={idx} value={`faq-${idx}`} className="px-4 md:px-6">
                  <AccordionTrigger className="text-left font-semibold text-sm md:text-base">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <section className="mt-12 md:mt-16 max-w-3xl">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Ulasan Mitra</h2>
                {(merchant.reviewCount ?? 0) > 0 ? (
                  <p className="text-sm text-muted-foreground mt-1">
                    <Star size={14} className="inline fill-yellow-400 text-yellow-400 mr-1" />
                    {merchant.reviewAverage?.toFixed(1) ?? "-"} dari {merchant.reviewCount} ulasan
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground mt-1">Belum ada ulasan. Jadilah yang pertama!</p>
                )}
              </div>
              <Button variant="outline" onClick={() => setReviewOpen((v) => !v)}>
                {reviewOpen ? "Tutup Form" : "Tulis Ulasan"}
              </Button>
            </div>

            {reviewOpen && (
              <Card className="p-4 md:p-6 mb-6 space-y-4 bg-card border border-border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Nama *</label>
                    <Input value={reviewName} onChange={(e) => setReviewName(e.target.value)} placeholder="Nama Anda" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Email (opsional)</label>
                    <Input type="email" value={reviewEmail} onChange={(e) => setReviewEmail(e.target.value)} placeholder="email@contoh.com" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1">Rating *</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setReviewRating(n)}
                        className="p-1 hover:scale-110 transition-transform"
                        aria-label={`Beri rating ${n} bintang`}
                      >
                        <Star
                          size={28}
                          className={n <= reviewRating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Komentar (opsional)</label>
                  <Textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Ceritakan pengalaman Anda dengan merchant ini..."
                    rows={4}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" onClick={() => setReviewOpen(false)} disabled={reviewMutation.isPending}>
                    Batal
                  </Button>
                  <Button
                    onClick={() => reviewMutation.mutate()}
                    disabled={reviewMutation.isPending || reviewName.trim().length < 2}
                  >
                    {reviewMutation.isPending ? "Mengirim..." : "Kirim Ulasan"}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Ulasan akan ditampilkan setelah disetujui admin (max 24 jam).
                </p>
              </Card>
            )}

            <div className="space-y-3">
              {reviewsQuery.isLoading ? (
                <p className="text-sm text-muted-foreground py-4">Memuat ulasan...</p>
              ) : (reviewsQuery.data ?? []).length === 0 ? (
                <p className="text-sm text-muted-foreground py-4">Belum ada ulasan disetujui.</p>
              ) : (
                (reviewsQuery.data ?? []).map((rev: ClientMerchantReview) => (
                  <Card key={rev.id} className="p-4 md:p-5 bg-card border border-border">
                    <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm">{rev.reviewerName}</span>
                        {rev.isVerifiedMitra && (
                          <Badge variant="outline" className="gap-1 text-[10px] bg-blue-50 text-blue-700 border-blue-200">
                            <ShieldCheck size={10} /> Verified Mitra
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(rev.createdAt).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}
                      </span>
                    </div>
                    <div className="flex items-center gap-0.5 text-amber-500 mb-2">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} size={14} fill={i <= rev.rating ? "currentColor" : "none"} />
                      ))}
                    </div>
                    {rev.comment && <p className="text-sm text-foreground whitespace-pre-wrap">{rev.comment}</p>}
                  </Card>
                ))
              )}
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}

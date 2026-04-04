import { Link } from "wouter";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Rocket, Users, BarChart3, ArrowRight, Store, ShieldCheck, ClipboardCheck } from "lucide-react";
import heroImage from "@assets/generated_images/happy_business_owner_analyzing_growth_on_tablet.png";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { DetailResponse, postJson } from "@/lib/api";

export default function BecomeMerchant() {
  const { token, user } = useAuth();
  const { toast } = useToast();
  const [contactName, setContactName] = useState(user?.full_name ?? "");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user) return;
    setContactName((value) => value || user.full_name);
    setEmail((value) => value || user.email);
    setPhone((value) => value || user.phone);
  }, [user]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) {
      window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
      return;
    }
    setIsSubmitting(true);
    try {
      await postJson<DetailResponse<{ id: string }>>(
        "/api/client/merchant-applications",
        {
          contact_name: contactName,
          business_name: businessName,
          email,
          phone,
          category,
          city,
          message,
        },
        token,
      );
      setBusinessName("");
      setCategory("");
      setCity("");
      setMessage("");
      toast({
        title: "Aplikasi terkirim",
        description: "Tim Mitranesia akan menghubungi Anda untuk proses berikutnya.",
      });
    } catch (error) {
      toast({
        title: "Gagal mengirim aplikasi",
        description: error instanceof Error ? error.message : "Terjadi kesalahan.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium backdrop-blur-sm">
                <Rocket size={16} className="text-accent" />
                <span>#PeluangTambahCabang</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Kembangkan Bisnis Franchise Anda Bersama <span className="text-accent">Mitranesia</span>
              </h1>
              <p className="text-lg text-white/80 max-w-xl leading-relaxed">
                Bergabunglah dengan ekosistem waralaba terbesar. Dapatkan akses ke ribuan calon mitra potensial dan sistem manajemen yang terintegrasi.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href={user ? "#merchant-form" : "/register"}>
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-semibold shadow-lg text-lg h-12 px-8">
                    Daftar Jadi Merchant
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
                <img src={heroImage} alt="Happy Business Owner" className="w-full h-auto object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white text-foreground p-4 rounded-xl shadow-xl border border-border hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full text-green-600">
                    <Users size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Total Mitra Bergabung</p>
                    <p className="text-xl font-bold">10,000+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Kenapa Bergabung di Mitranesia?</h2>
            <p className="text-muted-foreground">
              Kami tidak hanya sekedar listing platform, tapi partner pertumbuhan bisnis Anda dengan solusi end-to-end.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Akses ke Ribuan Calon Mitra",
                desc: "Jangkau audiens tertarget yang sedang aktif mencari peluang bisnis franchise di seluruh Indonesia.",
              },
              {
                icon: ShieldCheck,
                title: "Verifikasi & Kredibilitas",
                desc: "Tingkatkan kepercayaan calon mitra dengan badge 'Verified Merchant' dan profil bisnis yang profesional.",
              },
              {
                icon: BarChart3,
                title: "Dashboard Analitik",
                desc: "Pantau performa listing, jumlah leads, dan konversi mitra melalui dashboard yang user-friendly.",
              },
            ].map((feature) => (
              <Card key={feature.title} className="border-border/60 hover:border-primary/30 transition-colors shadow-sm hover:shadow-md">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-2">
                    <feature.icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Langkah Mudah Bergabung</h2>
            <p className="text-muted-foreground">
              Proses registrasi yang simpel dan transparan untuk memulai perjalanan sukses Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-border -z-10 translate-y-4" />
            {[
              {
                step: "01",
                icon: ClipboardCheck,
                title: "Registrasi Online",
                desc: "Isi formulir pendaftaran dan lengkapi profil bisnis Anda.",
              },
              {
                step: "02",
                icon: ShieldCheck,
                title: "Verifikasi Data",
                desc: "Tim kami akan memverifikasi legalitas dan data usaha Anda.",
              },
              {
                step: "03",
                icon: Store,
                title: "Setup Profil",
                desc: "Upload foto, brosur, dan detail paket kemitraan yang menarik.",
              },
              {
                step: "04",
                icon: Rocket,
                title: "Mulai Promosi",
                desc: "Listing Anda tayang dan siap menerima penawaran dari calon mitra.",
              },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center bg-background md:bg-transparent p-6 rounded-xl md:p-0 shadow-sm md:shadow-none">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl mb-6 shadow-lg relative z-10">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="merchant-form" className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">Ajukan Bisnis Anda</h2>
              <p className="text-muted-foreground">
                Form ini dipakai untuk proses awal onboarding merchant ke ekosistem Mitranesia.
              </p>
            </div>
            <Card className="border-border/60 shadow-sm">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="contact_name">Nama PIC</Label>
                    <Input id="contact_name" value={contactName} onChange={(e) => setContactName(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business_name">Nama Bisnis</Label>
                    <Input id="business_name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Nomor WhatsApp</Label>
                    <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Kategori Bisnis</Label>
                    <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Kota</Label>
                    <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} required />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="message">Ceritakan singkat bisnis Anda</Label>
                    <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Ceritakan model bisnis, jumlah cabang, atau target kemitraan Anda." />
                  </div>
                  <div className="md:col-span-2 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      {user ? "Anda sudah login, aplikasi akan dikaitkan ke akun Anda." : "Masuk terlebih dulu untuk mengirim aplikasi merchant."}
                    </p>
                    <Button type="submit" className="bg-primary hover:bg-primary/90 text-white" disabled={isSubmitting}>
                      Kirim Aplikasi
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

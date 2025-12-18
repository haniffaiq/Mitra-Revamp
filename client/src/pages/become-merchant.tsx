import { Link } from "wouter";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Rocket, Users, BarChart3, ArrowRight, Store, ShieldCheck, ClipboardCheck } from "lucide-react";
import heroImage from "@assets/generated_images/happy_business_owner_analyzing_growth_on_tablet.png";

export default function BecomeMerchant() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      
      {/* Hero Section */}
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
                <Link href="/register">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-semibold shadow-lg text-lg h-12 px-8">
                    Daftar Jadi Merchant
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="bg-white/10 text-white border-white/20 hover:bg-white/20 h-12 px-8">
                  Pelajari Skema
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
                <img src={heroImage} alt="Happy Business Owner" className="w-full h-auto object-cover" />
              </div>
              {/* Floating Badge */}
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

      {/* Why Join Section */}
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
                desc: "Jangkau audiens tertarget yang sedang aktif mencari peluang bisnis franchise di seluruh Indonesia."
              },
              {
                icon: ShieldCheck,
                title: "Verifikasi & Kredibilitas",
                desc: "Tingkatkan kepercayaan calon mitra dengan badge 'Verified Merchant' dan profil bisnis yang profesional."
              },
              {
                icon: BarChart3,
                title: "Dashboard Analitik",
                desc: "Pantau performa listing, jumlah leads, dan konversi mitra melalui dashboard yang user-friendly."
              }
            ].map((feature, i) => (
              <Card key={i} className="border-border/60 hover:border-primary/30 transition-colors shadow-sm hover:shadow-md">
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

      {/* Process Steps */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Langkah Mudah Bergabung</h2>
            <p className="text-muted-foreground">
              Proses registrasi yang simpel dan transparan untuk memulai perjalanan sukses Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-border -z-10 translate-y-4" />

            {[
              {
                step: "01",
                icon: ClipboardCheck,
                title: "Registrasi Online",
                desc: "Isi formulir pendaftaran dan lengkapi profil bisnis Anda."
              },
              {
                step: "02",
                icon: ShieldCheck,
                title: "Verifikasi Data",
                desc: "Tim kami akan memverifikasi legalitas dan data usaha Anda."
              },
              {
                step: "03",
                icon: Store,
                title: "Setup Profil",
                desc: "Upload foto, brosur, dan detail paket kemitraan yang menarik."
              },
              {
                step: "04",
                icon: Rocket,
                title: "Mulai Promosi",
                desc: "Listing Anda tayang dan siap menerima penawaran dari calon mitra."
              }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center bg-background md:bg-transparent p-6 rounded-xl md:p-0 shadow-sm md:shadow-none">
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

          <div className="mt-16 flex justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold h-12 px-8 shadow-lg gap-2">
                Daftar Sekarang <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

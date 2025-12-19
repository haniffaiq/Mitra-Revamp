import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import bgImage from "@assets/generated_images/professional_handshake_business_partnership_background.png";

export default function Register() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock register logic
    setLocation("/login");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row font-sans">
      {/* Left Panel - Image (Hidden on Mobile) */}
      <div className="hidden md:flex md:w-1/2 lg:w-2/3 bg-secondary relative overflow-hidden">
        <img 
          src={bgImage} 
          alt="Register Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="relative z-10 p-12 flex flex-col justify-end h-full text-white space-y-4">
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            Mulai Perjalanan <br/> Bisnis Anda
          </h1>
          <p className="text-white/80 text-lg max-w-xl">
            Bergabunglah dengan komunitas wirausaha terbesar di Indonesia. Temukan peluang atau kembangkan bisnis Anda bersama Mitranesia.
          </p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col justify-center p-6 md:p-12 lg:p-16 relative overflow-y-auto max-h-screen">
        <Button variant="ghost" className="absolute top-6 left-6 gap-2" onClick={() => setLocation("/")}>
          <ArrowLeft size={16} /> Kembali
        </Button>

        <div className="max-w-md mx-auto w-full space-y-8 my-auto pt-12 md:pt-0">
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-3xl font-bold text-foreground">Buat Akun Baru</h2>
            <p className="text-muted-foreground">Silakan lengkapi data diri Anda</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input id="name" type="text" placeholder="John Doe" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="nama@email.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Nomor WhatsApp</Label>
              <Input id="phone" type="tel" placeholder="08123456789" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  required 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">Min. 8 karakter, kombinasi huruf & angka</p>
            </div>
            
            <div className="flex items-start gap-2 pt-2">
              <Checkbox id="terms" required />
              <Label htmlFor="terms" className="text-sm font-normal leading-tight text-muted-foreground">
                Saya menyetujui <a href="#" className="text-primary hover:underline">Syarat & Ketentuan</a> serta <a href="#" className="text-primary hover:underline">Kebijakan Privasi</a> Mitranesia.
              </Label>
            </div>

            <Button type="submit" className="w-full h-11 text-base bg-primary hover:bg-primary/90 text-white shadow-lg mt-4">
              Daftar
            </Button>
          </form>

          <div className="text-center text-sm pb-8 md:pb-0">
            <span className="text-muted-foreground">Sudah punya akun? </span>
            <Link href="/login">
              <a className="font-semibold text-primary hover:underline">Masuk Sekarang</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

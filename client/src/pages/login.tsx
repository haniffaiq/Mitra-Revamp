import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import bgImage from "@assets/generated_images/professional_handshake_business_partnership_background.png";

export default function Login() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login logic
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row font-sans">
      {/* Left Panel - Image */}
      <div className="hidden md:flex md:w-1/2 lg:w-2/3 bg-primary relative overflow-hidden">
        <img 
          src={bgImage} 
          alt="Login Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="relative z-10 p-12 flex flex-col justify-end h-full text-white space-y-4">
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            Selamat Datang Kembali <br/> di Mitranesia
          </h1>
          <p className="text-white/80 text-lg max-w-xl">
            Platform terpercaya untuk menemukan dan mengembangkan bisnis franchise impian Anda. Terhubung dengan ribuan merchant sukses hari ini.
          </p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col justify-center p-6 md:p-12 lg:p-16 relative">
        <Button variant="ghost" className="absolute top-6 left-6 gap-2" onClick={() => setLocation("/")}>
          <ArrowLeft size={16} /> Kembali
        </Button>

        <div className="max-w-md mx-auto w-full space-y-8">
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-3xl font-bold text-foreground">Masuk ke Akun</h2>
            <p className="text-muted-foreground">Silakan masuk untuk melanjutkan</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="nama@email.com" required />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-xs text-primary hover:underline font-medium">Lupa Password?</a>
              </div>
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
            </div>
            <Button type="submit" className="w-full h-11 text-base bg-primary hover:bg-primary/90 text-white shadow-lg">
              Masuk
            </Button>
          </form>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Belum punya akun? </span>
            <Link href="/register">
              <a className="font-semibold text-primary hover:underline">Daftar Sekarang</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

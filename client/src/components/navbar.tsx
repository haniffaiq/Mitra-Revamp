import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/">
          <a className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary tracking-tight">Mitranesia</span>
          </a>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/"><a className="hover:text-primary transition-colors">Insight</a></Link>
          <Link href="/"><a className="hover:text-primary transition-colors">Merchant Kami</a></Link>
          <Link href="/"><a className="hover:text-primary transition-colors flex items-center gap-1">
            Menjadi Merchant
            <span className="bg-accent/10 text-accent text-[10px] px-1.5 py-0.5 rounded-full">Baru</span>
          </a></Link>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="hidden sm:flex text-muted-foreground hover:text-primary">
            Masuk
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90 text-white shadow-md">
            Daftar
          </Button>
        </div>
      </div>
    </nav>
  );
}

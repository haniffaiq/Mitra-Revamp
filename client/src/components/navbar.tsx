import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Search, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [, setLocation] = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/">
          <a className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-bold text-primary tracking-tight">Mitranesia</span>
          </a>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/insight"><a className="hover:text-primary transition-colors">Insight</a></Link>
          <Link href="/merchants"><a className="hover:text-primary transition-colors">Merchant Kami</a></Link>
          <Link href="/become-merchant"><a className="hover:text-primary transition-colors flex items-center gap-1">
            Menjadi Merchant
            <span className="bg-accent/10 text-accent text-[10px] px-1.5 py-0.5 rounded-full">Baru</span>
          </a></Link>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="hidden sm:flex text-muted-foreground hover:text-primary">
              Masuk
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm" className="hidden sm:flex bg-primary hover:bg-primary/90 text-white shadow-md">
              Daftar
            </Button>
          </Link>

          {/* Mobile Menu Trigger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-foreground">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 py-6">
                <Link href="/">
                  <a onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                    <span className="text-xl font-bold text-primary">Mitranesia</span>
                  </a>
                </Link>
                <div className="flex flex-col gap-4 text-base font-medium text-muted-foreground">
                  <Link href="/insight"><a onClick={() => setIsOpen(false)} className="hover:text-primary transition-colors">Insight</a></Link>
                  <Link href="/merchants"><a onClick={() => setIsOpen(false)} className="hover:text-primary transition-colors">Merchant Kami</a></Link>
                  <Link href="/become-merchant"><a onClick={() => setIsOpen(false)} className="hover:text-primary transition-colors flex items-center gap-1">
                    Menjadi Merchant
                    <span className="bg-accent/10 text-accent text-xs px-2 py-0.5 rounded-full">Baru</span>
                  </a></Link>
                </div>
                <div className="h-px bg-border my-2" />
                <div className="flex flex-col gap-3">
                  <Button variant="outline" className="w-full justify-center" onClick={() => { setIsOpen(false); setLocation("/login"); }}>
                    Masuk
                  </Button>
                  <Button className="w-full justify-center bg-primary hover:bg-primary/90 text-white" onClick={() => { setIsOpen(false); setLocation("/register"); }}>
                    Daftar
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

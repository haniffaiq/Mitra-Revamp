import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, Search } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { useAuth } from "@/lib/auth";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [, setLocation] = useLocation();
  const { user, logout } = useAuth();

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    setLocation(`/merchants?q=${encodeURIComponent(q)}`);
    setIsOpen(false);
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/">
          <a className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-bold text-primary tracking-tight">Mitranesia</span>
          </a>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/insight"><a className="hover:text-primary transition-colors">Insight</a></Link>
          <Link href="/merchants"><a className="hover:text-primary transition-colors">Merchant Kami</a></Link>
          <Link href="/become-merchant"><a className="hover:text-primary transition-colors flex items-center gap-1">
            Menjadi Merchant
            <span className="bg-accent/10 text-accent text-[10px] px-1.5 py-0.5 rounded-full">Baru</span>
          </a></Link>
        </div>

        <form onSubmit={submitSearch} className="hidden lg:flex items-center relative ml-4">
          <Search size={14} className="absolute left-3 text-muted-foreground" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari merchant…"
            className="w-56 pl-8 pr-3 py-1.5 text-sm rounded-full border border-input bg-background focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </form>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden sm:inline text-sm text-muted-foreground">{user.full_name}</span>
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex"
                onClick={() => {
                  logout();
                  setLocation("/");
                }}
              >
                Keluar
              </Button>
            </>
          ) : (
            <>
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
            </>
          )}

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
                <form onSubmit={submitSearch} className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari merchant…"
                    className="w-full pl-8 pr-3 py-2 text-sm rounded-md border border-input bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </form>
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
                  {user ? (
                    <>
                      <div className="text-sm text-muted-foreground">{user.full_name}</div>
                      <Button
                        variant="outline"
                        className="w-full justify-center"
                        onClick={() => {
                          logout();
                          setIsOpen(false);
                          setLocation("/");
                        }}
                      >
                        Keluar
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" className="w-full justify-center" onClick={() => { setIsOpen(false); setLocation("/login"); }}>
                        Masuk
                      </Button>
                      <Button className="w-full justify-center bg-primary hover:bg-primary/90 text-white" onClick={() => { setIsOpen(false); setLocation("/register"); }}>
                        Daftar
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

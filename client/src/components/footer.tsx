import { useState } from "react";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, CheckCircle2 } from "lucide-react";
import { postJson } from "@/lib/api";

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      await postJson("/api/client/newsletter/subscribe", { email: email.trim(), source: "footer" });
      setStatus("ok");
      setMessage("Terima kasih sudah berlangganan!");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Gagal subscribe. Coba lagi.");
    }
  }

  return (
    <footer className="bg-secondary/30 pt-16 pb-8 border-t border-border/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary">Mitranesia</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Platform waralaba terbaik untuk membantu bisnis Anda berkembang dan meraih #PeluangTambahCabang.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full bg-background hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-background hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-background hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Market Place</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Events</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blogs</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">My Menu</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Merchant Kami</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Daftar Merchant</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 text-primary" />
                <span>Plaza Summarecon Bekasi</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-primary" />
                <span>contact@mitranesia.id</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-primary" />
                <span>0812-3456-7890</span>
              </li>
            </ul>

            <div className="mt-6">
              <p className="text-xs font-medium text-foreground mb-2">Newsletter</p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading"}
                  className="flex-1 px-3 py-2 text-sm rounded-md border border-input bg-background focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="px-4 py-2 text-xs font-semibold text-white bg-primary rounded-md hover:bg-primary/90 transition-colors disabled:opacity-60"
                >
                  {status === "loading" ? "..." : "Subscribe"}
                </button>
              </form>
              {status === "ok" ? (
                <p className="mt-2 text-xs text-green-600 inline-flex items-center gap-1">
                  <CheckCircle2 size={12} /> {message}
                </p>
              ) : null}
              {status === "error" ? (
                <p className="mt-2 text-xs text-destructive">{message}</p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 text-center text-xs text-muted-foreground">
          <p>© 2026 Mitranesia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

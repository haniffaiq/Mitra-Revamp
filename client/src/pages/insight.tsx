import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight, TrendingUp, DollarSign, Target, Megaphone } from "lucide-react";
import { ClientInsightArticle, fetchJson } from "@/lib/api";

export default function Insight() {
  const { data: insights = [] } = useQuery({
    queryKey: ["client-insights"],
    queryFn: () => fetchJson<ClientInsightArticle[]>("/api/client/insights?page=1&page_size=12"),
  });

  const featuredArticle = insights[0];
  const recentArticles = insights.slice(1);

  if (!featuredArticle) {
    return (
      <div className="min-h-screen bg-background font-sans">
        <Navbar />
        <div className="container mx-auto px-4 md:px-6 py-20 text-center text-muted-foreground">
          Artikel belum tersedia.
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      <section className="bg-secondary/30 py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">Mitranesia Insight</Badge>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Wawasan & Inspirasi Bisnis</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Temukan berita terbaru, tips praktis, dan kisah sukses seputar dunia UMKM dan Franchise di Indonesia.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="text-primary" /> Artikel Unggulan
          </h2>
          <Link href={`/insight/${featuredArticle.id}`}>
            <a className="group block">
              <Card className="overflow-hidden border-border/60 hover:shadow-xl transition-all duration-300">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="aspect-video md:aspect-auto overflow-hidden relative">
                    <img loading="lazy" decoding="async" src={featuredArticle.image} alt={featuredArticle.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-white hover:bg-primary">{featuredArticle.category}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 md:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1"><Calendar size={14} /> {featuredArticle.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><User size={14} /> {featuredArticle.author}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                      {featuredArticle.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
                      {featuredArticle.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-primary font-medium group-hover:underline">
                      Baca Selengkapnya <ArrowRight size={16} />
                    </div>
                  </CardContent>
                </div>
              </Card>
            </a>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { name: "Keuangan", icon: DollarSign, color: "bg-green-100 text-green-600" },
            { name: "Marketing", icon: Megaphone, color: "bg-blue-100 text-blue-600" },
            { name: "Strategi", icon: Target, color: "bg-purple-100 text-purple-600" },
            { name: "Tren", icon: TrendingUp, color: "bg-orange-100 text-orange-600" },
          ].map((cat) => (
            <Card key={cat.name} className="hover:bg-secondary/50 transition-colors cursor-pointer border-border/50 shadow-sm">
              <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                <div className={`p-3 rounded-full ${cat.color}`}>
                  <cat.icon size={24} />
                </div>
                <h4 className="font-semibold text-foreground">{cat.name}</h4>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-8">Artikel Terbaru</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentArticles.map((article) => (
              <Link key={article.id} href={`/insight/${article.id}`}>
                <a className="group h-full">
                  <Card className="h-full overflow-hidden border-border/60 hover:shadow-lg transition-all duration-300 flex flex-col">
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img loading="lazy" decoding="async" src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute top-3 left-3">
                        <Badge variant="secondary" className="backdrop-blur-md bg-white/90">{article.category}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-5 flex flex-col flex-1">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                        <span>{article.date}</span>
                        <span>{article.readTime}</span>
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-primary font-medium mt-auto">
                        Baca Artikel <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Button variant="outline" size="lg">Muat Lebih Banyak</Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

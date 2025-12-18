import { Link } from "wouter";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight, TrendingUp, DollarSign, Target, Megaphone } from "lucide-react";
import news1 from "@assets/generated_images/business_strategy_meeting_with_charts.png";
import news2 from "@assets/generated_images/indonesian_street_food_vendor_success_story.png";
import news3 from "@assets/generated_images/digital_marketing_for_small_business.png";
import news4 from "@assets/generated_images/financial_planning_for_business.png";

const ARTICLES = [
  {
    id: 1,
    title: "Tren Bisnis Franchise 2025: Apa yang Harus Diketahui?",
    category: "Bisnis",
    date: "18 Des 2025",
    author: "Tim Mitranesia",
    image: news1,
    excerpt: "Menjelajahi peluang bisnis waralaba yang diprediksi akan booming di tahun mendatang. Simak analisis lengkapnya di sini.",
    readTime: "5 min baca"
  },
  {
    id: 2,
    title: "Kisah Sukses UMKM: Dari Gerobak Menjadi Ruko",
    category: "Inspirasi",
    date: "15 Des 2025",
    author: "Budi Santoso",
    image: news2,
    excerpt: "Perjalanan inspiratif Pak Joko membangun bisnis kuliner tradisionalnya hingga memiliki 5 cabang di Jabodetabek.",
    readTime: "7 min baca"
  },
  {
    id: 3,
    title: "Pentingnya Digital Marketing untuk UMKM di Era Modern",
    category: "Marketing",
    date: "10 Des 2025",
    author: "Sarah Wijaya",
    image: news3,
    excerpt: "Strategi pemasaran digital yang efektif dan hemat biaya untuk meningkatkan omzet bisnis kecil dan menengah.",
    readTime: "6 min baca"
  },
  {
    id: 4,
    title: "Tips Mengelola Keuangan untuk Pemula Bisnis",
    category: "Keuangan",
    date: "05 Des 2025",
    author: "Rina Finance",
    image: news4,
    excerpt: "Panduan praktis mengatur arus kas dan pembukuan sederhana agar bisnis tetap sehat dan profitable.",
    readTime: "4 min baca"
  },
  {
    id: 5,
    title: "Mitranesia Meluncurkan Program Kemitraan Baru",
    category: "Berita",
    date: "01 Des 2025",
    author: "Admin",
    image: news1, // Reusing image for demo
    excerpt: "Program inkubasi bisnis terbaru dari Mitranesia untuk membantu calon pengusaha memulai bisnis franchise pertama mereka.",
    readTime: "3 min baca"
  }
];

export default function Insight() {
  const featuredArticle = ARTICLES[0];
  const recentArticles = ARTICLES.slice(1);

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      
      {/* Header Section */}
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
        {/* Featured Article */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="text-primary" /> Artikel Unggulan
          </h2>
          <Link href={`/insight/${featuredArticle.id}`}>
            <a className="group block">
              <Card className="overflow-hidden border-border/60 hover:shadow-xl transition-all duration-300">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="aspect-video md:aspect-auto overflow-hidden relative">
                    <img 
                      src={featuredArticle.image} 
                      alt={featuredArticle.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-white hover:bg-primary">{featuredArticle.category}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 md:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1"><Calendar size={14}/> {featuredArticle.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><User size={14}/> {featuredArticle.author}</span>
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

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { name: "Keuangan", icon: DollarSign, color: "bg-green-100 text-green-600" },
            { name: "Marketing", icon: Megaphone, color: "bg-blue-100 text-blue-600" },
            { name: "Strategi", icon: Target, color: "bg-purple-100 text-purple-600" },
            { name: "Tren", icon: TrendingUp, color: "bg-orange-100 text-orange-600" },
          ].map((cat, idx) => (
            <Card key={idx} className="hover:bg-secondary/50 transition-colors cursor-pointer border-border/50 shadow-sm">
              <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                <div className={`p-3 rounded-full ${cat.color}`}>
                  <cat.icon size={24} />
                </div>
                <h4 className="font-semibold text-foreground">{cat.name}</h4>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Articles Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Artikel Terbaru</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentArticles.map((article) => (
              <Link key={article.id} href={`/insight/${article.id}`}>
                <a className="group h-full">
                  <Card className="h-full overflow-hidden border-border/60 hover:shadow-lg transition-all duration-300 flex flex-col">
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
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

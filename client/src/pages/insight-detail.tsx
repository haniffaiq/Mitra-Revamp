import { useEffect } from "react";
import { Link, useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Calendar, User } from "lucide-react";
import { ClientInsightArticle, fetchJson } from "@/lib/api";
import NotFound from "@/pages/not-found";
import DOMPurify from "dompurify";

export default function InsightDetail() {
  const [, params] = useRoute("/insight/:id");
  const id = params?.id;
  const { data: article, isError } = useQuery({
    queryKey: ["client-insight-detail", id],
    queryFn: () => fetchJson<ClientInsightArticle>(`/api/client/insights/${id}`),
    enabled: Boolean(id),
  });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [id]);

  if (isError) return <NotFound />;
  if (!article) return null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    author: { "@type": "Person", name: article.author },
    publisher: { "@type": "Organization", name: "Mitranesia", url: "https://mitranesia.id/" },
    datePublished: article.date,
    mainEntityOfPage: `https://mitranesia.id/insight/${article.slug}`,
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Navbar />

      <div className="container mx-auto px-4 py-4 text-sm text-muted-foreground">
        <Link href="/"><a className="hover:text-primary">Home</a></Link>
        <span className="mx-2">/</span>
        <Link href="/insight"><a className="hover:text-primary">Insight</a></Link>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">{article.title}</span>
      </div>

      <div className="container mx-auto px-4 md:px-6 pb-20">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
              {article.category}
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar size={14} /> {article.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <User size={14} /> {article.author}
              </span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>
          </div>

          <Card className="overflow-hidden border-border/60">
            <div className="aspect-[16/9] overflow-hidden">
              <img loading="lazy" decoding="async" src={article.image} alt={article.title} className="w-full h-full object-cover" />
            </div>
          </Card>

          <div className="prose prose-lg max-w-none text-foreground prose-headings:text-foreground prose-a:text-primary prose-strong:text-foreground">
            {article.content.map((paragraph, index) => {
              const trimmed = (paragraph ?? "").trim();
              const isHtml = /<\/?[a-z][\s\S]*>/i.test(trimmed);
              if (isHtml) {
                return (
                  <div
                    key={index}
                    className="text-muted-foreground leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(trimmed) }}
                  />
                );
              }
              return (
                <p key={index} className="text-muted-foreground leading-relaxed">
                  {trimmed}
                </p>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

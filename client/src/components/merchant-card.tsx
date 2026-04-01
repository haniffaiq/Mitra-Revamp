import { Link, useRoute } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star, TrendingUp, Info } from "lucide-react";
import { MerchantProps } from "@/data/merchants";
import { formatPriceRange, getPackagePriceRange } from "@/lib/utils";

export function MerchantCard({ merchant }: { merchant: MerchantProps }) {
  const { min, max } = getPackagePriceRange(merchant.packages);

  return (
    <Card className="group overflow-hidden border-border/60 bg-card/50 hover:bg-card hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col h-full">
      <CardContent className="p-5 md:p-6 flex-1">
        <div className="flex items-start justify-between mb-6">
          <div className="relative">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-border p-1 bg-white overflow-hidden group-hover:scale-105 transition-transform duration-300 shrink-0">
              <img src={merchant.logoUrl} alt={merchant.name} className="w-full h-full object-contain" />
            </div>
            {merchant.rating && (
              <div className="absolute -bottom-1 -right-1 bg-white shadow-sm border px-1.5 py-0.5 rounded-full flex items-center gap-0.5 text-[10px] font-bold text-foreground">
                <Star size={10} className="fill-yellow-400 text-yellow-400" />
                {merchant.rating}
              </div>
            )}
          </div>
          <Badge variant="secondary" className="text-[10px] font-medium bg-secondary text-secondary-foreground whitespace-nowrap">
            {merchant.type}
          </Badge>
        </div>

        <div className="space-y-1 mb-4">
          <h3 className="font-bold text-base md:text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">{merchant.name}</h3>
          <p className="text-xs text-muted-foreground line-clamp-1">{merchant.category}</p>
        </div>

        <div className="space-y-3 bg-secondary/20 p-3 rounded-lg border border-border/30">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">BEP (Estimasi)</span>
            <span className="font-semibold text-foreground flex items-center gap-1">
              <TrendingUp size={12} className="text-green-500" />
              {merchant.bepMonths} Bulan
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Mulai dari</span>
            <span className="font-bold text-primary">
              {formatPriceRange(min, max)}
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 mt-auto">
        <Link href={`/merchant/${merchant.id}`} className="w-full">
          <Button className="w-full bg-foreground text-background hover:bg-primary hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md text-xs md:text-sm">
            Lihat Detail Informasi
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

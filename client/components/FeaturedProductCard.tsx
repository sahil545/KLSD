import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ShoppingCart, Star, CheckCircle, Eye, Truck, MapPin } from "lucide-react";
import React, { useMemo, useState, useEffect } from "react";

export interface FeaturedItem {
  id: number | string;
  name: string;
  image: string;
  price?: string;
  originalPrice?: string | null;
  badges?: string[];
  tags?: string[];
  category?: string;
  variations?: { image: string; label?: string }[];
  rating?: number;
  reviews?: number;
  description?: string;
  inStock?: boolean;
  highlights?: string[];
}

function useDiscount(price?: string, original?: string | null) {
  return useMemo(() => {
    const parse = (v?: string | null) => {
      if (!v) return null;
      const n = parseFloat(v.replace(/[^0-9.]/g, ""));
      return isNaN(n) ? null : n;
    };
    const p = parse(price);
    const o = parse(original);
    if (p && o && o > p) {
      return { hasDiscount: true, discountPct: Math.round(((o - p) / o) * 100) };
    }
    return { hasDiscount: false, discountPct: 0 };
  }, [price, original]);
}

const tagClass = (t: string) => {
  if (/pro/i.test(t)) return "bg-ocean/10 text-ocean";
  if (/popular/i.test(t)) return "bg-coral/10 text-coral";
  if (/dive\s*team|choice/i.test(t)) return "bg-green-50 text-green-700";
  return "bg-gray-100 text-gray-700";
};

const MetaRow: React.FC<{ inStock?: boolean }> = ({ inStock }) => (
  <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full ${inStock === false ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
      <CheckCircle className="w-3 h-3" /> {inStock === false ? 'Out of Stock' : 'In Stock'}
    </span>
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-ocean/10 text-ocean">
      <Truck className="w-3 h-3" /> Free Shipping
    </span>
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 text-gray-700">
      <MapPin className="w-3 h-3" /> Store Pick Up Today
    </span>
  </div>
);

const VariationSwatches: React.FC<{ variations: { image: string; label?: string }[]; activeImage: string; onSelect: (img: string) => void }> = ({ variations, activeImage, onSelect }) => (
  <div className="flex items-center gap-2 mb-3">
    {variations.slice(0, 6).map((v, i) => (
      <button key={i} aria-label={v.label || `Variant ${i + 1}`} onClick={() => onSelect(v.image || '/placeholder.svg')} className={`w-9 h-9 rounded-full overflow-hidden border bg-white ${activeImage === (v.image || '/placeholder.svg') ? 'ring-2 ring-ocean' : ''}`}>
        <img src={v.image || '/placeholder.svg'} alt={v.label || ''} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = '/placeholder.svg'; }} />
      </button>
    ))}
  </div>
);

// Design A: Modern overlay actions, square image, sale badge
export const FeaturedProductCardA: React.FC<{ item: FeaturedItem }> = ({ item }) => {
  const { discountPct, hasDiscount } = useDiscount(item.price, item.originalPrice);
  return (
    <Card className="group relative overflow-hidden rounded-xl border border-gray-100 bg-card text-card-foreground shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
      <div className="relative">
        <AspectRatio ratio={1 / 1}>
          <img
            src={item.image}
            alt={item.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          {item.badges && (
            <div className="absolute top-3 left-3 flex flex-wrap gap-2">
              {item.badges.slice(0, 2).map((b, i) => (
                <Badge key={i} className="bg-coral text-white text-[10px]">
                  {b}
                </Badge>
              ))}
            </div>
          )}
          {hasDiscount && (
            <Badge className="absolute top-3 right-3 bg-white/90 text-coral border-coral/30">
              -{discountPct}%
            </Badge>
          )}
          <div className="pointer-events-none absolute inset-x-3 bottom-3 flex gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
            <div className="pointer-events-auto flex w-full gap-2">
              <Button size="sm" className="flex-1 bg-ocean hover:bg-ocean/90 text-white" disabled={item.inStock === false}>
                <ShoppingCart className="w-4 h-4 mr-2" /> Quick Add
              </Button>
              <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur border-gray-200">
                <Eye className="w-4 h-4 mr-2" /> View
              </Button>
            </div>
          </div>
        </AspectRatio>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-[15px] md:text-base line-clamp-2 mb-1 group-hover:text-ocean">
          {item.name}
        </h3>
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {item.tags.slice(0, 2).map((t, i) => (
              <span key={i} className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${tagClass(t)}`}>{t}</span>
            ))}
          </div>
        )}
        <MetaRow inStock={item.inStock} />
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-end gap-2">
            {item.price && (
              <span className="text-lg md:text-xl font-bold text-ocean leading-none">{item.price}</span>
            )}
            {item.originalPrice && (
              <span className="text-xs md:text-sm text-muted-foreground line-through leading-none">
                {item.originalPrice}
              </span>
            )}
          </div>
          {typeof item.rating === "number" && (
            <div className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{item.rating.toFixed(1)}</span>
              {typeof item.reviews === "number" && <span>({item.reviews})</span>}
            </div>
          )}
        </div>
        <Button className="w-full bg-ocean hover:bg-ocean/90 text-white" disabled={item.inStock === false}>
          <ShoppingCart className="w-4 h-4 mr-2" />
          {item.inStock === false ? "Out of Stock" : "Add to Cart"}
        </Button>
        <div className="mt-2 text-[11px] text-muted-foreground text-center">Shop With Confidence Easy Returns</div>
        {item.description && (
          <div className="mt-3 text-xs text-muted-foreground line-clamp-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3 text-green-600" />
              {item.description}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Design B: Clean grid card, 4:5 image, persistent actions below content
export const FeaturedProductCardB: React.FC<{ item: FeaturedItem }> = ({ item }) => {
  const { discountPct, hasDiscount } = useDiscount(item.price, item.originalPrice);
  return (
    <Card className="rounded-xl border border-gray-200 bg-white hover:shadow-lg transition-shadow">
      <div className="relative">
        <AspectRatio ratio={4 / 5}>
          <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
          {hasDiscount && (
            <Badge className="absolute top-3 left-3 bg-coral text-white">Save {discountPct}%</Badge>
          )}
        </AspectRatio>
      </div>
      <CardContent className="p-4">
        <h3 className="text-sm md:text-base font-medium line-clamp-2 mb-2">{item.name}</h3>
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {item.tags.slice(0, 2).map((t, i) => (
              <span key={i} className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${tagClass(t)}`}>{t}</span>
            ))}
          </div>
        )}
        <MetaRow inStock={item.inStock} />
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-end gap-2">
            {item.price && <span className="text-lg font-semibold">{item.price}</span>}
            {item.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">{item.originalPrice}</span>
            )}
          </div>
          {typeof item.rating === "number" && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span>{item.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1">View</Button>
          <Button className="flex-1 bg-ocean hover:bg-ocean/90 text-white" disabled={item.inStock === false}>
            <ShoppingCart className="w-4 h-4 mr-2" /> Add
          </Button>
        </div>
        <div className="mt-2 text-[11px] text-muted-foreground text-center">Shop With Confidence Easy Returns</div>
      </CardContent>
    </Card>
  );
};

// Design C: Minimal, padded image on neutral bg, focus on price & CTA
export const FeaturedProductCardC: React.FC<{ item: FeaturedItem }> = ({ item }) => {
  const { discountPct, hasDiscount } = useDiscount(item.price, item.originalPrice);
  const [activeImage, setActiveImage] = useState(item.image || '/placeholder.svg');
  useEffect(() => {
    setActiveImage(item.image || '/placeholder.svg');
  }, [item.image]);
  return (
    <Card className="rounded-xl border border-gray-200 bg-gray-50 hover:bg-white transition-colors">
      <div className="p-3">
        <div className="relative rounded-lg overflow-hidden bg-white">
          <AspectRatio ratio={1 / 1}>
            <img src={activeImage || '/placeholder.svg'} alt={item.name} className="absolute inset-0 w-full h-full object-cover" onError={(e) => { e.currentTarget.src = '/placeholder.svg'; }} />
            {hasDiscount && (
              <Badge className="absolute top-2 left-2 bg-coral text-white">-{discountPct}%</Badge>
            )}
            {item.tags && item.tags.length > 0 && (
              <span className="absolute top-2 right-2 inline-flex items-center px-2 py-1 rounded-full text-xs bg-ocean/10 text-ocean">{item.tags[0]}</span>
            )}
            <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-ocean/10 text-ocean text-xs">
              <Truck className="w-3 h-3" /> Free 1 Day Shipping
            </span>
          </AspectRatio>
        </div>
      </div>
      <CardContent className="px-4 pb-4">
        <h3 className="text-sm font-medium line-clamp-2 mb-1">{item.name}</h3>
        {item.highlights && item.highlights.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {item.highlights.slice(0,3).map((h, i) => (
              <span key={i} className="inline-flex items-center px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-[11px]">{h}</span>
            ))}
          </div>
        )}
        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="ml-1 text-xs text-foreground">5.0</span>
        </div>
        {item.variations?.length ? (
          <VariationSwatches variations={item.variations} activeImage={activeImage} onSelect={setActiveImage} />
        ) : null}
        <div className="flex items-center gap-2 mb-3">
          {item.price && <span className="text-lg font-bold text-ocean">{item.price}</span>}
          {item.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">{item.originalPrice}</span>
          )}
        </div>
        {item.description && (
          <div className="text-xs text-muted-foreground mb-3 line-clamp-3">{item.description}</div>
        )}
        <Button className="w-full bg-ocean hover:bg-ocean/90 text-white" disabled={item.inStock === false}>
          <ShoppingCart className="w-4 h-4 mr-2" /> {item.inStock === false ? "Out of Stock" : "Add to Cart"}
        </Button>
        <div className="mt-2 text-[11px] text-muted-foreground text-center">Shop With Confidence Easy Returns</div>
      </CardContent>
    </Card>
  );
};

// Backwards-compatible default export name
export const FeaturedProductCard = FeaturedProductCardC;

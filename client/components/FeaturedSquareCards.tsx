import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ShoppingCart, Star, Truck } from "lucide-react";
import type { FeaturedItem } from "./FeaturedProductCard";

const Stars: React.FC<{ count?: number; size?: number }> = ({ count = 5, size = 4 }) => (
  <div className="flex items-center gap-0.5 text-yellow-400">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} className={`w-${size} h-${size} fill-yellow-400 text-yellow-400`} />
    ))}
  </div>
);

const Swatches: React.FC<{ images?: string[]; onSelect: (src: string) => void; active: string }> = ({ images = [], onSelect, active }) => (
  <div className="flex items-center gap-2">
    {images.slice(0, 6).map((src, i) => (
      <button key={i} onClick={() => onSelect(src || "/placeholder.svg")} className={`w-8 h-8 rounded-full overflow-hidden border bg-white ${active === (src || "/placeholder.svg") ? "ring-2 ring-ocean" : ""}`}>
        <img src={src || "/placeholder.svg"} alt="Variant" className="w-full h-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }} />
      </button>
    ))}
  </div>
);

export const FeaturedSquareCardA: React.FC<{ item: FeaturedItem }> = ({ item }) => {
  const [img, setImg] = useState(item.image || "/placeholder.svg");
  return (
    <Card className="rounded-xl border border-gray-200 bg-white">
      <div className="relative">
        <AspectRatio ratio={1 / 1}>
          <img src={img || "/placeholder.svg"} alt={item.name} className="absolute inset-0 w-full h-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }} />
          {item.tags?.[0] && (
            <Badge className="absolute top-2 right-2 bg-ocean text-white">{item.tags[0]}</Badge>
          )}
          <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-ocean/10 text-ocean text-xs">
            <Truck className="w-3 h-3" /> Free 1 Day Shipping
          </span>
        </AspectRatio>
      </div>
      <CardContent className="p-3">
        <h3 className="text-sm font-semibold line-clamp-2 mb-1">{item.name}</h3>
        <div className="flex items-center gap-2 mb-2">
          <Stars />
          <span className="text-xs text-foreground">5.0</span>
        </div>
        {item.variations?.length ? (
          <div className="mb-3">
            <Swatches images={item.variations.map(v => v.image)} active={img} onSelect={setImg} />
          </div>
        ) : null}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {item.price && <span className="text-base font-bold text-ocean">{item.price}</span>}
            {item.originalPrice && <span className="text-xs text-muted-foreground line-through">{item.originalPrice}</span>}
          </div>
          <Button size="sm" className="bg-ocean hover:bg-ocean/90 text-white" disabled={item.inStock === false}>
            <ShoppingCart className="w-4 h-4 mr-1" /> Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export const FeaturedSquareCardB: React.FC<{ item: FeaturedItem }> = ({ item }) => {
  const [img, setImg] = useState(item.image || "/placeholder.svg");
  return (
    <Card className="rounded-xl border border-gray-100 bg-gray-50 hover:bg-white transition-colors">
      <div className="p-3">
        <div className="relative rounded-lg overflow-hidden bg-white">
          <AspectRatio ratio={1 / 1}>
            <img src={img || "/placeholder.svg"} alt={item.name} className="absolute inset-0 w-full h-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            {item.badges?.[0] && (
              <Badge className="absolute top-2 right-2 bg-white/95 text-gray-900 border">{item.badges[0]}</Badge>
            )}
          </AspectRatio>
        </div>
      </div>
      <CardContent className="px-3 pb-3">
        <h3 className="text-sm font-medium line-clamp-2 mb-1">{item.name}</h3>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {item.price && <span className="text-base font-semibold">{item.price}</span>}
            {item.originalPrice && <span className="text-xs text-muted-foreground line-through">{item.originalPrice}</span>}
          </div>
          <Stars size={3} />
        </div>
        {item.variations?.length ? (
          <Swatches images={item.variations.map(v => v.image)} active={img} onSelect={setImg} />
        ) : null}
        <Button className="w-full mt-3 bg-ocean hover:bg-ocean/90 text-white" disabled={item.inStock === false}>
          <ShoppingCart className="w-4 h-4 mr-2" /> {item.inStock === false ? "Out of Stock" : "Add to Cart"}
        </Button>
      </CardContent>
    </Card>
  );
};

export const FeaturedSquareCardC: React.FC<{ item: FeaturedItem }> = ({ item }) => {
  const [img, setImg] = useState(item.image || "/placeholder.svg");
  return (
    <Card className="group relative overflow-hidden rounded-xl border border-gray-100 bg-card text-card-foreground shadow-sm">
      <div className="relative">
        <AspectRatio ratio={1 / 1}>
          <img src={img || "/placeholder.svg"} alt={item.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          <div className="absolute top-2 right-2 flex gap-2">
            {item.tags?.slice(0,1).map((t, i) => (
              <Badge key={i} className="bg-coral text-white text-[10px]">{t}</Badge>
            ))}
          </div>
          <div className="absolute bottom-2 left-2 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/90 text-ocean text-xs">
              <Truck className="w-3 h-3" /> Free 1 Day Shipping
            </span>
          </div>
        </AspectRatio>
      </div>
      <CardContent className="p-3">
        <h3 className="font-semibold text-sm line-clamp-2 mb-1">{item.name}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {item.price && <span className="text-base font-bold text-ocean">{item.price}</span>}
            {item.originalPrice && <span className="text-xs text-muted-foreground line-through">{item.originalPrice}</span>}
          </div>
          <Stars size={3} />
        </div>
        {item.variations?.length ? (
          <div className="mt-2">
            <Swatches images={item.variations.map(v => v.image)} active={img} onSelect={setImg} />
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

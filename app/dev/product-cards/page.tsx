"use client";

import React from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { FeaturedProductCardC, type FeaturedItem } from "@/components/FeaturedProductCard";
import { FeaturedSquareCardA, FeaturedSquareCardB, FeaturedSquareCardC } from "@/components/FeaturedSquareCards";
import type { WooCommerceProduct } from "@/lib/woocommerce";
import { Button } from "@/components/ui/button";

function aliasCategory(nameOrText?: string) {
  const t = nameOrText || "";
  if (/regulator/i.test(t)) return "Regulators";
  if (/mask/i.test(t)) return "Masks";
  if (/\bfins?\b/i.test(t)) return "Fins";
  if (/\bbcds?\b|\bbcd\b/i.test(t)) return "BCD";
  return undefined;
}

function mapToFeaturedItem(p: WooCommerceProduct): FeaturedItem {
  const catFromCat = aliasCategory(p.categories?.map(c=>c.name).join(" "));
  const catFromName = aliasCategory(p.name);
  const cat = catFromCat || catFromName;
  const price = parseFloat(p.sale_price || p.price || p.regular_price || "0");
  const regular = parseFloat(p.regular_price || p.price || "0");
  const variations = (cat && /Masks|Fins|BCD/.test(cat) ? (p.images || []).map(img => ({ image: img.src })).slice(0, 6) : undefined);
  return {
    id: p.id,
    name: p.name,
    image: p.images?.[0]?.src || "",
    price: price ? `$${price.toFixed(2)}` : undefined,
    originalPrice: price && regular && regular > price ? `$${regular.toFixed(2)}` : undefined,
    badges: [p.categories?.[0]?.name || ""].filter(Boolean),
    tags: cat === "Regulators" ? ["Most Popular"] : cat === "Masks" ? ["Pros Pick!"] : cat === "Fins" ? ["Dive Team Choice!"] : [],
    category: cat,
    variations,
    rating: 4.8,
    inStock: p.in_stock,
    description: p.short_description || undefined,
  };
}

export default function ProductCardsDevPage() {
  const [category, setCategory] = React.useState("Regulators");
  const [items, setItems] = React.useState<FeaturedItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const cats = ["Regulators", "Masks", "Fins", "BCD"];

  function demoGear(): FeaturedItem[] {
    return [
      {
        id: 'demo-bcd-1',
        name: 'ScubaPro Hydros Pro BCD',
        image: 'https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-hydros-pro-bcd.jpg',
        price: '$699.00',
        badges: ['ScubaPro'],
        tags: ['Pros Pick!'],
        category: 'BCD',
        variations: [
          { image: 'https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-hydros-pro-bcd.jpg' },
        ],
        rating: 4.8,
        inStock: true,
        description: 'Modular, neutrally buoyant, travel‑ready',
      },
      {
        id: 'demo-reg-1',
        name: 'MK25 EVO BT/G260 Carbon Regulator',
        image: 'https://keylargoscubadiving.com/wp-content/uploads/2024/01/SP_12771550_G260Carbon_MK25_1-scaled-1.jpg',
        price: '$1516.00',
        badges: ['ScubaPro'],
        tags: ['Most Popular'],
        category: 'Regulators',
        rating: 4.9,
        inStock: true,
        description: 'Carbon fiber cover, Black Tech finish',
      },
      {
        id: 'demo-mask-1',
        name: 'Scubapro Frameless Dive Mask',
        image: 'https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-frameless-gorilla-mask.jpg',
        price: '$159.00',
        badges: ['ScubaPro'],
        tags: ['Pros Pick!'],
        category: 'Masks',
        variations: [
          { image: 'https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-frameless-gorilla-mask.jpg', label: 'Black' },
          { image: 'https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-zoom-evo-mask.jpg', label: 'Blue' },
          { image: 'https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-crystal-vu-mask.jpg', label: 'Clear' },
          { image: 'https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-steel-comp-mask.jpg', label: 'Gray' },
        ],
        rating: 5.0,
        inStock: true,
        description: 'Low volume, wide view',
        highlights: ['Low volume', 'Wide view', 'Comfort fit'],
      },
      {
        id: 'demo-fins-1',
        name: 'Seawing Nova Fins',
        image: 'https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-seawing-nova-fins.jpg',
        price: '$199.00',
        badges: ['ScubaPro'],
        tags: ['Dive Team Choice!'],
        category: 'Fins',
        variations: [
          { image: 'https://keylargoscubadiving.com/wp-content/uploads/2024/01/scubapro-seawing-nova-fins.jpg' },
        ],
        rating: 4.8,
        inStock: true,
        description: 'Advanced propulsion with pivot control',
      },
    ];
  }

  React.useEffect(() => {
    setLoading(true);
    setError(null);
    const demo = demoGear();
    setItems(demo);
    const hasCat = (c: string) => demo.some((i) => i.category === c);
    if (!hasCat(category)) {
      const first = cats.find(hasCat) || cats[0];
      setCategory(first);
    }
    setLoading(false);
  }, []);

  const filtered = React.useMemo(() => {
    const base = category;
    const singular = base.endsWith('s') ? base.slice(0, -1) : base;
    const rx = new RegExp(singular, 'i');
    return items.filter((i) => i.category === base || rx.test(i.name || ''));
  }, [items, category]);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <section className="pt-28 pb-4 border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Product Cards — Dev</h1>
          <p className="text-muted-foreground">Live WooCommerce products with filters and swatches</p>
          <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar">
            {cats.map((c) => (
              <Button key={c} variant={c===category?"default":"outline"} onClick={() => setCategory(c)}>{c}</Button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-semibold mb-2">{category}</h2>
          <div className="text-xs text-muted-foreground mb-4">Loaded: {items.length} • Showing: {filtered.length}</div>
          {loading && <div className="text-sm text-muted-foreground">Loading...</div>}
          {error && <div className="text-sm text-red-600">{error}</div>}
          {filtered.length === 0 ? (
            <div className="text-sm text-muted-foreground">No products found for {category}. Try another category.</div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filtered.map((s) => (
                  <FeaturedProductCardC key={s.id} item={s} />
                ))}
              </div>
              <div className="mt-10 border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Featured Product Cards — Square</h3>
                {(() => {
                  const sample = filtered[0] || items[0];
                  if (!sample) return null;
                  return (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                      {(() => {
                        const list = (filtered.length ? filtered : items).slice(0, 5);
                        const designs = [FeaturedSquareCardA, FeaturedSquareCardB, FeaturedSquareCardC];
                        return list.map((p, idx) => {
                          const Cmp = designs[idx % designs.length];
                          return <Cmp key={`${p.id}-sq-${idx}`} item={p} />;
                        });
                      })()}
                    </div>
                  );
                })()}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { categories, getProductsByCategory } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/products/product-card";
import { SectionHeading } from "@/components/ui/section-heading";

export function ShopByType() {
  const [active, setActive] = useState(categories[0].slug);
  const items = getProductsByCategory(active);
  const current = categories.find((c) => c.slug === active)!;

  return (
    <section className="bg-ivory py-16 sm:py-24" aria-labelledby="type-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="type-heading" eyebrow="Shop by product type" title="Browse the harvest" />
        <div
          role="tablist"
          aria-label="Product types"
          className="no-scrollbar -mx-4 mb-8 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0"
        >
          {categories.map((c) => (
            <button
              key={c.slug}
              role="tab"
              id={`tab-${c.slug}`}
              aria-selected={active === c.slug}
              aria-controls="type-panel"
              onClick={() => setActive(c.slug)}
              className={cn(
                "h-10 shrink-0 rounded-full border px-4 text-sm transition-colors",
                active === c.slug
                  ? "border-forest bg-forest text-ivory"
                  : "border-line text-ink hover:border-sage"
              )}
            >
              {c.name}
            </button>
          ))}
        </div>
        <div id="type-panel" role="tabpanel" aria-labelledby={`tab-${active}`}>
          <p className="mb-6 text-sm text-muted">{current.description}.</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <Link
            href={`/shop?category=${active}`}
            className="mt-8 inline-block text-sm font-medium text-forest underline-offset-4 hover:underline"
          >
            See all {current.name.toLowerCase()}
          </Link>
        </div>
      </div>
    </section>
  );
}

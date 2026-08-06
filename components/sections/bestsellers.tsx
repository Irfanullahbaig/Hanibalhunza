"use client";

import Link from "next/link";
import { getBestsellers } from "@/lib/data";
import { ProductCard } from "@/components/products/product-card";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

export function Bestsellers() {
  const products = getBestsellers().slice(0, 4);

  return (
    <section
      className="bg-light-gray py-20 sm:py-28"
      aria-labelledby="bestsellers-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal className="max-w-xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-honey">
              Customer Favorites
            </p>
            <h2
              id="bestsellers-heading"
              className="mt-3 font-serif text-3xl text-charcoal sm:text-4xl lg:text-5xl"
            >
              Best Sellers
            </h2>
            <p className="mt-4 text-muted">
              The dry fruits our community returns to—trusted for taste, purity,
              and everyday wellness.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <Button asChild variant="forest">
              <Link href="/shop">Shop Bestsellers</Link>
            </Button>
          </Reveal>
        </div>

        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

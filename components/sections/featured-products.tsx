"use client";

import Link from "next/link";
import { getFeaturedProducts } from "@/lib/data";
import { ProductCard } from "@/components/products/product-card";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

export function FeaturedProducts() {
  const products = getFeaturedProducts().slice(0, 4);

  return (
    <section
      className="bg-white py-20 sm:py-28"
      aria-labelledby="featured-products-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal className="max-w-xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-honey">
              Handpicked
            </p>
            <h2
              id="featured-products-heading"
              className="mt-3 font-serif text-3xl text-charcoal sm:text-4xl lg:text-5xl"
            >
              Featured Products
            </h2>
            <p className="mt-4 text-muted">
              Signature dry fruits and wellness products selected for purity,
              flavor, and the spirit of the mountains.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <Button asChild variant="outline-dark">
              <Link href="/shop">View All</Link>
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

import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/products/product-card";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { Newsletter } from "@/components/sections/newsletter";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Shop premium Hunza dry fruits—Dry Apricot, Dry Almond, Hunzai Chocolate, Organic Shilajit, and curated gift boxes.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <>
      <section className="bg-forest pb-16 pt-32 text-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-cream/60">
            <ol className="flex gap-2">
              <li>
                <Link href="/" className="hover:text-honey">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-honey">Shop</li>
            </ol>
          </nav>
          <h1 className="font-serif text-4xl sm:text-5xl">Shop All Products</h1>
          <p className="mt-4 max-w-xl text-cream/70">
            Discover our full collection of mountain dry fruits, Hunzai
            chocolate, and organic shilajit—sourced with care and delivered
            nationwide.
          </p>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="mb-8 text-sm text-muted">
              Showing {products.length} products
            </p>
          </Reveal>
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <StaggerItem key={product.id}>
                <ProductCard product={product} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
      <Newsletter />
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { categories, getProductsByCategory } from "@/lib/data";
import { ProductCard } from "@/components/products/product-card";
import { Newsletter } from "@/components/sections/newsletter";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Categories",
  description:
    "Browse Haniball Hunza categories—Dry Apricots, Dry Almonds, Hunzai Chocolate, Organic Shilajit, and gift boxes.",
  alternates: { canonical: "/categories" },
};

export default function CategoriesPage() {
  return (
    <>
      <section className="bg-forest pb-16 pt-32 text-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-cream/60">
            <Link href="/" className="hover:text-honey">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-honey">Categories</span>
          </nav>
          <h1 className="font-serif text-4xl sm:text-5xl">Shop by Category</h1>
          <p className="mt-4 max-w-xl text-cream/70">
            Find the dry fruits and wellness products that match your taste—from
            sun-dried apricots to organic shilajit and Hunzai chocolate.
          </p>
        </div>
      </section>

      <div className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-7xl space-y-20 px-4 sm:px-6 lg:px-8">
          {categories.map((category) => {
            const items = getProductsByCategory(category.slug);
            return (
              <section
                key={category.id}
                id={category.slug}
                aria-labelledby={`${category.slug}-heading`}
              >
                <Reveal className="mb-8 grid items-center gap-6 lg:grid-cols-[280px_1fr]">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:aspect-square">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                      sizes="280px"
                    />
                  </div>
                  <div>
                    <h2
                      id={`${category.slug}-heading`}
                      className="font-serif text-3xl text-charcoal sm:text-4xl"
                    >
                      {category.name}
                    </h2>
                    <p className="mt-3 max-w-xl text-muted">
                      {category.description}
                    </p>
                  </div>
                </Reveal>
                {items.length > 0 ? (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {items.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <p className="text-muted">
                    New products coming soon.{" "}
                    <Link href="/shop" className="text-forest underline">
                      Browse all products
                    </Link>
                    .
                  </p>
                )}
              </section>
            );
          })}
        </div>
      </div>
      <Newsletter />
    </>
  );
}

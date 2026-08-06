import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import {
  getProductBySlug,
  products,
  siteConfig,
} from "@/lib/data";
import { formatPrice, cn } from "@/lib/utils";
import { JsonLd } from "@/components/seo/json-ld";
import { ProductActions } from "@/components/products/product-actions";
import { ProductCard } from "@/components/products/product-card";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.name,
    description: product.shortDescription,
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [{ url: product.image, alt: product.name }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.shortDescription,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}/shop/${product.slug}`,
      priceCurrency: "PKR",
      price: product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Shop",
        item: `${siteConfig.url}/shop`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `${siteConfig.url}/shop/${product.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={[productSchema, breadcrumbSchema]} />
      <section className="bg-cream pb-16 pt-28 sm:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
            <ol className="flex flex-wrap gap-2">
              <li>
                <Link href="/" className="hover:text-forest">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/shop" className="hover:text-forest">
                  Shop
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-forest">{product.name}</li>
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-border">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {product.badge && (
                <span className="absolute left-4 top-4 rounded-md bg-honey px-3 py-1 text-xs font-semibold uppercase tracking-wider text-charcoal">
                  {product.badge}
                </span>
              )}
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.15em] text-honey">
                {product.weight}
              </p>
              <h1 className="mt-2 font-serif text-4xl text-charcoal sm:text-5xl">
                {product.name}
              </h1>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex text-honey">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < Math.round(product.rating)
                          ? "fill-honey text-honey"
                          : "text-border"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              <div className="mt-6 flex items-baseline gap-3">
                <span className="text-3xl font-semibold text-forest">
                  {formatPrice(product.price)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-lg text-muted line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
              </div>

              <p className="mt-6 leading-relaxed text-muted">
                {product.description}
              </p>

              <ProductActions product={product} />
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-20">
              <h2 className="mb-8 font-serif text-3xl text-charcoal">
                You May Also Like
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

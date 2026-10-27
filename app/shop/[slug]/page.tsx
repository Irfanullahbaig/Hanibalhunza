import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Building2 } from "lucide-react";
import {
  getCategory,
  getDefaultVariant,
  getProductBySlug,
  products,
  siteConfig,
} from "@/lib/data";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/ui/page-header";
import { ProductGallery } from "@/components/products/product-gallery";
import { ProductPurchase } from "@/components/products/product-purchase";
import { ProductCard } from "@/components/products/product-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product not found" };

  return {
    title: product.name,
    description: `${product.shortDescription}. ${getDefaultVariant(product).label} pack, delivered across Pakistan.`,
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

  const category = getCategory(product.category);
  const related = [
    ...products.filter((p) => p.category === product.category && p.id !== product.id),
    ...products.filter((p) => p.category !== product.category && p.bestseller),
  ].slice(0, 4);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: [product.image, ...product.gallery].map((src) => `${siteConfig.url}${src}`),
    sku: product.id,
    brand: { "@type": "Brand", name: siteConfig.name },
    offers: product.variants.map((v) => ({
      "@type": "Offer",
      name: v.label,
      url: `${siteConfig.url}/shop/${product.slug}`,
      priceCurrency: "PKR",
      price: v.price,
      availability: v.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Shop", item: `${siteConfig.url}/shop` },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `${siteConfig.url}/shop/${product.slug}`,
      },
    ],
  };

  const details = [
    { id: "ingredients", title: "Ingredients", body: product.ingredients },
    { id: "allergens", title: "Allergen information", body: product.allergens },
    { id: "origin", title: "Origin", body: product.origin },
    { id: "storage", title: "Storage", body: product.storage },
    {
      id: "nutrition",
      title: "Nutritional information",
      body: "A full nutrition panel for this product is being prepared. Contact us if you need specific values.",
    },
  ].filter((d): d is { id: string; title: string; body: string } => !!d.body);

  return (
    <>
      <JsonLd data={[productSchema, breadcrumbSchema]} />
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-6 sm:px-6 sm:pt-8 lg:px-8 lg:pb-20">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            ...(category ? [{ label: category.name, href: `/shop?category=${category.slug}` }] : []),
            { label: product.name },
          ]}
        />

        <div className="mt-6 grid gap-10 lg:mt-8 lg:grid-cols-2 lg:gap-16">
          <ProductGallery product={product} />

          <div>
            {category && <p className="eyebrow">{category.name}</p>}
            <h1 className="mt-3 text-4xl leading-[1.1] text-ink sm:text-5xl">{product.name}</h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">{product.shortDescription}.</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {product.highlights.map((h) => (
                <li key={h} className="rounded-full bg-sage-light px-3 py-1 text-[13px] text-forest">
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-line pt-8">
              <ProductPurchase product={product} />
            </div>

            <div className="mt-10">
              <h2 className="sr-only">Product details</h2>
              <p className="leading-relaxed text-ink/85">{product.description}</p>
              <Accordion type="multiple" defaultValue={["ingredients"]} className="mt-6 border-t border-line">
                {details.map((d) => (
                  <AccordionItem key={d.id} value={d.id}>
                    <AccordionTrigger className="text-base">{d.title}</AccordionTrigger>
                    <AccordionContent>{d.body}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {product.wholesale.available && (
              <Link
                href={`/wholesale?product=${product.slug}#quote`}
                className="mt-8 flex items-start gap-3 rounded-md border border-line p-4 transition-colors hover:border-sage"
              >
                <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-forest" strokeWidth={1.5} />
                <span className="text-sm">
                  <span className="block font-medium text-ink">Buying in bulk?</span>
                  <span className="text-muted">
                    Request a wholesale quote for {product.name}.
                  </span>
                </span>
              </Link>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-20 border-t border-line pt-14" aria-labelledby="related-heading">
            <h2 id="related-heading" className="mb-8 text-3xl text-ink">
              You may also like
            </h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}

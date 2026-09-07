"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Star } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/types";
import { formatPrice, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/data";

type ProductCardProps = {
  product: Product;
  className?: string;
};

export function ProductCard({ product, className }: ProductCardProps) {
  const message = encodeURIComponent(
    `Hello Haniball Hunza! I'd like to order:\n\n• ${product.name} (${product.weight})\n• Price: ${formatPrice(product.price)}\n\nPlease confirm availability. Thank you!`
  );
  const whatsappHref = `https://wa.me/${siteConfig.whatsapp}?text=${message}`;

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-border/60 transition-shadow duration-300 hover:shadow-xl",
        className
      )}
    >
      {product.badge && (
        <span className="absolute left-3 top-3 z-10 rounded-md bg-honey px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-charcoal">
          {product.badge}
        </span>
      )}

      <Link
        href={`/shop/${product.slug}`}
        className="relative aspect-[4/5] overflow-hidden bg-light-gray"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center gap-1 text-honey">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-3.5 w-3.5",
                i < Math.round(product.rating)
                  ? "fill-honey text-honey"
                  : "text-border"
              )}
            />
          ))}
          <span className="ml-1 text-xs text-muted">
            ({product.reviewCount})
          </span>
        </div>

        <Link href={`/shop/${product.slug}`}>
          <h3 className="font-serif text-xl text-charcoal transition-colors hover:text-forest">
            {product.name}
          </h3>
        </Link>

        <p className="line-clamp-2 text-sm text-muted">
          {product.shortDescription}
        </p>

        <p className="text-xs uppercase tracking-wider text-forest/70">
          {product.weight}
        </p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold text-forest">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-sm text-muted line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
          <Button asChild size="sm" variant="forest">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Order ${product.name} on WhatsApp`}
            >
              <MessageCircle className="h-4 w-4" />
              Order Now
            </a>
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

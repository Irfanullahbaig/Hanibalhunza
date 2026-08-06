"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/types";
import { formatPrice, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";

type ProductCardProps = {
  product: Product;
  className?: string;
};

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem, toggleWishlist, isWishlisted } = useCart();
  const wishlisted = isWishlisted(product.id);

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

      <button
        type="button"
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        onClick={() => toggleWishlist(product.id)}
        className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 shadow-sm transition hover:scale-110"
      >
        <Heart
          className={cn(
            "h-4 w-4 transition-colors",
            wishlisted ? "fill-honey text-honey" : "text-charcoal"
          )}
        />
      </button>

      <div className="relative aspect-[4/5] overflow-hidden bg-light-gray">
        <Link href={`/shop/${product.slug}`} className="absolute inset-0">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </Link>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-forest/90 to-transparent p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto">
          <Button
            size="sm"
            className="w-full"
            onClick={() => addItem(product)}
          >
            <ShoppingBag className="h-4 w-4" />
            Quick Add
          </Button>
        </div>
      </div>

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
          <Button
            size="sm"
            variant="forest"
            aria-label={`Add ${product.name} to cart`}
            onClick={() => addItem(product)}
          >
            <ShoppingBag className="h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Plus } from "lucide-react";
import type { Product } from "@/types";
import {
  getDefaultVariant,
  getDiscountPercent,
  isProductInStock,
} from "@/lib/data";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";
import { ProductImage } from "@/components/products/product-image";
import { Price } from "@/components/products/price";

type ProductCardProps = {
  product: Product;
  className?: string;
  priority?: boolean;
};

export function ProductCard({ product, className, priority }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const variant = getDefaultVariant(product);
  const inStock = isProductInStock(product);
  const discount = getDiscountPercent(variant.price, variant.compareAtPrice);
  const href = `/shop/${product.slug}`;

  const onAdd = () => {
    addItem(product.slug, variant.id, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <article className={cn("group flex flex-col", className)}>
      <Link href={href} className="relative block overflow-hidden rounded-md" tabIndex={-1} aria-hidden>
        <ProductImage
          product={product}
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          imageClassName="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute left-2.5 top-2.5 flex flex-col items-start gap-1">
          {!inStock && (
            <span className="rounded-sm bg-ink/80 px-2 py-0.5 text-[11px] font-medium text-white">
              Sold out
            </span>
          )}
          {inStock && discount > 0 && (
            <span className="rounded-sm bg-ivory px-2 py-0.5 text-[11px] font-medium text-apricot-deep">
              −{discount}%
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col pt-3.5">
        <h3 className="font-serif text-[17px] leading-snug text-ink sm:text-lg">
          <Link href={href} className="transition-colors hover:text-forest">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-[13px] text-muted">
          {product.variants.map((v) => v.label).join(" · ")}
        </p>
        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <Price price={variant.price} compareAtPrice={variant.compareAtPrice} size="sm" />
          <button
            type="button"
            onClick={onAdd}
            disabled={!inStock}
            aria-label={inStock ? `Add ${product.name} (${variant.label}) to cart` : `${product.name} is sold out`}
            className={cn(
              "inline-flex h-9 shrink-0 items-center gap-1.5 rounded-md border px-3 text-[13px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40",
              added
                ? "border-forest bg-forest text-ivory"
                : "border-forest/25 text-forest hover:border-forest hover:bg-forest hover:text-ivory"
            )}
          >
            {added ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
            <span className="hidden min-[400px]:inline">{added ? "Added" : "Add"}</span>
          </button>
        </div>
      </div>
    </article>
  );
}

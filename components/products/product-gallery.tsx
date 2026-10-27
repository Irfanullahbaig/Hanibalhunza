"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";
import { ProductImage } from "@/components/products/product-image";

export function ProductGallery({ product }: { product: Product }) {
  const images = [product.image, ...product.gallery];
  const [active, setActive] = useState(0);
  const src = images[active];
  const isPoster = active > 0;

  return (
    <div className="flex flex-col gap-3 lg:sticky lg:top-24">
      <ProductImage
        product={product}
        src={src}
        priority
        fit={isPoster ? "contain" : "cover"}
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="rounded-md"
      />
      {images.length > 1 && (
        <div className="flex gap-2" role="group" aria-label="Product images">
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1} of ${images.length}`}
              aria-pressed={active === i}
              className={cn(
                "relative h-16 w-16 overflow-hidden rounded-md bg-paper ring-1 transition sm:h-20 sm:w-20",
                active === i ? "ring-2 ring-forest" : "ring-line hover:ring-sage"
              )}
            >
              <Image
                src={img}
                alt=""
                fill
                sizes="80px"
                className={i > 0 ? "object-contain" : "object-cover"}
              />
            </button>
          ))}
        </div>
      )}
      {product.placeholderImage && (
        <p className="text-xs text-muted">
          Product photography for this set is coming soon; the image shows the
          kind of dry fruits included.
        </p>
      )}
    </div>
  );
}

import Image from "next/image";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

type ProductImageProps = {
  product: Product;
  src?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  fit?: "cover" | "contain";
};

/**
 * Product photo in a square frame. Products without authentic photography
 * are tagged so customers aren't misled by a stand-in image.
 */
export function ProductImage({
  product,
  src,
  sizes,
  priority,
  className,
  imageClassName,
  fit = "cover",
}: ProductImageProps) {
  return (
    <div className={cn("relative aspect-square overflow-hidden bg-paper", className)}>
      <Image
        src={src ?? product.image}
        alt={product.name}
        fill
        sizes={sizes}
        priority={priority}
        className={cn(
          fit === "cover" ? "object-cover" : "object-contain",
          imageClassName
        )}
      />
      {product.placeholderImage && (src ?? product.image) === product.image && (
        <span className="absolute bottom-2 left-2 rounded-sm bg-ivory/90 px-2 py-0.5 text-[11px] text-muted backdrop-blur-sm">
          Representative photo
        </span>
      )}
    </div>
  );
}

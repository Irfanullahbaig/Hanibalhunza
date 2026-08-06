"use client";

import { Heart, ShoppingBag } from "lucide-react";
import type { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";

export function ProductActions({ product }: { product: Product }) {
  const { addItem, toggleWishlist, isWishlisted } = useCart();
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <Button
        size="lg"
        variant="forest"
        onClick={() => addItem(product)}
        className="min-w-[180px]"
      >
        <ShoppingBag className="h-5 w-5" />
        Add to Cart
      </Button>
      <Button
        size="lg"
        variant="outline-dark"
        onClick={() => toggleWishlist(product.id)}
        aria-pressed={wishlisted}
      >
        <Heart
          className={cn(
            "h-5 w-5",
            wishlisted && "fill-honey text-honey"
          )}
        />
        {wishlisted ? "Wishlisted" : "Wishlist"}
      </Button>
    </div>
  );
}

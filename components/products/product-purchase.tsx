"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check, ShoppingBag, Truck } from "lucide-react";
import type { Product } from "@/types";
import { commerceConfig, getDefaultVariant } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { QuantityInput } from "@/components/ui/quantity-input";
import { Price } from "@/components/products/price";

export function ProductPurchase({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [variantId, setVariantId] = useState(getDefaultVariant(product).id);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const variant = product.variants.find((v) => v.id === variantId)!;

  const add = () => {
    addItem(product.slug, variant.id, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  };

  const buyNow = () => {
    addItem(product.slug, variant.id, quantity);
    router.push("/checkout");
  };

  return (
    <div>
      <Price
        price={variant.price}
        compareAtPrice={variant.compareAtPrice}
        size="lg"
        showSaving
      />

      <fieldset className="mt-7">
        <legend className="text-sm font-medium text-ink">Pack size</legend>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {product.variants.map((v) => (
            <label
              key={v.id}
              className={cn(
                "cursor-pointer rounded-md border px-4 py-2.5 text-sm transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-forest/30",
                v.id === variantId
                  ? "border-forest bg-forest text-ivory"
                  : "border-line bg-white text-ink hover:border-sage",
                !v.inStock && "cursor-not-allowed opacity-50 line-through"
              )}
            >
              <input
                type="radio"
                name="variant"
                value={v.id}
                checked={v.id === variantId}
                disabled={!v.inStock}
                onChange={() => setVariantId(v.id)}
                className="sr-only"
              />
              {v.label}
            </label>
          ))}
        </div>
      </fieldset>

      <p className="mt-4 flex items-center gap-2 text-sm">
        <span
          className={cn(
            "h-2 w-2 rounded-full",
            variant.inStock ? "bg-forest-soft" : "bg-danger"
          )}
          aria-hidden
        />
        {variant.inStock ? "In stock, ready to dispatch" : "Currently sold out"}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <QuantityInput
          value={quantity}
          onChange={setQuantity}
          max={commerceConfig.maxQuantityPerLine}
        />
        <Button
          size="lg"
          className="flex-1 sm:flex-none sm:min-w-[180px]"
          onClick={add}
          disabled={!variant.inStock}
        >
          {added ? <Check /> : <ShoppingBag />}
          {added ? "Added to cart" : "Add to cart"}
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="w-full sm:w-auto"
          onClick={buyNow}
          disabled={!variant.inStock}
        >
          Buy now
        </Button>
      </div>
      {added && (
        <p className="mt-3 text-sm text-muted" role="status">
          Added to your cart.{" "}
          <Link href="/cart" className="text-forest underline underline-offset-4">
            View cart
          </Link>
        </p>
      )}

      <div className="mt-8 flex gap-3 rounded-md bg-paper p-4 text-sm">
        <Truck className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
        <div>
          <p className="font-medium text-ink">{commerceConfig.deliveryCoverage}</p>
          <p className="mt-1 text-muted">
            {commerceConfig.deliveryEstimate} Delivery charges are confirmed with
            your order.
          </p>
        </div>
      </div>

      {/* Compact purchase bar so the action stays reachable on phones */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-3 border-t border-line bg-ivory/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm text-ink">{product.name}</p>
          <p className="text-xs text-muted">{variant.label}</p>
        </div>
        <Button onClick={add} disabled={!variant.inStock}>
          {added ? <Check /> : <ShoppingBag />}
          {added ? "Added" : "Add to cart"}
        </Button>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { priceCart } from "@/lib/pricing";
import { commerceConfig } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { QuantityInput } from "@/components/ui/quantity-input";
import { SummaryRows } from "@/components/cart/order-summary";

export function CartView() {
  const { ready, lines, setQuantity, removeItem } = useCart();
  const priced = priceCart(lines);

  if (!ready) {
    return <div className="h-64 animate-pulse rounded-md bg-paper" aria-label="Loading cart" />;
  }

  if (priced.lines.length === 0 && priced.unavailable.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-line px-6 py-20 text-center">
        <ShoppingBag className="mx-auto h-8 w-8 text-sage" strokeWidth={1.5} />
        <p className="mt-4 font-serif text-2xl text-ink">Your cart is empty</p>
        <p className="mt-2 text-sm text-muted">Start with our best-selling Hunza apricots.</p>
        <Button asChild className="mt-6">
          <Link href="/shop">Browse products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-8">
        {priced.unavailable.length > 0 && (
          <div className="mb-6 rounded-md border border-danger/30 bg-danger/5 p-4 text-sm text-danger" role="alert">
            Some items are no longer available and won&rsquo;t be included.{" "}
            <button
              type="button"
              className="underline"
              onClick={() => priced.unavailable.forEach((u) => removeItem(u.slug, u.variantId))}
            >
              Remove them
            </button>
          </div>
        )}
        <ul className="divide-y divide-line border-y border-line">
          {priced.lines.map((l) => (
            <li key={`${l.product.slug}-${l.variant.id}`} className="flex gap-4 py-5 sm:gap-6">
              <Link
                href={`/shop/${l.product.slug}`}
                className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-paper sm:h-28 sm:w-28"
              >
                <Image src={l.product.image} alt={l.product.name} fill sizes="112px" className="object-cover" />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex justify-between gap-3">
                  <div className="min-w-0">
                    <Link href={`/shop/${l.product.slug}`} className="font-serif text-lg leading-snug text-ink hover:text-forest">
                      {l.product.name}
                    </Link>
                    <p className="mt-0.5 text-sm text-muted">
                      {l.variant.label} · {formatPrice(l.variant.price)}
                    </p>
                  </div>
                  <p className="shrink-0 text-right tabular-nums text-ink">{formatPrice(l.lineTotal)}</p>
                </div>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <QuantityInput
                    size="sm"
                    value={l.quantity}
                    max={commerceConfig.maxQuantityPerLine}
                    label={`Quantity of ${l.product.name}`}
                    onChange={(q) => setQuantity(l.product.slug, l.variant.id, q)}
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(l.product.slug, l.variant.id)}
                    className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-danger"
                    aria-label={`Remove ${l.product.name} from cart`}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Remove</span>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <Link href="/shop" className="mt-6 inline-block text-sm text-forest underline-offset-4 hover:underline">
          ← Continue shopping
        </Link>
      </div>

      <aside className="lg:col-span-4">
        <div className="rounded-md bg-paper p-6 lg:sticky lg:top-24">
          <h2 className="mb-5 text-xl text-ink">Order summary</h2>
          <SummaryRows priced={priced} />
          <Button asChild size="lg" className="mt-6 w-full" disabled={priced.lines.length === 0}>
            <Link href="/checkout">
              Checkout <ArrowRight />
            </Link>
          </Button>
          <p className="mt-4 text-xs leading-relaxed text-muted">
            {commerceConfig.deliveryCoverage}. {commerceConfig.deliveryEstimate}
          </p>
        </div>
      </aside>
    </div>
  );
}

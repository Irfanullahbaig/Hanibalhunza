import type { CartLine, Product, ProductVariant } from "@/types";
import { commerceConfig, getProductBySlug, getVariant } from "@/lib/data";

export type PricedLine = {
  product: Product;
  variant: ProductVariant;
  quantity: number;
  lineTotal: number;
};

export type PricedCart = {
  lines: PricedLine[];
  /** Lines that no longer match the catalogue or are out of stock */
  unavailable: CartLine[];
  subtotal: number;
  savings: number;
  /** null when delivery is quoted per order */
  shipping: number | null;
  total: number;
};

/**
 * Prices a cart from the catalogue. The client uses it for display; the
 * server action re-runs it so submitted prices can never be trusted.
 */
export function priceCart(cart: CartLine[]): PricedCart {
  const lines: PricedLine[] = [];
  const unavailable: CartLine[] = [];

  for (const line of cart) {
    const product = getProductBySlug(line.slug);
    const variant = product && getVariant(product, line.variantId);
    if (!product || !variant || !variant.inStock) {
      unavailable.push(line);
      continue;
    }
    const quantity = Math.min(
      Math.max(1, Math.floor(line.quantity)),
      commerceConfig.maxQuantityPerLine
    );
    lines.push({ product, variant, quantity, lineTotal: variant.price * quantity });
  }

  const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0);
  const savings = lines.reduce(
    (sum, l) =>
      sum +
      (l.variant.compareAtPrice
        ? (l.variant.compareAtPrice - l.variant.price) * l.quantity
        : 0),
    0
  );

  let shipping: number | null = commerceConfig.shippingFlatRate;
  if (
    shipping !== null &&
    commerceConfig.freeShippingThreshold !== null &&
    subtotal >= commerceConfig.freeShippingThreshold
  ) {
    shipping = 0;
  }

  return {
    lines,
    unavailable,
    subtotal,
    savings,
    shipping,
    total: subtotal + (shipping ?? 0),
  };
}

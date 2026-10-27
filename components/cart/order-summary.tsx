import Image from "next/image";
import type { PricedCart } from "@/lib/pricing";
import { commerceConfig } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

export function SummaryRows({ priced }: { priced: PricedCart }) {
  return (
    <dl className="space-y-3 text-sm">
      <div className="flex justify-between">
        <dt className="text-muted">Subtotal</dt>
        <dd className="tabular-nums text-ink">{formatPrice(priced.subtotal)}</dd>
      </div>
      {priced.savings > 0 && (
        <div className="flex justify-between">
          <dt className="text-muted">You save</dt>
          <dd className="tabular-nums text-apricot-deep">−{formatPrice(priced.savings)}</dd>
        </div>
      )}
      <div className="flex justify-between gap-4">
        <dt className="text-muted">Delivery</dt>
        <dd className="text-right text-ink">
          {priced.shipping === null
            ? "Confirmed with your order"
            : priced.shipping === 0
              ? "Free"
              : formatPrice(priced.shipping)}
        </dd>
      </div>
      <div className="flex justify-between border-t border-line pt-3 text-base">
        <dt className="font-medium text-ink">
          {priced.shipping === null ? "Total before delivery" : "Total"}
        </dt>
        <dd className="font-medium tabular-nums text-ink">{formatPrice(priced.total)}</dd>
      </div>
      {commerceConfig.freeShippingThreshold !== null &&
        priced.shipping !== 0 &&
        priced.subtotal < commerceConfig.freeShippingThreshold && (
          <p className="text-xs text-muted">
            Add {formatPrice(commerceConfig.freeShippingThreshold - priced.subtotal)} more for
            free delivery.
          </p>
        )}
    </dl>
  );
}

export function CompactLines({ priced }: { priced: PricedCart }) {
  return (
    <ul className="divide-y divide-line">
      {priced.lines.map((l) => (
        <li key={`${l.product.slug}-${l.variant.id}`} className="flex items-center gap-3 py-3">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-paper">
            <Image src={l.product.image} alt="" fill sizes="56px" className="object-cover" />
            <span className="absolute -right-0 -top-0 flex h-5 min-w-5 items-center justify-center rounded-bl-md bg-forest px-1 text-[10px] font-semibold text-ivory">
              {l.quantity}
            </span>
          </div>
          <div className="min-w-0 flex-1 text-sm">
            <p className="truncate text-ink">{l.product.name}</p>
            <p className="text-muted">{l.variant.label}</p>
          </div>
          <p className="text-sm tabular-nums text-ink">{formatPrice(l.lineTotal)}</p>
        </li>
      ))}
    </ul>
  );
}

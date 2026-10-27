"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Plus } from "lucide-react";
import { getCategory, products, wholesaleConfig } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";

const wholesaleProducts = products.filter((p) => p.wholesale.available);

function formats(p: (typeof products)[number]) {
  return p.wholesale.bulkFormats.length > 0 ? p.wholesale.bulkFormats.join(", ") : "On request";
}

function moq(p: (typeof products)[number]) {
  return p.wholesale.moq ?? wholesaleConfig.minimumOrder ?? "Per quote";
}

function ShortlistButton({ slug, name }: { slug: string; name: string }) {
  const { inquiry, toggleInquiry } = useCart();
  const selected = inquiry.includes(slug);
  return (
    <button
      type="button"
      onClick={() => toggleInquiry(slug)}
      aria-pressed={selected}
      aria-label={selected ? `Remove ${name} from quote request` : `Add ${name} to quote request`}
      className={cn(
        "inline-flex h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md border px-3 text-[13px] font-medium transition-colors",
        selected
          ? "border-forest bg-forest text-ivory"
          : "border-forest/25 text-forest hover:border-forest"
      )}
    >
      {selected ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
      {selected ? "In quote" : "Add to quote"}
    </button>
  );
}

export function WholesaleCatalog() {
  const { inquiry, ready } = useCart();

  return (
    <div>
      {/* Desktop comparison table */}
      <div className="hidden overflow-hidden rounded-md border border-line bg-white md:block">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">Wholesale product specifications</caption>
          <thead className="bg-paper text-xs uppercase tracking-[0.12em] text-muted">
            <tr>
              <th scope="col" className="px-5 py-3.5 font-semibold">Product</th>
              <th scope="col" className="px-4 py-3.5 font-semibold">Retail pack</th>
              <th scope="col" className="px-4 py-3.5 font-semibold">Origin</th>
              <th scope="col" className="px-4 py-3.5 font-semibold">Bulk formats</th>
              <th scope="col" className="px-4 py-3.5 font-semibold">Minimum order</th>
              <th scope="col" className="px-5 py-3.5"><span className="sr-only">Action</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {wholesaleProducts.map((p) => (
              <tr key={p.slug} className="align-middle">
                <th scope="row" className="px-5 py-4 font-normal">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-paper">
                      <Image src={p.image} alt="" fill sizes="48px" className="object-cover" />
                    </div>
                    <div>
                      <Link href={`/shop/${p.slug}`} className="font-medium text-ink hover:text-forest">
                        {p.name}
                      </Link>
                      <p className="text-xs text-muted">{getCategory(p.category)?.name}</p>
                    </div>
                  </div>
                </th>
                <td className="px-4 py-4 text-ink">{p.variants.map((v) => v.label).join(", ")}</td>
                <td className="px-4 py-4 text-muted">{p.origin ? "Hunza Valley" : "—"}</td>
                <td className="px-4 py-4 text-muted">{formats(p)}</td>
                <td className="px-4 py-4 text-muted">{moq(p)}</td>
                <td className="px-5 py-4 text-right">
                  <ShortlistButton slug={p.slug} name={p.name} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <ul className="space-y-3 md:hidden">
        {wholesaleProducts.map((p) => (
          <li key={p.slug} className="rounded-md border border-line bg-white p-4">
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-paper">
                <Image src={p.image} alt="" fill sizes="56px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-ink">{p.name}</p>
                <p className="text-xs text-muted">{getCategory(p.category)?.name}</p>
              </div>
            </div>
            <dl className="mt-3 grid grid-cols-3 gap-2 text-xs">
              <div>
                <dt className="text-muted">Retail pack</dt>
                <dd className="mt-0.5 text-ink">{p.variants.map((v) => v.label).join(", ")}</dd>
              </div>
              <div>
                <dt className="text-muted">Bulk formats</dt>
                <dd className="mt-0.5 text-ink">{formats(p)}</dd>
              </div>
              <div>
                <dt className="text-muted">Minimum</dt>
                <dd className="mt-0.5 text-ink">{moq(p)}</dd>
              </div>
            </dl>
            <div className="mt-3 flex justify-end">
              <ShortlistButton slug={p.slug} name={p.name} />
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted" aria-live="polite">
          {ready && inquiry.length > 0
            ? `${inquiry.length} product${inquiry.length === 1 ? "" : "s"} in your quote request.`
            : "Add products to your quote request, or choose them in the form below."}
        </p>
        <a href="#quote" className="text-sm font-medium text-forest underline underline-offset-4">
          Continue to quote request ↓
        </a>
      </div>
    </div>
  );
}

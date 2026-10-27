"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import {
  categories,
  getFromPrice,
  isProductInStock,
  products,
} from "@/lib/data";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/products/product-card";
import { Select } from "@/components/ui/select";

export type CatalogParams = {
  q?: string;
  category?: string;
  price?: string;
  stock?: string;
  sort?: string;
};

const priceRanges = [
  { id: "under-2500", label: "Under Rs 2,500", test: (p: number) => p < 2500 },
  { id: "2500-5000", label: "Rs 2,500 – 5,000", test: (p: number) => p >= 2500 && p <= 5000 },
  { id: "over-5000", label: "Over Rs 5,000", test: (p: number) => p > 5000 },
];

const sorts = [
  { id: "featured", label: "Featured" },
  { id: "popular", label: "Best selling" },
  { id: "newest", label: "Newest" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
];

export function Catalog({ initial }: { initial: CatalogParams }) {
  const router = useRouter();
  const pathname = usePathname();
  const [q, setQ] = useState(initial.q ?? "");
  const [category, setCategory] = useState(initial.category ?? "");
  const [price, setPrice] = useState(initial.price ?? "");
  const [inStockOnly, setInStockOnly] = useState(initial.stock === "1");
  const [sort, setSort] = useState(initial.sort ?? "featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  // A search submitted from the header updates the URL without remounting.
  const pushedQ = useRef(initial.q ?? "");
  useEffect(() => {
    const next = initial.q ?? "";
    if (next !== pushedQ.current) {
      pushedQ.current = next;
      setQ(next);
    }
  }, [initial.q]);

  // Keep the URL shareable and in sync with the current filters.
  useEffect(() => {
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (category) params.set("category", category);
    if (price) params.set("price", price);
    if (inStockOnly) params.set("stock", "1");
    if (sort !== "featured") params.set("sort", sort);
    const qs = params.toString();
    const t = window.setTimeout(() => {
      pushedQ.current = q.trim();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    }, 250);
    return () => window.clearTimeout(t);
  }, [q, category, price, inStockOnly, sort, pathname, router]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    const range = priceRanges.find((r) => r.id === price);
    const list = products.filter((p) => {
      if (category && p.category !== category) return false;
      if (inStockOnly && !isProductInStock(p)) return false;
      if (range && !range.test(getFromPrice(p))) return false;
      if (term) {
        const haystack = `${p.name} ${p.shortDescription} ${p.ingredients ?? ""}`.toLowerCase();
        if (!term.split(/\s+/).every((w) => haystack.includes(w))) return false;
      }
      return true;
    });
    const sorted = [...list];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => getFromPrice(a) - getFromPrice(b));
        break;
      case "price-desc":
        sorted.sort((a, b) => getFromPrice(b) - getFromPrice(a));
        break;
      case "newest":
        sorted.sort((a, b) => b.addedOrder - a.addedOrder);
        break;
      case "popular":
        sorted.sort((a, b) => Number(!!b.bestseller) - Number(!!a.bestseller));
        break;
      default:
        sorted.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    }
    return sorted;
  }, [q, category, price, inStockOnly, sort]);

  const activeCount = [category, price, inStockOnly ? "1" : ""].filter(Boolean).length;
  const reset = () => {
    setQ("");
    setCategory("");
    setPrice("");
    setInStockOnly(false);
  };

  const filters = (
    <div className="space-y-8">
      <fieldset>
        <legend className="eyebrow !text-muted">Category</legend>
        <div className="mt-3 space-y-1">
          {[{ slug: "", name: "All products" }, ...categories].map((c) => (
            <label key={c.slug || "all"} className="flex cursor-pointer items-center gap-3 py-1.5 text-[15px] text-ink">
              <input
                type="radio"
                name="category"
                checked={category === c.slug}
                onChange={() => setCategory(c.slug)}
                className="h-4 w-4 accent-forest"
              />
              {c.name}
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="eyebrow !text-muted">Price</legend>
        <div className="mt-3 space-y-1">
          {[{ id: "", label: "Any price" }, ...priceRanges].map((r) => (
            <label key={r.id || "any"} className="flex cursor-pointer items-center gap-3 py-1.5 text-[15px] text-ink">
              <input
                type="radio"
                name="price"
                checked={price === r.id}
                onChange={() => setPrice(r.id)}
                className="h-4 w-4 accent-forest"
              />
              {r.label}
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="eyebrow !text-muted">Availability</legend>
        <label className="mt-3 flex cursor-pointer items-center gap-3 py-1.5 text-[15px] text-ink">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="h-4 w-4 rounded accent-forest"
          />
          In stock only
        </label>
      </fieldset>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products"
            aria-label="Search products"
            className="h-11 w-full rounded-md border border-line bg-white pl-10 pr-4 text-base text-ink placeholder:text-muted/70 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/15 sm:text-sm"
          />
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            aria-expanded={filtersOpen}
            aria-controls="mobile-filters"
            className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-md border border-line bg-white px-4 text-sm text-ink lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters{activeCount > 0 && ` (${activeCount})`}
          </button>
          <div className="flex-1 sm:w-56 sm:flex-none">
            <label htmlFor="sort" className="sr-only">
              Sort by
            </label>
            <Select id="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
              {sorts.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </div>

      <div
        id="mobile-filters"
        className={cn("mt-4 rounded-md border border-line bg-white p-5 lg:hidden", !filtersOpen && "hidden")}
      >
        {filters}
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block" aria-label="Filters">
          {filters}
        </aside>
        <div>
          <div className="mb-6 flex items-center justify-between gap-4 text-sm text-muted">
            <p aria-live="polite">
              {results.length} product{results.length === 1 ? "" : "s"}
              {q.trim() && <> for &ldquo;{q.trim()}&rdquo;</>}
            </p>
            {(activeCount > 0 || q) && (
              <button type="button" onClick={reset} className="inline-flex items-center gap-1 text-forest hover:underline">
                <X className="h-3.5 w-3.5" /> Clear all
              </button>
            )}
          </div>
          {results.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3">
              {results.map((p, i) => (
                <ProductCard key={p.id} product={p} priority={i < 3} />
              ))}
            </div>
          ) : (
            <div className="rounded-md border border-dashed border-line px-6 py-16 text-center">
              <p className="font-serif text-2xl text-ink">No products found</p>
              <p className="mt-2 text-sm text-muted">Try a different search or clear your filters.</p>
              <button type="button" onClick={reset} className="mt-5 text-sm font-medium text-forest underline underline-offset-4">
                Show all products
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

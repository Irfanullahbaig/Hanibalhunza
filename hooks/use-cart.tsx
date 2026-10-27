"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartLine } from "@/types";
import { commerceConfig, getProductBySlug, getVariant } from "@/lib/data";

const CART_KEY = "hh-cart-v1";
const INQUIRY_KEY = "hh-wholesale-list-v1";

type StoreContextValue = {
  /** false until localStorage has been read, to avoid hydration flashes */
  ready: boolean;
  lines: CartLine[];
  count: number;
  addItem: (slug: string, variantId: string, quantity?: number) => void;
  setQuantity: (slug: string, variantId: string, quantity: number) => void;
  removeItem: (slug: string, variantId: string) => void;
  clear: () => void;
  /** Product slugs a business has shortlisted for a wholesale quote */
  inquiry: string[];
  toggleInquiry: (slug: string) => void;
  clearInquiry: () => void;
  lastAdded: { slug: string; at: number } | null;
};

const StoreContext = createContext<StoreContextValue | null>(null);

function read<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage may be unavailable (private mode); the cart still works in memory.
  }
}

const clampQty = (q: number) =>
  Math.min(Math.max(1, Math.floor(q) || 1), commerceConfig.maxQuantityPerLine);

export function CartProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [lines, setLines] = useState<CartLine[]>([]);
  const [inquiry, setInquiry] = useState<string[]>([]);
  const [lastAdded, setLastAdded] = useState<StoreContextValue["lastAdded"]>(null);

  useEffect(() => {
    const stored = read<CartLine[]>(CART_KEY, []);
    // Drop saved lines whose product or pack size no longer exists.
    setLines(
      (Array.isArray(stored) ? stored : []).filter((l) => {
        const product = getProductBySlug(l?.slug);
        return !!product && !!getVariant(product, l.variantId);
      })
    );
    const storedInquiry = read<string[]>(INQUIRY_KEY, []);
    setInquiry(Array.isArray(storedInquiry) ? storedInquiry : []);
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) write(CART_KEY, lines);
  }, [lines, ready]);

  useEffect(() => {
    if (ready) write(INQUIRY_KEY, inquiry);
  }, [inquiry, ready]);

  const addItem = useCallback((slug: string, variantId: string, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.slug === slug && l.variantId === variantId);
      if (existing) {
        return prev.map((l) =>
          l === existing ? { ...l, quantity: clampQty(l.quantity + quantity) } : l
        );
      }
      return [...prev, { slug, variantId, quantity: clampQty(quantity) }];
    });
    setLastAdded({ slug, at: Date.now() });
  }, []);

  const setQuantity = useCallback(
    (slug: string, variantId: string, quantity: number) => {
      setLines((prev) =>
        prev.map((l) =>
          l.slug === slug && l.variantId === variantId
            ? { ...l, quantity: clampQty(quantity) }
            : l
        )
      );
    },
    []
  );

  const removeItem = useCallback((slug: string, variantId: string) => {
    setLines((prev) =>
      prev.filter((l) => !(l.slug === slug && l.variantId === variantId))
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const toggleInquiry = useCallback((slug: string) => {
    setInquiry((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }, []);

  const clearInquiry = useCallback(() => setInquiry([]), []);

  const count = useMemo(() => lines.reduce((sum, l) => sum + l.quantity, 0), [lines]);

  const value = useMemo(
    () => ({
      ready,
      lines,
      count,
      addItem,
      setQuantity,
      removeItem,
      clear,
      inquiry,
      toggleInquiry,
      clearInquiry,
      lastAdded,
    }),
    [ready, lines, count, addItem, setQuantity, removeItem, clear, inquiry, toggleInquiry, clearInquiry, lastAdded]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useCart() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Building2, Menu, Search, ShoppingBag, X } from "lucide-react";
import { categories, navItems, siteConfig, whatsappLink } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";
import { useScrolled } from "@/hooks/use-scrolled";
import { BrandMark } from "@/components/layout/brand-mark";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const scrolled = useScrolled(8);
  const { count, ready } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get("q")?.toString().trim();
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
    setSearchOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 border-b bg-ivory/95 backdrop-blur-md transition-colors",
          scrolled ? "border-line" : "border-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:h-[72px] lg:px-8">
          <button
            type="button"
            className="-ml-2 flex h-10 w-10 items-center justify-center rounded-md text-ink lg:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>

          <BrandMark />

          <nav
            className="ml-10 hidden items-center gap-8 lg:flex"
            aria-label="Primary"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "relative py-1 text-[14px] transition-colors hover:text-forest",
                  isActive(item.href)
                    ? "text-forest after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-forest"
                    : "text-ink/75",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1">
            <button
              type="button"
              aria-label="Search products"
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-md text-ink transition-colors hover:bg-paper"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>
            <Link
              href="/cart"
              aria-label={`Cart${ready && count > 0 ? `, ${count} item${count === 1 ? "" : "s"}` : ""}`}
              className="relative flex h-10 w-10 items-center justify-center rounded-md text-ink transition-colors hover:bg-paper"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              {ready && count > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-apricot-deep px-1 text-[10px] font-semibold tabular-nums text-white">
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </Link>
            <Link
              href="/wholesale"
              className="ml-2 hidden h-9 items-center gap-2 rounded-md border border-forest/25 px-3.5 text-[13px] font-medium text-forest transition-colors hover:border-forest hover:bg-forest hover:text-ivory md:inline-flex"
            >
              <Building2 className="h-3.5 w-3.5" />
              Wholesale
            </Link>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-line bg-ivory">
            <form
              onSubmit={onSearch}
              role="search"
              className="mx-auto flex max-w-3xl items-center gap-2 px-4 py-3 sm:px-6"
            >
              <Search className="h-4 w-4 shrink-0 text-muted" aria-hidden />
              <input
                ref={searchRef}
                type="search"
                name="q"
                placeholder="Search apricots, almonds, walnuts…"
                aria-label="Search products"
                className="h-10 w-full bg-transparent text-base text-ink placeholder:text-muted/70 focus:outline-none"
              />
              <button
                type="submit"
                className="h-9 rounded-md bg-forest px-4 text-[13px] font-medium text-ivory hover:bg-forest-deep"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile drawer — outside the header, whose backdrop-filter would
          otherwise become the containing block for this fixed overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          menuOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!menuOpen}
      >
        <div
          className={cn(
            "absolute inset-0 bg-ink/30 transition-opacity duration-300",
            menuOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setMenuOpen(false)}
        />
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          inert={!menuOpen}
          onClick={(e) => {
            // Close for every link, including ones that keep the same pathname
            if ((e.target as HTMLElement).closest("a")) setMenuOpen(false);
          }}
          className={cn(
            "absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col bg-ivory shadow-xl transition-transform duration-300 ease-out",
            menuOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex h-16 items-center justify-between border-b border-line px-4">
            <BrandMark />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-md text-ink"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <ul>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between border-b border-line/70 py-3.5 font-serif text-xl",
                      isActive(item.href) ? "text-forest" : "text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="eyebrow mt-8">Shop by category</p>
            <ul className="mt-3 space-y-1">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/shop?category=${c.slug}`}
                    className="block py-2 text-[15px] text-ink/80 hover:text-forest"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2 border-t border-line p-4">
            <Link
              href="/wholesale"
              className="flex h-11 items-center justify-center gap-2 rounded-md bg-forest text-sm font-medium text-ivory"
            >
              <Building2 className="h-4 w-4" />
              Wholesale & bulk orders
            </Link>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 items-center justify-center rounded-md border border-line text-sm text-ink"
            >
              WhatsApp {siteConfig.phone}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}

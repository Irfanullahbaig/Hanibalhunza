"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, MessageCircle, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { navItems, siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useScrolled } from "@/hooks/use-scrolled";
import { BrandMark } from "@/components/layout/brand-mark";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const scrolled = useScrolled(50);
  const solid = !isHome || scrolled;
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const whatsappHref = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    "Hello Haniball Hunza! I'd like to place an order."
  )}`;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        solid
          ? "bg-forest py-3 shadow-lg backdrop-blur-md"
          : "bg-transparent py-5"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <BrandMark size="md" />

        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Primary"
          lang="en"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-cream/85 transition hover:text-honey"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search"
            className="text-cream hover:bg-white/10 hover:text-honey"
            onClick={() => setSearchOpen((v) => !v)}
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button asChild size="sm" className="ml-1 hidden md:inline-flex">
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" />
              Order Now
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="text-cream hover:bg-white/10 lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="border-t border-white/10 bg-forest px-4 py-3 backdrop-blur-md"
          >
            <form
              action="/shop"
              className="mx-auto flex max-w-2xl gap-2"
              role="search"
            >
              <input
                type="search"
                name="q"
                placeholder="Search dry fruits, shilajit, gifts…"
                autoFocus
                className="h-11 w-full rounded-md border border-white/15 bg-white/10 px-4 text-sm text-cream placeholder:text-cream/50 focus:outline-none focus:ring-2 focus:ring-honey"
                aria-label="Search products"
              />
              <Button type="submit">Search</Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/10 bg-forest lg:hidden"
            aria-label="Mobile"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-cream transition hover:bg-white/10 hover:text-honey"
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild className="mt-2">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                >
                  <MessageCircle className="h-4 w-4" />
                  Order Now
                </a>
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

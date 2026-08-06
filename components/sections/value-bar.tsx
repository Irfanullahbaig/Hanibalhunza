"use client";

import Link from "next/link";
import { MessageCircle, Headphones, PackageSearch } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function ValueBar() {
  return (
    <div className="bg-forest-dark py-3 text-center text-xs font-medium uppercase tracking-[0.15em] text-cream/90 sm:text-sm">
      <p>
        <span className="text-honey">100% Pure &amp; Natural</span>
        <span className="mx-3 text-cream/30">|</span>
        10% Off Your First Order
        <span className="mx-3 text-cream/30">|</span>
        Free Shipping on Orders Over Rs. 5,000
      </p>
    </div>
  );
}

export function WhatsAppOrder() {
  const href = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    "Hi! I'd like to order Haniball Hunza dry fruits."
  )}`;

  return (
    <section className="bg-white py-16 sm:py-20" aria-labelledby="wa-heading">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <Reveal>
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366]">
            <MessageCircle className="h-8 w-8" />
          </div>
          <h2
            id="wa-heading"
            className="font-serif text-3xl text-charcoal sm:text-4xl"
          >
            Order Directly on WhatsApp
          </h2>
          <p className="mt-4 text-muted">
            Prefer a personal touch? Message our team for recommendations, gift
            wrapping, and fast order support.
          </p>
          <Button asChild size="lg" className="mt-8 bg-[#25D366] hover:bg-[#1ebe57] text-white">
            <a href={href} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5" />
              Start WhatsApp Order
            </a>
          </Button>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-sm text-muted">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 transition hover:text-forest"
            >
              <PackageSearch className="h-4 w-4 text-honey" />
              Track Orders
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 transition hover:text-forest"
            >
              <Headphones className="h-4 w-4 text-honey" />
              Customer Support
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

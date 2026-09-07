"use client";

import { MessageCircle } from "lucide-react";
import type { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

export function ProductActions({ product }: { product: Product }) {
  const message = encodeURIComponent(
    `Hello Haniball Hunza! I'd like to order:\n\n• ${product.name} (${product.weight})\n• Price: ${formatPrice(product.price)}\n\nPlease confirm availability. Thank you!`
  );
  const whatsappHref = `https://wa.me/${siteConfig.whatsapp}?text=${message}`;

  return (
    <div className="mt-8">
      <Button asChild size="lg" variant="forest" className="min-w-[220px]">
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
          <MessageCircle className="h-5 w-5" />
          Order Now
        </a>
      </Button>
    </div>
  );
}

"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/data";

export function WhatsAppFloat() {
  const href = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
      "Hello Haniball Hunza! I'd like to order dry fruits."
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-110 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey"
    >
      <MessageCircle className="h-7 w-7" fill="currentColor" />
    </a>
  );
}

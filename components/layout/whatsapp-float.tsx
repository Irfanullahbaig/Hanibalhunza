"use client";

import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/data";
import { cn } from "@/lib/utils";

export function WhatsAppFloat() {
  const pathname = usePathname();
  // Hidden where a purchase bar or form already owns the bottom of the screen.
  if (pathname === "/checkout" || pathname === "/cart") return null;
  const raised = pathname.startsWith("/shop/");

  return (
    <a
      href={whatsappLink("Hello Haniball Hunza! I have a question about your products.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={cn(
        "fixed right-4 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-forest text-ivory shadow-lg shadow-forest/20 transition-transform hover:-translate-y-0.5 sm:right-6",
        raised ? "bottom-24 lg:bottom-6" : "bottom-5 sm:bottom-6"
      )}
    >
      <MessageCircle className="h-5 w-5" />
    </a>
  );
}

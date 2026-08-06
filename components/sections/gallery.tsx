"use client";

import Image from "next/image";
import { useState } from "react";
import { galleryImages } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function Gallery() {
  const [active, setActive] = useState<string | null>(null);
  const activeImage = galleryImages.find((img) => img.id === active);

  return (
    <section
      className="bg-cream py-20 sm:py-28"
      aria-labelledby="gallery-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-12 max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-honey">
            Visual Journal
          </p>
          <h2
            id="gallery-heading"
            className="mt-3 font-serif text-3xl text-charcoal sm:text-4xl lg:text-5xl"
          >
            From Orchard to Highland
          </h2>
          <p className="mt-4 text-muted">
            A glimpse into our dry apricots, almonds, Hunzai chocolate, shilajit,
            and the mountain landscapes behind every harvest.
          </p>
        </Reveal>

        <div className="masonry">
          {galleryImages.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setActive(image.id)}
              className={cn(
                "masonry-item group relative w-full overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey",
                image.span === "tall" ? "aspect-[3/4]" : "aspect-[4/3]"
              )}
              aria-label={`View ${image.alt}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                loading={index < 3 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-forest/0 transition group-hover:bg-forest/25" />
            </button>
          ))}
        </div>
      </div>

      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent>
          {activeImage && (
            <div className="relative mx-auto aspect-[4/3] w-full overflow-hidden rounded-xl">
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                sizes="90vw"
                className="object-cover"
                priority
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

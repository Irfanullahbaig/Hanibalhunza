"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 4500, stopOnInteraction: true })]
  );
  const [selected, setSelected] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section
      className="relative overflow-hidden bg-forest py-20 sm:py-28"
      aria-labelledby="testimonials-heading"
    >
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-honey/20 blur-3xl" />
        <div className="absolute -right-10 bottom-0 h-80 w-80 rounded-full bg-cream/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-12 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-honey">
            Testimonials
          </p>
          <h2
            id="testimonials-heading"
            className="mt-3 font-serif text-3xl text-cream sm:text-4xl lg:text-5xl"
          >
            Loved Across Pakistan
          </h2>
        </Reveal>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5">
            {testimonials.map((t) => (
              <article
                key={t.id}
                className="glass min-w-0 shrink-0 grow-0 basis-full rounded-2xl p-7 sm:basis-[70%] lg:basis-[40%]"
              >
                <div className="mb-4 flex gap-0.5 text-honey">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < t.rating
                          ? "fill-honey text-honey"
                          : "text-cream/30"
                      )}
                    />
                  ))}
                </div>
                <blockquote className="text-base leading-relaxed text-cream/90">
                  &ldquo;{t.review}&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-honey/40">
                    <Image
                      src={t.photo}
                      alt={t.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-cream">{t.name}</p>
                    <p className="text-sm text-cream/60">{t.city}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Button
            variant="outline"
            size="icon"
            aria-label="Previous testimonial"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex gap-2" role="tablist" aria-label="Slides">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={selected === i}
                aria-label={`Go to slide ${i + 1}`}
                className={cn(
                  "h-2 rounded-full transition-all",
                  selected === i
                    ? "w-6 bg-honey"
                    : "w-2 bg-cream/30 hover:bg-cream/50"
                )}
                onClick={() => emblaApi?.scrollTo(i)}
              />
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            aria-label="Next testimonial"
            onClick={scrollNext}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}

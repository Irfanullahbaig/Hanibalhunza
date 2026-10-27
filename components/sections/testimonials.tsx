import { Star } from "lucide-react";
import { testimonials } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";

export const verifiedTestimonials = testimonials.filter((t) => t.verified);

/** Renders only verified reviews; returns nothing until there are some. */
export function Testimonials() {
  if (verifiedTestimonials.length === 0) return null;

  return (
    <section className="bg-paper py-16 sm:py-24" aria-labelledby="reviews-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="reviews-heading" eyebrow="Customer reviews" title="What our customers say" />
        <div className="grid gap-5 md:grid-cols-3">
          {verifiedTestimonials.map((t) => (
            <figure key={t.id} className="flex flex-col rounded-md bg-ivory p-6 sm:p-8">
              <div className="flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    aria-hidden
                    className={i < t.rating ? "h-4 w-4 fill-apricot text-apricot" : "h-4 w-4 text-line"}
                  />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 font-serif text-lg leading-relaxed text-ink">
                &ldquo;{t.review}&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-sm text-muted">
                {t.name} · {t.city}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

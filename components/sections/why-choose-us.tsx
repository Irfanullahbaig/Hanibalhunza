"use client";

import {
  Ban,
  Droplets,
  FlaskConical,
  Leaf,
  Mountain,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { features } from "@/lib/data";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";

const iconMap: Record<string, LucideIcon> = {
  Droplets,
  Ban,
  FlaskConical,
  Leaf,
  Mountain,
  Truck,
};

export function WhyChooseUs() {
  return (
    <section
      className="bg-cream py-20 sm:py-28"
      aria-labelledby="why-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-honey">
            Our Promise
          </p>
          <h2
            id="why-heading"
            className="mt-3 font-serif text-3xl text-charcoal sm:text-4xl lg:text-5xl"
          >
            Why Choose Haniball Hunza
          </h2>
          <p className="mt-4 text-muted">
            Every product reflects our commitment to purity, origin, and the
            communities who grow these mountain harvests.
          </p>
        </Reveal>

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = iconMap[feature.icon] ?? Droplets;
            return (
              <StaggerItem key={feature.id}>
                <article className="group h-full rounded-2xl bg-white p-7 shadow-sm ring-1 ring-border/50 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="mb-5 inline-flex rounded-xl bg-forest/5 p-3 text-forest transition duration-300 group-hover:bg-honey/15 group-hover:text-honey-dark">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h3 className="font-serif text-xl text-charcoal">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {feature.description}
                  </p>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

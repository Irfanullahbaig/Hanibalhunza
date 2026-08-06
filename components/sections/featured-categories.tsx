"use client";

import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/data";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";

export function FeaturedCategories() {
  return (
    <section
      id="categories"
      className="bg-cream py-20 sm:py-28"
      aria-labelledby="categories-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-12 max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-honey">
            Collections
          </p>
          <h2
            id="categories-heading"
            className="mt-3 font-serif text-3xl text-charcoal sm:text-4xl lg:text-5xl"
          >
            Featured Categories
          </h2>
          <p className="mt-4 text-muted">
            Explore our carefully curated dry fruits and wellness products—each
            one a reflection of Hunza&apos;s untamed landscapes.
          </p>
        </Reveal>

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((category) => (
            <StaggerItem key={category.id}>
              <Link
                href={`/categories#${category.slug}`}
                className="group relative block aspect-[3/4] overflow-hidden rounded-2xl"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 20vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />
                <div className="absolute inset-x-0 bottom-0 p-5 transition-transform duration-300 group-hover:-translate-y-1">
                  <h3 className="font-serif text-xl text-cream">
                    {category.name}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs text-cream/75">
                    {category.description}
                  </p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

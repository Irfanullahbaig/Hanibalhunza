"use client";

import Image from "next/image";
import Link from "next/link";
import { stats } from "@/lib/data";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

export function AboutSection() {
  return (
    <section
      className="overflow-hidden bg-forest py-20 text-cream sm:py-28"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal direction="left">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000&q=80"
                alt="Mountain landscape of Hunza Valley"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 hidden w-48 overflow-hidden rounded-xl shadow-2xl sm:block lg:-right-8">
              <div className="relative aspect-square">
                <Image
                  src="https://images.unsplash.com/photo-1508747703725-719777637510?w=400&q=80"
                  alt="Premium dry almonds from Hunza"
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal direction="right" delay={0.15}>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-honey">
            Our Story
          </p>
          <h2
            id="about-heading"
            className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl"
          >
            From Hunza&apos;s Peaks to Your Table
          </h2>
          <p className="mt-6 text-cream/75 leading-relaxed">
            Haniball Hunza was born from a simple belief: the world deserves to
            taste Hunza&apos;s harvest exactly as nature intended. High in the
            Karakoram, our partner growers sun-dry apricots, gather almonds, and
            carefully prepare shilajit—free from industrial shortcuts.
          </p>
          <p className="mt-4 text-cream/75 leading-relaxed">
            From orchard to packing, every step honors tradition, quality, and
            the land that makes these dry fruits extraordinary.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div key={stat.id}>
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals ?? 0}
                  className="font-serif text-3xl text-honey sm:text-4xl"
                />
                <p className="mt-1 text-sm text-cream/60">{stat.label}</p>
              </div>
            ))}
          </div>

          <Button asChild className="mt-10" size="lg">
            <Link href="/about">Discover Our Journey</Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

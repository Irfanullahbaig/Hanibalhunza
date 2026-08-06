import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AboutSection } from "@/components/sections/about";
import { Newsletter } from "@/components/sections/newsletter";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn the story of Haniball Hunza—premium dry fruits, Hunzai chocolate, and organic shilajit rooted in Hunza Valley.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="relative flex min-h-[50vh] items-end overflow-hidden bg-forest pb-16 pt-32">
        <Image
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80"
          alt="Hunza mountains"
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-cream/60">
            <Link href="/" className="hover:text-honey">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-honey">About</span>
          </nav>
          <h1 className="font-serif text-4xl text-cream sm:text-5xl lg:text-6xl">
            About Haniball Hunza
          </h1>
        </div>
      </section>

      <AboutSection />

      <section className="bg-cream py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <h2 className="font-serif text-3xl text-charcoal sm:text-4xl">
              From Orchard to Your Table
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              Our growers follow seasonal rhythms—sun-drying apricots at peak
              ripeness, sorting almonds by hand, and preparing shilajit with
              care so purity and potency remain intact.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              Quality checks on each batch ensure you receive dry fruits and
              wellness products as authentic as the valleys they come from.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1599599810769-d37b6f796a1a?w=900&q=80"
                alt="Assorted Hunza dry fruits"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>
        </div>
      </section>
      <Newsletter />
    </>
  );
}

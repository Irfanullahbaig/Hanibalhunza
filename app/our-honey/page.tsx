import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { Newsletter } from "@/components/sections/newsletter";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Our Products",
  description:
    "Discover what makes Haniball Hunza unique—dry apricots, almonds, Hunzai chocolate, and organic shilajit from Hunza Valley.",
  alternates: { canonical: "/our-honey" },
};

const pillars = [
  {
    title: "High-Altitude Origin",
    body: "Apricots and nuts grown in Hunza’s mountain climate for deeper flavor and natural sweetness.",
  },
  {
    title: "Careful Processing",
    body: "Sun-drying and gentle handling preserve nutrients, aroma, and authentic mountain taste.",
  },
  {
    title: "Batch Transparency",
    body: "Each harvest is packed with care—shilajit verified for purity and authenticity.",
  },
];

export default function OurProductsPage() {
  return (
    <>
      <section className="relative min-h-[55vh] overflow-hidden bg-forest pb-16 pt-32">
        <Image
          src="https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=1600&q=80"
          alt="Hunza dry apricots"
          fill
          priority
          className="object-cover opacity-35"
          sizes="100vw"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-cream/60">
            <Link href="/" className="hover:text-honey">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-honey">Our Products</span>
          </nav>
          <h1 className="max-w-3xl font-serif text-4xl text-cream sm:text-5xl lg:text-6xl">
            Dry Fruits Crafted by Mountains
          </h1>
          <p className="mt-5 max-w-xl text-lg text-cream/75">
            Not all dry fruits are equal. Ours begin where the air is thinner,
            the orchards older, and time moves with the seasons.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/shop">Taste the Difference</Link>
          </Button>
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12 max-w-2xl">
            <h2 className="font-serif text-3xl text-charcoal sm:text-4xl">
              What Sets Us Apart
            </h2>
          </Reveal>
          <Stagger className="grid gap-6 md:grid-cols-3">
            {pillars.map((p) => (
              <StaggerItem key={p.title}>
                <article className="h-full rounded-2xl bg-white p-7 ring-1 ring-border/60">
                  <h3 className="font-serif text-xl text-forest">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {p.body}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <WhyChooseUs />
      <Newsletter />
    </>
  );
}

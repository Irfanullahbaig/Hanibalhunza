import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { QualitySection } from "@/components/sections/quality";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Haniball Hunza brings sun-dried apricots, almonds, walnuts and traditional Hunza specialties from Karimabad to homes and businesses across Pakistan.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Our Story" }]}
        eyebrow="Our story"
        title="A harvest worth carrying down the mountain"
        description="Haniball Hunza began with a simple belief: everyone should be able to taste Hunza's harvest the way the valley does."
      />

      <section className="py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
          <div className="relative aspect-[4/3] overflow-hidden rounded-md">
            <Image
              src="/images/mountain-landscape.jpg"
              alt="Snow-capped mountains above a green valley"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="space-y-5 leading-relaxed text-ink/85">
            <h2 className="text-3xl text-ink sm:text-4xl">Rooted in Karimabad</h2>
            <p>
              High in the Karakoram, Hunza&rsquo;s orchards grow on terraces fed by
              glacier water. Apricots ripen slowly in the mountain sun and are
              dried the traditional way. Almonds and walnuts are gathered each
              autumn and sorted by hand.
            </p>
            <p>
              We work with growers and partners in the valley to bring that
              harvest to your table, and to the shelves and kitchens of
              businesses across Pakistan, without industrial shortcuts.
            </p>
            <p>
              Alongside dried fruits and nuts we offer Hunza specialties like
              Kilawo, walnuts set in grape syrup, and purified mountain shilajit.
            </p>
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <QualitySection />

      <section className="border-t border-line bg-paper py-14 sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <h2 className="max-w-xl text-3xl text-ink">Taste the valley, or stock it for your customers.</h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/shop">Shop now</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/wholesale">Wholesale</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

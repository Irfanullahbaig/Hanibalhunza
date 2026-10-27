import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Mountain, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

const trust = [
  { icon: Mountain, label: "Sourced from Hunza Valley" },
  { icon: Leaf, label: "Sun-dried, no added sugar" },
  { icon: Truck, label: "Delivery across Pakistan" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-ivory" aria-labelledby="hero-heading">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-10 sm:px-6 sm:pt-14 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="lg:col-span-6 xl:col-span-5">
          <p className="eyebrow">From the orchards of Hunza</p>
          <h1
            id="hero-heading"
            className="mt-4 text-[2.6rem] leading-[1.05] text-ink sm:text-6xl lg:text-[3.6rem] xl:text-[4.1rem]"
          >
            Nature&rsquo;s finest harvest, delivered to you.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            Premium dried fruits and nuts sourced with care. From everyday
            healthy snacking to bulk supply for your business, natural goodness
            in every order.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/shop">
                Shop dried fruits
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/wholesale">Wholesale &amp; bulk orders</Link>
            </Button>
          </div>
          <ul className="mt-10 grid gap-3 border-t border-line pt-6 text-[13px] text-muted sm:grid-cols-3 sm:gap-4 lg:grid-cols-1 2xl:grid-cols-3">
            {trust.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon className="h-4 w-4 shrink-0 text-sage" aria-hidden />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative lg:col-span-6 xl:col-span-7">
          <div className="relative aspect-[2/1] overflow-hidden rounded-md sm:aspect-[16/9] lg:aspect-[4/3]">
            <Image
              src="/images/hero-apricots.jpg"
              alt="Haniball Hunza sun-dried apricots in a wooden bowl beside a kraft pouch, with mountains behind"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover object-[30%_60%]"
            />
          </div>
          <div className="absolute bottom-4 left-4 hidden rounded-md bg-ivory/95 px-5 py-4 shadow-[0_8px_30px_-12px_rgba(31,61,43,0.35)] backdrop-blur-sm sm:block">
            <p className="font-serif text-lg text-ink">Hunza Dried Apricots</p>
            <p className="mt-0.5 text-[13px] text-muted">Sun-dried · 500 g</p>
            <Link
              href="/shop/dry-apricot"
              className="mt-2 inline-flex items-center gap-1 text-[13px] font-medium text-forest underline-offset-4 hover:underline"
            >
              View product <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

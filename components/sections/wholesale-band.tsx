import Link from "next/link";
import { ArrowRight, Building2, Hotel, Store, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

const buyers = [
  { icon: Store, label: "Retailers & supermarkets" },
  { icon: Truck, label: "Distributors" },
  { icon: Hotel, label: "Hotels & restaurants" },
  { icon: Building2, label: "Corporate gifting" },
];

export function WholesaleBand() {
  return (
    <section className="border-y border-line bg-sage-light/60 py-16 sm:py-20" aria-labelledby="wholesale-heading">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <p className="eyebrow">For businesses</p>
          <h2 id="wholesale-heading" className="mt-3 text-3xl leading-tight text-ink sm:text-4xl">
            Wholesale and bulk supply
          </h2>
          <p className="mt-4 max-w-lg leading-relaxed text-muted">
            Stock Hunza dried fruits and nuts in your store, kitchen or gift
            programme. Tell us what you need and we&rsquo;ll come back with
            availability, packaging options and a quote.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/wholesale#quote">
                Request a wholesale quote <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/wholesale">How wholesale works</Link>
            </Button>
          </div>
        </div>
        <ul className="grid grid-cols-2 gap-3">
          {buyers.map(({ icon: Icon, label }) => (
            <li key={label} className="flex flex-col gap-4 rounded-md bg-ivory p-5">
              <Icon className="h-5 w-5 text-forest" strokeWidth={1.5} aria-hidden />
              <span className="text-sm text-ink sm:text-[15px]">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

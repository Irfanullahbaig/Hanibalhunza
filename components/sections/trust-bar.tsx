import { Leaf, MountainSnow, ShieldCheck, Truck } from "lucide-react";
import { Peaks } from "@/components/layout/brand-mark";

const items = [
  { icon: Leaf, title: "100% Natural", body: "No preservatives" },
  { icon: MountainSnow, title: "Authentic Hunza", body: "Mountain goodness" },
  { icon: ShieldCheck, title: "Premium Quality", body: "Handpicked with care" },
  { icon: Truck, title: "Nationwide Delivery", body: "Fresh to your door" },
];

export function TrustBar() {
  return (
    <section aria-label="Our promise" className="border-y border-line bg-paper">
      <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-y-6 px-4 py-7 sm:px-6 lg:grid-cols-4 lg:py-8 lg:px-8">
        {items.map(({ icon: Icon, title, body }) => (
          <li
            key={title}
            className="flex items-center gap-3 sm:gap-4 lg:justify-center lg:border-l lg:border-line lg:first:border-l-0"
          >
            <Icon className="h-8 w-8 shrink-0 text-forest sm:h-9 sm:w-9" strokeWidth={1.4} aria-hidden />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-ink sm:text-[15px]">{title}</p>
              <p className="mt-0.5 text-[13px] text-muted">{body}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-center gap-4 pb-5" aria-hidden>
        <span className="h-px w-16 bg-line sm:w-24" />
        <Peaks className="h-4 w-7 text-forest/70" />
        <span className="h-px w-16 bg-line sm:w-24" />
      </div>
    </section>
  );
}

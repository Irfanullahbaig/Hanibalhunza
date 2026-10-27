import { Leaf, Mountain, PackageCheck, Sun } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

const reasons = [
  {
    icon: Mountain,
    title: "Direct from Hunza",
    body: "Sourced at origin from trusted Hunza growers and partners.",
  },
  {
    icon: Sun,
    title: "Naturally sun-dried",
    body: "Apricots dried in mountain sun, with no added sugar or chemical treatment.",
  },
  {
    icon: Leaf,
    title: "Nothing artificial",
    body: "No artificial colours or preservatives—just the fruit and nut as they grew.",
  },
  {
    icon: PackageCheck,
    title: "Packed with care",
    body: "Kraft pouches with a clear window, packed to keep every order fresh on its way to you.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-ivory py-16 sm:py-24" aria-labelledby="why-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="why-heading"
          eyebrow="Why choose us"
          title="Simple food, honestly sourced"
          align="center"
        />
        <div className="grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-ivory p-6 sm:p-8">
              <Icon className="h-6 w-6 text-sage" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-5 text-xl text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

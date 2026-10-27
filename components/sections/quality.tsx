import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";

const steps = [
  {
    title: "Sourcing",
    body: "Apricots, almonds and walnuts are sourced in the Hunza Valley, where the crop is grown and dried.",
  },
  {
    title: "Sorting",
    body: "Every batch is sorted by hand and quality-checked before it is packed.",
  },
  {
    title: "Packaging",
    body: "Kraft stand-up pouches with a clear window, so you can see exactly what you're buying.",
  },
  {
    title: "Delivery",
    body: "Orders are dispatched nationwide by courier, typically arriving in 2–4 business days in major cities.",
  },
];

export function QualitySection() {
  return (
    <section className="bg-ivory py-16 sm:py-24" aria-labelledby="quality-heading">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-5">
          <SectionHeading
            id="quality-heading"
            eyebrow="Quality & packaging"
            title="From the orchard to your door"
            description="How every order is sourced, checked and packed."
            className="!mb-8"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-md">
            <Image
              src="/images/pouch-mix.jpg"
              alt="Haniball Hunza kraft pouch with a clear window showing mixed dry fruits"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>
        <ol className="flex flex-col justify-center lg:col-span-7 lg:pl-8">
          {steps.map((s, i) => (
            <li key={s.title} className="flex gap-6 border-b border-line py-7 first:pt-0 last:border-0">
              <span className="font-serif text-3xl leading-none text-sage tabular-nums" aria-hidden>
                0{i + 1}
              </span>
              <div>
                <h3 className="text-xl text-ink">{s.title}</h3>
                <p className="mt-2 max-w-lg leading-relaxed text-muted">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

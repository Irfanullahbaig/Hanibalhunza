import type { Metadata } from "next";
import Image from "next/image";
import { Building2, Hotel, MessageCircle, Phone, ShoppingCart, Store, Truck, Utensils, Globe2, Gift } from "lucide-react";
import { siteConfig, whatsappLink, wholesaleConfig } from "@/lib/data";
import { Breadcrumbs } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { WholesaleCatalog } from "@/components/wholesale/wholesale-catalog";
import { InquiryForm } from "@/components/wholesale/inquiry-form";

export const metadata: Metadata = {
  title: "Wholesale & Bulk Dried Fruits",
  description:
    "Wholesale Hunza dried apricots, almonds, walnuts and gift sets for retailers, distributors, restaurants, hotels and corporate buyers. Request a bulk quote.",
  alternates: { canonical: "/wholesale" },
};

const audiences = [
  { icon: Store, label: "Retail stores" },
  { icon: ShoppingCart, label: "Supermarkets" },
  { icon: Truck, label: "Distributors" },
  { icon: Utensils, label: "Restaurants & cafés" },
  { icon: Hotel, label: "Hotels" },
  { icon: Gift, label: "Corporate gifting" },
  { icon: Globe2, label: "Exporters" },
  { icon: Building2, label: "Other businesses" },
];

const steps = [
  { title: "Shortlist products", body: "Add the products you're interested in from the catalogue below." },
  { title: "Send your request", body: "Tell us your quantities, packaging needs and delivery city." },
  { title: "Receive a quote", body: "We confirm availability, bulk formats, minimums and pricing." },
  { title: "Order & delivery", body: "Approve the quote and we arrange packing and dispatch." },
];

export default async function WholesalePage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product } = await searchParams;

  const terms = [
    {
      title: "Minimum order",
      body: wholesaleConfig.minimumOrder ?? "Set per product and confirmed in your quote.",
    },
    {
      title: "Volume pricing",
      body:
        wholesaleConfig.volumePricing.length > 0
          ? wholesaleConfig.volumePricing.map((t) => `${t.from}: ${t.discount}`).join(" · ")
          : "Pricing is quoted per inquiry based on product, quantity and packaging.",
    },
    {
      title: "Packaging",
      body:
        wholesaleConfig.privateLabel === true
          ? "Bulk packs, retail pouches and private-label packaging available."
          : "Tell us the formats you need. Options are confirmed with your quote.",
    },
    {
      title: "Delivery",
      body: "Dispatch across Pakistan. International requests are reviewed case by case.",
    },
  ];

  return (
    <>
      <section className="border-b border-line bg-paper">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-14 pt-8 sm:px-6 sm:pt-10 lg:grid-cols-12 lg:items-center lg:px-8 lg:pb-20">
          <div className="lg:col-span-6">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Wholesale" }]} />
            <p className="eyebrow mt-8">Haniball Hunza for business</p>
            <h1 className="mt-3 text-4xl leading-[1.08] text-ink sm:text-5xl lg:text-[3.4rem]">
              Hunza dried fruits and nuts, supplied in bulk
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              For retailers, distributors, kitchens, hotels and gifting
              programmes. Shortlist the products you need and we&rsquo;ll send a
              quote with availability, packaging and pricing.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a href="#quote">Request a wholesale quote</a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#catalogue">View wholesale catalogue</a>
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-md lg:col-span-6">
            <Image
              src="/images/hero-apricots.jpg"
              alt="Bowl of Hunza dried apricots next to a Haniball Hunza kraft pouch"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[30%_60%]"
            />
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20" aria-labelledby="audience-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading id="audience-heading" eyebrow="Who we supply" title="Built for businesses of every size" />
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-4">
            {audiences.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 bg-ivory p-4 text-sm text-ink sm:p-5 sm:text-[15px]">
                <Icon className="h-5 w-5 shrink-0 text-sage" strokeWidth={1.5} aria-hidden />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-line bg-forest py-14 text-ivory sm:py-20" aria-labelledby="process-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading id="process-heading" eyebrow="How it works" title="From inquiry to delivery" tone="dark" />
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="border-t border-ivory/20 pt-5">
                <span className="font-serif text-3xl text-sand tabular-nums">0{i + 1}</span>
                <h3 className="mt-3 text-xl">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ivory/70">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="catalogue" className="scroll-mt-20 py-14 sm:py-20" aria-labelledby="catalogue-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="catalogue-heading"
            eyebrow="Wholesale catalogue"
            title="Products available for bulk supply"
            description="Compare specifications and add products to your quote request. Bulk formats and minimums are confirmed with each quote."
          />
          <WholesaleCatalog />

          <dl className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {terms.map((t) => (
              <div key={t.title} className="rounded-md bg-paper p-5">
                <dt className="font-medium text-ink">{t.title}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">{t.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="quote" className="scroll-mt-20 border-t border-line bg-paper py-14 sm:py-20" aria-labelledby="quote-heading">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-4">
            <p className="eyebrow">Quote request</p>
            <h2 id="quote-heading" className="mt-3 text-3xl leading-tight text-ink sm:text-4xl">
              Tell us what your business needs
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              It takes about two minutes. Rough quantities are fine; we&rsquo;ll
              work out the details with you.
            </p>
            <div className="mt-8 space-y-3 text-sm">
              <p className="font-medium text-ink">Prefer to talk?</p>
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="flex items-center gap-2.5 text-ink hover:text-forest">
                <Phone className="h-4 w-4 text-sage" /> {siteConfig.phone}
              </a>
              <a
                href={whatsappLink("Hello Haniball Hunza! I'd like to discuss a wholesale order.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-ink hover:text-forest"
              >
                <MessageCircle className="h-4 w-4 text-sage" /> WhatsApp our team
              </a>
              {wholesaleConfig.email && (
                <a href={`mailto:${wholesaleConfig.email}`} className="block text-ink hover:text-forest">
                  {wholesaleConfig.email}
                </a>
              )}
            </div>
          </div>
          <div className="lg:col-span-8">
            <InquiryForm preselect={product} />
          </div>
        </div>
      </section>
    </>
  );
}

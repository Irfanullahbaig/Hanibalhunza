import type { Metadata } from "next";
import { siteConfig } from "@/lib/data";
import { HeroSection } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { CategoryTiles } from "@/components/sections/category-tiles";
import { Bestsellers } from "@/components/sections/bestsellers";
import { ShopByType } from "@/components/sections/shop-by-type";
import { OriginStory } from "@/components/sections/origin-story";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { WholesaleBand } from "@/components/sections/wholesale-band";
import { QualitySection } from "@/components/sections/quality";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQSection } from "@/components/sections/faq";
import { Newsletter } from "@/components/sections/newsletter";
import { JsonLd } from "@/components/seo/json-ld";
import { faqs } from "@/lib/data";

export const metadata: Metadata = {
  title: `${siteConfig.name} | Dried Fruits & Nuts from Hunza Valley`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function Page() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <HeroSection />
      <TrustBar />
      <CategoryTiles />
      <Bestsellers />
      <ShopByType />
      <OriginStory />
      <WhyChooseUs />
      <WholesaleBand />
      <QualitySection />
      <Testimonials />
      <FAQSection />
      <Newsletter />
    </>
  );
}

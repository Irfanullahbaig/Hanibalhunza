import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { ContactSection } from "@/components/sections/contact";
import { FAQSection } from "@/components/sections/faq";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Haniball Hunza about orders, delivery, wholesale and gifting. Call or WhatsApp +92 3555380038.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        title="Get in touch"
        description="Questions about an order, delivery or gifting? We usually reply within a few hours on business days."
      />
      <ContactSection />
      <FAQSection />
    </>
  );
}

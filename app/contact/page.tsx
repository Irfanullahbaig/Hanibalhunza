import type { Metadata } from "next";
import Link from "next/link";
import { ContactSection } from "@/components/sections/contact";
import { Newsletter } from "@/components/sections/newsletter";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Haniball Hunza for orders, wholesale inquiries, and customer support. WhatsApp and phone available.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-forest pb-12 pt-32 text-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-cream/60">
            <Link href="/" className="hover:text-honey">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-honey">Contact</span>
          </nav>
          <h1 className="font-serif text-4xl sm:text-5xl">Contact Us</h1>
        </div>
      </section>
      <ContactSection />
      <Newsletter />
    </>
  );
}

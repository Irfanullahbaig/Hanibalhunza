import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Terms of Service",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <section className="bg-cream pb-20 pt-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
          <Link href="/" className="hover:text-forest">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>Terms of Service</span>
        </nav>
        <h1 className="font-serif text-4xl text-charcoal">Terms of Service</h1>
        <p className="mt-6 leading-relaxed text-muted">
          By using {siteConfig.name} websites and services, you agree to provide
          accurate order information and to use our products as intended. Prices,
          availability, and promotions may change without notice. Food products
          are perishable by nature and subject to our shipping and return
          policies outlined in our FAQ and contact channels.
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          For legal inquiries, email{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-forest underline"
          >
            {siteConfig.email}
          </a>
          .
        </p>
      </div>
    </section>
  );
}

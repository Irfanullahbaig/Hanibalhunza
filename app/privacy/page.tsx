import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <section className="bg-cream pb-20 pt-32">
      <div className="prose prose-neutral mx-auto max-w-3xl px-4 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted not-prose">
          <Link href="/" className="hover:text-forest">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>Privacy Policy</span>
        </nav>
        <h1 className="font-serif text-4xl text-charcoal">Privacy Policy</h1>
        <p className="text-muted">
          {siteConfig.name} respects your privacy. We collect only the
          information needed to fulfill orders, improve our service, and
          communicate with you when you opt in—such as newsletter subscriptions
          or contact form messages.
        </p>
        <p className="text-muted">
          We do not sell personal data. Payment processing, when enabled, is
          handled by trusted third-party providers. For questions, contact us on
          WhatsApp or call{" "}
          <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
            {siteConfig.phone}
          </a>
          .
        </p>
      </div>
    </section>
  );
}

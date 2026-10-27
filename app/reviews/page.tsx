import type { Metadata } from "next";
import Link from "next/link";
import { whatsappLink } from "@/lib/data";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Testimonials, verifiedTestimonials } from "@/components/sections/testimonials";

export const metadata: Metadata = {
  title: "Customer Reviews",
  description: "Reviews from Haniball Hunza customers.",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Home", href: "/" }, { label: "Reviews" }]} title="Customer reviews" />
      {verifiedTestimonials.length > 0 ? (
        <Testimonials />
      ) : (
        <section className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
          <p className="font-serif text-2xl text-ink">We&rsquo;re collecting reviews from verified customers.</p>
          <p className="mt-3 text-muted">
            Ordered from us? We&rsquo;d love to hear how you found it.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild>
              <a
                href={whatsappLink("Hello Haniball Hunza! I'd like to share a review of my order.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                Share your review
              </a>
            </Button>
            <Button asChild variant="outline">
              <Link href="/shop">Shop products</Link>
            </Button>
          </div>
        </section>
      )}
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Testimonials } from "@/components/sections/testimonials";
import { Newsletter } from "@/components/sections/newsletter";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "Read customer reviews of Haniball Hunza dry fruits and wellness products from across Pakistan.",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  return (
    <>
      <section className="bg-forest pb-12 pt-32 text-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-cream/60">
            <Link href="/" className="hover:text-honey">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-honey">Reviews</span>
          </nav>
          <h1 className="font-serif text-4xl sm:text-5xl">Customer Reviews</h1>
          <p className="mt-4 max-w-xl text-cream/70">
            Real stories from people who taste the mountains in every spoonful.
          </p>
        </div>
      </section>
      <Testimonials />
      <Newsletter />
    </>
  );
}

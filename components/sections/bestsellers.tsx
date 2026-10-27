import Link from "next/link";
import { getBestsellers } from "@/lib/data";
import { ProductCard } from "@/components/products/product-card";
import { SectionHeading } from "@/components/ui/section-heading";

export function Bestsellers() {
  const items = getBestsellers().slice(0, 4);
  return (
    <section className="border-y border-line bg-paper py-16 sm:py-24" aria-labelledby="bestsellers-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="bestsellers-heading"
          eyebrow="Best sellers"
          title="Most loved from the valley"
          description="The dried fruits and nuts our customers come back for."
          action={
            <Link href="/shop?sort=popular" className="text-sm font-medium text-forest underline-offset-4 hover:underline">
              Shop best sellers
            </Link>
          }
        />
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

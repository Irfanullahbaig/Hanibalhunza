import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories, getProductsByCategory } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";

export function CategoryTiles() {
  return (
    <section className="bg-ivory py-16 sm:py-24" aria-labelledby="categories-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="categories-heading"
          eyebrow="Featured categories"
          title="Find your favourite"
          action={
            <Link href="/shop" className="text-sm font-medium text-forest underline-offset-4 hover:underline">
              View all products
            </Link>
          }
        />
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {categories.map((c) => {
            const count = getProductsByCategory(c.slug).length;
            return (
              <Link
                key={c.slug}
                href={`/shop?category=${c.slug}`}
                className="group relative block overflow-hidden rounded-md"
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={c.image}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-forest-deep/10 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 text-ivory sm:p-5">
                  <div>
                    <h3 className="text-lg leading-tight sm:text-2xl">{c.name}</h3>
                    <p className="mt-1 text-xs text-ivory/75 sm:text-[13px]">
                      {count} product{count === 1 ? "" : "s"}
                    </p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 shrink-0 opacity-70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

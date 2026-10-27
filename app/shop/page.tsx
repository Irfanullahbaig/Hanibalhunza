import type { Metadata } from "next";
import { getCategory } from "@/lib/data";
import { PageHeader } from "@/components/ui/page-header";
import { Catalog, type CatalogParams } from "@/components/shop/catalog";

type Props = { searchParams: Promise<CatalogParams> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { category } = await searchParams;
  const cat = category ? getCategory(category) : undefined;
  return {
    title: cat ? cat.name : "Shop Dried Fruits & Nuts",
    description: cat
      ? `${cat.description}. Shop ${cat.name.toLowerCase()} from Hunza Valley with nationwide delivery.`
      : "Shop Hunza dried apricots, almonds, walnuts, Kilawo, shilajit and gift sets with nationwide delivery across Pakistan.",
    alternates: { canonical: cat ? `/shop?category=${cat.slug}` : "/shop" },
  };
}

export default async function ShopPage({ searchParams }: Props) {
  const params = await searchParams;
  const cat = params.category ? getCategory(params.category) : undefined;

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Shop" }]}
        title={cat ? cat.name : "Shop the harvest"}
        description={
          cat
            ? `${cat.description}.`
            : "Dried fruits, nuts and Hunza specialties, packed fresh and delivered across Pakistan."
        }
      />
      <Catalog key={params.category ?? "all"} initial={params} />
    </>
  );
}

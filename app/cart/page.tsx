import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { CartView } from "@/components/cart/cart-view";

export const metadata: Metadata = {
  title: "Your Cart",
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Home", href: "/" }, { label: "Cart" }]} title="Your cart" />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <CartView />
      </div>
    </>
  );
}

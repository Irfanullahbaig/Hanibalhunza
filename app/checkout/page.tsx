import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { CheckoutForm } from "@/components/cart/checkout-form";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Cart", href: "/cart" }, { label: "Checkout" }]}
        title="Checkout"
      />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <CheckoutForm />
      </div>
    </>
  );
}

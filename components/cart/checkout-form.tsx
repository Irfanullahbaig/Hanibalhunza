"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { placeOrder, type OrderResult } from "@/app/actions";
import { useCart } from "@/hooks/use-cart";
import { priceCart } from "@/lib/pricing";
import { commerceConfig } from "@/lib/data";
import { checkoutSchema, type CheckoutValues } from "@/lib/schemas";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/components/ui/field";
import { SubmissionResult } from "@/components/ui/submission-result";
import { CompactLines, SummaryRows } from "@/components/cart/order-summary";

type Success = Extract<OrderResult, { ok: true }>;

export function CheckoutForm() {
  const { ready, lines, clear } = useCart();
  const [result, setResult] = useState<Success | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const priced = priceCart(lines);
  const hasPayment = commerceConfig.paymentMethods.length > 0;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutValues>({
    resolver: zodResolver(
      hasPayment
        ? checkoutSchema.refine((v) => !!v.paymentMethod, {
            path: ["paymentMethod"],
            message: "Choose a payment method",
          })
        : checkoutSchema
    ),
  });

  const onSubmit = async (values: CheckoutValues) => {
    setServerError(null);
    try {
      const res = await placeOrder({ ...values, lines });
      if (res.ok) {
        setResult(res);
        clear();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setServerError(res.error);
      }
    } catch {
      setServerError("We couldn't place your order. Please check your connection and try again.");
    }
  };

  if (result) {
    return (
      <div className="mx-auto max-w-2xl">
        <SubmissionResult
          title="Thank you, your order is placed"
          reference={result.reference}
          recorded={result.recorded}
          whatsappUrl={result.whatsappUrl}
          whatsappPurpose="confirm your order, delivery charge and payment"
        >
          <ul className="mt-6 divide-y divide-line border-y border-line text-sm">
            {result.lines.map((l) => (
              <li key={`${l.name}-${l.variant}`} className="flex justify-between gap-4 py-3">
                <span className="text-ink">
                  {l.name} <span className="text-muted">({l.variant}) × {l.quantity}</span>
                </span>
                <span className="tabular-nums">{formatPrice(l.lineTotal)}</span>
              </li>
            ))}
            <li className="flex justify-between py-3 font-medium">
              <span>{result.shipping === null ? "Total before delivery" : "Total"}</span>
              <span className="tabular-nums">{formatPrice(result.total)}</span>
            </li>
          </ul>
        </SubmissionResult>
        <Link href="/shop" className="mt-6 inline-block text-sm text-forest underline underline-offset-4">
          Continue shopping
        </Link>
      </div>
    );
  }

  if (!ready) {
    return <div className="h-96 animate-pulse rounded-md bg-paper" aria-label="Loading checkout" />;
  }

  if (priced.lines.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-line px-6 py-20 text-center">
        <p className="font-serif text-2xl text-ink">Your cart is empty</p>
        <Button asChild className="mt-6">
          <Link href="/shop">Browse products</Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-10 lg:grid-cols-12">
      <div className="space-y-10 lg:col-span-7">
        <fieldset className="space-y-5">
          <legend className="mb-1 font-serif text-2xl text-ink">Contact</legend>
          <p className="text-sm text-muted">
            No account needed. We&rsquo;ll use these details to confirm your order.
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="name" label="Full name" error={errors.name?.message}>
              <Input id="name" autoComplete="name" aria-invalid={!!errors.name} {...register("name")} />
            </Field>
            <Field id="phone" label="Phone / WhatsApp" error={errors.phone?.message}>
              <Input id="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="03xx xxxxxxx" aria-invalid={!!errors.phone} {...register("phone")} />
            </Field>
          </div>
          <Field id="email" label="Email" optional error={errors.email?.message}>
            <Input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} {...register("email")} />
          </Field>
        </fieldset>

        <fieldset className="space-y-5">
          <legend className="mb-1 font-serif text-2xl text-ink">Delivery</legend>
          <Field id="city" label="City" error={errors.city?.message}>
            <Input id="city" autoComplete="address-level2" aria-invalid={!!errors.city} {...register("city")} />
          </Field>
          <Field id="address" label="Full address" error={errors.address?.message} hint="House, street, area and any landmark">
            <Textarea id="address" autoComplete="street-address" className="min-h-[90px]" aria-invalid={!!errors.address} {...register("address")} />
          </Field>
          <Field id="notes" label="Order notes" optional>
            <Textarea id="notes" className="min-h-[80px]" placeholder="Gift message, delivery timing…" {...register("notes")} />
          </Field>
        </fieldset>

        <fieldset className="space-y-3">
          <legend className="mb-1 font-serif text-2xl text-ink">Payment</legend>
          {hasPayment ? (
            <>
              {commerceConfig.paymentMethods.map((m) => (
                <label key={m} className="flex cursor-pointer items-center gap-3 rounded-md border border-line bg-white p-4 text-sm has-[:checked]:border-forest">
                  <input type="radio" value={m} className="h-4 w-4 accent-forest" {...register("paymentMethod")} />
                  {m}
                </label>
              ))}
              {errors.paymentMethod && (
                <p className="text-xs text-danger" role="alert">{errors.paymentMethod.message}</p>
              )}
            </>
          ) : (
            <p className="rounded-md bg-paper p-4 text-sm leading-relaxed text-ink">
              No payment is taken online. After you place your order, our team
              confirms the delivery charge and payment options with you on
              WhatsApp before dispatch.
            </p>
          )}
        </fieldset>
      </div>

      <aside className="lg:col-span-5">
        <div className="rounded-md bg-paper p-6 lg:sticky lg:top-24">
          <div className="flex items-baseline justify-between">
            <h2 className="text-xl text-ink">Your order</h2>
            <Link href="/cart" className="text-sm text-forest underline-offset-4 hover:underline">
              Edit cart
            </Link>
          </div>
          <div className="mt-3">
            <CompactLines priced={priced} />
          </div>
          <div className="mt-4 border-t border-line pt-4">
            <SummaryRows priced={priced} />
          </div>
          {serverError && (
            <p className="mt-4 text-sm text-danger" role="alert">
              {serverError}
            </p>
          )}
          <Button type="submit" size="lg" className="mt-6 w-full" disabled={isSubmitting}>
            {isSubmitting ? "Placing order…" : "Place order"}
          </Button>
          <p className="mt-3 text-xs leading-relaxed text-muted">
            By placing your order you agree to our{" "}
            <Link href="/terms" className="underline">terms</Link> and{" "}
            <Link href="/privacy" className="underline">privacy policy</Link>.
          </p>
        </div>
      </aside>
    </form>
  );
}

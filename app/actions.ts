"use server";

import { commerceConfig, siteConfig, whatsappLink, getProductBySlug } from "@/lib/data";
import { priceCart } from "@/lib/pricing";
import { forwardSubmission, makeReference } from "@/lib/notify";
import {
  contactSchema,
  newsletterSchema,
  orderSchema,
  wholesaleSchema,
  type ContactValues,
  type NewsletterValues,
  type OrderInput,
  type WholesaleValues,
} from "@/lib/schemas";
import { formatPrice } from "@/lib/utils";

type Failure = { ok: false; error: string };

export type OrderResult =
  | {
      ok: true;
      reference: string;
      /** true when the order was recorded server-side via the webhook */
      recorded: boolean;
      whatsappUrl: string;
      total: number;
      shipping: number | null;
      lines: { name: string; variant: string; quantity: number; lineTotal: number }[];
    }
  | Failure;

export async function placeOrder(input: OrderInput): Promise<OrderResult> {
  const parsed = orderSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Please check your details." };
  }
  const data = parsed.data;

  // Prices are always recomputed from the catalogue on the server.
  const priced = priceCart(data.lines);
  if (priced.unavailable.length > 0) {
    return {
      ok: false,
      error: "Some items in your cart are no longer available. Please review your cart.",
    };
  }
  if (
    data.paymentMethod &&
    commerceConfig.paymentMethods.length > 0 &&
    !commerceConfig.paymentMethods.includes(data.paymentMethod)
  ) {
    return { ok: false, error: "Please choose a valid payment method." };
  }

  const reference = makeReference("HH");
  const lines = priced.lines.map((l) => ({
    name: l.product.name,
    variant: l.variant.label,
    quantity: l.quantity,
    unitPrice: l.variant.price,
    lineTotal: l.lineTotal,
  }));

  const recorded = await forwardSubmission("order", reference, {
    customer: {
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      city: data.city,
      address: data.address,
    },
    notes: data.notes || null,
    paymentMethod: data.paymentMethod || null,
    lines,
    subtotal: priced.subtotal,
    shipping: priced.shipping,
    total: priced.total,
    currency: commerceConfig.currency,
  });

  const message = [
    `Hello ${siteConfig.name}! I'd like to confirm my order ${reference}.`,
    "",
    ...lines.map(
      (l) => `• ${l.name} (${l.variant}) × ${l.quantity} — ${formatPrice(l.lineTotal)}`
    ),
    "",
    `Subtotal: ${formatPrice(priced.subtotal)}`,
    priced.shipping === null
      ? "Delivery: please confirm"
      : `Delivery: ${priced.shipping === 0 ? "Free" : formatPrice(priced.shipping)}`,
    "",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `City: ${data.city}`,
    `Address: ${data.address}`,
    data.paymentMethod ? `Payment: ${data.paymentMethod}` : "",
    data.notes ? `Notes: ${data.notes}` : "",
  ]
    .filter((line, i, arr) => line !== "" || arr[i - 1] !== "")
    .join("\n")
    .trim();

  return {
    ok: true,
    reference,
    recorded,
    whatsappUrl: whatsappLink(message),
    total: priced.total,
    shipping: priced.shipping,
    lines: lines.map(({ name, variant, quantity, lineTotal }) => ({
      name,
      variant,
      quantity,
      lineTotal,
    })),
  };
}

export type InquiryResult =
  | { ok: true; reference: string; recorded: boolean; whatsappUrl: string }
  | Failure;

export async function submitWholesaleInquiry(
  input: WholesaleValues
): Promise<InquiryResult> {
  const parsed = wholesaleSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Please check your details." };
  }
  const data = parsed.data;
  const productNames = data.products.map(
    (slug) => getProductBySlug(slug)?.name ?? slug
  );

  const reference = makeReference("WQ");
  const recorded = await forwardSubmission("wholesale", reference, {
    ...data,
    products: productNames,
  });

  const message = [
    `Hello ${siteConfig.name}! Wholesale quote request ${reference}.`,
    "",
    `Business: ${data.company} (${data.businessType})`,
    `Contact: ${data.contactName}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Location: ${data.city}, ${data.country}`,
    "",
    `Products: ${productNames.join(", ")}`,
    `Estimated quantity: ${data.quantity}`,
    data.packaging ? `Packaging: ${data.packaging}` : "",
    data.notes ? `Notes: ${data.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return { ok: true, reference, recorded, whatsappUrl: whatsappLink(message) };
}

export async function submitContact(input: ContactValues): Promise<InquiryResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Please check your details." };
  }
  const data = parsed.data;
  const reference = makeReference("MSG");
  const recorded = await forwardSubmission("contact", reference, data);
  const message = `Hello ${siteConfig.name}! (${reference})\n\n${data.message}\n\n— ${data.name}, ${data.email}${data.phone ? `, ${data.phone}` : ""}`;
  return { ok: true, reference, recorded, whatsappUrl: whatsappLink(message) };
}

export type NewsletterResult = { ok: true } | Failure;

export async function subscribeNewsletter(
  input: NewsletterValues
): Promise<NewsletterResult> {
  const parsed = newsletterSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Enter a valid email." };
  }
  const recorded = await forwardSubmission(
    "newsletter",
    makeReference("NL"),
    parsed.data
  );
  if (!recorded) {
    return {
      ok: false,
      error:
        "Sign-ups aren't open yet. Follow us on Instagram for new harvest updates.",
    };
  }
  return { ok: true };
}

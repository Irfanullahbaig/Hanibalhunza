import { z } from "zod";
import { commerceConfig } from "@/lib/data";

const phone = z
  .string()
  .trim()
  .min(7, "Enter a phone number we can reach you on")
  .max(20, "Phone number looks too long")
  .regex(/^[+\d][\d\s-]+$/, "Use digits, spaces, + or - only");

export const cartLineSchema = z.object({
  slug: z.string().min(1).max(80),
  variantId: z.string().min(1).max(40),
  quantity: z.number().int().min(1).max(commerceConfig.maxQuantityPerLine),
});

export const checkoutSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(80),
  phone,
  email: z
    .string()
    .trim()
    .email("Enter a valid email")
    .max(120)
    .optional()
    .or(z.literal("")),
  city: z.string().trim().min(2, "Please enter your city").max(60),
  address: z
    .string()
    .trim()
    .min(8, "Please enter your full delivery address")
    .max(300),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
  paymentMethod: z.string().max(60).optional().or(z.literal("")),
});

export const orderSchema = checkoutSchema.extend({
  lines: z.array(cartLineSchema).min(1, "Your cart is empty").max(40),
});

export const wholesaleSchema = z.object({
  company: z.string().trim().min(2, "Enter your business name").max(120),
  contactName: z.string().trim().min(2, "Enter a contact name").max(80),
  email: z.string().trim().email("Enter a valid business email").max(120),
  phone,
  country: z.string().trim().min(2, "Enter your country").max(60),
  city: z.string().trim().min(2, "Enter your city").max(60),
  businessType: z.string().trim().min(1, "Select your business type").max(60),
  products: z.array(z.string().max(80)).min(1, "Select at least one product").max(20),
  quantity: z
    .string()
    .trim()
    .min(1, "Give a rough quantity, e.g. 50 kg per month")
    .max(120),
  packaging: z.string().trim().max(300).optional().or(z.literal("")),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(120),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Message should be at least 10 characters")
    .max(2000),
});

export const newsletterSchema = z.object({
  email: z.string().trim().email("Enter a valid email address").max(120),
});

export type CheckoutValues = z.infer<typeof checkoutSchema>;
export type OrderInput = z.infer<typeof orderSchema>;
export type WholesaleValues = z.infer<typeof wholesaleSchema>;
export type ContactValues = z.infer<typeof contactSchema>;
export type NewsletterValues = z.infer<typeof newsletterSchema>;

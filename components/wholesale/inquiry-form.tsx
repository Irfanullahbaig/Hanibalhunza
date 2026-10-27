"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitWholesaleInquiry, type InquiryResult } from "@/app/actions";
import { useCart } from "@/hooks/use-cart";
import { products, wholesaleConfig } from "@/lib/data";
import { wholesaleSchema, type WholesaleValues } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/components/ui/field";
import { SubmissionResult } from "@/components/ui/submission-result";

const options = products.filter((p) => p.wholesale.available);

export function InquiryForm({ preselect }: { preselect?: string }) {
  const { ready, inquiry, toggleInquiry, clearInquiry } = useCart();
  const [result, setResult] = useState<Extract<InquiryResult, { ok: true }> | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<WholesaleValues>({
    resolver: zodResolver(wholesaleSchema),
    defaultValues: { country: "Pakistan", products: [] },
  });

  // A product linked from its detail page joins the shortlist once.
  useEffect(() => {
    if (ready && preselect && options.some((p) => p.slug === preselect) && !inquiry.includes(preselect)) {
      toggleInquiry(preselect);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, preselect]);

  // The shortlist is the single source of truth for "products of interest".
  useEffect(() => {
    setValue("products", inquiry, { shouldValidate: isSubmitted });
  }, [inquiry, setValue, isSubmitted]);

  const onSubmit = async (values: WholesaleValues) => {
    setServerError(null);
    try {
      const res = await submitWholesaleInquiry(values);
      if (res.ok) {
        setResult(res);
        clearInquiry();
        document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });
      } else {
        setServerError(res.error);
      }
    } catch {
      setServerError("We couldn't send your request. Please try again or contact us on WhatsApp.");
    }
  };

  if (result) {
    return (
      <SubmissionResult
        title="Thank you, your quote request is ready"
        reference={result.reference}
        recorded={result.recorded}
        whatsappUrl={result.whatsappUrl}
        whatsappPurpose="send your request to our wholesale team"
      >
        <p className="mt-4 text-sm leading-relaxed text-muted">
          We&rsquo;ll reply with availability, packaging options and pricing for
          the quantities you need.
        </p>
      </SubmissionResult>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-8 rounded-md border border-line bg-white p-5 sm:p-8"
    >
      <fieldset className="space-y-5">
        <legend className="mb-1 font-serif text-xl text-ink">Your business</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="company" label="Business or company name" error={errors.company?.message}>
            <Input id="company" autoComplete="organization" aria-invalid={!!errors.company} {...register("company")} />
          </Field>
          <Field id="businessType" label="Business type" error={errors.businessType?.message}>
            <Select id="businessType" defaultValue="" aria-invalid={!!errors.businessType} {...register("businessType")}>
              <option value="" disabled>
                Select…
              </option>
              {wholesaleConfig.businessTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Select>
          </Field>
          <Field id="contactName" label="Contact person" error={errors.contactName?.message}>
            <Input id="contactName" autoComplete="name" aria-invalid={!!errors.contactName} {...register("contactName")} />
          </Field>
          <Field id="w-email" label="Business email" error={errors.email?.message}>
            <Input id="w-email" type="email" autoComplete="email" aria-invalid={!!errors.email} {...register("email")} />
          </Field>
          <Field id="w-phone" label="Phone / WhatsApp" error={errors.phone?.message}>
            <Input id="w-phone" type="tel" autoComplete="tel" inputMode="tel" aria-invalid={!!errors.phone} {...register("phone")} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field id="country" label="Country" error={errors.country?.message}>
              <Input id="country" autoComplete="country-name" aria-invalid={!!errors.country} {...register("country")} />
            </Field>
            <Field id="w-city" label="City" error={errors.city?.message}>
              <Input id="w-city" autoComplete="address-level2" aria-invalid={!!errors.city} {...register("city")} />
            </Field>
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend className="font-serif text-xl text-ink">Products of interest</legend>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {options.map((p) => {
            const checked = inquiry.includes(p.slug);
            return (
              <label
                key={p.slug}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-md border px-3.5 py-3 text-sm transition-colors",
                  checked ? "border-forest bg-forest/5" : "border-line hover:border-sage"
                )}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleInquiry(p.slug)}
                  className="h-4 w-4 rounded accent-forest"
                />
                {p.name}
              </label>
            );
          })}
        </div>
        {errors.products && (
          <p className="mt-2 text-xs text-danger" role="alert">
            {errors.products.message}
          </p>
        )}
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="mb-1 font-serif text-xl text-ink">Order details</legend>
        <Field
          id="quantity"
          label="Estimated order quantity"
          hint="e.g. 50 kg apricots per month, or 200 gift boxes for December"
          error={errors.quantity?.message}
        >
          <Input id="quantity" aria-invalid={!!errors.quantity} {...register("quantity")} />
        </Field>
        <Field id="packaging" label="Packaging requirements" optional hint="Bulk sacks, retail pouches, gift boxes, own branding…">
          <Input id="packaging" {...register("packaging")} />
        </Field>
        <Field id="w-notes" label="Additional notes" optional>
          <Textarea id="w-notes" className="min-h-[100px]" {...register("notes")} />
        </Field>
      </fieldset>

      {serverError && (
        <p className="text-sm text-danger" role="alert">
          {serverError}
        </p>
      )}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Sending…" : "Request a wholesale quote"}
        </Button>
        <p className="text-xs text-muted">We reply with availability, packaging options and pricing.</p>
      </div>
    </form>
  );
}

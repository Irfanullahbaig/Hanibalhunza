"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, MapPin, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { submitContact, type InquiryResult } from "@/app/actions";
import { siteConfig, whatsappLink } from "@/lib/data";
import { contactSchema, type ContactValues } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/components/ui/field";
import { SubmissionResult } from "@/components/ui/submission-result";

export function ContactSection() {
  const [result, setResult] = useState<Extract<InquiryResult, { ok: true }> | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (values: ContactValues) => {
    setServerError(null);
    try {
      const res = await submitContact(values);
      if (res.ok) setResult(res);
      else setServerError(res.error);
    } catch {
      setServerError("We couldn't send your message. Please try WhatsApp instead.");
    }
  };

  return (
    <section className="bg-ivory py-14 sm:py-20" aria-label="Contact details and form">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-7">
          {result ? (
            <SubmissionResult
              title="Thanks for your message"
              reference={result.reference}
              recorded={result.recorded}
              whatsappUrl={result.whatsappUrl}
              whatsappPurpose="make sure it reaches our team"
            />
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-5 rounded-md border border-line bg-white p-5 sm:p-8"
            >
              <h2 className="text-2xl text-ink">Send us a message</h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="name" label="Name" error={errors.name?.message}>
                  <Input id="name" autoComplete="name" aria-invalid={!!errors.name} {...register("name")} />
                </Field>
                <Field id="email" label="Email" error={errors.email?.message}>
                  <Input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} {...register("email")} />
                </Field>
              </div>
              <Field id="phone" label="Phone" optional>
                <Input id="phone" type="tel" autoComplete="tel" {...register("phone")} />
              </Field>
              <Field id="message" label="Message" error={errors.message?.message}>
                <Textarea id="message" aria-invalid={!!errors.message} {...register("message")} />
              </Field>
              {serverError && (
                <p className="text-sm text-danger" role="alert">
                  {serverError}
                </p>
              )}
              <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
                {isSubmitting ? "Sending…" : "Send message"}
              </Button>
            </form>
          )}
        </div>

        <aside className="space-y-4 lg:col-span-5">
          <div className="rounded-md bg-forest p-6 text-ivory sm:p-8">
            <h2 className="text-2xl">Talk to us directly</h2>
            <ul className="mt-6 space-y-5 text-sm">
              <li>
                <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="flex gap-3 hover:text-sand">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-sand" />
                  <span>
                    <span className="block text-ivory/60">Phone</span>
                    {siteConfig.phone}
                  </span>
                </a>
              </li>
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-sand">
                  <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-sand" />
                  <span>
                    <span className="block text-ivory/60">WhatsApp</span>
                    {siteConfig.phone}
                  </span>
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sand" />
                <span>
                  <span className="block text-ivory/60">Based in</span>
                  {siteConfig.address}
                </span>
              </li>
            </ul>
          </div>
          <Link
            href="/wholesale#quote"
            className="flex items-start gap-3 rounded-md border border-line bg-white p-5 transition-colors hover:border-sage"
          >
            <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-forest" strokeWidth={1.5} />
            <span>
              <span className="block font-medium text-ink">Ordering for a business?</span>
              <span className="mt-1 block text-sm text-muted">
                Use the wholesale quote form for bulk quantities and packaging.
              </span>
            </span>
          </Link>
        </aside>
      </div>
    </section>
  );
}

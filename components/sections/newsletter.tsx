"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { subscribeNewsletter } from "@/app/actions";
import { newsletterSchema, type NewsletterValues } from "@/lib/schemas";
import { Button } from "@/components/ui/button";

export function Newsletter() {
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterValues>({ resolver: zodResolver(newsletterSchema) });

  const onSubmit = async (values: NewsletterValues) => {
    try {
      const res = await subscribeNewsletter(values);
      if (res.ok) {
        reset();
        setStatus({ ok: true, message: "Thank you—you're on the list for new harvest updates." });
      } else {
        setStatus({ ok: false, message: res.error });
      }
    } catch {
      setStatus({ ok: false, message: "Something went wrong. Please try again." });
    }
  };

  return (
    <section className="bg-paper py-16 sm:py-20" aria-labelledby="newsletter-heading">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="max-w-md">
          <h2 id="newsletter-heading" className="text-3xl text-ink">
            New harvest, first
          </h2>
          <p className="mt-3 text-muted">
            Seasonal arrivals and limited batches from Hunza, a few times a year.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full max-w-md">
          <div className="flex flex-col gap-2 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              autoComplete="email"
              placeholder="Your email address"
              aria-invalid={!!errors.email}
              aria-describedby="newsletter-status"
              className="h-12 w-full rounded-md border border-line bg-white px-4 text-base text-ink placeholder:text-muted/70 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/15 sm:text-sm"
              {...register("email")}
            />
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Subscribing…" : "Subscribe"}
            </Button>
          </div>
          <p
            id="newsletter-status"
            role={errors.email || status ? "status" : undefined}
            className={`mt-2 min-h-5 text-sm ${errors.email || (status && !status.ok) ? "text-danger" : "text-forest"}`}
          >
            {errors.email?.message ?? status?.message}
          </p>
        </form>
      </div>
    </section>
  );
}

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Reveal } from "@/components/ui/reveal";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
});

type FormValues = z.infer<typeof schema>;

export function Newsletter() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 600));
    reset();
  };

  return (
    <section
      className="relative overflow-hidden bg-forest py-16 sm:py-20"
      aria-labelledby="newsletter-heading"
    >
      <div className="hero-grid absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <Reveal>
          <h2
            id="newsletter-heading"
            className="font-serif text-3xl text-cream sm:text-4xl"
          >
            Join the Haniball Family
          </h2>
          <p className="mt-4 text-cream/70">
            Be first to know about new harvests, limited editions, and exclusive
            offers.
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            noValidate
          >
            <Input
              type="email"
              placeholder="Your email address"
              aria-label="Email for newsletter"
              aria-invalid={!!errors.email}
              className="border-white/20 bg-white/10 text-cream placeholder:text-cream/50"
              {...register("email")}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Joining…" : "Subscribe"}
            </Button>
          </form>
          {errors.email && (
            <p className="mt-2 text-sm text-honey" role="alert">
              {errors.email.message}
            </p>
          )}
          {isSubmitSuccessful && (
            <p className="mt-2 text-sm text-honey" role="status">
              Welcome to the family—check your inbox soon.
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}

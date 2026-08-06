"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { siteConfig } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Reveal } from "@/components/ui/reveal";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message should be at least 10 characters"),
});

type FormValues = z.infer<typeof schema>;

export function ContactSection() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 800));
    reset();
  };

  const whatsappHref = `https://wa.me/${siteConfig.whatsapp}`;

  return (
    <section
      id="contact"
      className="bg-cream py-20 sm:py-28"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-12 max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-honey">
            Get in Touch
          </p>
          <h2
            id="contact-heading"
            className="mt-3 font-serif text-3xl text-charcoal sm:text-4xl lg:text-5xl"
          >
            We&apos;d Love to Hear From You
          </h2>
          <p className="mt-4 text-muted">
            Questions about orders, wholesale, or gifting? Reach out anytime.
          </p>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border/60 sm:p-8"
              noValidate
            >
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-xs text-red-600" role="alert">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-red-600" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone (optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  {...register("phone")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  aria-invalid={!!errors.message}
                  {...register("message")}
                />
                {errors.message && (
                  <p className="text-xs text-red-600" role="alert">
                    {errors.message.message}
                  </p>
                )}
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full">
                <Send className="h-4 w-4" />
                {isSubmitting ? "Sending…" : "Send Message"}
              </Button>
              {isSubmitSuccessful && (
                <p className="text-center text-sm text-forest" role="status">
                  Thank you—we&apos;ll get back to you shortly.
                </p>
              )}
            </form>
          </Reveal>

          <Reveal delay={0.15} className="space-y-6">
            <div className="space-y-4 rounded-2xl bg-forest p-6 text-cream sm:p-8">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-start gap-3 transition hover:text-honey"
              >
                <Mail className="mt-0.5 h-5 w-5 text-honey" />
                <div>
                  <p className="text-sm text-cream/60">Email</p>
                  <p>{siteConfig.email}</p>
                </div>
              </a>
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="flex items-start gap-3 transition hover:text-honey"
              >
                <Phone className="mt-0.5 h-5 w-5 text-honey" />
                <div>
                  <p className="text-sm text-cream/60">Phone</p>
                  <p>{siteConfig.phone}</p>
                </div>
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-honey" />
                <div>
                  <p className="text-sm text-cream/60">Address</p>
                  <p>{siteConfig.address}</p>
                </div>
              </div>
              <Button asChild className="mt-2 w-full">
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  Chat on WhatsApp
                </a>
              </Button>
            </div>

            <div
              className="relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-2xl bg-forest/10 ring-1 ring-border"
              role="img"
              aria-label="Map placeholder for Hunza Valley location"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(212,160,23,0.2),transparent_50%),radial-gradient(circle_at_70%_60%,rgba(31,77,54,0.25),transparent_45%)]" />
              <div className="relative z-10 text-center">
                <MapPin className="mx-auto h-8 w-8 text-forest" />
                <p className="mt-2 font-serif text-xl text-forest">
                  Hunza Valley
                </p>
                <p className="text-sm text-muted">Google Map placeholder</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

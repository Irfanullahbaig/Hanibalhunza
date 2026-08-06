"use client";

import { faqs } from "@/lib/data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/reveal";

export function FAQSection() {
  return (
    <section
      id="faq"
      className="bg-white py-20 sm:py-28"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-12 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-honey">
            Support
          </p>
          <h2
            id="faq-heading"
            className="mt-3 font-serif text-3xl text-charcoal sm:text-4xl"
          >
            Questions about Haniball Hunza?
          </h2>
          <p className="mt-4 text-muted">
            Answers on shipping, purity, storage, returns, and delivery for our
            dry fruits and wellness products.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

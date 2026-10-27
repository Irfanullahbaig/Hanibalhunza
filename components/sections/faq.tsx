"use client";

import { faqs } from "@/lib/data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQSection() {
  return (
    <section id="faq" className="scroll-mt-20 bg-ivory py-16 sm:py-24" aria-labelledby="faq-heading">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-4">
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-heading" className="mt-3 text-3xl leading-tight text-ink sm:text-4xl">
            Questions, answered
          </h2>
          <p className="mt-4 text-muted">
            Can&rsquo;t find what you need?{" "}
            <a href="/contact" className="text-forest underline underline-offset-4">
              Get in touch
            </a>
            .
          </p>
        </div>
        <Accordion type="single" collapsible className="border-t border-line lg:col-span-8">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/data";
import {
  FacebookIcon,
  InstagramIcon,
  XIcon,
} from "@/components/ui/social-icons";
import { BrandMark } from "@/components/layout/brand-mark";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/shop" },
      { label: "Dry Apricots", href: "/categories" },
      { label: "Gift Boxes", href: "/categories" },
      { label: "Bestsellers", href: "/shop" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Products", href: "/our-honey" },
      { label: "Reviews", href: "/reviews" },
      { label: "Sustainability", href: "/about" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQs", href: "/#faq" },
      { label: "Shipping", href: "/contact" },
      { label: "Returns", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-forest text-cream" role="contentinfo">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-4">
          <BrandMark size="lg" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/70" lang="en">
            {siteConfig.tagline}. Sourced with care from the pristine valleys of
            Hunza—authentic dry fruits, chocolate, and shilajit in every order.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={siteConfig.social.instagram}
              aria-label="Instagram"
              className="rounded-full border border-cream/20 p-2.5 transition hover:border-honey hover:text-honey"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.social.facebook}
              aria-label="Facebook"
              className="rounded-full border border-cream/20 p-2.5 transition hover:border-honey hover:text-honey"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.social.twitter}
              aria-label="X (Twitter)"
              className="rounded-full border border-cream/20 p-2.5 transition hover:border-honey hover:text-honey"
            >
              <XIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title} className="lg:col-span-2">
            <h3 className="font-serif text-lg text-honey">{col.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/70 transition hover:text-honey"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="lg:col-span-2">
          <h3 className="font-serif text-lg text-honey">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-cream/70">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-honey" />
              <span>{siteConfig.address}</span>
            </li>
            <li>
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="flex gap-2 transition hover:text-honey"
              >
                <Phone className="h-4 w-4 shrink-0 text-honey" />
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex gap-2 transition hover:text-honey"
              >
                <Mail className="h-4 w-4 shrink-0 text-honey" />
                {siteConfig.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-cream/50 sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-honey">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-honey">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

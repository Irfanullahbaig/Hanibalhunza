import Link from "next/link";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { categories, siteConfig, whatsappLink } from "@/lib/data";
import { FacebookIcon, InstagramIcon, XIcon } from "@/components/ui/social-icons";
import { BrandMark } from "@/components/layout/brand-mark";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "All products", href: "/shop" },
      ...categories.map((c) => ({ label: c.name, href: `/shop?category=${c.slug}` })),
    ],
  },
  {
    title: "Business",
    links: [
      { label: "Wholesale & bulk", href: "/wholesale" },
      { label: "Request a quote", href: "/wholesale#quote" },
      { label: "Corporate gifting", href: "/wholesale#quote" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Our story", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "FAQs", href: "/#faq" },
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
    ],
  },
];

const socials = [
  { href: siteConfig.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: siteConfig.social.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: siteConfig.social.twitter, label: "X (Twitter)", Icon: XIcon },
];

export function Footer() {
  return (
    <footer className="contours bg-forest-deep text-ivory">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-4">
          <BrandMark light />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ivory/65">
            Dried fruits and nuts from the valleys of Hunza—for your table, your
            gifts and your business.
          </p>
          <div className="mt-6 flex gap-2">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-ivory/15 text-ivory/80 transition-colors hover:border-ivory/40 hover:text-ivory"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-sand">
                {col.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-ivory/70 transition-colors hover:text-ivory"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="lg:col-span-3">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-sand">
            Contact
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-ivory/70">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sand" />
              <span>{siteConfig.address}</span>
            </li>
            <li>
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="flex gap-2.5 transition-colors hover:text-ivory"
              >
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-sand" />
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2.5 transition-colors hover:text-ivory"
              >
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-sand" />
                WhatsApp us
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-ivory/50 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>Prices in Pakistani Rupees (PKR).</p>
        </div>
      </div>
    </footer>
  );
}

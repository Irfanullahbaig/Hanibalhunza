import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { siteConfig } from "@/lib/data";
import { JsonLd } from "@/components/seo/json-ld";
import { CartProvider } from "@/hooks/use-cart";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Hunza dry fruits",
    "Hunza dried apricots",
    "dry fruits wholesale Pakistan",
    "bulk almonds walnuts",
    "Hunzai chocolate Kilawo",
    "Hunza organic shilajit",
    "Haniball Hunza",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: "/images/products/dry-apricot.jpg",
        width: 720,
        height: 720,
        alt: "Haniball Hunza sun-dried apricots",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["/images/products/dry-apricot.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  telephone: siteConfig.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Karimabad",
    addressRegion: "Hunza Valley",
    addressCountry: "PK",
  },
  sameAs: [
    siteConfig.social.instagram,
    siteConfig.social.facebook,
    siteConfig.social.twitter,
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen bg-ivory font-sans text-ink antialiased">
        <JsonLd data={organizationSchema} />
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-forest px-4 py-2 text-sm font-medium text-ivory transition focus:translate-y-0"
        >
          Skip to main content
        </a>
        <CartProvider>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
          <WhatsAppFloat />
        </CartProvider>
      </body>
    </html>
  );
}

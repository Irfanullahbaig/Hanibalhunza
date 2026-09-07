import type { Metadata } from "next";
import { Inter, Noto_Nastaliq_Urdu, Playfair_Display } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { siteConfig } from "@/lib/data";
import { JsonLd } from "@/components/seo/json-ld";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const notoUrdu = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-noto-urdu",
  display: "swap",
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
    "dry apricot Pakistan",
    "Hunzai chocolate",
    "Hunza organic shilajit",
    "dry almonds",
    "Haniball Hunza",
    "organic dry fruits Hunza",
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
        url: "https://haniballhunza.com/images/hunza-shilajit.png",
        width: 1200,
        height: 630,
        alt: "Haniball Hunza Organic Shilajit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["https://haniballhunza.com/images/hunza-shilajit.png"],
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
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${notoUrdu.variable}`}
    >
      <body className="min-h-screen bg-cream font-sans text-charcoal antialiased">
        <JsonLd data={organizationSchema} />
        <a
          href="#main-content"
          className="absolute left-4 top-4 z-[100] -translate-y-16 rounded-md bg-honey px-4 py-2 text-sm font-medium text-charcoal transition focus:translate-y-0"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" lang="en">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}

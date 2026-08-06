import type { Metadata } from "next";
import { HomePage } from "@/components/sections/home-page";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: `${siteConfig.name} | Pure Organic Dry Fruits From Hunza`,
  description: siteConfig.description,
  alternates: { canonical: siteConfig.url },
};

export default function Page() {
  return <HomePage />;
}

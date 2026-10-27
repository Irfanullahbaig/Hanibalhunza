import type { MetadataRoute } from "next";
import { categories, products, siteConfig } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/shop", "/wholesale", "/about", "/contact", "/privacy", "/terms"].map(
    (path) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : path === "/shop" || path === "/wholesale" ? 0.9 : 0.6,
    })
  );

  const categoryRoutes = categories.map((c) => ({
    url: `${siteConfig.url}/shop?category=${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const productRoutes = products.map((product) => ({
    url: `${siteConfig.url}/shop/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}

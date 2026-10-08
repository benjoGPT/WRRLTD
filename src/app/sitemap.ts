import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";
import { legalPages } from "@/lib/legal";
import { sectors } from "@/lib/sectors";

/** Generates /sitemap.xml, the list of pages for search engines. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    ...["/employers", "/candidates", "/sectors", "/about", "/faq", "/contact"].map((path) => ({
      url: `${siteUrl}${path}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...sectors.map((s) => ({
      url: `${siteUrl}/sectors/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...legalPages.map((p) => ({
      url: `${siteUrl}${p.href}`,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}

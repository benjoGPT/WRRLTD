import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";
import { legalPages } from "@/lib/legal";

/** Generates /sitemap.xml, the list of pages for search engines. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    ...legalPages.map((p) => ({
      url: `${siteUrl}${p.href}`,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}

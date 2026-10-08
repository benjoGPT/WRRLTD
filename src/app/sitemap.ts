import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";
import { legalPages } from "@/lib/legal";
import { guides } from "@/lib/guides";
import { jobs } from "@/lib/jobs";
import { sectors } from "@/lib/sectors";

/** Generates /sitemap.xml, the list of pages for search engines. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    ...["/jobs", "/employers", "/candidates", "/sectors", "/about", "/faq", "/guides", "/contact"].map((path) => ({
      url: `${siteUrl}${path}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // Real jobs only; examples are never listed
    ...jobs
      .filter((j) => !j.example)
      .map((j) => ({ url: `${siteUrl}/jobs/${j.slug}`, lastModified: j.posted, changeFrequency: "weekly" as const, priority: 0.6 })),
    ...sectors.map((s) => ({
      url: `${siteUrl}/sectors/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...guides.map((g) => ({
      url: `${siteUrl}/guides/${g.slug}`,
      lastModified: g.updated,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...legalPages.map((p) => ({
      url: `${siteUrl}${p.href}`,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}

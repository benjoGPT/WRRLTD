import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";

/** Generates /sitemap.xml, the list of pages for search engines. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/privacy`, changeFrequency: "yearly", priority: 0.3 },
  ];
}

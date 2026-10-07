import type { MetadataRoute } from "next";
import { site, siteUrl } from "@/config/site";

/**
 * Generates /robots.txt.
 *
 * Before launch we still let crawlers in, because they need to load a page to
 * see its "noindex" instruction. Blocking them here could leave bare links in
 * search results. The noindex tag and header do the hiding.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/thank-you"] },
    sitemap: site.isLive ? `${siteUrl}/sitemap.xml` : undefined,
  };
}

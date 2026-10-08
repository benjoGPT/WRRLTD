import { site, siteUrl } from "@/config/site";
import type { Faq } from "./faqs";
import { sectorNames, type Sector } from "./sectors";

/**
 * Structured data (JSON-LD) for search engines. Each builder returns a plain
 * object; <StructuredData> turns it into a <script> tag.
 * Street address and company number are left out until they're real.
 */

const orgId = `${siteUrl}/#organization`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EmploymentAgency",
    "@id": orgId,
    name: site.name,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    slogan: site.tagline,
    description: site.description,
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      // TODO: add streetAddress and postalCode once the client has an address.
      addressLocality: site.locality,
      addressRegion: site.region,
      addressCountry: "GB",
    },
    areaServed: { "@type": "Country", name: "United Kingdom" },
    knowsAbout: sectorNames,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: siteUrl,
    inLanguage: "en-GB",
    publisher: { "@id": orgId },
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${siteUrl}${c.path}`,
    })),
  };
}

export function faqSchema(items: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function sectorServiceSchema(sector: Sector) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${sector.name} recruitment`,
    serviceType: "Permanent and temporary recruitment",
    description: sector.intro,
    provider: { "@id": orgId },
    areaServed: { "@type": "Country", name: "United Kingdom" },
    url: `${siteUrl}/sectors/${sector.slug}`,
  };
}

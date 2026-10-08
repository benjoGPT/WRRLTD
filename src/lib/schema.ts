import { site, siteUrl } from "@/config/site";
import type { Faq } from "./faqs";
import type { Job } from "./jobs";
import { sectorNames, type Sector } from "./sectors";
import { founders, fullName } from "./team";

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
    founder: founders.map((f) => ({ "@type": "Person", name: fullName(f), jobTitle: f.role })),
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

const employmentType = { Permanent: "FULL_TIME", Temporary: "TEMPORARY", "Temp to perm": "TEMPORARY" } as const;

/** Google job search data for a real vacancy. Never used for example jobs. */
export function jobPostingSchema(job: Job) {
  const description = [
    `<p>${job.summary}</p>`,
    `<p><strong>What you'll do</strong></p><ul>${job.duties.map((d) => `<li>${d}</li>`).join("")}</ul>`,
    `<p><strong>What you'll need</strong></p><ul>${job.requirements.map((r) => `<li>${r}</li>`).join("")}</ul>`,
    `<p>Hours: ${job.hours}</p>`,
  ].join("");
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description,
    datePosted: job.posted,
    ...(job.closes && { validThrough: `${job.closes}T23:59:59` }),
    employmentType: employmentType[job.type],
    hiringOrganization: { "@type": "Organization", name: site.name, sameAs: siteUrl, logo: `${siteUrl}/logo.png` },
    jobLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressLocality: job.location.split(",")[0], addressCountry: "GB" },
    },
    ...(job.payMin && {
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "GBP",
        value: {
          "@type": "QuantitativeValue",
          ...(job.payMax ? { minValue: job.payMin, maxValue: job.payMax } : { value: job.payMin }),
          unitText: job.payUnit ?? "HOUR",
        },
      },
    }),
    identifier: { "@type": "PropertyValue", name: site.name, value: job.slug },
    url: `${siteUrl}/jobs/${job.slug}`,
  };
}

import { site, siteUrl } from "@/config/site";
import { sectorNames } from "@/lib/sectors";

/**
 * Structured data for search engines, describing the business as an
 * EmploymentAgency in Blackpool. Google can use it for the business panel.
 * Street address and company number are left out until they're real.
 */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "EmploymentAgency",
    name: site.name,
    url: siteUrl,
    slogan: site.tagline,
    description: site.description,
    telephone: site.phone,
    email: site.email,
    logo: `${siteUrl}/logo.png`,
    address: {
      "@type": "PostalAddress",
      // TODO: add streetAddress and postalCode once the client has an address.
      addressLocality: site.locality,
      addressRegion: site.region,
      addressCountry: "GB",
    },
    knowsAbout: sectorNames,
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here: it's our own data, and "<" is escaped.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

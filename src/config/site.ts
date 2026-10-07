/**
 * Site-wide settings and placeholders.
 *
 * Every detail that is not final yet lives here, so you can swap them in one
 * place before launch. Each placeholder has a TODO beside it, and they are all
 * listed in README.md under "Before launch".
 */

export const site = {
  name: "Wright Point Recruitment",
  // Used in the footer legal line and on /privacy only.
  legalName: "Wright Point Recruitment Ltd",
  tagline: "The Right People. The Right Fit.",
  description:
    "Wright Point Recruitment is a Blackpool-based recruitment consultancy placing permanent and temporary staff across a wide range of industries.",

  // TODO: real phone number before launch.
  phone: "01253 000000",
  // The tel: link needs the number without spaces, in international format.
  // TODO: update to match the real phone number.
  phoneHref: "tel:+441253000000",

  // TODO: real email address before launch.
  email: "hello@wrightpointrecruitment.co.uk",

  // TODO: confirm the domain once it's bought.
  domain: "wrightpointrecruitment.co.uk",

  // TODO: company number once the company is registered.
  companyNumber: "TBC",
  // TODO: registered office address once the company is registered.
  registeredAddress: "TBC",

  // Town the business is based in. Used in copy and the JSON-LD.
  locality: "Blackpool",
  region: "Lancashire",

  /**
   * Launch switch. While false, every page is marked "noindex" so search
   * engines don't list the site with placeholder details.
   * TODO: set to true at launch, once every placeholder above is real.
   */
  isLive: false,

  // Largest CV we accept, in megabytes. Vercel rejects request bodies over
  // 4.5MB, so 4MB leaves room for the rest of the form.
  // TODO: can go up to 5 if the site is hosted on Cloudflare instead.
  maxCvSizeMb: 4,
} as const;

export const siteUrl = `https://${site.domain}`;

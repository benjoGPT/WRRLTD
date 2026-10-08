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
    "Wright Point Recruitment places permanent and temporary staff with businesses across the UK. Based in Blackpool, recruiting nationwide in 12 sectors.",

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
  // TODO: confirm where the company is registered (Companies House).
  registeredIn: "England and Wales",

  // Town the business is based in. Used in copy and the JSON-LD.
  locality: "Blackpool",
  region: "Lancashire",
  // Confirmed by the client: nationwide, full UK coverage.
  coverage: "the UK",

  /**
   * Launch switch. While false, every page is marked "noindex" so search
   * engines don't list the site with placeholder details.
   * TODO: set to true at launch, once every placeholder above is real.
   */
  isLive: false,

  /**
   * Shows the cookie banner. Legally it's only needed once the site uses
   * optional cookies (analytics or marketing). It's switched on so the
   * consent system is ready for when analytics are added.
   * TODO: if the site launches with no optional cookies, you can set this to
   * false; the essential consent cookie is then never set.
   */
  cookieBanner: true,

  /**
   * Shows the example vacancies in src/lib/jobs.ts so the jobs board can be
   * reviewed before real jobs exist. They're labelled "Example" on screen and
   * never sent to Google.
   * TODO: set to false (or delete the examples) before launch.
   */
  showExampleJobs: true,

  // Largest CV we accept, in megabytes. Vercel rejects request bodies over
  // 4.5MB, so 4MB leaves room for the rest of the form.
  // TODO: can go up to 5 if the site is hosted on Cloudflare instead.
  maxCvSizeMb: 4,
} as const;

export const siteUrl = `https://${site.domain}`;

# Wright Point Recruitment website

Marketing site for Wright Point Recruitment, a recruitment consultancy based in
Blackpool placing permanent and temporary staff.

Built with Next.js (App Router, TypeScript) and plain CSS Modules, hosted on
Cloudflare Workers. Forms email the client through [Resend](https://resend.com).
No database, no CMS.

## Run it locally

```bash
npm install
cp .env.example .env.local   # then fill in the values (optional for local work)
npm run dev                  # http://localhost:3000
```

Without Resend keys, form submissions are printed in the terminal instead of
emailed, so you can test the forms straight away.

Other commands:

| Command         | What it does                                   |
| --------------- | ---------------------------------------------- |
| `npm run build` | Builds the site for Cloudflare (run before pushing) |
| `npm run build:next` | Plain Next.js build, without the Cloudflare step |
| `npm run start` | Serves the production build locally            |
| `npm run lint`  | Checks the code for common mistakes            |
| `npm run preview` | Builds for Cloudflare and runs it locally (closest to live) |
| `npm run deploy`  | Builds for Cloudflare and deploys from your machine |

## Where things live

```
brand/                  Original logo and the script that makes the site's logo files
src/
  config/site.ts        All placeholders and the launch switch (start here)
  lib/nav.ts            Navigation links
  lib/formRules.ts      Form settings: CV size/types, spam-trap field names
  lib/validation.ts     Form rules (zod), used in the browser and on the server
  lib/email.ts          Builds and sends the emails via Resend
  lib/sectors.ts        The 12 sectors: names, intros, example roles, photos
  lib/faqs.ts           FAQ questions and answers (also feed Google's FAQ data)
  lib/journeys.ts       The employer and candidate steps
  lib/schema.ts         Structured data for search engines
  lib/jobs.ts           Vacancies for the jobs board (see "Adding a job")
  lib/guides.ts         The guides (articles)
  lib/team.ts           The founders shown on Home and About
  app/
    layout.tsx          Fonts, header, footer, cookie banner
    page.tsx            Home: overview linking to the pages below
    jobs/               Jobs board, plus one page per job with an apply form
    guides/             Guides list, plus one page per guide
    employers/          For employers, with the vacancy form (#enquire)
    candidates/         For candidates, with the CV form (#apply)
    sectors/            All sectors, plus one page per sector (sectors/[slug])
    about/  faq/  contact/
    privacy/ cookies/ terms/ complaints/ equal-opportunities/   Policies
    thank-you/          Shown after a form is sent
    api/contact/        Receives both forms and sends the email
    sitemap.ts, robots.ts, opengraph-image.tsx (one per page)   SEO files
    globals.css         Colours, spacing, type and buttons
  components/           One file per section, each with its own .module.css
    contact/            The contact section, both forms and their fields
```

The layout is mobile first: plain CSS rules are for phones (375px), and
`@media (min-width: …)` rules add the tablet (768px) and desktop (1024px,
1280px) layouts.

## SEO

- Every page has its own title, description, canonical URL and share image.
- One `<h1>` per page; breadcrumbs on every inner page.
- Structured data: EmploymentAgency and WebSite (home), BreadcrumbList (inner
  pages), FAQPage (/faq), Service (each sector page).
- One page per sector, so searches like "HGV driver recruitment" have a page
  that matches.
- `sitemap.xml` lists every page. The site stays `noindex` until `isLive` is true.

## Design rules

The layout is a "split studio": most sections pair two halves, echoing the two
sides the business serves. The rules below come from the design skills listed in
[awesome-ai-tools-for-ui](https://github.com/maxbogo/awesome-ai-tools-for-ui)
(Anthropic frontend-design, Hallmark, Make Interfaces Feel Better, Unslop) and
keep the site from looking templated:

- One bold moment: the two-sided hero. Everything else stays quiet.
- No uppercase labels above every heading, no 01/02 numbering unless it's a
  real sequence, no arrows tacked onto buttons, no fade-in on every section.
- Fonts: Red Hat Display (headings) and Red Hat Text (body), set in
  `src/app/layout.tsx`.
- Scroll motion is tied to the scroll position (CSS scroll-driven animations,
  no JavaScript) and each effect belongs to one element: the hero seam swings
  and its two lines drift apart, inner-page photos parallax, the home cards
  are unveiled on the logo's slant, step and sector lists draw their rule and
  slide in, the footer statement fills, and guides and jobs show a reading
  progress bar. Browsers without support, and visitors who ask for reduced
  motion, get the still layout.
- Lists and split rows, not grids of identical icon cards.
- Copy in plain British English: no em dashes, no "not just X, but Y", no
  stock AI words (seamless, leverage, elevate and so on).
- Colours and fonts only from the tokens in `globals.css`.

## Logo files

The client's artwork is `brand/logo-original.jpg`. Every logo file the site uses
is made from it by one script:

```bash
python3 brand/make-logos.py   # needs Pillow: pip install pillow
```

| File                                 | Used for                                     |
| ------------------------------------ | -------------------------------------------- |
| `public/logo.png`                    | Stacked logo: footer, JSON-LD                |
| `public/logo-horizontal.png`         | Header and phone menu (mark beside the name) |
| `src/assets/logo-horizontal-white.png` | The share image (opengraph-image.tsx)      |
| `src/app/icon.png`, `apple-icon.png` | Favicon and home-screen icon (the WP mark)   |

The script turns the white background transparent. On navy sections the logo
is turned white with a CSS filter (`brightness(0) invert(1)`). To use a new
logo, replace `brand/logo-original.jpg`, check the row numbers at the top of
the script still match the artwork, and run it again.

## Photos

Photos are free Unsplash images listed in `src/lib/photos.ts` (alt text,
Unsplash ID and photographer). Until they're downloaded, visitors' browsers load
them straight from Unsplash, with a branded navy placeholder underneath in case
that fails. Before launch, download them so the site serves its own copies
(faster and more reliable):

```bash
python3 scripts/fetch-photos.py   # needs Pillow and access to unsplash.com
```

Photographers are credited on /privacy. Before launch, check each photo's Unsplash page still shows the free
Unsplash License, and use real photos of the client's work if they have any.

## Social media images

`python3 brand/make-logos.py` also makes `brand/social/`: profile pictures
(`profile-navy.png`, `profile-white.png`, both safe for circular crops) and a
`cover-1584x396.png` banner for LinkedIn.

## Hosting on Cloudflare

The site runs as a Cloudflare Worker called `wrrltd`, built with the
[OpenNext adapter](https://opennext.js.org/cloudflare). Pushing to `main`
rebuilds and deploys it.

Files involved:

- `wrangler.jsonc`: the Worker's settings. Its `name` must match the Worker in
  the dashboard.
- `open-next.config.ts`: adapter settings. Every page is built ahead of time,
  so no R2 or KV storage is needed.
- `patches/@opennextjs+cloudflare+*.patch`: a one-line fix so the adapter
  bundles a file Next 16.4 added (`preview-props.json`). Applied automatically
  after `npm install`. Remove it once a newer adapter release includes the fix
  (a build that works without it means it's no longer needed).

Dashboard settings (Workers & Pages → wrrltd → Settings → Build):

| Setting           | Value                |
| ----------------- | -------------------- |
| Build command     | `npm run build`      |
| Deploy command    | `npx wrangler deploy` |
| Root directory    | `/`                  |
| Production branch | `main`               |

`npm run build` runs the OpenNext adapter, which runs `next build` and then
packages the result as a Worker in `.open-next/`. `wrangler deploy` spots the
OpenNext project and uploads it. (`npx opennextjs-cloudflare build` and
`npx opennextjs-cloudflare deploy` work too; they do the same thing.)

Two settings in `next.config.ts` matter here: Cache Components stays off (it
needs timer behaviour Workers doesn't have), and the share images load their
fonts from `src/lib/og-assets.ts` rather than from disk. Re-make that file with
`python3 scripts/make-og-assets.py` if the logo changes.

## Environment variables

Set these in `.env.local` locally, and in Cloudflare for the live site
(Workers & Pages → wrrltd → Settings → Variables and Secrets; add
`RESEND_API_KEY` as a **Secret**). See `.env.example` for details.

| Variable             | Needed | What it is                                              |
| -------------------- | ------ | ------------------------------------------------------- |
| `RESEND_API_KEY`     | Yes    | API key from resend.com                                 |
| `CONTACT_TO_EMAIL`   | Yes    | Where submissions go (comma-separate several addresses) |
| `CONTACT_FROM_EMAIL` | Later  | Sender once the domain is verified in Resend            |
| `TURNSTILE_SECRET_KEY` | Yes | Bot check secret (Secret). Its site key goes in `site.ts` |

## Before launch

### Placeholders in `src/config/site.ts`

- [ ] `phone`: currently `01253 000000`
- [ ] `phoneHref`: the same number as `tel:+44…` with no spaces
- [ ] `email`: currently `hello@wrightpointrecruitment.co.uk`
- [ ] `domain`: currently `wrightpointrecruitment.co.uk`
- [ ] `companyNumber`: currently `TBC`
- [ ] `registeredAddress`: currently `TBC`
- [ ] `registeredIn`: confirm `England and Wales`
- [ ] `maxCvSizeMb`: 4 on Vercel (its limit is 4.5MB per request); up to 5 on Cloudflare
- [ ] `isLive`: set to `true` **last**, once everything else here is done. This
      removes the noindex tag and header so Google can list the site.

### Brand assets

- [x] Logo added. If the client sends a new or higher-quality version (ideally
      an SVG or a transparent PNG), see "Logo files" below.

### Copy to confirm with the client (search the code for `TODO`)

- [ ] Example roles on each sector card (`src/lib/sectors.ts`)
- [ ] How it works: the four steps for each side (`src/components/HowItWorks.tsx`)
- [ ] Areas covered beyond Blackpool (`About.tsx`, `Faq.tsx`)
- [ ] "We never charge candidates" (`AudienceSplit.tsx`, `Faq.tsx`)
- [ ] How temporary workers are engaged and paid (`Faq.tsx`)
- [ ] Response time, "within one working day" (`Faq.tsx`, `thank-you/page.tsx`)
- [ ] What happens after a CV is sent (`Faq.tsx`)
- [ ] Street address and postcode for the JSON-LD, if they want them shown (`JsonLd.tsx`)

### Policies (all drafts: have them reviewed by someone qualified)

Pages: `/privacy`, `/cookies`, `/terms`, `/complaints`, `/equal-opportunities`
(shared layout in `src/components/LegalPage.tsx`, list in `src/lib/legal.ts`).

- [ ] ICO registration number (the data protection fee is £52 a year for a micro business)
- [ ] Retention periods for candidate and employer data
- [ ] Hosting and email providers named, with their safeguards for data outside the UK
- [ ] Complaints timescales and who handles them
- [ ] "Last updated" date in `src/lib/legal.ts`

### Cookies

- [ ] Banner is on (`cookieBanner` in `src/config/site.ts`). Legally it's only
      needed once optional cookies are used; it's ready for analytics.
- [ ] When adding analytics: wrap the script in `<ConsentGate category="analytics">`
      and list its cookies on `/cookies`.

### Business (see the legal and compliance briefing)

- [ ] Company registered, insurance in place, terms of business and worker
      contracts written, Key Information Document ready
- [ ] GLAA licence if supplying food processing or packing workers

### Spam protection (Cloudflare Turnstile)

- [ ] In Cloudflare: Turnstile → Add widget. Add the site's domain and the
      `workers.dev` address, mode "Managed".
- [ ] Put the site key in `turnstileSiteKey` in `src/config/site.ts`.
- [ ] Add the secret key in Cloudflare as the `TURNSTILE_SECRET_KEY` secret.
- [ ] Send a test from each form on the live site. In the Turnstile dashboard,
      check the requests show up as solved.

### Email (Resend)

- [ ] Create a Resend account and an API key; add `RESEND_API_KEY` and
      `CONTACT_TO_EMAIL` in the hosting dashboard.
- [ ] Once the domain is bought, verify it in Resend (Domains → Add domain, then
      add the DNS records it shows you).
- [ ] Set `CONTACT_FROM_EMAIL` to an address on that domain.
- [ ] Send a test from each form on the live site, including a CV, and check that
      pressing Reply goes to the sender.

### Final checks

- [ ] Connect the domain in Cloudflare (Workers & Pages → wrrltd → Settings →
      Domains & Routes). Easiest if the domain's DNS is on Cloudflare too.
- [ ] Set `isLive` to `true`, deploy, then check `/robots.txt` lists the sitemap and
      the page source no longer has `noindex`.
- [ ] Submit the sitemap in Google Search Console.

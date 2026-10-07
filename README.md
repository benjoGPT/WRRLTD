# Wright Point Recruitment website

Marketing site for Wright Point Recruitment, a recruitment consultancy based in
Blackpool placing permanent and temporary staff.

Built with Next.js (App Router, TypeScript) and plain CSS Modules. Forms email the
client through [Resend](https://resend.com). No database, no CMS.

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
| `npm run build` | Builds the production site (run before pushing) |
| `npm run start` | Serves the production build locally            |
| `npm run lint`  | Checks the code for common mistakes            |

## Where things live

```
src/
  config/site.ts        All placeholders and the launch switch (start here)
  lib/sectors.ts        The 12 sectors (cards, form dropdowns, footer links)
  lib/nav.ts            Navigation links
  lib/formRules.ts      Form settings: CV size/types, spam-trap field names
  lib/validation.ts     Form rules (zod), used in the browser and on the server
  lib/email.ts          Builds and sends the emails via Resend
  app/
    layout.tsx          Fonts, default page titles, header and footer
    page.tsx            The home page (list of sections in order)
    privacy/            Privacy notice
    thank-you/          Page shown after a form is sent
    api/contact/        Receives both forms and sends the email
    sitemap.ts, robots.ts, icon.tsx, opengraph-image.tsx   SEO files
    globals.css         Colours, spacing, type and buttons
  components/           One file per section, each with its own .module.css
    contact/            The contact section, both forms and their fields
```

The layout is mobile first: plain CSS rules are for phones (375px), and
`@media (min-width: …)` rules add the tablet (768px) and desktop (1024px,
1280px) layouts.

## Environment variables

Set these in `.env.local` locally, and in the hosting dashboard for the live site.
See `.env.example` for details.

| Variable             | Needed | What it is                                              |
| -------------------- | ------ | ------------------------------------------------------- |
| `RESEND_API_KEY`     | Yes    | API key from resend.com                                 |
| `CONTACT_TO_EMAIL`   | Yes    | Where submissions go (comma-separate several addresses) |
| `CONTACT_FROM_EMAIL` | Later  | Sender once the domain is verified in Resend            |

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

- [ ] Add the logo as `public/logo.png`. The header, footer, menu and JSON-LD
      switch to it automatically. Check it on the navy sections (it's turned white
      with a CSS filter).
- [ ] Replace `src/app/icon.tsx` with a crop of the WP mark saved as `src/app/icon.png`.
- [ ] Add the logo to `src/app/opengraph-image.tsx` (the image shown when the link is shared).

### Copy to confirm with the client (search the code for `TODO`)

- [ ] Example roles on each sector card (`src/lib/sectors.ts`)
- [ ] How it works: the four steps for each side (`src/components/HowItWorks.tsx`)
- [ ] Areas covered beyond Blackpool (`About.tsx`, `Faq.tsx`)
- [ ] "We never charge candidates" (`AudienceSplit.tsx`, `Faq.tsx`)
- [ ] How temporary workers are engaged and paid (`Faq.tsx`)
- [ ] Response time, "within one working day" (`Faq.tsx`, `thank-you/page.tsx`)
- [ ] What happens after a CV is sent (`Faq.tsx`)
- [ ] Street address and postcode for the JSON-LD, if they want them shown (`JsonLd.tsx`)

### Privacy notice (`src/app/privacy/page.tsx`)

- [ ] ICO registration number (most recruiters must pay the ICO data protection fee)
- [ ] How long candidate and employer data is kept
- [ ] Hosting and email providers used, and their safeguards for data outside the UK
- [ ] Lawful bases checked
- [ ] "Last updated" date
- [ ] **Have the whole notice reviewed by someone qualified.** It's a starting
      draft, not legal advice.

### Email (Resend)

- [ ] Create a Resend account and an API key; add `RESEND_API_KEY` and
      `CONTACT_TO_EMAIL` in the hosting dashboard.
- [ ] Once the domain is bought, verify it in Resend (Domains → Add domain, then
      add the DNS records it shows you).
- [ ] Set `CONTACT_FROM_EMAIL` to an address on that domain.
- [ ] Send a test from each form on the live site, including a CV, and check that
      pressing Reply goes to the sender.

### Final checks

- [ ] Connect the domain in the hosting dashboard.
- [ ] Set `isLive` to `true`, deploy, then check `/robots.txt` lists the sitemap and
      the page source no longer has `noindex`.
- [ ] Submit the sitemap in Google Search Console.

import type { PhotoKey } from "./photos";

/**
 * Guides: practical articles for candidates and employers. They give people a
 * reason to visit and give Google useful pages to list.
 *
 * TODO: drafts. Ask the client to read each one and add their own experience.
 * The legal points in the employer guides were checked in October 2026 and
 * should be re-checked before launch and whenever the law changes.
 */

export type GuideSection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
};

export type Guide = {
  slug: string;
  title: string;
  /** Short name for breadcrumbs */
  short: string;
  /** One or two sentences for lists and the meta description */
  description: string;
  audience: "Candidates" | "Employers";
  photo: PhotoKey;
  /** ISO date of the last check */
  updated: string;
  sections: GuideSection[];
  /** Where to send the reader at the end */
  cta: { label: string; href: string };
};

export const guides: Guide[] = [
  {
    slug: "cv-for-warehouse-driving-and-site-jobs",
    short: "Writing your CV",
    title: "How to write a CV for warehouse, driving and site jobs",
    description:
      "What employers look for first, how to lay it out and what to leave off. A practical guide for operatives, drivers and tradespeople.",
    audience: "Candidates",
    photo: "warehouse",
    updated: "2026-10-08",
    sections: [
      {
        heading: "Put your licences and tickets at the top",
        paragraphs: [
          "For most practical jobs, the first thing an employer checks is whether you hold the right licence or card. Don't make them hunt for it. List them in a short section straight under your name and contact details.",
        ],
        list: [
          "Driving licence categories (for example C+E or C1)",
          "Driver CPC and digital tachograph card, with expiry dates",
          "Forklift licences, with the truck types (counterbalance, reach, VNA)",
          "CSCS or CPCS cards, with the card colour and expiry",
          "First aid, IPAF, PASMA or any other ticket that's relevant",
        ],
      },
      {
        heading: "Most recent job first",
        paragraphs: [
          "List your work history in reverse order, starting with your current or last job. For each one give the employer, your job title, the month and year you started and finished, and two to four short points about what you did.",
          "Be specific. \"Picked an average of 180 units an hour on a voice-picking system\" tells an employer far more than \"responsible for picking orders\".",
        ],
      },
      {
        heading: "Say when and where you can work",
        paragraphs: [
          "Shift patterns matter in warehousing, driving and site work. Say which shifts you can do (days, nights, weekends, rotating), how far you can travel and whether you have your own transport. It saves a phone call and helps us match you to the right job.",
        ],
      },
      {
        heading: "Explain gaps briefly",
        paragraphs: [
          "Gaps are normal. A single line is enough: caring for family, travelling, studying, or looking for work. Agency and temporary work counts too, so list it, even if it was a few weeks at a time.",
        ],
      },
      {
        heading: "What to leave off",
        list: [
          "A photo, your date of birth and your marital status. Employers don't need them.",
          "Your National Insurance number. You'll give it once you're offered work.",
          "Full references. \"Available on request\" is fine.",
          "Hobbies, unless they show something useful, like volunteering or a sports coaching badge.",
        ],
      },
      {
        heading: "Keep it short and easy to open",
        paragraphs: [
          "Two pages is plenty. Save it as a PDF or Word document with your name in the file name, for example jane-smith-cv.pdf. Check the spelling of your phone number and email address twice: it's the most common mistake we see, and it means nobody can contact you.",
        ],
      },
    ],
    cta: { label: "Send your CV", href: "/candidates#apply" },
  },
  {
    slug: "hiring-temporary-staff-agency-workers-regulations",
    short: "Hiring temporary staff",
    title: "Hiring temporary staff: how agency work and the Agency Workers Regulations work",
    description:
      "Who employs a temp, what rights they have from day one and after 12 weeks, and what happens if you want to take someone on permanently.",
    audience: "Employers",
    photo: "factory",
    updated: "2026-10-08",
    sections: [
      {
        heading: "Who employs a temporary worker",
        paragraphs: [
          "When you hire a temp through an agency, you're the \"hirer\". You direct their work day to day, but the agency engages and pays them. You pay the agency an agreed hourly charge that covers the worker's pay, holiday pay, employer's National Insurance, pension contributions and the agency's fee.",
          "Before any worker starts, the agency must agree written terms with you and confirm details such as the role, hours, location and any health and safety risks.",
        ],
      },
      {
        heading: "Rights from the first day",
        paragraphs: [
          "Under the Agency Workers Regulations 2010, agency workers have some rights as soon as they start with you:",
        ],
        list: [
          "Access to shared facilities on the same basis as your own staff, such as a canteen, rest room, car park or transport services.",
          "Information about job vacancies in your organisation, so they can apply for permanent roles.",
        ],
      },
      {
        heading: "Rights after 12 weeks",
        paragraphs: [
          "Once an agency worker has done 12 calendar weeks in the same role with you, they're entitled to the same basic working and employment conditions as if you'd recruited them directly. That covers pay, working time, rest breaks, night work and annual leave.",
          "Breaks between assignments can pause or reset the 12-week count, depending on the reason and length of the break. Tell us early if an assignment is likely to run past 12 weeks, and share the pay rates and conditions for the equivalent permanent role, so we can price it correctly from the start.",
        ],
      },
      {
        heading: "Taking a temp on permanently",
        paragraphs: [
          "Many temporary assignments turn into permanent jobs. The Conduct of Employment Agencies and Employment Businesses Regulations 2003 allow an agency to charge a transfer fee when you take on a temp directly. The terms must set this out in advance, and they must also offer you the option of an extended period of hire instead of paying the fee.",
          "Our terms of business will set out exactly how this works before any worker starts with you.",
        ],
      },
      {
        heading: "Changes on the way",
        paragraphs: [
          "The Employment Rights Act 2025 is bringing in new rules over the next few years, including reasonable notice of shifts and payment for cancelled shifts, with protections that extend to agency workers. We'll keep clients up to date as each part comes into force.",
        ],
      },
    ],
    cta: { label: "Tell us about your vacancy", href: "/employers#enquire" },
  },
  {
    slug: "right-to-work-checks-explained",
    short: "Right to work checks",
    title: "Right to work checks explained for employers",
    description:
      "Who has to do the check, the three ways to do it, what records to keep and what happens if you get it wrong.",
    audience: "Employers",
    photo: "officeTeam",
    updated: "2026-10-08",
    sections: [
      {
        heading: "Who has to check",
        paragraphs: [
          "Every employer in the UK must check that a person has the right to work here before they start. The check protects you from a civil penalty if it later turns out the person didn't have permission to work.",
          "When we supply a temporary worker, we're responsible for checking their right to work. When we introduce someone you then employ directly, in a permanent role or after a temp-to-perm transfer, you become the employer and the check is your responsibility. We look at documents before we introduce anyone, but you still need to do your own check.",
        ],
      },
      {
        heading: "The three ways to check",
        list: [
          "Online check: the person gives you a share code from GOV.UK and you view their status online. This is how most people without a British or Irish passport now prove their right to work.",
          "Manual document check: you see the original document in person, with the holder present, check it's genuine and belongs to them, and take a dated copy.",
          "Digital identity check: for British and Irish citizens with a valid passport, you can use a certified identity service provider to check the document.",
        ],
      },
      {
        heading: "Records to keep",
        paragraphs: [
          "Keep a clear copy or record of the check, with the date you did it, for the whole time the person works for you and for two years after they leave. If someone's permission to work is time-limited, diarise a follow-up check before it runs out.",
        ],
      },
      {
        heading: "Penalties",
        paragraphs: [
          "If you employ someone who doesn't have the right to work and you haven't done a correct check, you can be fined up to £45,000 per worker for a first breach and up to £60,000 for repeat breaches. Knowingly employing an illegal worker is a criminal offence.",
        ],
      },
      {
        heading: "Treat everyone the same",
        paragraphs: [
          "Check every new starter, not only people you think might not be British. Choosing whom to check based on their accent, name or appearance can be unlawful discrimination.",
        ],
      },
      {
        heading: "Where to find the official guidance",
        paragraphs: [
          "The Home Office publishes a full employer's guide to right to work checks on GOV.UK, including the list of acceptable documents. Rules change, so check the current version rather than relying on this summary.",
        ],
      },
    ],
    cta: { label: "Talk to us about hiring", href: "/employers#enquire" },
  },
];

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);

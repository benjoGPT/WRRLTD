import { site } from "@/config/site";
import { sectorNames } from "./sectors";

/**
 * Frequently asked questions. Plain text, so the same answers feed the FAQ
 * page, the short lists on the employer and candidate pages, and the FAQPage
 * structured data for Google.
 *
 * TODO: anything still assumed is marked in a comment; confirm with the client.
 */

export type Faq = {
  q: string;
  a: string;
  audience: "candidates" | "employers" | "general";
};

export const faqs: Faq[] = [
  {
    audience: "general",
    q: "What's the difference between permanent and temporary work?",
    // TODO: confirm with the client how temporary workers will be engaged and paid.
    a: "With a permanent role, you're employed directly by the business we introduce you to, and we act as an employment agency. With temporary work, you work on assignment for one of our clients for a set period or for as long as they need cover. We act as an employment business, so you're usually engaged and paid through us.",
  },
  {
    audience: "general",
    q: "Which sectors do you recruit for?",
    a: `${sectorNames.slice(0, -1).join(", ")} and ${sectorNames.at(-1)}. If yours isn't listed, get in touch anyway.`,
  },
  {
    audience: "general",
    q: "Where in the UK do you cover?",
    a: `All of it. We're based in ${site.locality} and recruit for businesses and candidates nationwide, in England, Scotland, Wales and Northern Ireland.`,
  },
  {
    audience: "candidates",
    q: "How do I apply?",
    a: "Fill in the short form on our candidates page and attach your CV. It takes a couple of minutes. We'll read it and call you to talk about the kind of work you want. No CV yet? Call or email us and we'll help.",
  },
  {
    audience: "candidates",
    q: "Do I have to pay anything?",
    a: "No. It's against the law for recruitment agencies to charge you for finding you work, and we never would.",
  },
  {
    audience: "candidates",
    q: "Will you send my CV to employers without asking?",
    a: "No. We only put you forward for a job after we've talked to you about it and you've said yes.",
  },
  {
    audience: "candidates",
    q: "What will I get before a temporary job starts?",
    a: "A Key Information Document. It sets out your pay, any deductions or fees, your holiday entitlement and who employs you, so you know where you stand before agreeing to anything.",
  },
  {
    audience: "employers",
    q: "How do you find candidates for my vacancy?",
    a: "We advertise on our website, on social media and on the main UK job sites, and we search the candidates already registered with us. Everyone we put forward has been spoken to and checked first.",
  },
  {
    audience: "employers",
    q: "What checks do you carry out?",
    a: "We confirm identity, right to work in the UK and references, and check any licence, card or qualification the job needs before anyone starts.",
  },
  {
    audience: "employers",
    q: "How much do you charge?",
    // TODO: the client to decide whether to show fees or keep this general.
    a: "It depends on the role and whether it's permanent or temporary. We'll explain our fees and send our terms of business before we start, so there are no surprises.",
  },
  {
    audience: "general",
    // TODO: confirm the response time the client is happy to commit to.
    q: "How quickly will you get back to me?",
    a: `We aim to reply within one working day. If it's urgent, call us on ${site.phone}.`,
  },
];

export const faqsFor = (audience: Faq["audience"]) =>
  faqs.filter((f) => f.audience === audience || f.audience === "general");

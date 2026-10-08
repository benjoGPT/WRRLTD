import { ChevronDown } from "lucide-react";
import { site } from "@/config/site";
import { sectorNames } from "@/lib/sectors";
import styles from "./Faq.module.css";

/**
 * Frequently asked questions. Uses the browser's built-in <details> element,
 * so each answer opens and closes with no JavaScript and works with a keyboard.
 *
 * Answers come from the client's replies; anything still assumed is marked TODO.
 */

const faqs = [
  {
    q: "What's the difference between permanent and temporary work?",
    a: (
      <>
        <p>
          With a permanent role, you&apos;re employed directly by the business we introduce you to.
          We act as an employment agency.
        </p>
        <p>
          With temporary work, you work on assignment for one of our clients, for a set period or
          for as long as they need cover. We act as an employment business, so you&apos;re usually
          engaged and paid through us. Before you start, we&apos;ll give you a Key Information
          Document that sets out your pay, any deductions and who employs you.
          {/* TODO: confirm with the client how temporary workers will be engaged and paid. */}
        </p>
      </>
    ),
  },
  {
    q: "Which sectors do you recruit for?",
    a: (
      <p>
        {sectorNames.length} of them: {sectorNames.slice(0, -1).join(", ")} and{" "}
        {sectorNames.at(-1)}. If yours isn&apos;t listed, get in touch anyway.
      </p>
    ),
  },
  {
    q: "Where in the UK do you cover?",
    a: (
      <p>
        All of it. We&apos;re based in {site.locality} and recruit for businesses and candidates
        nationwide, in England, Scotland, Wales and Northern Ireland.
      </p>
    ),
  },
  {
    q: "How do I apply?",
    a: (
      <p>
        Fill in the form on this page and attach your CV. It takes a couple of minutes. We&apos;ll
        read it and call you to talk about the kind of work you want. No CV yet? Call or email us and
        we&apos;ll help.
      </p>
    ),
  },
  {
    q: "Do candidates pay anything?",
    a: (
      <p>
        No. It&apos;s against the law for recruitment agencies to charge you for finding you work,
        and we never would.
      </p>
    ),
  },
  {
    q: "How do you find candidates for my vacancy?",
    a: (
      <p>
        We advertise on our website, on social media and on the main UK job sites, and we search
        the candidates already registered with us. Everyone we put forward has been spoken to and
        checked first.
      </p>
    ),
  },
  {
    // TODO: confirm the response time the client is happy to commit to.
    q: "How quickly will you get back to me?",
    a: (
      <p>
        We aim to reply within one working day. If it&apos;s urgent, call us on{" "}
        <a href={site.phoneHref}>{site.phone}</a>.
      </p>
    ),
  },
];

export function Faq() {
  return (
    <section id="faq" className="section section--tint" aria-labelledby="faq-title">
      <div className={`container ${styles.grid}`}>
        <div>
          <h2 id="faq-title" className="section-title">
            Common questions
          </h2>
          <p className="section-intro">
            Can&apos;t find your answer? Email{" "}
            <a href={`mailto:${site.email}`} className={styles.email}>
              {site.email}
            </a>
            .
          </p>
        </div>

        <div className={styles.list}>
          {faqs.map((item) => (
            <details key={item.q} className={styles.item}>
              <summary className={styles.question}>
                <span>{item.q}</span>
                <ChevronDown size={22} className={styles.chevron} aria-hidden="true" />
              </summary>
              <div className={styles.answer}>{item.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

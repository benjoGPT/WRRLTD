import { ChevronDown } from "lucide-react";
import { site } from "@/config/site";
import { sectorNames } from "@/lib/sectors";
import styles from "./Faq.module.css";

/**
 * Frequently asked questions. Uses the browser's built-in <details> element,
 * so each answer opens and closes with no JavaScript and works with a keyboard.
 *
 * Answers marked TODO are assumptions to check with the client.
 */

const faqs = [
  {
    q: "What's the difference between permanent and temporary roles?",
    a: (
      <>
        <p>
          In a permanent role, you&apos;re employed directly by the business we introduce you to.
          Here we act as an employment agency.
        </p>
        <p>
          In a temporary role, you work on assignment for one of our clients for a set period or
          for as long as they need cover. Here we act as an employment business, so you&apos;re
          usually paid through us.
          {/* TODO: confirm with the client how temporary workers are engaged and paid. */}
        </p>
      </>
    ),
  },
  {
    q: "Which sectors do you recruit for?",
    a: (
      <p>
        We recruit across {sectorNames.length} sectors: {sectorNames.slice(0, -1).join(", ")} and{" "}
        {sectorNames.at(-1)}. If your sector isn&apos;t listed, get in touch anyway.
      </p>
    ),
  },
  {
    // TODO: name the areas covered once the client confirms them.
    q: "What areas do you cover?",
    a: (
      <p>
        We&apos;re based in {site.locality} and work with businesses and candidates across a wider
        area. If you&apos;re not sure whether we cover your location, just ask.
      </p>
    ),
  },
  {
    // TODO: confirm with the client. (UK law generally bars agencies from
    // charging work-seekers for finding them work.)
    q: "Do candidates have to pay anything?",
    a: <p>No. We never charge candidates for finding them work.</p>,
  },
  {
    // TODO: confirm the response time the client is happy to commit to.
    q: "How quickly will you get back to me?",
    a: (
      <p>
        We aim to reply to every enquiry within one working day. If it&apos;s urgent, call us on{" "}
        <a href={site.phoneHref}>{site.phone}</a>.
      </p>
    ),
  },
  {
    // TODO: confirm with the client, and match the retention period in /privacy.
    q: "What happens after I send my CV?",
    a: (
      <p>
        We&apos;ll read it and get in touch to talk about the kind of work you&apos;re looking for.
        We&apos;ll never send your CV to an employer without asking you first.
      </p>
    ),
  },
];

export function Faq() {
  return (
    <section id="faq" className="section section--tint" aria-labelledby="faq-title">
      <div className={`container ${styles.grid}`}>
        <div>
          <p className="eyebrow">FAQ</p>
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

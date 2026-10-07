import { ArrowRight, Check } from "lucide-react";
import { cvLink, hireLink } from "@/lib/nav";
import styles from "./AudienceSplit.module.css";

/**
 * Two equal panels: one for employers, one for candidates. Each has three
 * short points and a button that opens the matching form.
 */

const panels = [
  {
    id: "employers",
    label: "For employers",
    title: "Find the right people for your business",
    points: [
      "Permanent and temporary staff across 12 sectors.",
      "We take the time to understand the role and your business before we introduce anyone.",
      "A straightforward, professional and personal service from first call to placement.",
    ],
    cta: "I'm hiring",
    href: hireLink,
  },
  {
    id: "candidates",
    label: "For candidates",
    title: "Find work that fits you",
    points: [
      "Permanent and temporary roles across 12 sectors.",
      "We get to know you, so we only put you forward for roles that suit you.",
      // TODO: confirm with the client. (UK law generally bars agencies from
      // charging work-seekers for finding them work.)
      "We never charge candidates for finding them work.",
    ],
    cta: "Send your CV",
    href: cvLink,
  },
];

export function AudienceSplit() {
  return (
    <section className="section" aria-label="Employers and candidates">
      <div className={`container ${styles.grid}`}>
        {panels.map((panel) => (
          <article key={panel.id} id={panel.id} className={styles.panel}>
            <p className="eyebrow">{panel.label}</p>
            <h2 className={styles.title}>{panel.title}</h2>
            <ul className={styles.points}>
              {panel.points.map((point) => (
                <li key={point}>
                  <Check size={20} className={styles.tick} aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
            <a href={panel.href} className={`btn ${styles.cta}`}>
              {panel.cta}
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

import { ArrowRight, Check } from "lucide-react";
import { cvLink, hireLink } from "@/lib/nav";
import type { PhotoKey } from "@/lib/photos";
import { Photo } from "./Photo";
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
      "Permanent and temporary staff in 12 sectors, anywhere in the UK.",
      "We get to know the role and your business before we introduce anyone.",
      "We advertise your vacancy on our website, social media and the main job sites.",
    ],
    cta: "I'm hiring",
    href: hireLink,
    photo: "officeTeam" as PhotoKey,
  },
  {
    id: "candidates",
    label: "For candidates",
    title: "Find work that fits you",
    points: [
      "Permanent and temporary roles in 12 sectors, all over the UK.",
      "Apply online with your CV in a couple of minutes.",
      // TODO: confirm with the client. (UK law generally bars agencies from
      // charging work-seekers for finding them work.)
      "We never charge candidates for finding them work.",
    ],
    cta: "Send your CV",
    href: cvLink,
    photo: "candidateChat" as PhotoKey,
  },
];

export function AudienceSplit() {
  return (
    <section className="section" aria-label="Employers and candidates">
      <div className={`container ${styles.grid}`}>
        {panels.map((panel) => (
          <article key={panel.id} id={panel.id} className={styles.panel}>
            <div className={styles.photo}>
              <Photo name={panel.photo} sizes="(min-width: 768px) 50vw, 100vw" />
            </div>
            <div className={styles.body}>
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
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

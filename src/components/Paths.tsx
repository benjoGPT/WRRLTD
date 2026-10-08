import { site } from "@/config/site";
import { cvLink, hireLink } from "@/lib/nav";
import type { PhotoKey } from "@/lib/photos";
import { Photo } from "./Photo";
import styles from "./Paths.module.css";

/**
 * How we work with each side, as two split rows that alternate direction:
 * text and steps on one half, a photo on the other.
 *
 * TODO: ask the client to confirm these steps match how they actually work.
 */

type Path = {
  id: string;
  audience: string;
  title: string;
  intro: string;
  steps: { title: string; text: string }[];
  cta: string;
  href: string;
  photo: PhotoKey;
};

const paths: Path[] = [
  {
    id: "employers",
    audience: "For employers",
    title: "Staff you can rely on, permanent or temporary",
    intro: `Tell us about the role and we'll find people who fit it, anywhere in ${site.coverage}.`,
    steps: [
      {
        title: "Tell us what you need",
        text: "The role, the hours, the location, and whether it's permanent or temporary.",
      },
      {
        title: "We find the people",
        text: "We advertise on our website, social media and job sites, and search the candidates already registered with us.",
      },
      {
        title: "You meet a checked shortlist",
        text: "We confirm identity, right to work and references before anyone reaches you.",
      },
      {
        title: "We stay in touch",
        text: "We arrange interviews or start dates and check in once your new starter is settled.",
      },
    ],
    cta: "Tell us about your vacancy",
    href: hireLink,
    photo: "officeTeam",
  },
  {
    id: "candidates",
    audience: "For candidates",
    title: "Work that suits you, and it's free",
    intro: "Apply once and we'll call you about roles that match what you're looking for.",
    steps: [
      {
        title: "Apply online",
        text: "Fill in the short form and attach your CV. No CV yet? Call or email us and we'll help.",
      },
      {
        title: "We give you a call",
        text: "We talk through your experience, the work you want, where you can travel and when you're free.",
      },
      {
        title: "We put you forward",
        text: "Only for jobs that suit you, and only after you've said yes to each one.",
      },
      {
        title: "You start work",
        text: "We help you prepare for interviews and keep in touch after your first day.",
      },
    ],
    cta: "Send your CV",
    href: cvLink,
    photo: "candidateChat",
  },
];

export function Paths() {
  return (
    <section className={styles.section} aria-label="How we work">
      {paths.map((path, i) => (
        <div
          key={path.id}
          id={path.id}
          className={`${styles.row} ${i % 2 ? styles.reverse : ""}`}
        >
          <div className={styles.text}>
            <p className="eyebrow">{path.audience}</p>
            <h2 className={styles.title}>{path.title}</h2>
            <p className={styles.intro}>{path.intro}</p>
            <ol className={styles.steps}>
              {path.steps.map((step) => (
                <li key={step.title}>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
            <a href={path.href} className="btn btn--outline">
              {path.cta}
            </a>
          </div>
          <div className={styles.media}>
            <Photo name={path.photo} sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
        </div>
      ))}
    </section>
  );
}

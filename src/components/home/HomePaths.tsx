import Link from "next/link";
import { site } from "@/config/site";
import type { PhotoKey } from "@/lib/photos";
import { Photo } from "../Photo";
import styles from "./HomePaths.module.css";

const paths: { href: string; audience: string; title: string; text: string; link: string; photo: PhotoKey }[] = [
  {
    href: "/employers",
    audience: "For employers",
    title: "Staff you can rely on",
    text: `Permanent and temporary staff, checked before they reach you, anywhere in ${site.coverage}.`,
    link: "How we work with employers",
    photo: "officeTeam",
  },
  {
    href: "/candidates",
    audience: "For candidates",
    title: "Work that suits you",
    text: "Apply once and we'll call you about roles that match what you want. It's always free.",
    link: "How we help candidates",
    photo: "candidateChat",
  },
];

/** Two ways in, each linking to its own page. */
export function HomePaths() {
  return (
    <section className="section" aria-label="Employers and candidates">
      <div className={`container ${styles.grid}`}>
        {paths.map((p) => (
          <Link key={p.href} href={p.href} className={styles.card}>
            <div className={styles.media}>
              <Photo name={p.photo} sizes="(min-width: 768px) 50vw, 100vw" />
            </div>
            <div className={styles.body}>
              <p className="eyebrow">{p.audience}</p>
              <h2 className={styles.title}>{p.title}</h2>
              <p className={styles.text}>{p.text}</p>
              <span className={styles.link}>{p.link}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

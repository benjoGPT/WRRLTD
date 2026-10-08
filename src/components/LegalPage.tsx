import Link from "next/link";
import type { ReactNode } from "react";
import { legalPages, policiesLastUpdated } from "@/lib/legal";
import styles from "./LegalPage.module.css";

/**
 * Layout for the policy pages: a navy title band, the policy text at a
 * comfortable reading width, and a menu of the other policies alongside.
 */
export function LegalPage({
  title,
  path,
  intro,
  children,
}: {
  title: string;
  path: string;
  intro: ReactNode;
  children: ReactNode;
}) {
  return (
    <main id="main">
      <div className={`${styles.band} on-dark`}>
        <div className="container">
          <p className="eyebrow">Policies</p>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.meta}>Last updated: {policiesLastUpdated}</p>
        </div>
      </div>

      <div className={`container ${styles.layout}`}>
        <nav className={styles.nav} aria-label="Policies">
          <ul>
            {legalPages.map((p) => (
              <li key={p.href}>
                <Link href={p.href} aria-current={p.href === path ? "page" : undefined}>
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <article className={styles.prose}>
          <div className={styles.intro}>{intro}</div>
          {children}
        </article>
      </div>
    </main>
  );
}

import Link from "next/link";
import type { ReactNode } from "react";
import { breadcrumbSchema, type Crumb } from "@/lib/schema";
import type { PhotoKey } from "@/lib/photos";
import { Photo } from "./Photo";
import { StructuredData } from "./StructuredData";
import styles from "./PageHero.module.css";

/**
 * Header for every inner page: breadcrumbs, the page's one <h1>, a short
 * intro and optional buttons on the navy half, with a photo on the other.
 * Also outputs the breadcrumb structured data for search engines.
 */
export function PageHero({
  title,
  intro,
  crumbs,
  photo,
  children,
}: {
  title: string;
  intro: ReactNode;
  /** Trail after "Home", ending with this page */
  crumbs: Crumb[];
  photo?: PhotoKey;
  children?: ReactNode;
}) {
  const trail: Crumb[] = [{ name: "Home", path: "/" }, ...crumbs];

  return (
    <section className={`${styles.hero} ${photo ? styles.withPhoto : ""}`} data-sticky-hide>
      <StructuredData data={breadcrumbSchema(trail)} />
      <div className={`${styles.text} on-dark`}>
        <div className={styles.textInner}>
          <nav aria-label="Breadcrumb" className={styles.crumbs}>
            <ol>
              {trail.map((c, i) => (
                <li key={c.path}>
                  {i < trail.length - 1 ? (
                    <Link href={c.path}>{c.name}</Link>
                  ) : (
                    <span aria-current="page">{c.name}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.intro}>{intro}</div>
          {children && <div className={styles.actions}>{children}</div>}
        </div>
      </div>
      {photo && (
        <div className={styles.media}>
          <Photo name={photo} sizes="(min-width: 1024px) 50vw, 100vw" eager />
        </div>
      )}
    </section>
  );
}

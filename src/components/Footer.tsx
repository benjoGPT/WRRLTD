import Link from "next/link";
import { site } from "@/config/site";
import { legalPages } from "@/lib/legal";
import { cvLink, footerLinks, hireLink, navLinks } from "@/lib/nav";
import { sectors } from "@/lib/sectors";
import { CookieSettingsButton } from "./cookies/CookieSettingsButton";
import { Logo } from "./Logo";
import styles from "./Footer.module.css";

/**
 * Footer: one closing statement with the two ways in, then contact details,
 * sector links and the legal small print. No sitemap columns.
 */
export function Footer() {
  return (
    <footer className={`${styles.footer} on-dark`}>
      <div className="container">
        <p className={styles.statement}>Whichever side you&apos;re on, we&apos;ll find the right fit.</p>

        <div className={styles.ctas}>
          <Link href={hireLink} className="btn btn--light">
            I&apos;m hiring
          </Link>
          <Link href={cvLink} className="btn btn--ghost-light">
            I&apos;m looking for work
          </Link>
        </div>

        <div className={styles.meta}>
          <Link href="/" className={styles.logo}>
            <Logo variant="stacked" inverted />
          </Link>

          <nav aria-label="Pages" className={styles.pages}>
            <ul>
              {[...navLinks, ...footerLinks].map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.contact}>
            <a href={site.phoneHref}>{site.phone}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <span>
              {site.locality}, {site.region}. Recruiting across {site.coverage}.
            </span>
          </div>

          <nav aria-label="Sectors" className={styles.sectors}>
            <ul>
              {sectors.map((s) => (
                <li key={s.slug}>
                  <Link href={`/sectors/${s.slug}`}>{s.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={styles.legal}>
          <ul className={styles.policies}>
            {legalPages.map((p) => (
              <li key={p.href}>
                <Link href={p.href}>{p.label}</Link>
              </li>
            ))}
            <li>
              <CookieSettingsButton className={styles.cookieButton} />
            </li>
          </ul>
          <p>
            {site.name} acts as an employment agency for permanent roles and an employment business
            for temporary roles.
          </p>
          <p>
            © {site.legalName}. Registered in {site.registeredIn}, company number {site.companyNumber}.
            Registered office: {site.registeredAddress}.
          </p>
        </div>
      </div>
    </footer>
  );
}

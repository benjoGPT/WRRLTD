import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/config/site";
import { legalPages } from "@/lib/legal";
import { sectors } from "@/lib/sectors";
import { CookieSettingsButton } from "./cookies/CookieSettingsButton";
import { Logo } from "./Logo";
import styles from "./Footer.module.css";

const pageLinks = [
  { label: "For employers", href: "/#employers" },
  { label: "For candidates", href: "/#candidates" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "About us", href: "/#about" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

/** Site footer: logo, contact details, sector links, legal information. */
export function Footer() {
  return (
    <footer className={`${styles.footer} on-dark`}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            <Logo variant="stacked" inverted />
          </Link>
          <p className={styles.tagline}>{site.tagline}</p>
        </div>

        <div>
          <h2 className={styles.heading}>Contact</h2>
          <ul className={styles.list}>
            <li>
              <a href={site.phoneHref} className={styles.contact}>
                <Phone size={18} aria-hidden="true" />
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className={styles.contact}>
                <Mail size={18} aria-hidden="true" />
                {site.email}
              </a>
            </li>
            <li className={styles.contact}>
              <MapPin size={18} aria-hidden="true" />
              {site.locality}, {site.region}
            </li>
          </ul>
        </div>

        <div className={styles.sectors}>
          <h2 className={styles.heading}>Sectors</h2>
          <ul className={`${styles.list} ${styles.sectorList}`}>
            {sectors.map((s) => (
              <li key={s.slug}>
                <a href={`/#sector-${s.slug}`} className={styles.link}>
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={styles.heading}>Explore</h2>
          <ul className={styles.list}>
            {pageLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={styles.link}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`container ${styles.legal}`}>
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
    </footer>
  );
}

import { Mail, Phone } from "lucide-react";
import { site } from "@/config/site";
import styles from "./TopBar.module.css";

/** Thin bar above the header with the phone number and email address. */
export function TopBar() {
  return (
    <div className={`${styles.bar} on-dark`}>
      <div className={`container ${styles.inner}`}>
        <a className={styles.link} href={site.phoneHref}>
          <Phone size={16} aria-hidden="true" />
          <span className="sr-only">Call us on </span>
          {site.phone}
        </a>
        <a className={styles.link} href={`mailto:${site.email}`}>
          <Mail size={16} aria-hidden="true" />
          {/* Short label on phones, where the full address doesn't fit. */}
          <span className={styles.short}>Email us</span>
          <span className={styles.full}>{site.email}</span>
        </a>
      </div>
    </div>
  );
}

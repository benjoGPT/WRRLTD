import { Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { site } from "@/config/site";
import styles from "./Contact.module.css";

/**
 * A single form with a heading, used on the employer and candidate pages,
 * with the email and phone number alongside as another way in.
 */
export function FormSection({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`section ${styles.formSection}`} aria-labelledby={`${id}-title`} data-sticky-hide>
      <div className={`container ${styles.layout}`}>
        <div className={styles.head}>
          <h2 id={`${id}-title`} className="section-title">
            {title}
          </h2>
          <p className="section-intro">{intro}</p>
        </div>

        <div className={styles.main}>
          <div className={styles.panel}>{children}</div>
        </div>

        <aside className={styles.aside} aria-label="Other ways to contact us">
          <h3 className={styles.asideTitle}>Prefer email?</h3>
          <p className={styles.asideText}>Send your details straight to our inbox, or give us a call.</p>
          <a href={`mailto:${site.email}`} className={styles.asideLink}>
            <Mail size={20} aria-hidden="true" />
            {site.email}
          </a>
          <a href={site.phoneHref} className={styles.asideLink}>
            <Phone size={20} aria-hidden="true" />
            {site.phone}
          </a>
          <p className={styles.asideLink}>
            <MapPin size={20} aria-hidden="true" />
            {site.locality}, recruiting across {site.coverage}
          </p>
        </aside>
      </div>
    </section>
  );
}

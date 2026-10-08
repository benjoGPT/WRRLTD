"use client";

import { useEffect, useState } from "react";
import { Building2, Mail, MapPin, Phone, UserRound } from "lucide-react";
import { site } from "@/config/site";
import { CandidateForm } from "./CandidateForm";
import { EmployerForm } from "./EmployerForm";
import styles from "./Contact.module.css";

type FormKind = "employer" | "candidate";

const hashToForm: Record<string, FormKind> = {
  "#employer-form": "employer",
  "#candidate-form": "candidate",
};

/**
 * Contact section. A switch at the top picks which form shows. Buttons
 * elsewhere on the page link to #employer-form or #candidate-form, and this
 * component listens for those links to open the right form.
 */
export function Contact() {
  const [active, setActive] = useState<FormKind>("candidate");

  useEffect(() => {
    // Open the right form if the page loads with #employer-form etc.
    // Also /contact?type=employer opens the employer form.
    const fromHash = () => {
      const type = new URLSearchParams(window.location.search).get("type");
      const kind =
        hashToForm[window.location.hash] ?? (type === "employer" || type === "candidate" ? type : undefined);
      if (kind) setActive(kind);
    };
    // Also catch clicks on those links, even when the hash hasn't changed.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      const href = link?.getAttribute("href") ?? "";
      const kind = hashToForm[href.slice(href.indexOf("#"))];
      if (kind) setActive(kind);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", fromHash);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <section id="contact" className="section" aria-labelledby="contact-title" data-sticky-hide>
      {/* Jump targets for the "I'm hiring" and "Send your CV" buttons */}
      <span id="employer-form" className={styles.anchor} />
      <span id="candidate-form" className={styles.anchor} />

      <div className={`container ${styles.layout}`}>
        <div className={styles.head}>
          <h2 id="contact-title" className="section-title">
            Send us your details
          </h2>
          <p className="section-intro">
            Tell us what you&apos;re looking for and we&apos;ll get back to you.
          </p>
        </div>

        <div className={styles.main}>
          <div className={styles.switch} role="group" aria-label="Choose a form">
            <button
              type="button"
              className={styles.switchButton}
              aria-pressed={active === "candidate"}
              onClick={() => setActive("candidate")}
            >
              <UserRound size={20} aria-hidden="true" />
              I&apos;m looking for work
            </button>
            <button
              type="button"
              className={styles.switchButton}
              aria-pressed={active === "employer"}
              onClick={() => setActive("employer")}
            >
              <Building2 size={20} aria-hidden="true" />
              I&apos;m hiring
            </button>
          </div>

          <div className={styles.panel}>
            <h3 className={styles.formTitle}>
              {active === "candidate" ? "Send us your CV" : "Tell us about your vacancy"}
            </h3>
            {/* Both forms stay mounted so nothing typed is lost when switching */}
            <div hidden={active !== "candidate"} data-form="candidate">
              <CandidateForm />
            </div>
            <div hidden={active !== "employer"} data-form="employer">
              <EmployerForm />
            </div>
          </div>
        </div>

        <aside className={styles.aside} aria-label="Other ways to contact us">
          <h3 className={styles.asideTitle}>Prefer email?</h3>
          <p className={styles.asideText}>
            Send your CV or vacancy details straight to our inbox.
          </p>
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
            {site.locality}, {site.region}
          </p>
        </aside>
      </div>
    </section>
  );
}

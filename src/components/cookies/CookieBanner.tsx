"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";
import {
  OPEN_SETTINGS_EVENT,
  categories,
  readConsent,
  saveConsent,
  type ConsentCategory,
} from "@/lib/consent";
import styles from "./CookieBanner.module.css";

/**
 * Cookie banner and preferences panel.
 *
 * Follows ICO guidance: no optional cookies until the visitor agrees,
 * "Reject all" is as easy as "Accept all", nothing is pre-ticked, and the
 * choice can be changed at any time from "Cookie settings" in the footer.
 */
export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [choices, setChoices] = useState<Record<ConsentCategory, boolean>>({
    analytics: false,
    marketing: false,
  });
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    // Only after the page loads in the browser, so the server-built page
    // never shows a banner by mistake.
    const existing = readConsent();
    const show = () => setShowBanner(!existing);
    show();

    const openSettings = () => {
      const current = readConsent();
      setChoices({ analytics: current?.analytics ?? false, marketing: current?.marketing ?? false });
      dialogRef.current?.showModal();
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, openSettings);
  }, []);

  const decide = (choice: Record<ConsentCategory, boolean>) => {
    saveConsent(choice);
    setShowBanner(false);
    dialogRef.current?.close();
  };

  const openPreferences = () => {
    setChoices({ analytics: false, marketing: false });
    dialogRef.current?.showModal();
  };

  return (
    <>
      {showBanner && (
        <section className={styles.banner} aria-label="Cookie choices">
          <div className={styles.bannerText}>
            <Cookie size={22} aria-hidden="true" className={styles.bannerIcon} />
            <p>
              We use essential cookies to make this site work. With your permission, we&apos;d also
              like to use analytics cookies to see how the site is used.{" "}
              <Link href="/cookies">Read our cookie policy</Link>.
            </p>
          </div>
          <div className={styles.bannerButtons}>
            <button type="button" className="btn" onClick={() => decide({ analytics: true, marketing: true })}>
              Accept all
            </button>
            <button type="button" className="btn" onClick={() => decide({ analytics: false, marketing: false })}>
              Reject all
            </button>
            <button type="button" className={styles.linkButton} onClick={openPreferences}>
              Manage preferences
            </button>
          </div>
        </section>
      )}

      <dialog ref={dialogRef} className={styles.dialog} aria-labelledby="cookie-settings-title">
        <div className={styles.dialogHead}>
          <h2 id="cookie-settings-title">Cookie settings</h2>
          <button type="button" className={styles.close} onClick={() => dialogRef.current?.close()}>
            <X size={24} aria-hidden="true" />
            <span className="sr-only">Close</span>
          </button>
        </div>
        <p className={styles.dialogIntro}>
          Choose which cookies you&apos;re happy for us to use. You can change this at any time.
        </p>

        <div className={styles.option}>
          <div>
            <h3>Essential</h3>
            <p>Needed for the site to work, including remembering your cookie choice. Always on.</p>
          </div>
          <span className={styles.always}>Always on</span>
        </div>

        {categories.map((c) => (
          <div key={c.id} className={styles.option}>
            <div>
              <h3 id={`cookie-${c.id}`}>{c.name}</h3>
              <p>{c.description}</p>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                role="switch"
                aria-labelledby={`cookie-${c.id}`}
                checked={choices[c.id]}
                onChange={(e) => setChoices((prev) => ({ ...prev, [c.id]: e.target.checked }))}
              />
              <span aria-hidden="true" />
            </label>
          </div>
        ))}

        <div className={styles.dialogButtons}>
          <button type="button" className="btn" onClick={() => decide(choices)}>
            Save my choices
          </button>
          <button type="button" className="btn btn--outline" onClick={() => decide({ analytics: false, marketing: false })}>
            Reject all
          </button>
          <button type="button" className="btn btn--outline" onClick={() => decide({ analytics: true, marketing: true })}>
            Accept all
          </button>
        </div>
      </dialog>
    </>
  );
}

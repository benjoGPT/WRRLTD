"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cvLink } from "@/lib/nav";
import styles from "./StickyCvButton.module.css";

/**
 * Phones only: a "Send your CV" bar fixed to the bottom of the screen, so it's
 * always within thumb reach. It hides while a page header (which has its own
 * buttons) or a form is on screen, so it never covers them.
 */
export function StickyCvButton() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Hide while a hero or a form is on screen (marked with data-sticky-hide)
    const watched = [...document.querySelectorAll<HTMLElement>("[data-sticky-hide]")];
    const onScreen = new Set<Element>();

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) onScreen.add(entry.target);
        else onScreen.delete(entry.target);
      }
      setVisible(onScreen.size === 0);
    });
    watched.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]); // re-check on every page

  return (
    <div className={styles.bar} data-visible={visible} aria-hidden={!visible}>
      <a href={cvLink} className="btn btn--block" tabIndex={visible ? undefined : -1}>
        Send your CV
      </a>
    </div>
  );
}

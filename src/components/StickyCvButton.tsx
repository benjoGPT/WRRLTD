"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { cvLink } from "@/lib/nav";
import styles from "./StickyCvButton.module.css";

/**
 * Phones only: a "Send your CV" bar fixed to the bottom of the screen, so it's
 * always within thumb reach. It hides while the hero (which has its own
 * buttons) or the contact forms are on screen, so it never covers them.
 */
export function StickyCvButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const watched = ["top", "contact"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
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
  }, []);

  return (
    <div className={styles.bar} data-visible={visible} aria-hidden={!visible}>
      <a href={cvLink} className="btn btn--block" tabIndex={visible ? undefined : -1}>
        Send your CV
        <ArrowRight size={18} aria-hidden="true" />
      </a>
    </div>
  );
}

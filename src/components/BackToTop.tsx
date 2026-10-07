"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import styles from "./BackToTop.module.css";

/**
 * Round "back to top" button (tablets and up) with a ring that fills as you
 * scroll down the page.
 */
export function BackToTop() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const circumference = 2 * Math.PI * 22;
  const visible = progress > 0.08;

  return (
    <a
      href="#top"
      className={styles.button}
      data-visible={visible}
      aria-hidden={!visible}
      tabIndex={visible ? undefined : -1}
    >
      <svg viewBox="0 0 48 48" className={styles.ring} aria-hidden="true">
        <circle cx="24" cy="24" r="22" className={styles.track} />
        <circle
          cx="24"
          cy="24"
          r="22"
          className={styles.bar}
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress)}
        />
      </svg>
      <ArrowUp size={20} aria-hidden="true" />
      <span className="sr-only">Back to top</span>
    </a>
  );
}

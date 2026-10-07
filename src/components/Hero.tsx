import { ArrowRight } from "lucide-react";
import { site } from "@/config/site";
import { cvLink, hireLink } from "@/lib/nav";
import styles from "./Hero.module.css";

/** First screen: tagline, one sentence on what we do, and two routes in. */
export function Hero() {
  return (
    <section className={`${styles.hero} on-dark`} aria-labelledby="hero-title" id="top">
      {/* Decorative angular shapes, echoing the clipped corner in the logo */}
      <svg
        className={styles.shapes}
        viewBox="0 0 600 700"
        preserveAspectRatio="xMaxYMid slice"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M220 0H600V700H20Z" fill="#0b3866" />
        <path d="M390 0H600V700H190Z" fill="#0f4478" />
        <path d="M530 0H600V700H330Z" fill="#727c88" opacity="0.3" />
      </svg>

      <div className={`container ${styles.inner}`}>
        <p className="eyebrow">Permanent &amp; temporary recruitment</p>
        <h1 id="hero-title" className={styles.title}>
          {site.tagline}
        </h1>
        <p className={styles.lede}>
          We find permanent and temporary staff for businesses in {site.locality} and beyond,
          and help candidates find work that suits them.
        </p>
        <div className={styles.buttons}>
          <a href={hireLink} className="btn btn--light">
            I&apos;m hiring
            <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a href={cvLink} className="btn btn--ghost-light">
            I&apos;m looking for work
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

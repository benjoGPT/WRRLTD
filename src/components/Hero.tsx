import { site } from "@/config/site";
import { cvLink, hireLink } from "@/lib/nav";
import styles from "./Hero.module.css";

/**
 * The hero is a diptych: employers on the navy half, candidates on the light
 * half, with the tagline split across the two. The seam between them is the
 * slanted stroke from the W in the logo. It's the one bold moment on the page;
 * everything below is kept quiet.
 */
export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title" id="top">
      <h1 id="hero-title" className="sr-only">
        {site.name}: {site.tagline}
      </h1>

      <div className={`${styles.half} ${styles.employers} on-dark`}>
        <div className={styles.inner}>
          <p className={styles.audience}>For employers</p>
          <p className={styles.line} aria-hidden="true">
            <span>The Right</span> <span>People.</span>
          </p>
          <p className={styles.copy}>
            Permanent and temporary staff for businesses anywhere in {site.coverage}, in 12 sectors.
          </p>
          <a href={hireLink} className="btn btn--light">
            I&apos;m hiring
          </a>
        </div>
      </div>

      <div className={`${styles.half} ${styles.candidates}`}>
        <div className={styles.inner}>
          <p className={styles.audience}>For candidates</p>
          <p className={styles.line} aria-hidden="true">
            <span>The Right</span> <span>Fit.</span>
          </p>
          <p className={styles.copy}>
            Tell us the work you want. We&apos;ll call you about roles that suit you, and it&apos;s
            always free.
          </p>
          <a href={cvLink} className="btn">
            I&apos;m looking for work
          </a>
        </div>
      </div>
    </section>
  );
}

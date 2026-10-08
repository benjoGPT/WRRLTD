import { ArrowRight } from "lucide-react";
import { site } from "@/config/site";
import { cvLink, hireLink } from "@/lib/nav";
import { Photo } from "./Photo";
import { RotatingWord } from "./RotatingWord";
import { Spotlight } from "./Spotlight";
import styles from "./Hero.module.css";

// Example roles for the rotating line. TODO: confirm with the client.
const roles = [
  "warehouse operatives",
  "HGV drivers",
  "chefs",
  "site labourers",
  "electricians",
  "office administrators",
  "maintenance engineers",
];

/** First screen: tagline, what we do, two routes in, and a photo collage. */
export function Hero() {
  return (
    <section className={`${styles.hero} on-dark`} aria-labelledby="hero-title" id="top">
      <Spotlight />
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className="eyebrow">Permanent &amp; temporary recruitment</p>
          <h1 id="hero-title" className={styles.title}>
            The Right People.
            <br />
            <span className={styles.accent}>The Right Fit.</span>
          </h1>
          <p className={styles.lede}>
            Permanent and temporary recruitment across {site.coverage}. We find reliable people
            for businesses, and the right next role for the people we represent.
          </p>
          <p className={styles.placing}>
            <span className={styles.dot} aria-hidden="true" />
            Placing{" "}
            <RotatingWord
              words={roles}
              srText="people across 12 sectors, from warehouse and driving to hospitality and trades."
            />
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

        {/* Photo collage in slanted tiles, echoing the angles in the logo */}
        <div className={styles.collage}>
          <figure className={`${styles.tile} ${styles.tile1}`}>
            <Photo name="construction" sizes="(min-width: 1024px) 260px, 33vw" eager />
            <figcaption>Construction</figcaption>
          </figure>
          <figure className={`${styles.tile} ${styles.tile2}`}>
            <Photo name="kitchen" sizes="(min-width: 1024px) 260px, 33vw" eager />
            <figcaption>Hospitality</figcaption>
          </figure>
          <figure className={`${styles.tile} ${styles.tile3}`}>
            <Photo name="warehouse" sizes="(min-width: 1024px) 260px, 33vw" eager />
            <figcaption>Warehouse</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

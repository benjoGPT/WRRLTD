import Link from "next/link";
import { site } from "@/config/site";
import { Photo } from "../Photo";
import styles from "./AboutTeaser.module.css";

/** A short "about us" with a link to the full page. */
export function AboutTeaser() {
  return (
    <section className="section on-dark" aria-labelledby="about-teaser-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.photo}>
          <Photo name="blackpool" sizes="(min-width: 1024px) 45vw, 100vw" />
        </div>
        <div className={styles.copy}>
          <h2 id="about-teaser-title" className="section-title">
            We start by understanding both sides
          </h2>
          <p>
            {site.name} is a UK recruitment consultancy based in {site.locality}. Before we
            introduce anyone, we take the time to understand the role, the business and the person.
          </p>
          <Link href="/about" className="btn btn--ghost-light">
            More about us
          </Link>
        </div>
      </div>
    </section>
  );
}

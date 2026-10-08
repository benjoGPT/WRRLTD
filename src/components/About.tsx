import { MapPin } from "lucide-react";
import { site } from "@/config/site";
import { Photo } from "./Photo";
import styles from "./About.module.css";

/** About us: the client's own copy (lightly tidied) beside a photo of Blackpool. */
export function About() {
  return (
    <section id="about" className="section on-dark" aria-labelledby="about-title">
      <div className={`container ${styles.grid}`}>
        <figure className={styles.figure}>
          <div className={styles.photo}>
            <Photo name="blackpool" sizes="(min-width: 1024px) 45vw, 100vw" />
          </div>
          <figcaption className={styles.caption}>
            <MapPin size={16} aria-hidden="true" />
            {site.locality}, where we&apos;re based
          </figcaption>
        </figure>

        <div className={styles.copy}>
          <h2 id="about-title" className="section-title">
            We start by understanding both sides
          </h2>
          <p className={styles.lead}>
            {site.name} is a UK recruitment consultancy. We connect ambitious businesses with
            reliable, high-quality candidates in a wide range of industries.
          </p>
          <p>
            Before we introduce anyone, we take the time to understand the role, the business and
            the person. A filled vacancy isn&apos;t the goal. The goal is the right person in the
            right job, and a good fit for both of them.
          </p>
          <p>
            Hiring or job hunting, you&apos;ll find us straightforward, professional and personal to
            deal with.
          </p>
          <p className={styles.location}>
            Based in {site.locality}. Recruiting across {site.coverage}.
          </p>
        </div>
      </div>
    </section>
  );
}

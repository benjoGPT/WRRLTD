import { MapPin } from "lucide-react";
import { site } from "@/config/site";
import { Photo } from "./Photo";
import styles from "./About.module.css";

/** About us, using the client's own copy (lightly tidied). */
export function About() {
  return (
    <section id="about" className="section on-dark slant-top" aria-labelledby="about-title">
      <div className={`container ${styles.grid}`}>
        <div>
          <p className="eyebrow">About us</p>
          <h2 id="about-title" className="section-title">
            Recruitment that starts with understanding
          </h2>
          <figure className={styles.figure}>
            <div className={styles.photo}>
              <Photo name="blackpool" sizes="(min-width: 1024px) 40vw, 100vw" />
            </div>
            <figcaption className={styles.caption}>
              <MapPin size={16} aria-hidden="true" />
              {site.locality}, where we&apos;re based
            </figcaption>
          </figure>
        </div>

        <div className={styles.copy}>
          <p className={styles.lead}>
            {site.name} is a UK recruitment consultancy connecting ambitious businesses with
            reliable, high-quality candidates across a wide range of industries.
          </p>
          <p>
            Our approach is simple. We take the time to understand the role, the business and the
            individual before making an introduction. Good recruitment isn&apos;t just filling a
            vacancy. It&apos;s finding the right person, the right opportunity and the right fit for
            both sides.
          </p>
          <p>
            Whether you&apos;re a business looking for your next employee or a candidate looking
            for your next career move, we&apos;re here to make the process straightforward,
            professional and personal.
          </p>

          <p className={styles.location}>
            <MapPin size={20} aria-hidden="true" />
            <span>
              Based in {site.locality}. Recruiting for businesses and candidates right across{" "}
              {site.coverage}.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

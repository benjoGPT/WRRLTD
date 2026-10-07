import { MapPin } from "lucide-react";
import { site } from "@/config/site";
import styles from "./About.module.css";

/** About us, using the client's own copy (lightly tidied). */
export function About() {
  return (
    <section id="about" className="section on-dark" aria-labelledby="about-title">
      <div className={`container ${styles.grid}`}>
        <div>
          <p className="eyebrow">About us</p>
          <h2 id="about-title" className="section-title">
            Recruitment that starts with understanding
          </h2>
        </div>

        <div className={styles.copy}>
          <p className={styles.lead}>
            {site.name} is a UK recruitment consultancy connecting ambitious businesses with
            reliable, high-quality candidates across a wide range of industries.
          </p>
          <p>
            Our approach is simple. We take the time to understand the role, the business and the
            individual before making an introduction. The right recruitment isn&apos;t just about
            filling a vacancy. It&apos;s about finding the right person, the right opportunity and
            the right fit for both sides.
          </p>
          <p>
            Whether you&apos;re a business looking for your next employee or a candidate looking
            for your next career move, we&apos;re here to make the process straightforward,
            professional and personal.
          </p>

          <p className={styles.location}>
            <MapPin size={20} aria-hidden="true" />
            {/* TODO: name the wider areas covered once the client confirms them. */}
            <span>
              Based in {site.locality}, working with businesses and candidates across a wider area.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

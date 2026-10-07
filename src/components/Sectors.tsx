import { sectors } from "@/lib/sectors";
import styles from "./Sectors.module.css";

/** Grid of the 12 sectors, each with an icon and one line of copy. */
export function Sectors() {
  return (
    <section id="sectors" className="section section--tint" aria-labelledby="sectors-title">
      <div className="container">
        <p className="eyebrow">Sectors</p>
        <h2 id="sectors-title" className="section-title">
          The sectors we recruit for
        </h2>
        <p className="section-intro">
          We place permanent and temporary staff across a wide range of industries.
        </p>

        <ul className={styles.grid}>
          {sectors.map(({ name, slug, icon: Icon, blurb }) => (
            <li key={slug} id={`sector-${slug}`} className={styles.card}>
              <span className={styles.icon}>
                <Icon size={26} strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h3 className={styles.name}>{name}</h3>
              <p className={styles.blurb}>{blurb}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

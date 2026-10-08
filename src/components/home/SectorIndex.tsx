import Link from "next/link";
import { sectors } from "@/lib/sectors";
import styles from "./SectorIndex.module.css";

/** The 12 sectors as links to their own pages. */
export function SectorIndex() {
  return (
    <section className="section" aria-labelledby="sector-index-title">
      <div className={`container ${styles.layout}`}>
        <div>
          <h2 id="sector-index-title" className="section-title">
            Twelve sectors, one team
          </h2>
          <p className="section-intro">Permanent and temporary roles in each, anywhere in the UK.</p>
          <Link href="/sectors" className={`btn btn--outline ${styles.all}`}>
            Browse all sectors
          </Link>
        </div>
        <ul className={styles.list}>
          {sectors.map(({ name, slug, icon: Icon }) => (
            <li key={slug}>
              <Link href={`/sectors/${slug}`}>
                <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { sectorGroups, sectors, type SectorGroup } from "@/lib/sectors";
import Link from "next/link";
import { formLink } from "@/lib/nav";
import styles from "./Sectors.module.css";

type Filter = "All" | SectorGroup;
const filters: Filter[] = ["All", ...sectorGroups];

/**
 * The 12 sectors as a filterable list. Each row links to the sector's own page,
 * and to the employer or candidate form with that sector already chosen.
 */
export function Sectors() {
  const [filter, setFilter] = useState<Filter>("All");
  const shown = sectors.filter((s) => filter === "All" || s.group === filter);

  return (
    <section id="sectors" className={`section ${styles.section}`} aria-labelledby="sectors-title">
      <div className={`container ${styles.layout}`}>
        <div className={styles.head}>
          <h2 id="sectors-title" className="section-title">
            Find your sector
          </h2>
          <p className="section-intro">
            Permanent and temporary roles in each. Open a sector to read more, or go straight to
            the right form.
          </p>
          <div className={styles.filters} role="group" aria-label="Filter sectors">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                className={styles.filter}
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="sr-only" aria-live="polite">
            Showing {shown.length} sectors
          </p>
          <ul className={styles.list}>
            {shown.map(({ name, slug, icon: Icon, blurb }) => (
              <li key={slug} id={`sector-${slug}`} className={styles.row}>
                <Icon size={22} strokeWidth={1.75} aria-hidden="true" className={styles.icon} />
                <div className={styles.copy}>
                  <h3 className={styles.name}>
                    <Link href={`/sectors/${slug}`}>{name}</Link>
                  </h3>
                  <p className={styles.blurb}>{blurb}</p>
                </div>
                <div className={styles.actions}>
                  <Link href={formLink("candidate", slug)}>
                    Find work<span className="sr-only"> in {name}</span>
                  </Link>
                  <Link href={formLink("employer", slug)}>
                    Hire<span className="sr-only"> {name} staff</span>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

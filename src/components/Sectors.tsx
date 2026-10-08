"use client";

import { useState } from "react";
import { sectorGroups, sectors, type SectorGroup } from "@/lib/sectors";
import { openForm } from "@/lib/openForm";
import styles from "./Sectors.module.css";

type Filter = "All" | SectorGroup;
const filters: Filter[] = ["All", ...sectorGroups];

/**
 * The 12 sectors as a list (heading and filters on one half, the list on the
 * other). Each row opens the right form with that sector already chosen.
 */
export function Sectors() {
  const [filter, setFilter] = useState<Filter>("All");
  const shown = sectors.filter((s) => filter === "All" || s.group === filter);

  return (
    <section id="sectors" className={`section ${styles.section}`} aria-labelledby="sectors-title">
      <div className={`container ${styles.layout}`}>
        <div className={styles.head}>
          <h2 id="sectors-title" className="section-title">
            Twelve sectors, one team
          </h2>
          <p className="section-intro">
            Permanent and temporary roles in each. Pick a sector to apply or to tell us about a
            vacancy.
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
                  <h3 className={styles.name}>{name}</h3>
                  <p className={styles.blurb}>{blurb}</p>
                </div>
                <div className={styles.actions}>
                  <button type="button" onClick={() => openForm("candidate", name)}>
                    Find work<span className="sr-only"> in {name}</span>
                  </button>
                  <button type="button" onClick={() => openForm("employer", name)}>
                    Hire<span className="sr-only"> {name} staff</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

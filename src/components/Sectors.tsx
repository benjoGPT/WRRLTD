"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { sectorGroups, sectors, type SectorGroup } from "@/lib/sectors";
import { openForm } from "@/lib/openForm";
import styles from "./Sectors.module.css";

type Filter = "All" | SectorGroup;
const filters: Filter[] = ["All", ...sectorGroups];

/**
 * Grid of the 12 sectors. Filter buttons narrow the list by group, and each
 * card has buttons that open the right form with that sector filled in.
 */
export function Sectors() {
  const [filter, setFilter] = useState<Filter>("All");
  const shown = sectors.filter((s) => filter === "All" || s.group === filter);

  return (
    <section id="sectors" className="section" aria-labelledby="sectors-title">
      <div className="container">
        <div className={styles.head}>
          <div>
            <p className="eyebrow">Sectors</p>
            <h2 id="sectors-title" className="section-title">
              The sectors we recruit for
            </h2>
            <p className="section-intro">
              Permanent and temporary staff across a wide range of industries.
            </p>
          </div>

          <div className={styles.filters} role="group" aria-label="Filter sectors">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                className={styles.filter}
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                <span>{f}</span>
              </button>
            ))}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          Showing {shown.length} sectors
        </p>

        <ul className={styles.grid}>
          {shown.map(({ name, slug, icon: Icon, blurb }) => {
            const number = String(sectors.findIndex((s) => s.slug === slug) + 1).padStart(2, "0");
            return (
              <li key={slug} id={`sector-${slug}`} className={styles.card}>
                <span className={styles.number} aria-hidden="true">
                  {number}
                </span>
                <span className={styles.icon}>
                  <Icon size={26} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className={styles.name}>{name}</h3>
                <p className={styles.blurb}>{blurb}</p>
                <div className={styles.actions}>
                  <button type="button" onClick={() => openForm("candidate", name)}>
                    Find work <ArrowUpRight size={16} aria-hidden="true" />
                    <span className="sr-only"> in {name}</span>
                  </button>
                  <button type="button" onClick={() => openForm("employer", name)}>
                    Hire <ArrowUpRight size={16} aria-hidden="true" />
                    <span className="sr-only"> {name} staff</span>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

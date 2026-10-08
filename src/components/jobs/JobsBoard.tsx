"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MapPin, Clock, PoundSterling } from "lucide-react";
import type { Job, JobType } from "@/lib/jobs";
import { sectors } from "@/lib/sectors";
import { cvLink } from "@/lib/nav";
import styles from "./JobsBoard.module.css";

const types: ("All" | JobType)[] = ["All", "Permanent", "Temporary", "Temp to perm"];

/** Searchable, filterable list of vacancies. */
export function JobsBoard({ jobs }: { jobs: Job[] }) {
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState("all");
  const [type, setType] = useState<(typeof types)[number]>("All");

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs
      .filter((j) => sector === "all" || j.sector === sector)
      .filter((j) => type === "All" || j.type === type)
      .filter((j) => !q || `${j.title} ${j.location} ${j.summary}`.toLowerCase().includes(q))
      .sort((a, b) => b.posted.localeCompare(a.posted));
  }, [jobs, query, sector, type]);

  const sectorName = (slug: string) => sectors.find((s) => s.slug === slug)?.name ?? "";

  return (
    <div className={styles.board}>
      <form className={styles.filters} role="search" onSubmit={(e) => e.preventDefault()}>
        <label className={styles.field}>
          <span>Search</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Job title or town"
            autoComplete="off"
          />
        </label>
        <label className={styles.field}>
          <span>Sector</span>
          <select value={sector} onChange={(e) => setSector(e.target.value)}>
            <option value="all">All sectors</option>
            {sectors.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </label>
        <fieldset className={styles.types}>
          <legend>Type</legend>
          {types.map((t) => (
            <button key={t} type="button" aria-pressed={type === t} onClick={() => setType(t)}>
              {t}
            </button>
          ))}
        </fieldset>
      </form>

      <p className={styles.count} aria-live="polite">
        {shown.length === 1 ? "1 job" : `${shown.length} jobs`}
      </p>

      {shown.length > 0 ? (
        <ul className={styles.list}>
          {shown.map((job) => (
            <li key={job.slug} className={styles.job}>
              <div className={styles.jobHead}>
                <h2 className={styles.title}>
                  <Link href={`/jobs/${job.slug}`}>{job.title}</Link>
                </h2>
                {job.example && <span className={styles.example}>Example</span>}
              </div>
              <p className={styles.meta}>
                <span>
                  <MapPin size={16} aria-hidden="true" /> {job.location}
                </span>
                <span>
                  <PoundSterling size={16} aria-hidden="true" /> {job.pay}
                </span>
                <span>
                  <Clock size={16} aria-hidden="true" /> {job.type}
                </span>
              </p>
              <p className={styles.summary}>{job.summary}</p>
              <p className={styles.sector}>{sectorName(job.sector)}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.empty}>
          <h2>No jobs match right now</h2>
          <p>
            New roles come in all the time, and many are never advertised. Send us your CV and
            we&apos;ll call you when something suits you.
          </p>
          <Link href={cvLink} className="btn">
            Send your CV
          </Link>
        </div>
      )}
    </div>
  );
}

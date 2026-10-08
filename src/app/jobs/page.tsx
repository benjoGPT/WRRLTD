import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { JobsBoard } from "@/components/jobs/JobsBoard";
import { site } from "@/config/site";
import { jobs } from "@/lib/jobs";

export const metadata: Metadata = {
  title: "Jobs: permanent and temporary vacancies",
  description: `Current permanent and temporary vacancies from ${site.name}, across the UK in 12 sectors. Apply online in a couple of minutes.`,
  alternates: { canonical: "/jobs" },
  openGraph: { url: "/jobs" },
};

export default function JobsPage() {
  return (
    <main id="main">
      <PageHero
        title="Current vacancies"
        intro="Permanent and temporary jobs across the UK. Can't see the right one? Send your CV and we'll call you when something suits you."
        crumbs={[{ name: "Jobs", path: "/jobs" }]}
      />
      <section className="section" aria-label="Vacancies">
        <div className="container">
          <JobsBoard jobs={jobs} />
        </div>
      </section>
    </main>
  );
}

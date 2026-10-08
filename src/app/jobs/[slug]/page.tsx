import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, MapPin, PoundSterling, CalendarDays } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SplitSection } from "@/components/SplitSection";
import { StructuredData } from "@/components/StructuredData";
import { CandidateForm } from "@/components/contact/CandidateForm";
import { FormSection } from "@/components/contact/FormSection";
import { site } from "@/config/site";
import { getJob, jobs } from "@/lib/jobs";
import { jobPostingSchema } from "@/lib/schema";
import { getSector } from "@/lib/sectors";
import styles from "./page.module.css";

export function generateStaticParams() {
  // At least one entry is needed to build the route; "none" simply 404s.
  return jobs.length ? jobs.map((j) => ({ slug: j.slug })) : [{ slug: "none" }];
}

export async function generateMetadata({ params }: PageProps<"/jobs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) return {};
  return {
    title: `${job.title}, ${job.location}`,
    description: `${job.type} ${job.title} job in ${job.location}, ${job.pay}. ${job.summary}`,
    alternates: { canonical: `/jobs/${job.slug}` },
    openGraph: { url: `/jobs/${job.slug}` },
    // Example jobs are never indexed
    ...(job.example && { robots: { index: false, follow: false } }),
  };
}

const date = (d: string) =>
  new Date(`${d}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default async function JobPage({ params }: PageProps<"/jobs/[slug]">) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) notFound();
  const sector = getSector(job.sector);

  return (
    <main id="main">
      <div className="reading-progress" aria-hidden="true" />
      {!job.example && <StructuredData data={jobPostingSchema(job)} />}
      <PageHero
        title={job.title}
        intro={job.summary}
        crumbs={[
          { name: "Jobs", path: "/jobs" },
          { name: job.title, path: `/jobs/${job.slug}` },
        ]}
        photo={sector?.photo}
      >
        <a href="#apply" className="btn btn--light">
          Apply now
        </a>
      </PageHero>

      {job.example && (
        <p className={styles.exampleNote}>
          This is an example vacancy to show how job pages will look. It isn&apos;t a real job.
        </p>
      )}

      <SplitSection title="The job">
        <dl className={styles.facts}>
          <div>
            <dt><MapPin size={18} aria-hidden="true" /> Location</dt>
            <dd>{job.location}</dd>
          </div>
          <div>
            <dt><PoundSterling size={18} aria-hidden="true" /> Pay</dt>
            <dd>{job.pay}</dd>
          </div>
          <div>
            <dt><Clock size={18} aria-hidden="true" /> Type and hours</dt>
            <dd>
              {job.type}. {job.hours}
            </dd>
          </div>
          <div>
            <dt><CalendarDays size={18} aria-hidden="true" /> Posted</dt>
            <dd>
              {date(job.posted)}
              {job.closes && `. Closes ${date(job.closes)}`}
            </dd>
          </div>
        </dl>

        <div className={styles.lists}>
          <div>
            <h3>What you&apos;ll do</h3>
            <ul>
              {job.duties.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>What you&apos;ll need</h3>
            <ul>
              {job.requirements.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        </div>

        {sector && (
          <p className={styles.sectorLink}>
            More about our <Link href={`/sectors/${sector.slug}`}>{sector.name} recruitment</Link>.
          </p>
        )}
      </SplitSection>

      <FormSection
        id="apply"
        title={`Apply for ${job.title}`}
        intro={`Fill in your details and attach your CV. ${site.name} will call you to talk about the job. It's free.`}
      >
        <CandidateForm jobRef={`${job.title}, ${job.location} (${job.slug})`} />
      </FormSection>
    </main>
  );
}

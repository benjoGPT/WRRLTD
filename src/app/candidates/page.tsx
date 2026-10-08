import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/FaqList";
import { PageHero } from "@/components/PageHero";
import { SplitSection } from "@/components/SplitSection";
import { StepList } from "@/components/StepList";
import { CandidateForm } from "@/components/contact/CandidateForm";
import { FormSection } from "@/components/contact/FormSection";
import { SectorIndex } from "@/components/home/SectorIndex";
import { site } from "@/config/site";
import { faqsFor } from "@/lib/faqs";
import { candidateSteps } from "@/lib/journeys";
import styles from "@/components/Columns.module.css";

export const metadata: Metadata = {
  title: "Find work: permanent and temporary jobs across the UK",
  description: `Looking for work? Send your CV to ${site.name} and we'll call you about permanent and temporary roles that suit you, in 12 sectors. Always free.`,
  alternates: { canonical: "/candidates" },
  openGraph: { url: "/candidates" },
};

export default function CandidatesPage() {
  return (
    <main id="main">
      <PageHero
        title="Work that suits you"
        intro="Apply once with your CV and we'll call you about permanent and temporary roles that match what you're looking for. It's always free."
        crumbs={[{ name: "Candidates", path: "/candidates" }]}
        photo="candidateChat"
      >
        <a href="#apply" className="btn btn--light">
          Send your CV
        </a>
        <a href={site.phoneHref} className="btn btn--ghost-light">
          Call {site.phone}
        </a>
      </PageHero>

      <SplitSection title="How it works" intro="From your application to your first day.">
        <StepList steps={candidateSteps} />
      </SplitSection>

      <SplitSection title="What you can expect" tone="paper">
        <div className={styles.columns}>
          <div className={styles.column}>
            <h3>Always free</h3>
            <p>
              We never charge you for finding you work. It&apos;s against the law, and it&apos;s not
              how we work.
            </p>
          </div>
          <div className={styles.column}>
            <h3>Your say every time</h3>
            <p>We only send your CV to an employer after we&apos;ve talked about the job and you&apos;ve said yes.</p>
          </div>
          <div className={styles.column}>
            <h3>Clear terms for temporary work</h3>
            <p>
              Before a temporary job starts, you get a Key Information Document showing your pay,
              any deductions and who employs you.
            </p>
          </div>
          <div className={styles.column}>
            <h3>Fair treatment</h3>
            <p>
              We judge people on their skills and experience, nothing else. Read our{" "}
              <Link href="/equal-opportunities">equal opportunities</Link> statement.
            </p>
          </div>
        </div>
      </SplitSection>

      <SectorIndex />

      <SplitSection title="Questions from candidates" tone="paper" intro={<Link href="/faq">See all questions</Link>}>
        <FaqList items={faqsFor("candidates")} />
      </SplitSection>

      <FormSection
        id="apply"
        title="Send us your CV"
        intro="It takes a couple of minutes. We'll read it and give you a call."
      >
        <CandidateForm />
      </FormSection>
    </main>
  );
}

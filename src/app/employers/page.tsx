import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/FaqList";
import { PageHero } from "@/components/PageHero";
import { SplitSection } from "@/components/SplitSection";
import { Standards } from "@/components/Standards";
import { StepList } from "@/components/StepList";
import { EmployerForm } from "@/components/contact/EmployerForm";
import { FormSection } from "@/components/contact/FormSection";
import { SectorIndex } from "@/components/home/SectorIndex";
import { site } from "@/config/site";
import { faqsFor } from "@/lib/faqs";
import { employerSteps } from "@/lib/journeys";
import styles from "@/components/Columns.module.css";

export const metadata: Metadata = {
  title: "Recruitment for employers: permanent and temporary staff",
  description: `Find reliable permanent and temporary staff anywhere in the UK. ${site.name} checks every candidate before they reach you, in 12 sectors.`,
  alternates: { canonical: "/employers" },
  openGraph: { url: "/employers" },
};

export default function EmployersPage() {
  return (
    <main id="main">
      <PageHero
        title="Staff you can rely on"
        intro={`Permanent and temporary recruitment for businesses anywhere in ${site.coverage}. Tell us about the role and we'll find people who fit it.`}
        crumbs={[{ name: "Employers", path: "/employers" }]}
        photo="officeTeam"
      >
        <a href="#enquire" className="btn btn--light">
          Tell us about your vacancy
        </a>
        <a href={site.phoneHref} className="btn btn--ghost-light">
          Call {site.phone}
        </a>
      </PageHero>

      <SplitSection title="How it works" intro="Four steps from your first call to a new starter.">
        <StepList steps={employerSteps} />
      </SplitSection>

      <SplitSection
        title="Permanent or temporary"
        intro="Whichever you need, you get the same checks and the same attention."
        tone="paper"
      >
        <div className={styles.columns}>
          <div className={styles.column}>
            <h3>Permanent staff</h3>
            <p>
              We find, check and introduce candidates for roles you want to fill for the long
              term. You employ them directly. Our fee and terms are agreed before we start.
            </p>
          </div>
          <div className={styles.column}>
            <h3>Temporary staff</h3>
            <p>
              Cover for busy periods, holidays, sickness or a single project. We supply the
              worker and handle their pay, so you get the help without the paperwork.
            </p>
          </div>
        </div>
      </SplitSection>

      <Standards />
      <SectorIndex />

      <SplitSection title="Questions from employers" tone="paper" intro={<Link href="/faq">See all questions</Link>}>
        <FaqList items={faqsFor("employers")} />
      </SplitSection>

      <FormSection
        id="enquire"
        title="Tell us about your vacancy"
        intro="A few details and we'll be in touch to talk it through."
      >
        <EmployerForm />
      </FormSection>
    </main>
  );
}

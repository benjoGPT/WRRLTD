import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { SplitSection } from "@/components/SplitSection";
import { Standards } from "@/components/Standards";
import { site } from "@/config/site";
import { cvLink, hireLink } from "@/lib/nav";
import styles from "@/components/Columns.module.css";

export const metadata: Metadata = {
  title: "About us",
  description: `${site.name} is a UK recruitment consultancy based in ${site.locality}, placing permanent and temporary staff with businesses nationwide.`,
  alternates: { canonical: "/about" },
  openGraph: { url: "/about" },
};

/** About us: the client's own copy, lightly tidied. */
export default function AboutPage() {
  return (
    <main id="main">
      <PageHero
        title="About Wright Point Recruitment"
        intro={`A UK recruitment consultancy based in ${site.locality}, recruiting across ${site.coverage}.`}
        crumbs={[{ name: "About", path: "/about" }]}
        photo="blackpool"
      />

      <SplitSection title="We start by understanding both sides">
        <div className={styles.prose}>
          <p className={styles.lead}>
            {site.name} is a UK recruitment consultancy. We connect ambitious businesses with
            reliable, high-quality candidates in a wide range of industries.
          </p>
          <p>
            Before we introduce anyone, we take the time to understand the role, the business and
            the person. A filled vacancy isn&apos;t the goal. The goal is the right person in the
            right job, and a good fit for both of them.
          </p>
          <p>
            Hiring or job hunting, you&apos;ll find us straightforward, professional and personal to
            deal with.
          </p>
        </div>
      </SplitSection>

      <Standards />

      <SplitSection title="Where to next" tone="white">
        <div className={styles.columns}>
          <div className={styles.column}>
            <h3>Hiring?</h3>
            <p>Tell us about your vacancy and we&apos;ll be in touch to talk it through.</p>
            <p>
              <Link href={hireLink}>Tell us about your vacancy</Link>
            </p>
          </div>
          <div className={styles.column}>
            <h3>Looking for work?</h3>
            <p>Send your CV and we&apos;ll call you about roles that suit you.</p>
            <p>
              <Link href={cvLink}>Send your CV</Link>
            </p>
          </div>
        </div>
      </SplitSection>
    </main>
  );
}

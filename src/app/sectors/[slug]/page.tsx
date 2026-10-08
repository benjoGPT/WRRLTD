import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { SplitSection } from "@/components/SplitSection";
import { StructuredData } from "@/components/StructuredData";
import { site } from "@/config/site";
import { formLink } from "@/lib/nav";
import { sectorServiceSchema } from "@/lib/schema";
import { getSector, sectors } from "@/lib/sectors";
import styles from "./page.module.css";

// Build one page per sector at build time.
export function generateStaticParams() {
  return sectors.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/sectors/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const sector = getSector(slug);
  if (!sector) return {};
  return {
    title: `${sector.name} recruitment`,
    description: `Permanent and temporary ${sector.name} recruitment across the UK. ${sector.blurb} Apply for work or tell ${site.name} about your vacancy.`,
    alternates: { canonical: `/sectors/${sector.slug}` },
    openGraph: { url: `/sectors/${sector.slug}` },
  };
}

export default async function SectorPage({ params }: PageProps<"/sectors/[slug]">) {
  const { slug } = await params;
  const sector = getSector(slug);
  if (!sector) notFound();

  const related = sectors.filter((s) => s.group === sector.group && s.slug !== sector.slug);

  return (
    <main id="main">
      <StructuredData data={sectorServiceSchema(sector)} />
      <PageHero
        title={`${sector.name} recruitment`}
        intro={sector.intro}
        crumbs={[
          { name: "Sectors", path: "/sectors" },
          { name: sector.name, path: `/sectors/${sector.slug}` },
        ]}
        photo={sector.photo}
      >
        <Link href={formLink("employer", sector.slug)} className="btn btn--light">
          I&apos;m hiring
        </Link>
        <Link href={formLink("candidate", sector.slug)} className="btn btn--ghost-light">
          I&apos;m looking for work
        </Link>
      </PageHero>

      <SplitSection
        title="Roles we recruit for"
        intro={`Permanent and temporary, anywhere in ${site.coverage}. Not listed? Ask us anyway.`}
      >
        <ul className={styles.roles}>
          {sector.roles.map((role) => (
            <li key={role}>{role}</li>
          ))}
        </ul>
      </SplitSection>

      <SplitSection title="Two ways we can help" tone="paper">
        <div className={styles.paths}>
          <div>
            <h3>Hiring?</h3>
            <p>
              Tell us the role, hours and location. We advertise, search our registered candidates
              and introduce people we&apos;ve already spoken to and checked.
            </p>
            <Link href={formLink("employer", sector.slug)} className="btn">
              Tell us about your vacancy
            </Link>
          </div>
          <div>
            <h3>Looking for work?</h3>
            <p>
              Send your CV and we&apos;ll call you about {sector.name} roles that suit you.
              It&apos;s always free.
            </p>
            <Link href={formLink("candidate", sector.slug)} className="btn btn--outline">
              Send your CV
            </Link>
          </div>
        </div>
      </SplitSection>

      {related.length > 0 && (
        <SplitSection title="Related sectors">
          <ul className={styles.related}>
            {related.map(({ name, slug: s, icon: Icon, blurb }) => (
              <li key={s}>
                <Link href={`/sectors/${s}`}>
                  <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                  <span>
                    <strong>{name}</strong>
                    {blurb}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </SplitSection>
      )}
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { StructuredData } from "@/components/StructuredData";
import { getGuide, guides } from "@/lib/guides";
import { articleSchema } from "@/lib/schema";
import styles from "./page.module.css";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: { url: `/guides/${guide.slug}`, type: "article" },
  };
}

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default async function GuidePage({ params }: PageProps<"/guides/[slug]">) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const others = guides.filter((g) => g.slug !== guide.slug);

  return (
    <main id="main">
      <StructuredData data={articleSchema(guide)} />
      <PageHero
        title={guide.title}
        intro={guide.description}
        crumbs={[
          { name: "Guides", path: "/guides" },
          { name: guide.short, path: `/guides/${guide.slug}` },
        ]}
        photo={guide.photo}
      />

      <article className="section">
        <div className={`container ${styles.layout}`}>
          <aside className={styles.meta}>
            <p>For {guide.audience.toLowerCase()}</p>
            <p>
              Last checked{" "}
              <time dateTime={guide.updated}>{dateFormat.format(new Date(guide.updated))}</time>
            </p>
            {guide.audience === "Employers" && (
              <p className={styles.note}>A general guide, not legal advice.</p>
            )}
          </aside>

          <div className={styles.body}>
            {guide.sections.map((s) => (
              <section key={s.heading}>
                <h2>{s.heading}</h2>
                {s.paragraphs?.map((p) => <p key={p}>{p}</p>)}
                {s.list && (
                  <ul>
                    {s.list.map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <p className={styles.cta}>
              <Link href={guide.cta.href} className="btn">
                {guide.cta.label}
              </Link>
            </p>
          </div>
        </div>
      </article>

      {others.length > 0 && (
        <section className={`section section--tint ${styles.more}`} aria-labelledby="more-guides">
          <div className="container">
            <h2 id="more-guides">More guides</h2>
            <ul>
              {others.map((g) => (
                <li key={g.slug}>
                  <Link href={`/guides/${g.slug}`}>{g.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </main>
  );
}

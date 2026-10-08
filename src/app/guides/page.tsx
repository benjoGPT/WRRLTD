import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { site } from "@/config/site";
import { guides } from "@/lib/guides";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Guides for candidates and employers",
  description: `Practical guides from ${site.name}: writing a CV for practical jobs, hiring temporary staff and right to work checks.`,
  alternates: { canonical: "/guides" },
  openGraph: { url: "/guides" },
};

export default function GuidesPage() {
  return (
    <main id="main">
      <PageHero
        title="Guides"
        intro="Plain-English help with CVs, hiring and the rules that come with it."
        crumbs={[{ name: "Guides", path: "/guides" }]}
      />
      <section className="section" aria-label="All guides">
        <div className="container">
          <ul className={styles.list}>
            {guides.map((g) => (
              <li key={g.slug} className={styles.item}>
                <p className={styles.audience}>For {g.audience.toLowerCase()}</p>
                <h2>
                  <Link href={`/guides/${g.slug}`}>{g.title}</Link>
                </h2>
                <p>{g.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

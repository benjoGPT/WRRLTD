import type { Metadata } from "next";
import { FaqList } from "@/components/FaqList";
import { PageHero } from "@/components/PageHero";
import { SplitSection } from "@/components/SplitSection";
import { StructuredData } from "@/components/StructuredData";
import { site } from "@/config/site";
import { faqs } from "@/lib/faqs";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description: `Answers about permanent and temporary work, fees, areas covered and how to apply with ${site.name}.`,
  alternates: { canonical: "/faq" },
  openGraph: { url: "/faq" },
};

const groups = [
  { title: "For everyone", audience: "general" },
  { title: "For candidates", audience: "candidates" },
  { title: "For employers", audience: "employers" },
] as const;

export default function FaqPage() {
  return (
    <main id="main">
      <StructuredData data={faqSchema(faqs)} />
      <PageHero
        title="Frequently asked questions"
        intro={
          <>
            Can&apos;t find your answer? Email <a href={`mailto:${site.email}`}>{site.email}</a> or call{" "}
            <a href={site.phoneHref}>{site.phone}</a>.
          </>
        }
        crumbs={[{ name: "FAQ", path: "/faq" }]}
      />
      {groups.map((g, i) => (
        <SplitSection key={g.audience} title={g.title} tone={i % 2 ? "paper" : "white"}>
          <FaqList items={faqs.filter((f) => f.audience === g.audience)} />
        </SplitSection>
      ))}
    </main>
  );
}

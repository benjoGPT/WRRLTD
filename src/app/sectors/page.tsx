import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Sectors } from "@/components/Sectors";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Sectors we recruit for",
  description: `Construction, engineering, manufacturing, driving, warehouse, hospitality and more. ${site.name} recruits permanent and temporary staff in 12 sectors across the UK.`,
  alternates: { canonical: "/sectors" },
  openGraph: { url: "/sectors" },
};

export default function SectorsPage() {
  return (
    <main id="main">
      <PageHero
        title="Sectors we recruit for"
        intro={`Twelve sectors, permanent and temporary roles in each, anywhere in ${site.coverage}.`}
        crumbs={[{ name: "Sectors", path: "/sectors" }]}
        photo="warehouse"
      />
      <Sectors />
    </main>
  );
}

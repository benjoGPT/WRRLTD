import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { RouteFinder } from "@/components/RouteFinder";
import { Standards } from "@/components/Standards";
import { StructuredData } from "@/components/StructuredData";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { HomePaths } from "@/components/home/HomePaths";
import { SectorIndex } from "@/components/home/SectorIndex";
import { site } from "@/config/site";
import { organizationSchema, websiteSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: `${site.name} | Recruitment agency in ${site.locality}, recruiting UK-wide` },
  description:
    "Permanent and temporary recruitment across the UK. Wright Point Recruitment finds reliable staff for businesses and the right next role for candidates in 12 sectors.",
  alternates: { canonical: "/" },
};

/** Home page: a short overview that links out to the detail pages. */
export default function Home() {
  return (
    <main id="main">
      <StructuredData data={[organizationSchema(), websiteSchema()]} />
      <Hero />
      <HomePaths />
      <Standards />
      <SectorIndex />
      <RouteFinder />
      <AboutTeaser />
    </main>
  );
}

import type { Metadata } from "next";
import { About } from "@/components/About";
import { AudienceSplit } from "@/components/AudienceSplit";
import { Contact } from "@/components/contact/Contact";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { Hero } from "@/components/Hero";
import { RouteFinder } from "@/components/RouteFinder";
import { SectorMarquee } from "@/components/SectorMarquee";
import { HowItWorks } from "@/components/HowItWorks";
import { StickyCvButton } from "@/components/StickyCvButton";
import { Standards } from "@/components/Standards";
import { Sectors } from "@/components/Sectors";

/**
 * The home page. Each section is its own component in src/components, in the
 * order they appear on the page.
 */
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main id="main">
      <JsonLd />
      <Hero />
      <SectorMarquee />
      <AudienceSplit />
      <Standards />
      <Sectors />
      <RouteFinder />
      <HowItWorks />
      <About />
      <Faq />
      <Contact />
      <StickyCvButton />
    </main>
  );
}

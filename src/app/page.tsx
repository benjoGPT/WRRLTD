import type { Metadata } from "next";
import { About } from "@/components/About";
import { Contact } from "@/components/contact/Contact";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { Hero } from "@/components/Hero";
import { Paths } from "@/components/Paths";
import { RouteFinder } from "@/components/RouteFinder";
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
      <Paths />
      <Standards />
      <Sectors />
      <RouteFinder />
      <About />
      <Faq />
      <Contact />
      <StickyCvButton />
    </main>
  );
}

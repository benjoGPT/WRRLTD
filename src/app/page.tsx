import { About } from "@/components/About";
import { AudienceSplit } from "@/components/AudienceSplit";
import { Contact } from "@/components/contact/Contact";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Sectors } from "@/components/Sectors";

/**
 * The home page. Each section is its own component in src/components, in the
 * order they appear on the page.
 */
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <AudienceSplit />
      <Sectors />
      <HowItWorks />
      <About />
      <Faq />
      <Contact />
    </main>
  );
}

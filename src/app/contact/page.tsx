import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Contact } from "@/components/contact/Contact";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact us",
  description: `Get in touch with ${site.name}. Send your CV, tell us about a vacancy, or call ${site.phone}.`,
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact" },
};

export default function ContactPage() {
  return (
    <main id="main">
      <PageHero
        title="Contact us"
        intro={
          <>
            Send your CV, tell us about a vacancy, or call us on{" "}
            <a href={site.phoneHref}>{site.phone}</a>. We aim to reply within one working day.
          </>
        }
        crumbs={[{ name: "Contact", path: "/contact" }]}
        photo="meeting"
      />
      <Contact />
    </main>
  );
}

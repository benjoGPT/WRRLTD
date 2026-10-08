import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Website terms of use",
  description: `The terms for using the ${site.name} website.`,
  alternates: { canonical: "/terms" },
};

/**
 * Website terms of use. These cover the website only. Terms of business for
 * employers and terms for temporary workers are separate contracts.
 * TODO: have these reviewed by someone qualified before launch.
 */
export default function TermsPage() {
  return (
    <LegalPage
      title="Website terms of use"
      path="/terms"
      intro={
        <p>
          These terms apply when you use this website. By using it, you agree to them. They
          don&apos;t cover the services we provide to employers or workers. Those have their own
          written terms, which we give you before we start working together.
        </p>
      }
    >
      <h2>About us</h2>
      <p>
        This website is run by {site.legalName}, registered in {site.registeredIn}, company number{" "}
        {site.companyNumber}, registered office {site.registeredAddress}. Contact us at{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>Using this website</h2>
      <ul>
        <li>The site is free to use. We may change or remove parts of it without notice.</li>
        <li>
          We work to keep the information accurate, but it&apos;s general information, not advice.
          Please check anything important with us directly.
        </li>
        <li>
          Using the site doesn&apos;t guarantee that we&apos;ll find you work, or find candidates for
          your vacancy.
        </li>
      </ul>

      <h2>Sending us information</h2>
      <p>When you send us a form or your CV, you confirm that:</p>
      <ul>
        <li>the information is accurate and your own, or you have permission to share it</li>
        <li>it doesn&apos;t contain anything unlawful, offensive or harmful, such as a virus</li>
      </ul>
      <p>
        How we use what you send is explained in our <Link href="/privacy">privacy notice</Link>.
      </p>

      <h2>What you mustn&apos;t do</h2>
      <ul>
        <li>try to get unauthorised access to the site or the systems behind it</li>
        <li>use automated tools to copy content or flood our forms</li>
        <li>pretend to be someone else, or use the site for anything unlawful</li>
      </ul>

      <h2>Our content</h2>
      <p>
        The text, logo and design of this site belong to us or the people who license them to us.
        You can view and print pages for your own use. Please don&apos;t copy them for commercial use
        without asking.
      </p>

      <h2>Links to other websites</h2>
      <p>
        We may link to other sites, such as job boards. We aren&apos;t responsible for their content
        or how they handle your data.
      </p>

      <h2>Our responsibility</h2>
      <p>
        We aren&apos;t liable for any loss caused by relying on information on this site, or by the
        site being unavailable, except where the law says we can&apos;t exclude that liability. Nothing
        in these terms limits our liability for death or personal injury caused by our negligence,
        or for fraud.
      </p>

      <h2>Changes to these terms</h2>
      <p>We may update these terms. The version on this page applies when you use the site.</p>

      <h2>Which law applies</h2>
      <p>
        These terms are governed by the law of England and Wales. If you live in Scotland or Northern
        Ireland, you can also bring proceedings in your local courts.
      </p>
    </LegalPage>
  );
}

import type { Metadata } from "next";
import { site } from "@/config/site";
import { photos } from "@/lib/photos";
import styles from "@/components/Prose.module.css";

export const metadata: Metadata = {
  title: "Privacy notice",
  description: `How ${site.name} collects, uses and protects your personal information.`,
  alternates: { canonical: "/privacy" },
};

/**
 * Privacy notice.
 *
 * TODO: this is a starting draft under UK GDPR. Have it checked by someone
 * qualified before launch, and fill in every "TBC". Details that depend on
 * the client are marked TODO below.
 */
export default function PrivacyPage() {
  return (
    <main id="main" className={`container ${styles.page}`}>
      <article className={styles.prose}>
        <h1>Privacy notice</h1>
        {/* TODO: set the date this notice is finalised. */}
        <p className={styles.meta}>Last updated: TBC</p>

        <p>
          This notice explains how {site.legalName} (&quot;we&quot;, &quot;us&quot;) collects,
          uses and looks after your personal information when you use this website or contact us.
        </p>

        <h2>Who we are</h2>
        <p>
          {site.legalName} is the data controller for the information described here. We are
          registered in {site.registeredIn}, company number {site.companyNumber}. Our registered
          office is {site.registeredAddress}.
        </p>
        {/* TODO: add the ICO registration number once registered (most recruiters must pay the data protection fee). */}
        <p>Information Commissioner&apos;s Office (ICO) registration number: TBC.</p>
        <p>
          For anything about your data, email <a href={`mailto:${site.email}`}>{site.email}</a> or
          call <a href={site.phoneHref}>{site.phone}</a>.
        </p>

        <h2>What we collect</h2>
        <p>When you use our forms or contact us, we may collect:</p>
        <ul>
          <li>your name, email address and phone number</li>
          <li>your company name, if you&apos;re an employer</li>
          <li>the sector and type of work (permanent or temporary) you&apos;re interested in</li>
          <li>anything you tell us in your message</li>
          <li>
            your CV and the information in it, such as your work history, qualifications and skills
          </li>
        </ul>
        <p>
          Please don&apos;t include sensitive details in your CV that we don&apos;t need, such as
          health information, religion or ethnicity.
        </p>

        <h2>How we use it</h2>
        <ul>
          <li>to reply to your enquiry</li>
          <li>if you&apos;re a candidate, to find suitable work for you and talk to you about it</li>
          <li>if you&apos;re an employer, to understand your vacancy and introduce candidates</li>
          <li>to meet our legal and regulatory obligations as a recruitment business</li>
        </ul>
        <p>
          We will never send your CV or details to an employer without talking to you first.
        </p>

        <h2>Our lawful basis</h2>
        {/* TODO: confirm the lawful bases with whoever reviews this notice. */}
        <ul>
          <li>
            <strong>Consent:</strong> when you send us your CV and tick the box on our form. You can
            withdraw your consent at any time by contacting us.
          </li>
          <li>
            <strong>Steps before a contract:</strong> when you ask us to help you find work or fill a
            vacancy.
          </li>
          <li>
            <strong>Legitimate interests:</strong> running and improving our recruitment service,
            where this doesn&apos;t override your rights.
          </li>
          <li>
            <strong>Legal obligation:</strong> where the law requires us to keep certain records.
          </li>
        </ul>

        <h2>Who we share it with</h2>
        <ul>
          <li>employers we introduce you to, only with your agreement</li>
          {/* TODO: list the hosting provider and email provider actually used. */}
          <li>
            companies that provide services to us, such as website hosting (TBC), our email service
            (TBC) and Resend, which delivers messages from our website forms
          </li>
          <li>authorities such as HMRC, where the law requires it</li>
        </ul>
        {/* TODO: confirm the safeguards each provider uses for transfers outside the UK. */}
        <p>
          Some of these providers may process data outside the UK. Where they do, we make sure
          appropriate safeguards are in place, such as the UK International Data Transfer Agreement
          or an equivalent.
        </p>

        <h2>How long we keep it</h2>
        {/* TODO: agree retention periods with the client. */}
        <p>
          We keep candidate details and CVs for TBC after our last contact with you, and employer
          enquiries for TBC, unless the law requires us to keep them for longer. After that, we
          delete them securely.
        </p>

        <h2>Your rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>ask for a copy of the information we hold about you</li>
          <li>ask us to correct anything that&apos;s wrong</li>
          <li>ask us to delete your information</li>
          <li>ask us to limit how we use it, or object to how we use it</li>
          <li>ask us to transfer it to you or another organisation</li>
          <li>withdraw your consent at any time</li>
        </ul>
        <p>
          To use any of these rights, email <a href={`mailto:${site.email}`}>{site.email}</a>. We will
          reply within one month.
        </p>

        <h2>Cookies</h2>
        {/* TODO: update this section when analytics are added. */}
        <p>This website doesn&apos;t use cookies or any tracking tools.</p>

        <h2>Complaints</h2>
        <p>
          If you&apos;re unhappy with how we&apos;ve handled your information, please contact us
          first so we can put it right. You can also complain to the Information Commissioner&apos;s
          Office at <a href="https://ico.org.uk/make-a-complaint/">ico.org.uk/make-a-complaint</a> or
          on 0303 123 1113.
        </p>

        <h2>Photo credits</h2>
        <p>Photos on this site are from Unsplash, used under the Unsplash License:</p>
        <ul>
          {Object.values(photos).map((p) => (
            <li key={p.unsplashId}>
              {p.label}: <a href={`https://unsplash.com/photos/${p.unsplashId}`}>{p.credit}</a>
            </li>
          ))}
        </ul>

        <h2>Changes to this notice</h2>
        <p>We may update this notice from time to time. The latest version will always be on this page.</p>
      </article>
    </main>
  );
}

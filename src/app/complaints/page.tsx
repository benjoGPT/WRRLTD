import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Complaints policy",
  description: `How to raise a complaint with ${site.name} and what happens next.`,
  alternates: { canonical: "/complaints" },
};

/**
 * Complaints policy. Covers general complaints and data protection complaints,
 * which since 19 June 2026 must be acknowledged within 30 days (Data (Use and
 * Access) Act 2025). The Fair Work Agency took over enforcement of the
 * recruitment rules from the Employment Agency Standards Inspectorate in
 * April 2026.
 * TODO: confirm timescales and who handles complaints with the client.
 */
export default function ComplaintsPage() {
  return (
    <LegalPage
      title="Complaints policy"
      path="/complaints"
      intro={
        <p>
          We want everyone who deals with us to be treated well. If something has gone wrong, tell us
          and we&apos;ll put it right if we can. This policy applies to candidates, temporary workers,
          employers and anyone else.
        </p>
      }
    >
      <h2>How to complain</h2>
      <p>Contact us by email, phone or in writing, whichever suits you:</p>
      <ul>
        <li>
          Email: <a href={`mailto:${site.email}`}>{site.email}</a>
        </li>
        <li>
          Phone: <a href={site.phoneHref}>{site.phone}</a>
        </li>
        <li>Post: {site.registeredAddress}</li>
      </ul>
      <p>
        Tell us what happened, when, who was involved and what you&apos;d like us to do. If you need
        help making a complaint, or a different format, just ask.
      </p>

      <h2>What happens next</h2>
      <ol>
        <li>
          <strong>We acknowledge it</strong> within 5 working days (and in any case within 30 days for
          complaints about your personal data, as the law requires).
        </li>
        <li>
          <strong>We look into it.</strong> Someone not involved in the issue will review what
          happened and may contact you for more detail.
        </li>
        <li>
          <strong>We reply in full</strong> within 20 working days, explaining what we found and what
          we&apos;ll do. If we need longer, we&apos;ll tell you why and keep you updated.
        </li>
        <li>
          <strong>If you&apos;re not satisfied,</strong> you can ask for the decision to be reviewed by
          a director, who will reply within a further 20 working days.
        </li>
      </ol>

      <h2>Taking it further</h2>
      <p>If you&apos;re still unhappy after our review, you can contact:</p>
      <ul>
        <li>
          <strong>The Information Commissioner&apos;s Office</strong>, about how we&apos;ve handled your
          personal data: <a href="https://ico.org.uk/make-a-complaint/">ico.org.uk/make-a-complaint</a>{" "}
          or 0303 123 1113.
        </li>
        <li>
          <strong>The Fair Work Agency</strong>, about how we&apos;ve acted as a recruitment business,
          for example pay, fees or the information we gave you. It took over from the Employment
          Agency Standards Inspectorate in April 2026.
        </li>
        <li>
          <strong>Acas</strong>, for advice on problems at work: acas.org.uk.
        </li>
      </ul>

      <h2>Our promise</h2>
      <p>
        Making a complaint will never affect how we treat you or the work we offer you. We keep
        complaints confidential and use them to improve. See our{" "}
        <Link href="/privacy">privacy notice</Link> for how we handle the information you send.
      </p>
    </LegalPage>
  );
}

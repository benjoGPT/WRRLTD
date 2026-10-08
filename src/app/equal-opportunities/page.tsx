import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Equal opportunities",
  description: `${site.name}'s commitment to fair, inclusive recruitment.`,
  alternates: { canonical: "/equal-opportunities" },
};

/** Equal opportunities statement (Equality Act 2010). */
export default function EqualOpportunitiesPage() {
  return (
    <LegalPage
      title="Equal opportunities"
      path="/equal-opportunities"
      intro={
        <p>
          We judge people on their skills, experience and potential. Nothing else. Everyone who
          applies through us gets the same fair chance.
        </p>
      }
    >
      <h2>Our commitment</h2>
      <p>
        We follow the Equality Act 2010 and won&apos;t treat anyone less favourably because of their
        age, disability, gender reassignment, marriage or civil partnership, pregnancy or maternity,
        race, religion or belief, sex or sexual orientation.
      </p>

      <h2>What this means in practice</h2>
      <ul>
        <li>We put candidates forward on merit, based on what each role genuinely needs.</li>
        <li>
          We won&apos;t act on instructions from an employer that would discriminate unlawfully. If we
          get one, we&apos;ll explain why we can&apos;t follow it.
        </li>
        <li>
          We write job adverts that focus on the job and avoid wording that puts people off without
          good reason.
        </li>
        <li>
          We make reasonable adjustments. If you need anything to apply, interview or start work,
          such as a different format or more time, tell us and we&apos;ll help.
        </li>
        <li>Everyone who works with us is expected to treat others with dignity and respect.</li>
      </ul>

      <h2>Raising a concern</h2>
      <p>
        If you think you&apos;ve been treated unfairly, please email{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>. We&apos;ll take it seriously and deal with
        it under our complaints policy.
      </p>
    </LegalPage>
  );
}

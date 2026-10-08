import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/config/site";
import { photos } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Privacy notice",
  description: `How ${site.name} collects, uses and protects your personal information.`,
  alternates: { canonical: "/privacy" },
};

/**
 * Privacy notice, written for a UK recruitment business under the UK GDPR,
 * the Data Protection Act 2018 and the Data (Use and Access) Act 2025.
 *
 * TODO before launch:
 * - fill in every "TBC" (company details, ICO number, providers, retention)
 * - confirm the lawful bases and retention periods with the client
 * - have the whole notice checked by someone qualified. This is a draft,
 *   not legal advice.
 */
export default function PrivacyPage() {
  const email = <a href={`mailto:${site.email}`}>{site.email}</a>;

  return (
    <LegalPage
      title="Privacy notice"
      path="/privacy"
      intro={
        <p>
          This notice explains what personal information we collect, why we need it, who we share it
          with and the rights you have. It applies to candidates, the businesses we work with and
          anyone who uses this website.
        </p>
      }
    >
      <h2>Who we are</h2>
      <p>
        {site.legalName} (&quot;we&quot;, &quot;us&quot;) is a recruitment business. We act as an
        employment agency when we introduce people for permanent jobs, and as an employment business
        when we supply temporary workers. For the information described here, we are the data
        controller.
      </p>
      <p>
        Registered in {site.registeredIn}, company number {site.companyNumber}. Registered office:{" "}
        {site.registeredAddress}. Information Commissioner&apos;s Office (ICO) registration number:
        TBC.
      </p>
      <p>
        For anything about your data, email {email} or call{" "}
        <a href={site.phoneHref}>{site.phone}</a>.
      </p>

      <h2>What we collect</h2>
      <h3>If you&apos;re looking for work</h3>
      <ul>
        <li>your name, email address, phone number and where you live</li>
        <li>your CV and what&apos;s in it: work history, skills, qualifications and training</li>
        <li>the work you want: sectors, hours, pay, and how far you can travel</li>
        <li>notes from our conversations with you, and references from people you name</li>
        <li>
          before we place you: proof of identity and right to work in the UK, and any licences or
          cards the job needs (for example a driving licence or CSCS card)
        </li>
        <li>
          if you work for us on a temporary basis: your National Insurance number, bank details,
          timesheets and pay records
        </li>
      </ul>
      <h3>If you&apos;re an employer</h3>
      <ul>
        <li>the names, job titles and contact details of the people we deal with</li>
        <li>details of your vacancies and any feedback on candidates</li>
      </ul>
      <h3>If you use this website</h3>
      <ul>
        <li>anything you send us through our forms</li>
        <li>
          cookies, but only the ones you agree to. See our{" "}
          <Link href="/cookies">cookie policy</Link>.
        </li>
      </ul>

      <h2>Where we get it from</h2>
      <p>
        Mostly from you. We may also find your details on job sites and social media where
        you&apos;ve made your CV or profile available to recruiters, or when you apply for one of our
        adverts there. We also receive information from referees, previous employers and the
        businesses we work with. If we get your details from somewhere other than you, we&apos;ll
        tell you within a month and point you to this notice.
      </p>

      <h2>How we use it, and our lawful basis</h2>
      <p>The law requires us to have a valid reason (a &quot;lawful basis&quot;) for each use:</p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>What we do</th>
              <th>Lawful basis</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Find suitable work for you and talk to you about it</td>
              <td>Legitimate interests, and steps you&apos;ve asked us to take before a contract</td>
            </tr>
            <tr>
              <td>Send your CV or details to an employer</td>
              <td>Only after we&apos;ve asked you about that specific job</td>
            </tr>
            <tr>
              <td>Check identity, right to work, references and qualifications</td>
              <td>Legal obligation (immigration law and the rules for recruitment businesses)</td>
            </tr>
            <tr>
              <td>Pay temporary workers and keep tax and payroll records</td>
              <td>Contract and legal obligation</td>
            </tr>
            <tr>
              <td>Understand an employer&apos;s vacancy and introduce candidates</td>
              <td>Legitimate interests and contract</td>
            </tr>
            <tr>
              <td>Email you about new jobs (job alerts)</td>
              <td>Your consent, which you can withdraw at any time</td>
            </tr>
            <tr>
              <td>Answer questions and complaints</td>
              <td>Legitimate interests and legal obligation</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3>More sensitive information</h3>
      <p>
        Please don&apos;t include details in your CV that we don&apos;t need, such as health,
        religion, ethnicity or sexual orientation. If you tell us about a health condition so we can
        make adjustments for you, we use it only for that. We only ask about criminal records where a
        role legally requires it, and we&apos;ll tell you first.
      </p>
      <p>We don&apos;t make decisions about you using only automated systems.</p>

      <h2>Who we share it with</h2>
      <ul>
        <li>employers, but only for jobs you&apos;ve agreed we can put you forward for</li>
        <li>your referees, when we ask for a reference</li>
        <li>payroll or umbrella companies that pay temporary workers, if this applies to you</li>
        <li>HMRC, the Home Office and other authorities, where the law requires it</li>
        {/* TODO: name the actual providers once chosen. */}
        <li>
          the companies that run our systems: Cloudflare, which hosts our website and checks that
          our forms are sent by real people (Turnstile), our email service (TBC), and Resend, which
          delivers messages sent through our website forms
        </li>
      </ul>
      <p>We never sell your information.</p>
      {/* TODO: confirm the safeguards each provider uses. */}
      <p>
        Some of these providers may store data outside the UK. When they do, we make sure there is
        proper protection in place, such as a UK adequacy decision or the UK International Data
        Transfer Agreement.
      </p>

      <h2>How long we keep it</h2>
      {/* TODO: agree retention periods with the client and fill in the TBCs. */}
      <p>
        We keep information only as long as we need it. Candidate details and CVs: TBC after our last
        contact with you. Employer contact details: TBC after our last contact. Some records have
        legal minimums, for example:
      </p>
      <ul>
        <li>records we must keep as a recruitment business: at least one year</li>
        <li>right to work checks: while you work for us and for two years after</li>
        <li>payroll and tax records: at least three years after the end of the tax year</li>
      </ul>
      <p>After that, we delete or securely destroy it.</p>

      <h2>Your rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>get a copy of the information we hold about you</li>
        <li>have anything wrong corrected</li>
        <li>have your information deleted</li>
        <li>limit how we use it, or object to how we use it</li>
        <li>stop marketing and job alerts at any time</li>
        <li>receive your information in a format you can take elsewhere</li>
        <li>withdraw your consent, where we rely on it</li>
      </ul>
      <p>
        Email {email} to use any of these. We&apos;ll reply within one month. It&apos;s free.
      </p>

      <h2>Complaints</h2>
      <p>
        If you&apos;re unhappy with how we&apos;ve handled your information, please tell us first.
        We&apos;ll acknowledge your complaint within 30 days, look into it properly and keep you
        updated. Our <Link href="/complaints">complaints policy</Link> explains the process.
      </p>
      <p>
        You can also complain to the Information Commissioner&apos;s Office at{" "}
        <a href="https://ico.org.uk/make-a-complaint/">ico.org.uk/make-a-complaint</a> or on 0303 123
        1113.
      </p>

      <h2>Changes to this notice</h2>
      <p>
        We&apos;ll update this notice when things change. The latest version is always on this page.
      </p>

      <h2>Photo credits</h2>
      <p>Photos on this site come from Unsplash and are used under the Unsplash License:</p>
      <ul>
        {Object.values(photos).map((p) => (
          <li key={p.unsplashId}>
            {p.label}: <a href={`https://unsplash.com/photos/${p.unsplashId}`}>{p.credit}</a>
          </li>
        ))}
      </ul>
    </LegalPage>
  );
}

import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { CookieSettingsButton } from "@/components/cookies/CookieSettingsButton";
import { site } from "@/config/site";
import { CONSENT_COOKIE, CONSENT_DAYS } from "@/lib/consent";

export const metadata: Metadata = {
  title: "Cookie policy",
  description: `Which cookies ${site.name} uses and how to change your choices.`,
  alternates: { canonical: "/cookies" },
};

/**
 * Cookie policy (PECR, as updated by the Data (Use and Access) Act 2025).
 * TODO: whenever a cookie or tracking tool is added (e.g. analytics), list it
 * in the table below and wrap the script in <ConsentGate>.
 */
export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookie policy"
      path="/cookies"
      intro={
        <p>
          Cookies are small files a website saves on your device. This page explains the ones we
          use and how to change your mind.
        </p>
      }
    >
      <h2>Your choices</h2>
      <p>
        When you first visit, we ask whether you&apos;re happy for us to use optional cookies. Nothing
        optional is set until you say yes, and saying no is just as easy. You can change your choice
        at any time:
      </p>
      <p>
        <CookieSettingsButton className="btn" />
      </p>

      <h2>Cookies we use</h2>
      <h3>Essential cookies</h3>
      <p>These are needed for the site to work, so they don&apos;t need your consent.</p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>What it does</th>
              <th>How long it lasts</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{CONSENT_COOKIE}</td>
              <td>Remembers your cookie choices so we don&apos;t ask on every page</td>
              <td>{CONSENT_DAYS} days</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Analytics and marketing cookies</h3>
      <p>
        We don&apos;t use any yet. If we add them, for example to count visits or measure our job
        adverts, we&apos;ll list them here and only use them if you agree.
      </p>

      <h2>Controlling cookies in your browser</h2>
      <p>
        You can also block or delete cookies in your browser settings. If you block essential
        cookies, we won&apos;t be able to remember your choices.
      </p>

      <h2>Questions</h2>
      <p>
        Email <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}

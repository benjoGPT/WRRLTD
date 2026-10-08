/**
 * Cookie consent: what we store and how.
 *
 * UK law (PECR, as updated by the Data (Use and Access) Act 2025) says you
 * need consent before setting cookies that aren't strictly necessary. The
 * visitor's choice is saved in one small "strictly necessary" cookie, which
 * itself doesn't need consent.
 *
 * To add analytics later: put the script inside <ConsentGate category="analytics">
 * (see components/cookies/ConsentGate.tsx) and list its cookies on /cookies.
 */

export const CONSENT_COOKIE = "wpr_consent";
export const CONSENT_VERSION = 1; // bump to ask everyone again after a change
export const CONSENT_DAYS = 180; // ask again after about 6 months

export type ConsentCategory = "analytics" | "marketing";
export type Consent = {
  v: number;
  analytics: boolean;
  marketing: boolean;
  date: string;
};

export const categories: { id: ConsentCategory; name: string; description: string }[] = [
  {
    id: "analytics",
    name: "Analytics",
    description:
      "Help us understand how people use the site (pages visited, time on page) so we can improve it. Counted anonymously.",
  },
  {
    id: "marketing",
    name: "Marketing",
    description:
      "Let us measure our adverts on social media and job sites, and show relevant adverts elsewhere.",
  },
];

export const CONSENT_EVENT = "wpr:consent-changed";
export const OPEN_SETTINGS_EVENT = "wpr:open-cookie-settings";

export function readConsent(): Consent | null {
  if (typeof document === "undefined") return null;
  const raw = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${CONSENT_COOKIE}=`))
    ?.slice(CONSENT_COOKIE.length + 1);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as Consent;
    return parsed.v === CONSENT_VERSION ? parsed : null;
  } catch {
    return null;
  }
}

export function saveConsent(choice: Pick<Consent, "analytics" | "marketing">) {
  const consent: Consent = { v: CONSENT_VERSION, ...choice, date: new Date().toISOString() };
  const maxAge = CONSENT_DAYS * 24 * 60 * 60;
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(consent))}; Max-Age=${maxAge}; Path=/; SameSite=Lax${secure}`;
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: consent }));
  return consent;
}

/** Opens the preferences panel from anywhere, e.g. the footer link. */
export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}

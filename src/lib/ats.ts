import "server-only";
import type { Attachment } from "./email";
import type { CandidateData, EmployerData } from "./validation";

/**
 * Sends form submissions to the recruitment system (ATS), alongside the
 * email. Which system is set by the ATS_PROVIDER environment variable:
 *
 *   (not set)  Off. Submissions are only emailed.
 *   webhook    POSTs each submission as JSON to ATS_WEBHOOK_URL. Use this with
 *              Make or Zapier to pass it on to almost any ATS, a Google Sheet
 *              or a CRM, without writing code.
 *
 * To connect an ATS directly once one is chosen, add a provider below with
 * the same shape as `webhook` and select it with ATS_PROVIDER.
 */

export type AtsSubmission =
  | { kind: "candidate"; data: CandidateData; cv: Attachment }
  | { kind: "employer"; data: EmployerData };

export type AtsResult = { ok: true; provider: string } | { ok: false; provider: string; skipped?: boolean };

type Provider = (submission: AtsSubmission) => Promise<AtsResult>;

/** Hex HMAC-SHA256 of the body, so the receiver can check it came from us */
async function sign(body: string, secret: string) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(body));
  return [...new Uint8Array(mac)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

const webhook: Provider = async (submission) => {
  const url = process.env.ATS_WEBHOOK_URL;
  if (!url) {
    console.error("ATS: ATS_PROVIDER is webhook but ATS_WEBHOOK_URL is not set.");
    return { ok: false, provider: "webhook", skipped: true };
  }

  const payload = {
    type: submission.kind === "candidate" ? "candidate.application" : "employer.enquiry",
    receivedAt: new Date().toISOString(),
    source: "website",
    ...submission.data,
    ...(submission.kind === "candidate" && {
      cv: {
        filename: submission.cv.filename,
        contentType: contentTypeFor(submission.cv.filename),
        sizeBytes: submission.cv.content.length,
        base64: submission.cv.content.toString("base64"),
      },
    }),
  };
  const body = JSON.stringify(payload);
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const secret = process.env.ATS_WEBHOOK_SECRET;
  if (secret) headers["X-WPR-Signature"] = `sha256=${await sign(body, secret)}`;

  try {
    const res = await fetch(url, { method: "POST", headers, body, signal: AbortSignal.timeout(10_000) });
    if (res.ok) return { ok: true, provider: "webhook" };
    console.error("ATS: webhook returned", res.status);
  } catch (error) {
    console.error("ATS: webhook request failed", error);
  }
  return { ok: false, provider: "webhook" };
};

function contentTypeFor(filename: string) {
  const lower = filename.toLowerCase();
  if (lower.endsWith(".pdf")) return "application/pdf";
  if (lower.endsWith(".docx")) return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  return "application/msword";
}

const providers: Record<string, Provider> = { webhook };

/** Sends the submission to the configured ATS. Never throws. */
export async function sendToAts(submission: AtsSubmission): Promise<AtsResult> {
  const name = process.env.ATS_PROVIDER?.trim().toLowerCase();
  if (!name || name === "none") return { ok: false, provider: "none", skipped: true };
  const provider = providers[name];
  if (!provider) {
    console.error(`ATS: unknown ATS_PROVIDER "${name}"`);
    return { ok: false, provider: name, skipped: true };
  }
  return provider(submission);
}

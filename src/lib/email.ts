import "server-only";
import { Resend } from "resend";
import type { CandidateData, EmployerData } from "./validation";

/**
 * Builds and sends the notification emails to the client.
 * Runs on the server only, because it uses the secret Resend API key.
 */

// Escapes text so anything typed into the form can't inject HTML into the email.
function escape(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function table(rows: [string, string | undefined][]) {
  const html = rows
    .map(
      ([label, value]) =>
        `<tr><th align="left" valign="top" style="padding:6px 16px 6px 0;color:#07284b">${label}</th>` +
        `<td style="padding:6px 0;white-space:pre-wrap">${escape(value || "-")}</td></tr>`,
    )
    .join("");
  const text = rows.map(([label, value]) => `${label}: ${value || "-"}`).join("\n");
  return {
    html: `<table style="font-family:Arial,sans-serif;font-size:15px;border-collapse:collapse">${html}</table>`,
    text,
  };
}

export type Attachment = { filename: string; content: Buffer };

type SendResult = { ok: true } | { ok: false; reason: "not-configured" | "send-failed" };

async function send(subject: string, body: { html: string; text: string }, replyTo: string, attachments?: Attachment[]): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  // Until the client's domain is verified in Resend, use Resend's test sender.
  const from = process.env.CONTACT_FROM_EMAIL || "Wright Point website <onboarding@resend.dev>";

  if (!apiKey || !to) {
    // Handy while building: in development, print the email instead of failing.
    if (process.env.NODE_ENV === "development") {
      console.log(`\n[email not sent: RESEND_API_KEY or CONTACT_TO_EMAIL missing]\n${subject}\n${body.text}\n`);
      return { ok: true };
    }
    console.error("Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not set.");
    return { ok: false, reason: "not-configured" };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: to.split(",").map((s) => s.trim()),
    replyTo, // pressing Reply goes straight to the person who filled in the form
    subject,
    html: body.html,
    text: body.text,
    attachments,
  });

  if (error) {
    console.error("Contact form: Resend error", error);
    return { ok: false, reason: "send-failed" };
  }
  return { ok: true };
}

export function sendEmployerEnquiry(data: EmployerData) {
  const body = table([
    ["Name", data.name],
    ["Company", data.company],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Sector", data.sector],
    ["Permanent / temporary", data.roleType],
    ["About the role", data.message],
  ]);
  return send(`New employer enquiry: ${data.company}`, body, data.email);
}

export function sendCandidateCv(data: CandidateData, cv: Attachment) {
  const body = table([
    ["Applying for", data.jobRef || "General application"],
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Sector", data.sector],
    ["Permanent / temporary", data.roleType],
    ["Message", data.message],
    ["Read privacy notice and agreed to details being kept", "Yes (ticked on the form)"],
    ["Wants job alert emails", data.jobAlerts === "yes" ? "Yes (opted in)" : "No"],
    ["CV", cv.filename],
  ]);
  const subject = data.jobRef ? `Application: ${data.jobRef} (${data.name})` : `New CV: ${data.name} (${data.sector})`;
  return send(subject, body, data.email, [cv]);
}

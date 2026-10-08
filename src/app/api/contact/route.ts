import { NextResponse } from "next/server";
import { sendToAts } from "@/lib/ats";
import { sendCandidateCv, sendEmployerEnquiry } from "@/lib/email";
import { TURNSTILE_FIELD, verifyTurnstile } from "@/lib/turnstile";
import {
  HONEYPOT_FIELD,
  MIN_FILL_MS,
  STARTED_FIELD,
  candidateSchema,
  checkCvFile,
  employerSchema,
  looksLikeCv,
  toFieldErrors,
  type FieldErrors,
} from "@/lib/validation";

/**
 * POST /api/contact
 *
 * Receives both forms, checks everything again on the server (never trust the
 * browser), filters out spam, then emails the details to the client and, if
 * one is set up, sends them to the recruitment system (see lib/ats.ts).
 *
 * The forms send JSON-friendly requests. If JavaScript is switched off the
 * browser posts the form normally, so we redirect to /thank-you instead.
 */

export async function POST(request: Request) {
  const wantsJson = request.headers.get("accept")?.includes("application/json");

  const reply = (status: number, body: { ok: boolean; errors?: FieldErrors; message?: string }) => {
    if (wantsJson) return NextResponse.json(body, { status });
    // No-JavaScript fallback: send people to a page rather than raw JSON.
    const target = body.ok ? "/thank-you" : "/contact";
    return NextResponse.redirect(new URL(target, request.url), 303);
  };

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return reply(400, { ok: false, message: "We couldn't read the form. Please try again." });
  }

  // Spam checks. Pretend it worked so bots don't learn anything.
  const honeypot = form.get(HONEYPOT_FIELD);
  const started = Number(form.get(STARTED_FIELD));
  if ((typeof honeypot === "string" && honeypot.trim() !== "") || (started && Date.now() - started < MIN_FILL_MS)) {
    return reply(200, { ok: true });
  }

  // Cloudflare Turnstile bot check (skipped until the keys are set up)
  const human = await verifyTurnstile(form.get(TURNSTILE_FIELD), request.headers.get("cf-connecting-ip"));
  if (!human.ok) {
    console.warn("Contact form: Turnstile check failed", human.reason);
    return reply(403, {
      ok: false,
      message: "We couldn't confirm you're not a robot. Please try again.",
    });
  }

  const fields = Object.fromEntries(
    [...form.entries()].filter(([, v]) => typeof v === "string"),
  );
  const formType = form.get("formType");

  if (formType === "employer") {
    const result = employerSchema.safeParse(fields);
    if (!result.success) return reply(422, { ok: false, errors: toFieldErrors(result.error) });

    const [sent, ats] = await Promise.all([
      sendEmployerEnquiry(result.data),
      sendToAts({ kind: "employer", data: result.data }),
    ]);
    // Counts as delivered if it reached the inbox or the ATS
    return sent.ok || ats.ok ? reply(200, { ok: true }) : reply(502, { ok: false });
  }

  if (formType === "candidate") {
    const result = candidateSchema.safeParse(fields);
    const errors = result.success ? {} : toFieldErrors(result.error);

    const cv = form.get("cv");
    const file = cv instanceof File ? cv : null;
    const cvError = checkCvFile(file);
    let bytes: Buffer | null = null;
    if (cvError) {
      errors.cv = cvError;
    } else if (file) {
      bytes = Buffer.from(await file.arrayBuffer());
      if (!looksLikeCv(bytes)) errors.cv = "That file doesn't look like a PDF or Word document.";
    }

    if (!result.success || Object.keys(errors).length > 0 || !bytes || !file) {
      return reply(422, { ok: false, errors });
    }

    // Keep the original name but strip anything odd from it.
    const safeName = file.name.replace(/[^\w.\- ]+/g, "_").slice(-100);
    const cvFile = { filename: safeName, content: bytes };
    const [sent, ats] = await Promise.all([
      sendCandidateCv(result.data, cvFile),
      sendToAts({ kind: "candidate", data: result.data, cv: cvFile }),
    ]);
    return sent.ok || ats.ok ? reply(200, { ok: true }) : reply(502, { ok: false });
  }

  return reply(400, { ok: false, message: "Unknown form." });
}

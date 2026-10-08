import "server-only";

/**
 * Checks a Cloudflare Turnstile token on the server. Turnstile is the bot
 * check on the forms: it usually runs invisibly, and only asks the visitor to
 * tick a box if their browser looks suspicious.
 *
 * Returns ok: true when the check passes, or when it isn't set up (no secret
 * key), so the forms keep working before the keys exist.
 */

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/** Field name Turnstile adds to the form with its token */
export const TURNSTILE_FIELD = "cf-turnstile-response";

export async function verifyTurnstile(token: FormDataEntryValue | null, ip: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return { ok: true as const, skipped: true };

  if (typeof token !== "string" || token === "") return { ok: false as const, reason: "missing-token" };

  const body = new FormData();
  body.append("secret", secret);
  body.append("response", token);
  if (ip) body.append("remoteip", ip);

  try {
    const res = await fetch(VERIFY_URL, { method: "POST", body });
    const data = (await res.json()) as { success: boolean; "error-codes"?: string[] };
    if (data.success) return { ok: true as const, skipped: false };
    return { ok: false as const, reason: (data["error-codes"] ?? []).join(",") || "failed" };
  } catch (error) {
    // If Cloudflare can't be reached, let the message through rather than
    // lose a real applicant. The hidden spam traps have already run.
    console.error("Turnstile: verification request failed", error);
    return { ok: true as const, skipped: true };
  }
}

import { site } from "@/config/site";
import { sectorNames } from "./sectors";

/**
 * Form settings and checks that don't need the zod library, so the forms can
 * use them without making the page heavier. validation.ts builds on these.
 */

export const OTHER_SECTOR = "Other / not sure";
export const sectorOptions = [...sectorNames, OTHER_SECTOR] as const;

export type FieldErrors = Record<string, string>;

// ---------- CV file checks ----------

export const cvMaxBytes = site.maxCvSizeMb * 1024 * 1024;
export const cvExtensions = [".pdf", ".doc", ".docx"];
export const cvAccept =
  ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

/** Basic checks on name and size. Returns an error message, or null if fine. */
export function checkCvFile(file: File | null | undefined): string | null {
  if (!file || file.size === 0) return "Please attach your CV.";
  const lower = file.name.toLowerCase();
  if (!cvExtensions.some((ext) => lower.endsWith(ext))) {
    return "Your CV needs to be a PDF, DOC or DOCX file.";
  }
  if (file.size > cvMaxBytes) {
    return `Your CV is too large. The limit is ${site.maxCvSizeMb}MB.`;
  }
  return null;
}

/**
 * Server-only extra check: looks at the first bytes of the file to make sure
 * it really is a PDF or Word document, not something renamed to look like one.
 */
export function looksLikeCv(bytes: Uint8Array): boolean {
  const starts = (sig: number[]) => sig.every((b, i) => bytes[i] === b);
  return (
    starts([0x25, 0x50, 0x44, 0x46]) || // %PDF
    starts([0xd0, 0xcf, 0x11, 0xe0]) || // .doc (old Word format)
    starts([0x50, 0x4b, 0x03, 0x04]) // .docx (a zip file)
  );
}

// ---------- Spam checks ----------

// Hidden field that people never see. Bots tend to fill in every field.
export const HONEYPOT_FIELD = "fax_number";
// Hidden timestamp from when the form appeared on screen.
export const STARTED_FIELD = "form_started";
// Anything submitted faster than this is almost certainly a bot.
export const MIN_FILL_MS = 3000;

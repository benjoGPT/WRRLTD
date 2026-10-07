import { z } from "zod";
import { site } from "@/config/site";
import { sectorNames } from "./sectors";

/**
 * Validation rules for both forms.
 *
 * The same rules run twice: in the browser, so people see mistakes straight
 * away, and on the server, because anything sent from a browser can be faked.
 */

export const OTHER_SECTOR = "Other / not sure";
export const sectorOptions = [...sectorNames, OTHER_SECTOR] as const;

const name = z.string().trim().min(2, "Please enter your name.").max(100, "That name is too long.");
const email = z
  .string()
  .trim()
  .min(1, "Please enter your email address.")
  .pipe(z.email("Please enter a valid email address, like name@example.com."));
// Digits, spaces, brackets, dashes and an optional leading +. 10 to 15 digits.
const phone = z
  .string()
  .trim()
  .min(1, "Please enter your phone number.")
  .refine((v) => /^\+?[\d\s()-]+$/.test(v), "Please use numbers only, like 07700 900123.")
  .refine((v) => {
    const digits = v.replace(/\D/g, "").length;
    return digits >= 10 && digits <= 15;
  }, "That phone number looks too short or too long.");
const sector = z.enum(sectorOptions, { error: "Please choose a sector." });
const message = z.string().trim().max(2000, "Please keep your message under 2,000 characters.");

export const employerSchema = z.object({
  name,
  company: z.string().trim().min(1, "Please enter your company name.").max(120),
  email,
  phone,
  sector,
  roleType: z.enum(["Permanent", "Temporary", "Both"], {
    error: "Please choose permanent, temporary or both.",
  }),
  message: message.min(1, "Please tell us a little about the role."),
});

export const candidateSchema = z.object({
  name,
  email,
  phone,
  sector,
  roleType: z.enum(["Permanent", "Temporary", "Either"], {
    error: "Please choose permanent, temporary or either.",
  }),
  message: message.optional(),
  consent: z.literal("yes", { error: "Please tick the box to agree before sending." }),
});

export type EmployerData = z.infer<typeof employerSchema>;
export type CandidateData = z.infer<typeof candidateSchema>;
export type FieldErrors = Record<string, string>;

/** Turns zod's error list into { fieldName: "message" }, first error per field. */
export function toFieldErrors(error: z.ZodError): FieldErrors {
  const errors: FieldErrors = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!errors[key]) errors[key] = issue.message;
  }
  return errors;
}

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

import { z } from "zod";
import { sectorOptions, type FieldErrors } from "./formRules";

// Everything from formRules is available from here too, for the server.
export * from "./formRules";

/**
 * Validation rules for both forms, written with the zod library.
 *
 * The same rules run twice: in the browser, so people see mistakes straight
 * away, and on the server, because anything sent from a browser can be faked.
 *
 * The browser only downloads this file (and zod) when someone presses Send,
 * which keeps the page quick to load. Small helpers the forms need straight
 * away live in formRules.ts instead.
 */

// A text field that must be filled in, with the same message whether it's
// empty or missing from the request altogether.
const requiredText = (message: string) => z.string({ error: message }).trim().min(1, message);

const name = requiredText("Please enter your name.")
  .min(2, "Please enter your name.")
  .max(100, "That name is too long.");
const email = z
  .string({ error: "Please enter your email address." })
  .trim()
  .min(1, "Please enter your email address.")
  .pipe(z.email("Please enter a valid email address, like name@example.com."));
// Digits, spaces, brackets, dashes and an optional leading +. 10 to 15 digits.
const phone = z
  .string({ error: "Please enter your phone number." })
  .trim()
  .min(1, "Please enter your phone number.")
  .refine((v) => /^\+?[\d\s()-]+$/.test(v), "Please use numbers only, like 07700 900123.")
  .refine((v) => {
    const digits = v.replace(/\D/g, "").length;
    return digits >= 10 && digits <= 15;
  }, "That phone number looks too short or too long.");
const sector = z.enum(sectorOptions, { error: "Please choose a sector." });
const tooLong = "Please keep your message under 2,000 characters.";

export const employerSchema = z.object({
  name,
  company: requiredText("Please enter your company name.").max(120, "That name is too long."),
  email,
  phone,
  sector,
  roleType: z.enum(["Permanent", "Temporary", "Both"], {
    error: "Please choose permanent, temporary or both.",
  }),
  message: requiredText("Please tell us a little about the role.").max(2000, tooLong),
});

export const candidateSchema = z.object({
  name,
  email,
  phone,
  sector,
  roleType: z.enum(["Permanent", "Temporary", "Either"], {
    error: "Please choose permanent, temporary or either.",
  }),
  message: z.string().trim().max(2000, tooLong).optional(),
  consent: z.literal("yes", { error: "Please tick the box to agree before sending." }),
  jobAlerts: z.literal("yes").optional(),
  // Set when applying from a job page
  jobRef: z.string().trim().max(160).optional(),
});

export type EmployerData = z.infer<typeof employerSchema>;
export type CandidateData = z.infer<typeof candidateSchema>;

/** Turns zod's error list into { fieldName: "message" }, first error per field. */
export function toFieldErrors(error: z.ZodError): FieldErrors {
  const errors: FieldErrors = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!errors[key]) errors[key] = issue.message;
  }
  return errors;
}

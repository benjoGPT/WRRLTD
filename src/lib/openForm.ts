/**
 * Lets any part of the page open a contact form with the sector already
 * chosen (used by the route finder and the sector cards). It sends a browser
 * event that the Contact section listens for, then scrolls to the form.
 */

export type FormKind = "employer" | "candidate";
export type OpenFormDetail = { kind: FormKind; sector?: string };

export const OPEN_FORM_EVENT = "wpr:open-form";

export function openForm(kind: FormKind, sector?: string) {
  window.dispatchEvent(new CustomEvent<OpenFormDetail>(OPEN_FORM_EVENT, { detail: { kind, sector } }));
  const target = document.getElementById(`${kind}-form`);
  target?.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", `#${kind}-form`);
}

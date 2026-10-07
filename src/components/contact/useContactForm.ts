"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { flushSync } from "react-dom";
import { useRouter } from "next/navigation";
import { checkCvFile, type FieldErrors } from "@/lib/formRules";

type Status = "idle" | "sending" | "error";

/**
 * Shared logic for both forms: check the fields, send them to /api/contact,
 * then go to the thank-you page or show what went wrong.
 */
export function useContactForm(kind: "employer" | "candidate") {
  const router = useRouter();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const startedRef = useRef<HTMLInputElement>(null);

  // Record when the form appeared, for the "filled in too fast" spam check.
  useEffect(() => {
    if (startedRef.current) startedRef.current.value = String(Date.now());
  }, []);

  // Shows the errors straight away (flushSync), then moves keyboard focus to
  // the first field that needs fixing.
  function showErrors(form: HTMLFormElement, fieldErrors: FieldErrors) {
    flushSync(() => setErrors(fieldErrors));
    form.querySelector<HTMLElement>('[aria-invalid="true"], [data-invalid="true"]')?.focus();
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // 1. Check in the browser first. The rules are loaded now, not with the
    //    page, so visitors who never use the form don't download them.
    const { candidateSchema, employerSchema, toFieldErrors } = await import("@/lib/validation");
    const schema = kind === "candidate" ? candidateSchema : employerSchema;
    const result = schema.safeParse(Object.fromEntries(data));
    const fieldErrors = result.success ? {} : toFieldErrors(result.error);
    if (kind === "candidate") {
      const cvError = checkCvFile(data.get("cv") as File | null);
      if (cvError) fieldErrors.cv = cvError;
    }
    if (Object.keys(fieldErrors).length > 0) {
      setStatus("idle");
      showErrors(form, fieldErrors);
      return;
    }
    setErrors({});

    // 2. Send to the server, which checks everything again.
    setStatus("sending");
    setServerMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        errors?: FieldErrors;
        message?: string;
      };

      if (res.ok && json.ok) {
        router.push(`/thank-you?from=${kind}`);
        return;
      }

      if (json.errors) showErrors(form, json.errors);
      setServerMessage(json.message ?? "");
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return { errors, status, serverMessage, onSubmit, startedRef };
}

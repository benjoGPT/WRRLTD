"use client";

import Link from "next/link";
import { site } from "@/config/site";
import { candidateSchema, cvAccept, sectorOptions } from "@/lib/validation";
import { FormStatus } from "./FormStatus";
import { Checkbox, FileField, RadioGroup, SelectField, TextArea, TextField } from "./Fields";
import { SpamTrap } from "./SpamTrap";
import { useContactForm } from "./useContactForm";
import styles from "./Form.module.css";

/** Form for people looking for work, with a CV upload. */
export function CandidateForm() {
  const { errors, status, serverMessage, onSubmit, startedRef } = useContactForm(
    "candidate",
    candidateSchema,
  );

  return (
    <form
      className={styles.form}
      onSubmit={onSubmit}
      noValidate
      action="/api/contact"
      method="post"
      encType="multipart/form-data"
      aria-label="Send your CV"
    >
      <input type="hidden" name="formType" value="candidate" />
      <SpamTrap startedRef={startedRef} />

      <TextField name="name" label="Your name" autoComplete="name" error={errors.name} />
      <div className={styles.row}>
        <TextField
          name="email"
          label="Email"
          type="email"
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          error={errors.email}
        />
        <TextField name="phone" label="Phone" type="tel" autoComplete="tel" error={errors.phone} />
      </div>
      <SelectField
        name="sector"
        label="Sector you'd like to work in"
        options={sectorOptions}
        error={errors.sector}
      />
      <RadioGroup
        name="roleType"
        label="Permanent or temporary?"
        options={["Permanent", "Temporary", "Either"]}
        error={errors.roleType}
      />
      <FileField
        name="cv"
        label="Your CV"
        accept={cvAccept}
        hint={`PDF, DOC or DOCX, up to ${site.maxCvSizeMb}MB.`}
        error={errors.cv}
      />
      <TextArea
        name="message"
        label="Anything else we should know?"
        required={false}
        placeholder="The kind of work you want, when you can start, where you can travel to"
        error={errors.message}
      />
      <Checkbox name="consent" error={errors.consent}>
        I agree to {site.name} storing my details and CV to help me find work, as explained in the{" "}
        <Link href="/privacy" target="_blank">
          privacy notice<span className="sr-only"> (opens in a new tab)</span>
        </Link>
        .
      </Checkbox>

      <FormStatus status={status} errorCount={Object.keys(errors).length} serverMessage={serverMessage} />
      <button type="submit" className={`btn ${styles.submit}`} disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send my CV"}
      </button>
    </form>
  );
}

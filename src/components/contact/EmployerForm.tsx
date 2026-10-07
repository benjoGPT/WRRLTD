"use client";

import { sectorOptions } from "@/lib/formRules";
import { FormStatus } from "./FormStatus";
import { RadioGroup, SelectField, TextArea, TextField } from "./Fields";
import { SpamTrap } from "./SpamTrap";
import { useContactForm } from "./useContactForm";
import styles from "./Form.module.css";

/** Form for businesses looking to hire. */
export function EmployerForm() {
  const { errors, status, serverMessage, onSubmit, startedRef } = useContactForm("employer");

  return (
    <form
      className={styles.form}
      onSubmit={onSubmit}
      noValidate
      action="/api/contact"
      method="post"
      encType="multipart/form-data"
      aria-label="Employer enquiry"
    >
      <input type="hidden" name="formType" value="employer" />
      <SpamTrap startedRef={startedRef} />

      <div className={styles.row}>
        <TextField name="name" label="Your name" autoComplete="name" error={errors.name} />
        <TextField name="company" label="Company" autoComplete="organization" error={errors.company} />
      </div>
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
      <SelectField name="sector" label="Sector" options={sectorOptions} error={errors.sector} />
      <RadioGroup
        name="roleType"
        label="Permanent or temporary?"
        options={["Permanent", "Temporary", "Both"]}
        error={errors.roleType}
      />
      <TextArea
        name="message"
        label="About the role"
        placeholder="Job title, number of people, location, hours and start date"
        error={errors.message}
      />

      <FormStatus status={status} errorCount={Object.keys(errors).length} serverMessage={serverMessage} />
      <button type="submit" className={`btn ${styles.submit}`} disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}

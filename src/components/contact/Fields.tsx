"use client";

import { useId, useState, type InputHTMLAttributes, type ReactNode } from "react";
import { FileText, Upload } from "lucide-react";
import styles from "./Form.module.css";

/**
 * Small building blocks for the forms. Each one links its label, hint and
 * error message to the input, so screen readers read them out together.
 */

type BaseProps = {
  name: string;
  label: string;
  error?: string;
  hint?: ReactNode;
  required?: boolean;
};

function Label({ htmlFor, label, required }: { htmlFor: string; label: string; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className={styles.label}>
      {label}
      {!required && <span className={styles.optional}> (optional)</span>}
    </label>
  );
}

function Message({ id, error, hint }: { id: string; error?: string; hint?: ReactNode }) {
  return (
    <>
      {hint && (
        <p id={`${id}-hint`} className={styles.hint}>
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className={styles.error}>
          {error}
        </p>
      )}
    </>
  );
}

function describedBy(id: string, error?: string, hint?: ReactNode) {
  return [hint ? `${id}-hint` : "", error ? `${id}-error` : ""].filter(Boolean).join(" ") || undefined;
}

// ---------- Text input ----------

type TextFieldProps = BaseProps & Omit<InputHTMLAttributes<HTMLInputElement>, "name">;

export function TextField({ name, label, error, hint, required = true, ...input }: TextFieldProps) {
  const id = useId();
  return (
    <div className={styles.field}>
      <Label htmlFor={id} label={label} required={required} />
      <input
        id={id}
        name={name}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={styles.input}
        {...input}
      />
      <Message id={id} error={error} hint={hint} />
    </div>
  );
}

// ---------- Textarea ----------

export function TextArea({
  name,
  label,
  error,
  hint,
  required = true,
  placeholder,
}: BaseProps & { placeholder?: string }) {
  const id = useId();
  return (
    <div className={styles.field}>
      <Label htmlFor={id} label={label} required={required} />
      <textarea
        id={id}
        name={name}
        rows={5}
        maxLength={2000}
        required={required}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={`${styles.input} ${styles.textarea}`}
      />
      <Message id={id} error={error} hint={hint} />
    </div>
  );
}

// ---------- Dropdown ----------

export function SelectField({
  name,
  label,
  error,
  hint,
  options,
  required = true,
}: BaseProps & { options: readonly string[] }) {
  const id = useId();
  return (
    <div className={styles.field}>
      <Label htmlFor={id} label={label} required={required} />
      <select
        id={id}
        name={name}
        required={required}
        defaultValue=""
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={`${styles.input} ${styles.select}`}
      >
        <option value="" disabled>
          Choose a sector
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <Message id={id} error={error} hint={hint} />
    </div>
  );
}

// ---------- Radio buttons ----------

export function RadioGroup({
  name,
  label,
  error,
  options,
}: BaseProps & { options: readonly string[] }) {
  const id = useId();
  return (
    <fieldset
      className={`${styles.field} ${styles.fieldset}`}
      aria-describedby={error ? `${id}-error` : undefined}
    >
      <legend className={styles.label}>{label}</legend>
      <div className={styles.radios}>
        {options.map((opt, i) => (
          <label key={opt} className={`${styles.radio} ${error ? styles.radioError : ""}`}>
            {/* data-invalid lets the form move focus here when there's an error */}
            <input
              type="radio"
              name={name}
              value={opt}
              required
              data-invalid={error && i === 0 ? "true" : undefined}
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>
      <Message id={id} error={error} />
    </fieldset>
  );
}

// ---------- File upload ----------

export function FileField({
  name,
  label,
  error,
  hint,
  accept,
}: BaseProps & { accept: string }) {
  const id = useId();
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <div className={styles.field}>
      <span className={styles.label} id={`${id}-label`}>
        {label}
      </span>
      {/* The real file input is visually hidden; the styled label opens it. */}
      <input
        id={id}
        type="file"
        name={name}
        accept={accept}
        required
        className={`${styles.fileInput} sr-only`}
        aria-labelledby={`${id}-label`}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
      />
      <label htmlFor={id} className={`${styles.fileButton} ${error ? styles.fileButtonError : ""}`}>
        {fileName ? (
          <FileText size={22} aria-hidden="true" />
        ) : (
          <Upload size={22} aria-hidden="true" />
        )}
        <span className={styles.fileText}>
          {fileName ?? "Choose a file"}
          <span className={styles.fileAction}>{fileName ? "Change file" : "Browse"}</span>
        </span>
      </label>
      <Message id={id} error={error} hint={hint} />
    </div>
  );
}

// ---------- Checkbox ----------

export function Checkbox({
  name,
  error,
  children,
  required = true,
}: {
  name: string;
  error?: string;
  children: ReactNode;
  required?: boolean;
}) {
  const id = useId();
  return (
    <div className={styles.field}>
      <div className={styles.checkbox}>
        <input
          id={id}
          type="checkbox"
          name={name}
          value="yes"
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <label htmlFor={id}>{children}</label>
      </div>
      <Message id={id} error={error} />
    </div>
  );
}

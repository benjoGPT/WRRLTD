import type { RefObject } from "react";
import { HONEYPOT_FIELD, STARTED_FIELD } from "@/lib/validation";
import styles from "./Form.module.css";

/**
 * Two hidden fields that catch spam bots without bothering real people:
 * a "honeypot" text box people never see (bots fill it in), and the time the
 * form appeared (bots submit instantly).
 */
export function SpamTrap({ startedRef }: { startedRef: RefObject<HTMLInputElement | null> }) {
  return (
    <>
      <div className={styles.honeypot} aria-hidden="true">
        <label>
          Leave this field empty
          <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <input type="hidden" name={STARTED_FIELD} ref={startedRef} />
    </>
  );
}

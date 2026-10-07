import { site } from "@/config/site";
import styles from "./Form.module.css";

/** Error banner shown above the submit button when sending fails. */
export function FormStatus({
  status,
  errorCount,
  serverMessage,
}: {
  status: "idle" | "sending" | "error";
  errorCount: number;
  serverMessage: string;
}) {
  if (status === "error" && errorCount === 0) {
    return (
      <div role="alert" className={styles.alert}>
        <strong>Sorry, your message didn&apos;t send.</strong>{" "}
        {serverMessage || "Please try again in a moment."} You can also email us at{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </div>
    );
  }
  if (errorCount > 0) {
    return (
      <div role="alert" className={styles.alert}>
        <strong>
          {errorCount === 1 ? "There's 1 thing to fix" : `There are ${errorCount} things to fix`}
        </strong>{" "}
        before we can send this. Check the highlighted fields above.
      </div>
    );
  }
  return null;
}
